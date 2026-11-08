import React from 'react';
import { motion } from 'framer-motion';
import { EditorialImage } from '../common/EditorialImage';

export const EditorialStorySection = ({ chapter }) => {
  const introHeading = chapter.introHeading || 'THE BEAUTY OF WHAT REMAINS UNSAID.';
  const introStory = chapter.introStory || chapter.mainStory || '';
  const storyHeading = chapter.storyHeading || 'STRENGTH WITHOUT SOUND.';
  const storyContent = chapter.storyContent || chapter.supportingStory || '';
  const quoteSection = chapter.quoteSection || 'YOU DO NOT HAVE TO BE LOUD TO BE STRONG.';
  const brandConnectionHeading = chapter.brandConnectionHeading || 'WEAR WHAT MADE YOU.';
  const brandConnectionText =
    chapter.brandConnectionText ||
    'Every experience becomes part of the person you are becoming. The Gentle Armor represents the strength to carry your story without losing your identity.';

  return (
    <div className="space-y-20 sm:space-y-28 my-16 sm:my-24">
      {/* SECTION 2 – INTRODUCTION */}
      <section className="max-w-3xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block">
          01 / REFLECTION
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F1EA] leading-tight">
          {introHeading}
        </h2>
        <div className="space-y-6 text-[#F5F1EA] font-light text-base sm:text-lg leading-relaxed pt-2">
          {introStory.split('\n\n').map((para, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-3.5 first-letter:text-[#A88B65] first-letter:leading-none'
                  : ''
              }
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* SECTION 3 – FULL-WIDTH ATMOSPHERIC IMAGE WITH SUBTLE SCROLL REVEAL */}
      {chapter.secondaryImage && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#151515] border border-[#2B2B2B] overflow-hidden"
        >
          <EditorialImage
            src={chapter.secondaryImage}
            alt={`${chapter.title} Atmospheric Visual Study`}
            aspectRatio="aspect-full w-full h-full"
            zoomOnHover
            overlay
          />
          <div className="absolute bottom-6 left-6 z-10 bg-[#0A0A0A]/85 backdrop-blur-md px-4 py-1.5 border border-[#333333] text-[10px] font-mono tracking-widest text-[#A88B65] uppercase">
            VISUAL ESSAY • QUIET BATTLES ATELIER
          </div>
        </motion.section>
      )}

      {/* SECTION 4 – STORY CONTENT */}
      <section className="max-w-3xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono block">
          02 / ESSENCE
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F5F1EA]">
          {storyHeading}
        </h3>
        <div className="space-y-6 text-[#A7A29B] font-light text-base sm:text-lg leading-relaxed">
          {storyContent.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* SECTION 5 – OVERSIZED QUOTE SECTION */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="py-14 sm:py-20 border-y border-[#222222] text-center max-w-4xl mx-auto px-4"
      >
        <div className="w-12 h-[1px] bg-[#A88B65] mx-auto mb-8" />
        <blockquote className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#F5F1EA] uppercase leading-[1.15]">
          "{quoteSection}"
        </blockquote>
        <div className="w-12 h-[1px] bg-[#A88B65] mx-auto mt-8" />
        <span className="text-[10px] font-mono uppercase tracking-widest-2xl text-[#A88B65] block mt-4">
          CHAPTER {chapter.number} AXIOM
        </span>
      </motion.section>

      {/* SECTION 6 – BRAND CONNECTION */}
      <section className="max-w-3xl mx-auto bg-[#151515] border border-[#2B2B2B] p-8 sm:p-12 space-y-4 shadow-xl">
        <span className="text-xs uppercase font-mono tracking-widest-2xl text-[#A88B65] block">
          03 / BRAND PHILOSOPHY
        </span>
        <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1EA]">
          {brandConnectionHeading}
        </h4>
        <p className="text-sm sm:text-base text-[#A7A29B] font-light leading-relaxed">
          {brandConnectionText}
        </p>
      </section>
    </div>
  );
};
export default EditorialStorySection;

