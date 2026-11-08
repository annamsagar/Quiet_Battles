import React from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { Hero } from '../components/home/Hero';
import { BrandIntro } from '../components/home/BrandIntro';
import { FeaturedSeries } from '../components/home/FeaturedSeries';
import { BrandPhilosophy } from '../components/home/BrandPhilosophy';
import { FeaturedProduct } from '../components/home/FeaturedProduct';
import { BrandStatement } from '../components/home/BrandStatement';
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
      <Hero />

      {/* SECTION 3: BRAND INTRODUCTION */}
      <BrandIntro />

      {/* SECTION 4: FEATURED SERIES */}
      <FeaturedSeries series={featuredSeries} />

      {/* SECTION 5: BRAND PHILOSOPHY */}
      <BrandPhilosophy />

      {/* SECTION 6: FEATURED PRODUCT */}
      <FeaturedProduct product={featuredProduct} />

      {/* SECTION 7: BRAND STATEMENT */}
      <BrandStatement />
    </PageTransition>
  );
};
export default Home;
