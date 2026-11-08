import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductGallery = ({ images = [], productName = 'Product' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const imageList = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 sm:gap-6">
      {/* Thumbnails Row / Column */}
      {imageList.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[3/4] overflow-hidden border transition-all duration-300 focus:outline-none ${
                selectedIndex === idx
                  ? 'border-[#A88B65] ring-1 ring-[#A88B65]'
                  : 'border-[#333333] opacity-60 hover:opacity-100'
              }`}
              aria-label={`Select product image view ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Large Visual Stage */}
      <div className="relative flex-1 aspect-[4/5] bg-[#151515] border border-[#2B2B2B] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={imageList[selectedIndex]}
            alt={`${productName} view ${selectedIndex + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AnimatePresence>

        {/* Subtle Luxury Watermark / Index */}
        <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-[#A88B65] border border-[#333333]">
          0{selectedIndex + 1} / 0{imageList.length}
        </div>
      </div>
    </div>
  );
};

