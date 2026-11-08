import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../common/EditorialImage';
import { formatCurrency } from '../../utils/formatCurrency';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export const FeaturedProduct = ({ product }) => {
  const currentProduct = product || {
    id: 'prod-gentle-armor',
    name: 'THE GENTLE ARMOR OVERSIZED TEE',
    slug: 'gentle-armor',
    category: 'Oversized T-shirt',
    collection: 'SERIES 01 – THE GENTLE ARMOR™',
    price: 1499,
    originalPrice: 1999,
    description: 'An expression of quiet strength. The Gentle Armor Oversized Tee represents the balance between vulnerability and resilience.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    ],
    fabricDetails: [
      '280 GSM Heavyweight French Terry Loopback Cotton',
      '100% Combed Compact Ring-Spun Organic Yarn',
      'Drop-shoulder boxy silhouette with reinforced rib collar',
    ],
  };

  return (
    <section className="py-24 sm:py-32 bg-[#151515] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Product Visual with Editorial Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative group"
          >
            <div className="border border-[#2B2B2B] bg-[#0A0A0A] p-4 sm:p-6 shadow-2xl relative">
              <EditorialImage
                src={currentProduct.images[0]}
                alt={currentProduct.name}
                aspectRatio="aspect-[4/5]"
                zoomOnHover
              />
              <div className="absolute top-8 left-8 bg-[#0A0A0A]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#333333] text-[10px] font-mono tracking-widest text-[#A88B65] uppercase flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>SIGNATURE PIECE</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Product Narrative & Specs */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono">
                {currentProduct.collection}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1EA] tracking-wide">
                {currentProduct.name}
              </h2>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl font-mono text-[#F5F1EA] font-medium">
                  {formatCurrency(currentProduct.price)}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-base font-mono text-neutral-500 line-through">
                    {formatCurrency(currentProduct.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] font-mono uppercase bg-[#222222] text-[#A88B65] px-2.5 py-0.5 border border-[#333333]">
                  IN STOCK
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#A7A29B] leading-relaxed font-light">
              {currentProduct.description}
            </p>

            {/* Micro Details List */}
            <div className="space-y-3 py-4 border-y border-[#2B2B2B]">
              <span className="text-xs uppercase font-mono tracking-widest text-[#F5F1EA] block mb-2">
                ARCHITECTURAL DETAILS
              </span>
              {currentProduct.fabricDetails?.slice(0, 3).map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-[#A7A29B]">
                  <Check size={14} className="text-[#A88B65] flex-shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to={`/products/${currentProduct.slug}`}
                className="w-full sm:w-auto px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest-xl font-semibold hover:bg-[#A88B65] hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2 group"
              >
                <span>VIEW PRODUCT & PURCHASE</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
