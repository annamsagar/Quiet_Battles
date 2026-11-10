import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { ProductGallery } from '../components/product/ProductGallery';
import { SizeSelector } from '../components/product/SizeSelector';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { AddToCartButton } from '../components/product/AddToCartButton';
import { ProductCard } from '../components/product/ProductCard';
import { useContent } from '../context/ContentContext';
import { useCart } from '../context/CartContext';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency } from '../utils/formatCurrency';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ShieldCheck, Truck, RefreshCw, Sparkles, ChevronDown, ChevronUp, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetail = () => {
  const { productSlug = 'gentle-armor' } = useParams();
  const { getProductBySlug, productsList } = useContent();
  const { addToCart } = useCart();

  const product = getProductBySlug(productSlug) || productsList[0];
  useDocumentTitle(product ? product.name : 'Garment Detail');

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Accordion state
  const [expandedSection, setExpandedSection] = useState('fabric');

  if (!product) {
    return (
      <div className="pt-40 pb-20">
        <EmptyState
          title="Product Not Found"
          description={`No product matching "${productSlug}" was found.`}
          actionText="Return to Shop"
          actionLink="/"
        />
      </div>
    );
  }

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    if (sizeError) setSizeError('');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError('Please select a size to continue.');
      return;
    }

    addToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2500);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Other products for related section
  const relatedProducts = productsList.filter((p) => p.slug !== product.slug);

  return (
    <PageTransition className="pt-24 sm:pt-28 pb-24 sm:pb-32">
      {/* Editorial Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 border-b border-[#222222] mb-10">
        <div className="flex items-center gap-3 text-xs font-mono text-[#A7A29B] uppercase tracking-wider">
          <Link to="/" className="hover:text-[#A88B65] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/archive" className="hover:text-[#A88B65] transition-colors">
            Archive
          </Link>
          <span>/</span>
          <span className="text-[#F5F1EA]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Product Interactive Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Specifications & Purchasing Panel */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-[#222222]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest-xl text-[#A88B65] font-mono">
                  {product.collection}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5">
                  ● AVAILABLE
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F1EA] tracking-wide">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-2xl sm:text-3xl font-mono text-[#F5F1EA] font-semibold">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base font-mono text-neutral-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-mono text-[#A7A29B]">
                  INCLUSIVE OF ALL TAXES
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#A7A29B] font-light leading-relaxed">
              {product.description}
            </p>

            {product.editorialNote && (
              <div className="p-4 bg-[#151515] border-l-2 border-[#A88B65] text-xs font-serif text-[#F5F1EA] italic">
                "{product.editorialNote}"
              </div>
            )}

            {/* Size Selector */}
            <SizeSelector
              sizes={product.sizes || ['S', 'M', 'L', 'XL', 'XXL']}
              selectedSize={selectedSize}
              onSelectSize={handleSelectSize}
              errorMessage={sizeError}
            />

            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              max={10}
              min={1}
            />

            {/* Add to Cart CTA */}
            <div className="space-y-3 pt-2">
              <AddToCartButton
                onAddToCart={handleAddToCart}
                isAdded={isAdded}
              />
              <p className="text-[11px] font-mono text-center text-neutral-500">
                Complimentary express carbon-neutral dispatch across India.
              </p>
            </div>

            {/* Accordions: Fabric Details, Care Instructions, Delivery */}
            <div className="border-t border-[#222222] pt-6 space-y-4">
              {/* Accordion 1: Fabric & Craft */}
              <div className="border-b border-[#222222] pb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('fabric')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest-xl font-mono text-[#F5F1EA] hover:text-[#A88B65] transition-colors py-1"
                >
                  <span className="flex items-center gap-2">
                    <Layers size={14} className="text-[#A88B65]" />
                    FABRIC DETAILS & WEIGHT
                  </span>
                  {expandedSection === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'fabric' && (
                  <ul className="mt-4 space-y-2 text-xs text-[#A7A29B] pl-6 list-disc">
                    {(product.fabricDetails || [
                      '280 GSM Heavyweight French Terry Loopback Cotton',
                      '100% Combed Compact Ring-Spun Organic Yarn',
                      'Bio-softened silicone wash for velvety matte touch',
                      'Drop-shoulder boxy silhouette with reinforced rib collar'
                    ]).map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Accordion 2: Care Instructions */}
              <div className="border-b border-[#222222] pb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('care')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest-xl font-mono text-[#F5F1EA] hover:text-[#A88B65] transition-colors py-1"
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw size={14} className="text-[#A88B65]" />
                    CARE INSTRUCTIONS
                  </span>
                  {expandedSection === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'care' && (
                  <ul className="mt-4 space-y-2 text-xs text-[#A7A29B] pl-6 list-disc">
                    {(product.careInstructions || [
                      'Machine wash cold (30°C) with similar dark tones',
                      'Turn garment inside out before washing and ironing',
                      'Do not bleach or tumble dry; dry flat in natural shade',
                      'Iron on low heat; avoid direct contact with branding prints'
                    ]).map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Accordion 3: Delivery & Guarantee */}
              <div className="border-b border-[#222222] pb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('delivery')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest-xl font-mono text-[#F5F1EA] hover:text-[#A88B65] transition-colors py-1"
                >
                  <span className="flex items-center gap-2">
                    <Truck size={14} className="text-[#A88B65]" />
                    SHIPPING & GUARANTEE
                  </span>
                  {expandedSection === 'delivery' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'delivery' && (
                  <div className="mt-4 space-y-2 text-xs text-[#A7A29B] leading-relaxed">
                    <p>Dispatched in custom archival matte black packaging with authenticated series tag.</p>
                    <p>Standard delivery: 2-4 business days.</p>
                    <p>Hassle-free 14-day exchange policy for sizing perfection.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Artifacts Collection */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-20 border-t border-[#222222]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block mb-1">
                  COLLECTION CONTINUUM
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F1EA]">
                  RELATED ARMOR PIECES
                </h3>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A88B65] hover:text-[#F5F1EA] transition-colors group"
              >
                <span>VIEW ENTIRE SHOP CATALOG</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
export default ProductDetail;
