import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, ArrowRight, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Wallet className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Create Wallet",
    desc: "Download Phantom or your preferred Solana wallet."
  },
  {
    icon: <Coins className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Get SOL",
    desc: "Buy SOL and send it to your wallet address."
  },
  {
    icon: <Rocket className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Go to Pump.fun",
    desc: "Visit the link below to find the official $BUTTHOLE ticker."
  },
  {
    icon: <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Swap",
    desc: "Swap your SOL for $BUTTHOLE. Welcome to the smell of success."
  }
];

const HowToBuy: React.FC = () => {
  return (
    <section id="howtobuy" className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden">
       {/* Background blob */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-cream/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto max-w-6xl">
        <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-slab text-4xl md:text-6xl text-brand-cream mb-10 md:mb-16 text-center"
        >
            How To Buy
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-brand-cream text-brand-orange p-6 md:p-8 rounded-3xl flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="bg-brand-orange text-brand-cream p-3 md:p-4 rounded-full mb-4 md:mb-6">
                {step.icon}
              </div>
              <h3 className="font-slab text-xl md:text-2xl mb-2 md:mb-3">{step.title}</h3>
              <p className="font-zilla text-base md:text-lg opacity-80">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 text-center"
        >
            <a 
                href="https://pump.fun/GbuqNYmJGfNTbCM8D4GusJ8qzckZoFroGSXT5yLSpump" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-white text-brand-orange text-lg md:text-2xl font-slab px-8 md:px-10 py-3 md:py-4 rounded-full shadow-[0_6px_0_rgba(0,0,0,0.2)] md:shadow-[0_10px_0_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.2)] hover:translate-y-[3px] transition-all"
            >
                BUY ON PUMP.FUN NOW
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToBuy;