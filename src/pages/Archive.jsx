import React from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { SeriesCard } from '../components/archive/SeriesCard';
import { useContent } from '../context/ContentContext';
import { EmptyState } from '../components/common/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Archive = () => {
  useDocumentTitle('The Archive');
  const { seriesList } = useContent();

  return (
    <PageTransition className="pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Archive Editorial Header */}
        <SectionHeading
          number="ARCHIVE / NARRATIVES"
          tag="COLLECTED WORKS"
          title="THE ARCHIVE"
          subtitle="Stories collected. Battles remembered. Identity preserved."
          className="border-b border-[#222222] pb-12"
        />

        {/* Series Showcase Grid */}
        {seriesList && seriesList.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {seriesList.map((series, index) => (
              <SeriesCard key={series.id} series={series} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Archive is quiet"
            description="No active series editions were found. Add one in the Admin CMS to begin."
          />
        )}
      </div>
    </PageTransition>
  );
};
export default Archive;
