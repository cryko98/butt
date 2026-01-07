import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'story', label: 'Story' },
    { id: 'agent', label: 'Agent' },
    { id: 'howtobuy', label: 'How to Buy' },
    { id: 'chart', label: 'Chart' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-brand-orange/95 backdrop-blur-md border-b-2 border-brand-cream/20 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => scrollToSection('hero')}>
            <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-md border border-brand-cream/50" />
            <span className="font-slab text-xl md:text-2xl text-brand-cream tracking-wide">BUTTHOLE</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-zilla font-bold text-lg items-center">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)} 
                className="text-brand-cream hover:text-white hover:underline decoration-wavy underline-offset-4 transition-all"
              >
                {link.label}
              </button>
            ))}
            <a href="https://pump.fun/GbuqNYmJGfNTbCM8D4GusJ8qzckZoFroGSXT5yLSpump" target="_blank" rel="noopener noreferrer" className="bg-brand-cream text-brand-orange px-6 py-2 rounded-full hover:scale-110 hover:shadow-lg transition-all font-slab text-sm">
                Buy Now
            </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-brand-cream p-2 z-50" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-orange border-b-2 border-brand-cream/20 overflow-hidden absolute w-full top-full left-0 shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6 items-center font-zilla font-bold text-xl text-brand-cream">
               {navLinks.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => scrollToSection(link.id)} 
                    className="w-full text-center py-2 border-b border-brand-cream/10 active:text-white active:scale-95 transition-all"
                  >
                    {link.label}
                  </button>
                ))}
                <a 
                  href="https://pump.fun/GbuqNYmJGfNTbCM8D4GusJ8qzckZoFroGSXT5yLSpump" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-brand-cream text-brand-orange px-8 py-3 rounded-full w-full text-center shadow-md font-slab mt-2"
                >
                    Buy Now
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;