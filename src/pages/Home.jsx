import React from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { HeroSection } from '../components/home/HeroSection';
import { BrandIntroduction } from '../components/home/BrandIntroduction';
import { EditorialSection } from '../components/home/EditorialSection';
import { FeaturedSeries } from '../components/home/FeaturedSeries';
import { BrandPhilosophy } from '../components/home/BrandPhilosophy';
import { FeaturedProduct } from '../components/home/FeaturedProduct';
import { BrandStatement } from '../components/home/BrandStatement';
import { FinalCTA } from '../components/home/FinalCTA';
import { useContent } from '../context/ContentContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Home = () => {
  useDocumentTitle('WEAR YOUR BATTLES');
  const { seriesList, productsList } = useContent();

  const featuredSeries = seriesList.find((s) => s.featured) || seriesList[0];
  const featuredProduct = productsList.find((p) => p.featured) || productsList[0];

  return (
    <PageTransition>
      {/* SECTION 2: HERO */}
      <HeroSection />

      {/* SECTION 3: BRAND INTRODUCTION */}
      <BrandIntroduction />

      {/* SECTION 4: EDITORIAL IMAGE SECTION */}
      <EditorialSection />

      {/* SECTION 5: FEATURED SERIES */}
      <FeaturedSeries series={featuredSeries} />

      {/* SECTION 6: BRAND PHILOSOPHY */}
      <BrandPhilosophy />

      {/* SECTION 7: FEATURED PRODUCT */}
      <FeaturedProduct product={featuredProduct} />

      {/* SECTION 8: BRAND STATEMENT */}
      <BrandStatement />

      {/* SECTION 9: FINAL CTA */}
      <FinalCTA />
    </PageTransition>
  );
};
export default Home;
