import React from 'react';
import { motion } from 'framer-motion';
import { EditorialImage } from '../common/EditorialImage';

export const SeriesIntroduction = ({ series }) => {
  const heading = series?.introHeading || 'THE ART OF REMAINING GENTLE.';
  const description =
    series?.introDescription ||
    'Life has a way of testing the parts of us that we try to protect. The Gentle Armor is about carrying strength without losing softness. It is about becoming resilient without forgetting who you are.';
  const image =
    series?.introImage ||
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop';

  return (
    <section className="py-16 sm:py-24 border-b border-[#222222]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6"
        >
          <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block">
            CURATORIAL STATEMENT
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F1EA] leading-tight">
            {heading}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#A7A29B] font-light leading-relaxed">
            <p className="border-l-2 border-[#A88B65] pl-6 text-[#F5F1EA] font-serif text-xl italic leading-snug">
              "{description}"
            </p>
            <p>
              Divided across five sequential narrative chapters, Series 01 follows the progression of private vulnerability evolving into quiet structural fortitude. Each chapter examines a distinct psychological state, accompanied by architectural tailoring.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Supporting Photography */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6"
        >
          <div className="border border-[#2B2B2B] bg-[#151515] p-3 sm:p-4 shadow-xl">
            <EditorialImage
              src={image}
              alt="The Art of Remaining Gentle Editorial Silhouette"
              aspectRatio="aspect-[4/5]"
              zoomOnHover
              overlay
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default SeriesIntroduction;

