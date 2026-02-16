
import React from 'react';
import { motion } from 'framer-motion';

const Story: React.FC = () => {
  return (
    <section id="story" className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rainbow-border p-1 md:p-1 mb-8 shadow-2xl"
        >
            <div className="bg-white rounded-[1.8rem] p-8 md:p-16 text-center">
                <h2 className="font-slab text-4xl md:text-7xl text-brand-dark mb-8 tracking-tighter">
                    PEAK <span className="rainbow-text">MOGGING</span>
                </h2>
                
                <div className="space-y-6 font-zilla text-xl md:text-3xl leading-tight text-brand-dark/80 font-bold">
                    <p>
                        The ETH chain was too sluggish for the elite. Moggers needed a chain that matched their physique. 
                    </p>
                    
                    <p className="rainbow-text text-3xl md:text-5xl uppercase tracking-tighter font-slab py-4">
                        Solana is the new gym.
                    </p>

                    <p>
                        We didn't just move; we evolved. $MOG on Solana is the final form of financial looks-maxxing. 
                    </p>

                    <div className="bg-brand-dark text-white p-8 rounded-[2.5rem] shadow-2xl transform hover:scale-105 transition-transform duration-500 my-8">
                         <span className="font-slab text-brand-yellow text-3xl md:text-5xl block mb-2 italic">"MOG OR BE MOGGED."</span>
                         <span className="text-lg md:text-xl font-mono opacity-60">There is no middle ground.</span>
                    </div>

                    <p className="text-lg md:text-2xl text-brand-blue">
                        While they were building dApps, we were building character. While they were trading charts, we were trading jawlines.
                    </p>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Decorative large text bg */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 select-none pointer-events-none opacity-[0.03] font-slab text-[20vw] whitespace-nowrap">
        SUPERIORITY SUPERIORITY SUPERIORITY
      </div>
    </section>
  );
};

export default Story;
