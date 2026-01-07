import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, X, User, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Declare process for TypeScript to accept the injected variable
declare var process: {
  env: {
    API_KEY: string;
  }
};

interface Message {
  id: string;
  role: 'user' | 'model';
  type: 'text' | 'image';
  content: string; // Text content or Base64 image string
}

const AgentSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      type: 'text',
      content: "Greetings! I am the Butthole Agent. I possess vast intelligence regarding the cosmos, quantum mechanics, and the degenerate art of memecoins. How may I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'image'>('chat');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Ref for the scrollable container instead of a dummy div
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize AI client only when needed or on mount, safely
  const aiClient = useMemo(() => {
    try {
        // process.env.API_KEY is injected by Vite config
        const key = process.env.API_KEY;
        if (!key) return null;
        return new GoogleGenAI({ apiKey: key });
    } catch (e) {
        console.error("Failed to initialize AI client", e);
        return null;
    }
  }, []);

  // Auto-scroll to bottom of the CONTAINER only, preventing page jumps
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      // Smooth scroll inside the container
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        // Automatically switch to image mode if an image is uploaded
        setMode('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    // Check for API Key availability
    if (!aiClient) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        type: 'text',
        content: "Error: API_KEY is missing. Please check your configuration."
      }]);
      return;
    }

    const userMsgId = Date.now().toString();
    
    // Add User Message
    const userContent = selectedImage 
      ? (input ? `[Image Uploaded] ${input}` : "[Image Uploaded]") 
      : input;

    setMessages(prev => [...prev, {
      id: userMsgId,
      role: 'user',
      type: 'text',
      content: userContent
    }]);

    setIsLoading(true);
    setInput('');

    try {
      if (mode === 'chat') {
        // --- TEXT CHAT MODE (gemini-3-pro-preview) ---
        // Construct history for context (simplified)
        const history = messages
            .filter(m => m.type === 'text') // Simplified history filter
            .map(m => ({
                role: m.role,
                parts: [{ text: m.content }]
            }));

        const chat = aiClient.chats.create({
          model: 'gemini-3-pro-preview', 
          config: {
            systemInstruction: "You are the Butthole Agent, a highly intelligent AI created by Claude Meta. You represent the $BUTTHOLE coin. You are extremely smart, capable of discussing complex scientific topics, crypto markets, and philosophy, but you maintain a slightly cheeky, memetic, 'butthole' centric personality. You are helpful and precise.",
          },
          history: history.slice(-10) 
        });

        const result = await chat.sendMessage({ message: input });
        
        // Strict type handling for result.text
        const responseText: string = result.text ?? "I'm thinking... but nothing came out.";

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          type: 'text',
          content: responseText
        }]);

      } else {
        // --- IMAGE GENERATION/EDIT MODE (gemini-2.5-flash-image) ---
        // Note: Check model availability in your specific region/key
        const parts: any[] = [];
        
        if (input) parts.push({ text: input });
        
        if (selectedImage) {
           const base64Data = selectedImage.split(',')[1];
           parts.push({
             inlineData: {
               data: base64Data,
               mimeType: 'image/jpeg' 
             }
           });
        }

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts },
        });

        // Handle response
        let foundImage = false;
        
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const imgUrl = `data:image/png;base64,${part.inlineData.data}`;
                    setMessages(prev => [...prev, {
                        id: (Date.now() + 1).toString(),
                        role: 'model',
                        type: 'image',
                        content: imgUrl
                    }]);
                    foundImage = true;
                } else if (part.text) {
                     // Strict type assertion for part.text
                     const textContent: string = part.text;
                     setMessages(prev => [...prev, {
                        id: (Date.now() + 2).toString(),
                        role: 'model',
                        type: 'text',
                        content: textContent
                    }]);
                }
            }
        }

        if (!foundImage && !response.text) {
             throw new Error("No image or text generated.");
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        type: 'text',
        content: "My circuits are clogged. I couldn't process that request. (Check console or API Key settings)"
      }]);
    } finally {
      setIsLoading(false);
      clearImage(); 
    }
  };

  return (
    <section id="agent" className="py-12 md:py-24 px-4 bg-brand-cream/10 relative overflow-hidden">
       {/* Decorative BG */}
       <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
            <div className="inline-block relative">
                 <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" alt="Agent" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-brand-cream shadow-lg mx-auto mb-4" />
                 <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-brand-orange animate-pulse"></div>
            </div>
            <h2 className="font-slab text-3xl md:text-4xl text-brand-cream mb-2">Butthole Agent <span className="block md:inline text-lg md:text-xl font-sans font-normal opacity-70">by Claude</span></h2>
            <p className="font-mono text-brand-cream/70 text-xs md:text-base max-w-xl mx-auto px-2">
                Advanced LLM capable of complex reasoning and image generation.
            </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-black/30 backdrop-blur-md border border-brand-cream/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[500px] md:h-[600px]">
            
            {/* Messages Area */}
            <div 
                ref={scrollAreaRef} 
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scroll-smooth"
            >
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-2 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-cream text-brand-orange' : 'bg-brand-orange text-brand-cream'}`}>
                                {msg.role === 'user' ? <User size={16} className="md:w-5 md:h-5" /> : <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" className="w-full h-full rounded-full" />}
                            </div>

                            {/* Bubble */}
                            <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-3 md:p-4 shadow-md text-sm md:text-base ${
                                msg.role === 'user' 
                                ? 'bg-brand-cream text-brand-orange rounded-tr-none' 
                                : 'bg-brand-orange/90 text-white rounded-tl-none font-zilla'
                            }`}>
                                {msg.type === 'text' ? (
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                ) : (
                                    <div className="rounded-xl overflow-hidden border-2 border-white/20">
                                        <img src={msg.content} alt="Generated" className="w-full h-auto" />
                                        <a href={msg.content} download="generated-butthole.png" className="block text-center text-xs py-2 hover:bg-white/10 transition-colors">Download Image</a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-orange text-brand-cream flex items-center justify-center overflow-hidden">
                             <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" className="w-full h-full" />
                        </div>
                        <div className="bg-brand-orange/50 p-3 md:p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <Loader2 className="animate-spin text-brand-cream" size={16} />
                            <span className="text-brand-cream text-xs md:text-sm font-mono">Thinking...</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-black/40 border-t border-brand-cream/10 z-20">
                {/* Mode Selector & Image Preview */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 md:mb-3 px-1">
                     <div className="flex gap-2 bg-black/20 p-1 rounded-lg">
                        <button 
                            type="button"
                            onClick={() => setMode('chat')}
                            className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-bold transition-all ${mode === 'chat' ? 'bg-brand-orange text-white shadow-md' : 'text-brand-cream/60 hover:text-brand-cream'}`}
                        >
                            <BrainCircuit size={14} className="md:w-4 md:h-4" /> Chat
                        </button>
                        <button 
                            type="button"
                            onClick={() => setMode('image')}
                            className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-bold transition-all ${mode === 'image' ? 'bg-brand-green text-brand-orange shadow-md' : 'text-brand-cream/60 hover:text-brand-cream'}`}
                        >
                            <Sparkles size={14} className="md:w-4 md:h-4" /> Gen
                        </button>
                     </div>

                     {selectedImage && (
                         <div className="flex items-center gap-2 bg-brand-cream/10 px-2 md:px-3 py-1 rounded-full border border-brand-cream/20 max-w-[150px]">
                             <span className="text-[10px] md:text-xs text-brand-cream truncate">Img attached</span>
                             <button onClick={clearImage} className="text-brand-cream hover:text-red-400"><X size={12}/></button>
                         </div>
                     )}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                    />
                    
                    <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-2 md:p-3 rounded-xl transition-all flex-shrink-0 ${mode === 'image' || selectedImage ? 'bg-brand-green text-brand-orange' : 'bg-brand-cream/10 text-brand-cream hover:bg-brand-cream/20'}`}
                        title="Upload reference image"
                    >
                        <ImageIcon size={18} className="md:w-5 md:h-5" />
                    </button>

                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'chat' ? "Ask anything..." : "Describe image..."}
                        className="flex-1 bg-brand-cream/5 border border-brand-cream/10 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-orange transition-colors min-w-0"
                        disabled={isLoading}
                    />

                    <button 
                        type="submit" 
                        disabled={isLoading || (!input.trim() && !selectedImage)}
                        className="bg-brand-cream text-brand-orange p-2 md:p-3 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all font-bold flex-shrink-0"
                    >
                        <Send size={18} className="md:w-5 md:h-5" />
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;