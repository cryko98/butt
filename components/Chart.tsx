import React from 'react';

const Chart: React.FC = () => {
  return (
    <section id="chart" className="py-24 px-4 bg-black/5">
        <div className="container mx-auto max-w-7xl">
            <h2 className="font-slab text-4xl md:text-6xl text-brand-cream mb-12 text-center">
                Live Chart
            </h2>
            <div className="relative w-full pb-[125%] lg:pb-[65%] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-cream/20 hover:border-brand-cream transition-colors duration-500">
                <iframe 
                    src="https://dexscreener.com/solana/ApxGmXS7g6E45ZJ2EpmrXupwCHXKSnmsgk2fJNEDstHM?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=light&chartStyle=0&chartType=usd&interval=15"
                    className="absolute top-0 left-0 w-full h-full border-0 bg-[#1A1A1A]"
                    title="DexScreener Chart"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    </section>
  );
};

export default Chart;