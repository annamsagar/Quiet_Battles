import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { ArrowRight, Sparkles } from 'lucide-react';

export const RelatedProductSection = ({ product }) => {
  const currentProduct = product || {
    name: 'THE GENTLE ARMOR OVERSIZED TEE',
    slug: 'gentle-armor',
    collection: 'SERIES 01 – THE GENTLE ARMOR™',
    price: 1499,
    description: 'An expression of quiet strength. A reminder that softness and resilience can exist together.',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'],
  };

  return (
    <section className="my-20 sm:my-28 pt-16 sm:pt-20 border-t border-[#222222]">
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-1">
            RELATED ARTIFACT
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1EA]">
            COMPLEMENTARY ARMOR
          </h3>
        </div>
        <span className="hidden sm:inline text-xs text-[#A7A29B] font-mono uppercase">
          SERIES 01 INAUGURAL PIECE
        </span>
      </div>

      <div className="bg-[#151515] border border-[#2B2B2B] p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12 shadow-2xl">
        {/* Product Visual */}
        <Link
          to={`/products/${currentProduct.slug}`}
          className="w-full md:w-56 aspect-[3/4] bg-[#0A0A0A] flex-shrink-0 overflow-hidden border border-[#333333] group relative block"
        >
          <img
            src={currentProduct.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'}
            alt={currentProduct.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop';
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-[#0A0A0A]/85 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#A88B65] border border-[#333333]">
            SIGNATURE
          </div>
        </Link>

        {/* Narrative & Specifications */}
        <div className="flex-1 space-y-4 text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#A88B65]">
            {currentProduct.collection}
          </span>
          <h4 className="font-serif text-2xl sm:text-4xl font-light text-[#F5F1EA]">
            <Link to={`/products/${currentProduct.slug}`} className="hover:text-[#A88B65] transition-colors">
              {currentProduct.name}
            </Link>
          </h4>
          <p className="text-sm text-[#A7A29B] font-light leading-relaxed max-w-xl">
            "{currentProduct.description}"
          </p>
          <div className="text-2xl font-mono text-[#F5F1EA] font-semibold pt-2">
            {formatCurrency(currentProduct.price)}
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto">
          <Link
            to={`/products/${currentProduct.slug}`}
            className="inline-flex w-full md:w-auto px-8 py-4 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 items-center justify-center gap-2 shadow-xl group"
          >
            <span>VIEW PRODUCT</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default RelatedProductSection;

