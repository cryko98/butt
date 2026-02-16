
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'story', label: 'THE LORE' },
    { id: 'howtobuy', label: 'ASCEND' },
    { id: 'chart', label: 'STATS' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl py-2 shadow-xl' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="relative">
                <img src="https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/neww/20260216_073229.jpg" alt="Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-brand-blue group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-green rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-slab text-2xl md:text-3xl tracking-tighter rainbow-text">MOG</span>
        </div>

        <div className="hidden md:flex gap-10 font-slab text-sm items-center">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)} 
                className="text-brand-dark/80 hover:text-brand-pink transition-all tracking-widest relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-pink group-hover:w-full transition-all" />
              </button>
            ))}
            <a href="https://pump.fun/4MdtwK7ezBemvAWsW32HuvVD7o7j89Y3poYwJpWopump" target="_blank" rel="noopener noreferrer" 
               className="bg-brand-blue text-white px-8 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(46,144,250,0.5)] transition-all font-slab flex items-center gap-2">
                <Sparkles size={16} /> BUY $MOG
            </a>
        </div>

        <button className="md:hidden text-brand-dark p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="md:hidden fixed inset-0 bg-white z-[60] flex flex-col p-8 gap-8 items-center justify-center font-slab text-3xl text-brand-dark"
          >
            <button className="absolute top-6 right-6" onClick={() => setIsOpen(false)}><X size={40} /></button>
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="rainbow-text">{link.label}</button>
            ))}
            <a href="https://pump.fun/4MdtwK7ezBemvAWsW32HuvVD7o7j89Y3poYwJpWopump" target="_blank" rel="noopener noreferrer" className="bg-brand-blue text-white px-12 py-4 rounded-full shadow-2xl">
                BUY NOW
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
