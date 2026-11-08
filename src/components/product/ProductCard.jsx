import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../common/EditorialImage';
import { formatCurrency } from '../../utils/formatCurrency';
import { ArrowRight } from 'lucide-react';

export const ProductCard = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-[#151515] border border-[#2B2B2B] hover:border-[#A88B65]/50 transition-all duration-500 flex flex-col justify-between overflow-hidden"
    >
      <div>
        <Link
          to={`/products/${product.slug}`}
          className="relative block aspect-[3/4] overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          <EditorialImage
            src={product.images?.[0]}
            alt={product.name}
            aspectRatio="aspect-full w-full h-full"
            zoomOnHover
          />
          <div className="absolute top-3 left-3 bg-[#0A0A0A]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-[#A88B65] uppercase border border-[#333333]">
            {product.category || 'ARMOR'}
          </div>
        </Link>

        <div className="p-6 space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#A7A29B]">
            {product.collection}
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-light text-[#F5F1EA] group-hover:text-[#A88B65] transition-colors">
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h4>
          <p className="text-sm font-mono text-[#F5F1EA] pt-1">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Link
          to={`/products/${product.slug}`}
          className="w-full py-2.5 border border-[#333333] group-hover:border-[#A88B65] group-hover:bg-[#A88B65] group-hover:text-black text-[#F5F1EA] text-[11px] uppercase tracking-widest font-mono flex items-center justify-center gap-2 transition-all duration-300"
        >
          <span>VIEW SPECIFICATIONS</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};
