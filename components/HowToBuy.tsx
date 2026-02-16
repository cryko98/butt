
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, ArrowRight, Rocket, Star } from 'lucide-react';

const steps = [
  {
    icon: <Wallet className="w-8 h-8 md:w-10 md:h-10" />,
    title: "GET PHANTOM",
    desc: "Only for the disciplined.",
    color: "bg-brand-blue"
  },
  {
    icon: <Coins className="w-8 h-8 md:w-10 md:h-10" />,
    title: "LOAD SOL",
    desc: "Fuel for the ascension.",
    color: "bg-brand-pink"
  },
  {
    icon: <Rocket className="w-8 h-8 md:w-10 md:h-10" />,
    title: "PUMP IT",
    desc: "Locate $MOG on Pump.fun.",
    color: "bg-brand-yellow"
  },
  {
    icon: <Star className="w-8 h-8 md:w-10 md:h-10" />,
    title: "MAX OUT",
    desc: "Swap and hold forever.",
    color: "bg-brand-green"
  }
];

const HowToBuy: React.FC = () => {
  return (
    <section id="howtobuy" className="py-12 md:py-16 px-4 bg-brand-blue/5 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-slab text-4xl md:text-7xl text-brand-dark mb-12 text-center tracking-tighter"
        >
            HOW TO <span className="rainbow-text underline">ASCEND</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-4 border-brand-dark rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-[8px_8px_0px_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[12px_12px_0px_#000] transition-all group"
            >
              <div className={`${step.color} text-white p-5 rounded-2xl mb-6 group-hover:rotate-12 transition-transform shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="font-slab text-xl md:text-2xl mb-2 text-brand-dark">{step.title}</h3>
              <p className="font-zilla text-lg text-brand-dark/70 font-bold">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center"
        >
            <a 
                href="https://pump.fun/4MdtwK7ezBemvAWsW32HuvVD7o7j89Y3poYwJpWopump" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-brand-pink text-white text-2xl md:text-4xl font-slab px-12 py-6 rounded-full shadow-[0_15px_40px_rgba(255,0,229,0.3)] hover:scale-110 transition-all border-4 border-white animate-pulse"
            >
                BUY ON PUMP.FUN
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToBuy;
