
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const CA = "4MdtwK7ezBemvAWsW32HuvVD7o7j89Y3poYwJpWopump";

const CopyAddress: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
        className="w-full max-w-2xl mx-auto mt-8 cursor-pointer group"
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <div className="bg-white/50 backdrop-blur-sm border-2 border-brand-blue/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all group-hover:border-brand-blue group-hover:bg-white/80 shadow-sm">
            <span className="font-mono text-brand-dark/50 text-sm md:text-base font-bold">CA:</span>
            <code className="font-mono text-xs md:text-lg text-brand-dark break-all text-center font-bold">
                {CA}
            </code>
            <div className="bg-brand-blue text-white p-2 rounded-xl">
                {copied ? <Check size={20} /> : <Copy size={20} />}
            </div>
        </div>
        <div className="text-center mt-2 text-brand-dark/40 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? "Copied to clipboard!" : "Click to copy address"}
        </div>
    </motion.div>
  );
};

export default CopyAddress;
