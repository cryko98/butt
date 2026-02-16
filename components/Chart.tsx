
import React from 'react';

const Chart: React.FC = () => {
  return (
    <section id="chart" className="py-8 md:py-12 px-4 bg-brand-dark">
        <div className="container mx-auto max-w-7xl">
            <h2 className="font-slab text-3xl md:text-5xl text-white mb-6 md:mb-8 text-center">
                MOG STATS
            </h2>
            <div className="relative w-full pb-[140%] md:pb-[90%] lg:pb-[60%] rounded-[30px] overflow-hidden shadow-2xl border-4 border-brand-blue/20">
                <iframe 
                    src="https://dexscreener.com/solana/4MdtwK7ezBemvAWsW32HuvVD7o7j89Y3poYwJpWopump?embed=1&theme=dark&chartTheme=dark&trades=0&info=0"
                    className="absolute top-0 left-0 w-full h-full border-0 bg-[#0F172A]"
                    title="MOG Chart"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    </section>
  );
};

export default Chart;
