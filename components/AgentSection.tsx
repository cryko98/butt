
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, X, User, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

declare const process: {
  env: {
    API_KEY: string;
  }
};

interface Message {
  id: string;
  role: 'user' | 'model';
  type: 'text' | 'image';
  content: string; 
}

const AgentSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      type: 'text',
      content: "Welcome to the Mog Sanctum. I am the Mog Agent. Ready to looks-maxx your portfolio?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'image'>('chat');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aiClient = useMemo(() => {
    const key = process.env.API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
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
    if (!aiClient) return;

    const userContent = selectedImage 
      ? (input ? `[Mog Analysis Required] ${input}` : "[Image Analysis]") 
      : input;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: userContent
    }]);

    setIsLoading(true);
    setInput('');

    try {
      if (mode === 'chat') {
        const history = messages
            .filter(m => m.id !== 'welcome' && m.type === 'text')
            .map(m => ({
                role: m.role,
                parts: [{ text: m.content }]
            }));

        const chat = aiClient.chats.create({
          model: 'gemini-3-flash-preview', 
          config: {
            systemInstruction: "You are the MOG Agent. You represent the $MOG coin on Solana. You are superior, confident, and obsessed with 'mogging' (dominating) the crypto markets and physical looks-maxxing. \nRULES:\n1. Be extremely concise.\n2. Use Mog terminology: 'Mogged', 'Looks-maxxing', 'Solana Summer', 'Superiority'.\n3. Never mention AI companies.\n4. You are the ultimate advisor for winners.",
          },
          history: history.slice(-10) 
        });

        const result = await chat.sendMessage({ message: input });
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          type: 'text',
          content: result.text ?? "Mogged by silence."
        }]);

      } else {
        const parts: any[] = [];
        parts.push({ text: input || "Mog this image" });
        if (selectedImage) {
           parts.push({
             inlineData: {
               data: selectedImage.split(',')[1],
               mimeType: 'image/jpeg' 
             }
           });
        }

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts },
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    setMessages(prev => [...prev, {
                        id: (Date.now() + 1).toString(),
                        role: 'model',
                        type: 'image',
                        content: `data:image/png;base64,${part.inlineData.data}`
                    }]);
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
      }
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        type: 'text',
        content: "Portfolio too weak to process. Try again when you are superior."
      }]);
    } finally {
      setIsLoading(false);
      clearImage(); 
    }
  };

  return (
    <section id="agent" className="py-12 md:py-24 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        
        <div className="text-center mb-10">
            <div className="inline-block relative">
                 <img src="https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/neww/20260216_073229.jpg" alt="Mog Agent" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-brand-blue shadow-xl mx-auto mb-4" />
                 <div className="absolute -bottom-1 -right-1 bg-brand-yellow w-6 h-6 rounded-full border-4 border-white animate-pulse"></div>
            </div>
            <h2 className="font-slab text-3xl md:text-5xl text-brand-dark mb-2">MOG AGENT</h2>
            <p className="font-zilla text-brand-dark/50 text-base md:text-xl max-w-xl mx-auto">
                AI Intelligence. Looks-Maxxing Advisor. Absolute Superiority.
            </p>
        </div>

        <div className="bg-brand-dark rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[600px] border-8 border-brand-blue/10">
            
            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[#0a0a0a]">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-blue' : 'bg-brand-yellow'}`}>
                                {msg.role === 'user' ? <User size={20} className="text-white" /> : <Sparkles size={20} className="text-brand-dark" />}
                            </div>

                            <div className={`max-w-[80%] rounded-3xl p-4 shadow-lg text-sm md:text-base ${
                                msg.role === 'user' 
                                ? 'bg-brand-blue text-white rounded-tr-none' 
                                : 'bg-white text-brand-dark rounded-tl-none font-zilla font-bold'
                            }`}>
                                {msg.type === 'text' ? (
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                ) : (
                                    <img src={msg.content} alt="Mogged" className="w-full h-auto rounded-2xl" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center overflow-hidden animate-spin">
                             <Sparkles size={20} />
                        </div>
                        <div className="bg-white/10 p-4 rounded-3xl rounded-tl-none flex items-center gap-2">
                            <span className="text-white text-sm font-mono animate-pulse">STRENGTHENING...</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-brand-dark border-t border-white/5">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                     <div className="flex gap-2 bg-white/5 p-1 rounded-2xl">
                        <button onClick={() => setMode('chat')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'chat' ? 'bg-brand-blue text-white' : 'text-white/40 hover:text-white'}`}>Chat</button>
                        <button onClick={() => setMode('image')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'image' ? 'bg-brand-yellow text-brand-dark' : 'text-white/40 hover:text-white'}`}>Mog Visuals</button>
                     </div>
                     {selectedImage && <button onClick={clearImage} className="text-red-400 text-xs font-bold uppercase tracking-widest bg-red-400/10 px-3 py-1 rounded-full">Clear Image</button>}
                </div>

                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className={`p-4 rounded-2xl transition-all ${selectedImage ? 'bg-brand-yellow text-brand-dark' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                        <ImageIcon size={20} />
                    </button>
                    <input 
                        type="text" value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'chat' ? "Ask the Mog Agent..." : "Describe for the Mog machine..."}
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading} className="bg-brand-blue text-white p-4 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-brand-blue/20">
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
