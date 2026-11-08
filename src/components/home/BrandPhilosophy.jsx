import React from 'react';
import { motion } from 'framer-motion';

export const BrandPhilosophy = () => {
  const pillars = [
    {
      number: '01',
      title: 'SILENCE',
      quote: 'Not every battle needs an audience.',
      description: 'The loudest accomplishments often hide internal fragility, while true victories are claimed in total privacy. We champion the quiet resolve that needs neither validation nor applause.',
    },
    {
      number: '02',
      title: 'STRENGTH',
      quote: 'Strength does not always make a sound.',
      description: 'Like subterranean stone that anchors a mountain, real fortitude is calm and steady. Our heavy silhouettes mimic this grounded resilience—unshaken by passing storms.',
    },
    {
      number: '03',
      title: 'IDENTITY',
      quote: 'Wear every part of who you have become.',
      description: 'Scars, memory, evolution, and perseverance coalesce into authentic character. Our garments are created as physical declarations of who you are, uncompromising and whole.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0A] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-2">
              FOUNDATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F1EA]">
              BRAND PHILOSOPHY
            </h2>
          </div>
          <p className="text-sm text-[#A7A29B] max-w-md font-light leading-relaxed">
            Three guiding axioms forged from resilience, emotional discipline, and silent craftsmanship.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="bg-[#151515] p-8 sm:p-10 border border-[#2B2B2B] flex flex-col justify-between hover:border-[#A88B65]/50 transition-colors duration-500 group relative"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A88B65]">
                    {pillar.number}
                  </span>
                  <span className="w-8 h-[1px] bg-[#333333] group-hover:bg-[#A88B65] transition-colors" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#F5F1EA]">
                  {pillar.title}
                </h3>

                <blockquote className="font-serif text-lg sm:text-xl text-[#F5F1EA] italic leading-snug border-l-2 border-[#A88B65] pl-4">
                  "{pillar.quote}"
                </blockquote>

                <p className="text-sm text-[#A7A29B] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>AXIOM {pillar.number}</span>
                <span className="text-[#A88B65] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
