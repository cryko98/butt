import React from 'react';
import { motion } from 'framer-motion';

const Story: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="story" className="py-12 md:py-24 bg-black/10 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-slab text-4xl md:text-6xl text-brand-cream mb-8 md:mb-12 text-center"
        >
            The Origin of Wind
        </motion.h2>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 md:space-y-8 font-zilla text-lg md:text-3xl leading-relaxed text-brand-cream/90 text-center"
        >
          <motion.p variants={itemVariants}>
            Everyone has been talking about the <span className="text-white font-bold bg-brand-orange px-1 whitespace-nowrap">Claude logo</span> and how it looks remarkably like a <span className="font-slab">Butthole</span>.
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-xl md:text-4xl font-bold text-white py-2 md:py-4">
            They said it’s a logo. The internet said it’s a butthole. 
          </motion.p>

          <motion.div variants={itemVariants} className="bg-brand-cream text-brand-orange p-4 md:p-6 rounded-2xl rotate-1 mx-auto max-w-3xl shadow-xl transform hover:rotate-0 transition-transform duration-300">
            Thus… <span className="font-slab text-2xl md:text-4xl">$BUTTHOLE</span> <span className="font-zilla">took over.</span>
          </motion.div>

          <motion.p variants={itemVariants}>
             The world wasn't ready for the truth. <br className="hidden md:block"/>
             Butthole was just a butthole on Raydium and went to 120M. 
          </motion.p>

          <motion.p variants={itemVariants} className="border-l-4 border-brand-cream pl-4 md:pl-6 italic text-base md:text-2xl">
            "This butthole is literally tied to the claude meta which makes it more bullish. 
            <span className="font-bold text-brand-orange"> $butthole</span> is to Claude what $fartcoin is to Truth Terminal."
          </motion.p>

          <motion.p variants={itemVariants} className="text-2xl md:text-4xl font-slab mt-8 md:mt-12">
            That's really easy.
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
};

export default Story;