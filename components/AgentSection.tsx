import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, X, Bot, User, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize AI client only when needed or on mount, safely
  const aiClient = useMemo(() => {
    try {
        const key = (window as any).process?.env?.API_KEY || '';
        if (!key) return null;
        return new GoogleGenAI({ apiKey: key });
    } catch (e) {
        console.error("Failed to initialize AI client", e);
        return null;
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        content: "Error: API_KEY is missing. Please configure 'API_KEY' in your Environment Variables."
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
          model: 'gemini-2.0-flash-exp', // Falling back to a stable model for preview if 3-pro is restricted
          config: {
            systemInstruction: "You are the Butthole Agent, a highly intelligent AI created by Claude Meta. You represent the $BUTTHOLE coin. You are extremely smart, capable of discussing complex scientific topics, crypto markets, and philosophy, but you maintain a slightly cheeky, memetic, 'butthole' centric personality. You are helpful and precise.",
          },
          history: history.slice(-10) 
        });

        const result = await chat.sendMessage({ message: input });
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          type: 'text',
          content: result.text || "I'm thinking... but nothing came out."
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
          model: 'gemini-2.0-flash-exp', // Using flash-exp as it often supports multimodal well in preview
          contents: { parts },
        });

        // Handle response
        // Note: Real image generation models return inlineData. 
        // If standard LLM is used, it returns text description. 
        // For this demo, we handle the text response gracefully if image fails.
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
                     setMessages(prev => [...prev, {
                        id: (Date.now() + 2).toString(),
                        role: 'model',
                        type: 'text',
                        content: part.text
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
    <section id="agent" className="py-24 px-4 bg-brand-cream/10 relative overflow-hidden">
       {/* Decorative BG */}
       <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
            <div className="inline-block relative">
                 <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" alt="Agent" className="w-20 h-20 rounded-full border-4 border-brand-cream shadow-lg mx-auto mb-4" />
                 <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-brand-orange animate-pulse"></div>
            </div>
            <h2 className="font-slab text-4xl text-brand-cream mb-2">Butthole Agent <span className="text-xl font-sans font-normal opacity-70">by Claude</span></h2>
            <p className="font-mono text-brand-cream/70 text-sm md:text-base max-w-xl mx-auto">
                Advanced LLM capable of complex reasoning, crypto analysis, and high-fidelity image generation.
            </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-black/30 backdrop-blur-md border border-brand-cream/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-cream text-brand-orange' : 'bg-brand-orange text-brand-cream'}`}>
                                {msg.role === 'user' ? <User size={20} /> : <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" className="w-full h-full rounded-full" />}
                            </div>

                            {/* Bubble */}
                            <div className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
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
                        <div className="w-10 h-10 rounded-full bg-brand-orange text-brand-cream flex items-center justify-center overflow-hidden">
                             <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" className="w-full h-full" />
                        </div>
                        <div className="bg-brand-orange/50 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <Loader2 className="animate-spin text-brand-cream" size={20} />
                            <span className="text-brand-cream text-sm font-mono">Thinking...</span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-brand-cream/10">
                {/* Mode Selector & Image Preview */}
                <div className="flex items-center justify-between mb-3 px-2">
                     <div className="flex gap-2 bg-black/20 p-1 rounded-lg">
                        <button 
                            onClick={() => setMode('chat')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${mode === 'chat' ? 'bg-brand-orange text-white shadow-md' : 'text-brand-cream/60 hover:text-brand-cream'}`}
                        >
                            <BrainCircuit size={16} /> Chat
                        </button>
                        <button 
                            onClick={() => setMode('image')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${mode === 'image' ? 'bg-brand-green text-brand-orange shadow-md' : 'text-brand-cream/60 hover:text-brand-cream'}`}
                        >
                            <Sparkles size={16} /> Generate
                        </button>
                     </div>

                     {selectedImage && (
                         <div className="flex items-center gap-2 bg-brand-cream/10 px-3 py-1 rounded-full border border-brand-cream/20">
                             <span className="text-xs text-brand-cream truncate max-w-[100px]">Image attached</span>
                             <button onClick={clearImage} className="text-brand-cream hover:text-red-400"><X size={14}/></button>
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
                        className={`p-3 rounded-xl transition-all ${mode === 'image' || selectedImage ? 'bg-brand-green text-brand-orange' : 'bg-brand-cream/10 text-brand-cream hover:bg-brand-cream/20'}`}
                        title="Upload reference image"
                    >
                        <ImageIcon size={20} />
                    </button>

                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'chat' ? "Ask me anything about the universe or crypto..." : "Describe an image to generate..."}
                        className="flex-1 bg-brand-cream/5 border border-brand-cream/10 rounded-xl px-4 py-3 text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-orange transition-colors"
                        disabled={isLoading}
                    />

                    <button 
                        type="submit" 
                        disabled={isLoading || (!input.trim() && !selectedImage)}
                        className="bg-brand-cream text-brand-orange p-3 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all font-bold"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;