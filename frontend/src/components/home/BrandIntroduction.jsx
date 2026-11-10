import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../common/EditorialImage';
import { ArrowRight } from 'lucide-react';

export const BrandIntroduction = () => {
  return (
    <section id="brand-introduction" className="py-24 sm:py-32 bg-[#0A0A0A] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Typography and Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono font-medium block">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5F1EA] leading-[1.15] tracking-tight">
                THE BATTLES YOU NEVER SPEAK ABOUT.
              </h2>
            </div>

            <div className="space-y-6 text-[#A7A29B] text-base sm:text-lg leading-relaxed font-light">
              <p className="border-l-2 border-[#A88B65] pl-6 text-[#F5F1EA] font-serif text-xl sm:text-2xl italic leading-snug">
                "Some battles happen in silence. Some victories leave no applause. QUIET BATTLES is a reflection of the strength we carry without showing."
              </p>
              <p>
                In a culture defined by performance and superficial broadcast, true resilience remains invisible. We design garments that function as personal armor—minimalist, uncompromising, and deeply grounded in individual truth.
              </p>
              <p>
                Each silhouette honors the internal weight carried by those who walk quietly forward, refusing to be shaped by external noise.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest-xl text-[#F5F1EA] hover:text-[#A88B65] font-medium transition-colors group"
              >
                <span>READ THE FULL PHILOSOPHY</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Editorial Portrait Photograph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative group">
              <EditorialImage
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                alt="Editorial Portrait Study - Quiet Battles"
                aspectRatio="aspect-[4/5]"
                zoomOnHover
                overlay
              />

              {/* Floating Architectural Accent Box */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#151515] p-6 border border-[#333333] shadow-2xl max-w-xs">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A88B65] block mb-1">
                  MANIFESTO 01
                </span>
                <p className="font-serif text-lg text-[#F5F1EA] italic leading-tight">
                  "Silence is not absence. It is concentrated presence."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default BrandIntroduction;

