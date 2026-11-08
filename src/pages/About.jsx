import React from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { EditorialImage } from '../components/common/EditorialImage';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const About = () => {
  useDocumentTitle('The Story Behind the Silence');
  return (
    <PageTransition className="pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Page Header */}
        <SectionHeading
          number="ORIGINS / MANIFESTO"
          tag="THE BRAND STORY"
          title="THE STORY BEHIND THE SILENCE."
          subtitle="Quiet Battles was established as a counter-movement to performative loudness. A tribute to the silent wars fought behind calm eyes."
          className="border-b border-[#222222] pb-12 mb-16"
        />

        {/* Narrative Section 1: What Quiet Battles Represents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#A7A29B] font-light leading-relaxed">
            <span className="text-xs uppercase tracking-widest-xl text-[#A88B65] font-mono block">
              01 / CONCEPTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F1EA] leading-tight">
              INNER STRENGTH DOES NOT NEED TO SHOUT.
            </h2>
            <p>
              In contemporary culture, existence has become synonymous with broadcast. We are constantly nudged to narrate our triumphs, expose our wounds, and seek external consensus for our self-worth.
            </p>
            <p>
              QUIET BATTLES was conceived in direct opposition to this noise. We believe that some of the greatest human achievements happen in solitary rooms, during sleepless hours, and across quiet mornings when you simply chose to get up and persevere.
            </p>
            <p className="border-l-2 border-[#A88B65] pl-6 text-[#F5F1EA] font-serif text-xl italic">
              "We design garments that act as tactile anchors—shielding the wearer's softness while embodying indestructible composure."
            </p>
          </div>

          <div className="lg:col-span-6">
            <EditorialImage
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop"
              alt="Editorial portrait representing Quiet Battles"
              aspectRatio="aspect-[4/5]"
              zoomOnHover
              overlay
            />
          </div>
        </div>

        {/* Narrative Section 2: The Meaning of WEAR YOUR BATTLES */}
        <div className="bg-[#151515] border border-[#2B2B2B] p-8 sm:p-14 lg:p-20 mb-24 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-widest-2xl text-[#A88B65] font-mono">
              THE MOTTO DECODED
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F5F1EA] tracking-wide leading-tight">
              WEAR YOUR BATTLES.
            </h2>

            <p className="text-base sm:text-lg text-[#A7A29B] font-light leading-relaxed">
              To "Wear Your Battles" does not mean glorifying suffering or displaying wounds as badges of pity. It means recognizing that every crucible you survived has become woven into the structural fabric of your character.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left border-t border-[#2B2B2B]">
              <div className="p-4 bg-[#0A0A0A] border border-[#333333] space-y-2">
                <span className="font-mono text-xs text-[#A88B65]">01 / DIGNITY</span>
                <p className="text-xs text-[#A7A29B]">Carrying pain with grace, refusing to weaponize personal hardship against others.</p>
              </div>
              <div className="p-4 bg-[#0A0A0A] border border-[#333333] space-y-2">
                <span className="font-mono text-xs text-[#A88B65]">02 / COMPOSURE</span>
                <p className="text-xs text-[#A7A29B]">Maintaining poise in environments crafted to evoke emotional chaos.</p>
              </div>
              <div className="p-4 bg-[#0A0A0A] border border-[#333333] space-y-2">
                <span className="font-mono text-xs text-[#A88B65]">03 / SOVEREIGNTY</span>
                <p className="text-xs text-[#A7A29B]">Owning your narrative without requiring approval from the spectator class.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Section 3: Materiality & Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <EditorialImage
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1400&auto=format&fit=crop"
              alt="Fabric texture and luxury craftsmanship"
              aspectRatio="aspect-[4/5]"
              zoomOnHover
            />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-base sm:text-lg text-[#A7A29B] font-light leading-relaxed">
            <span className="text-xs uppercase tracking-widest-xl text-[#A88B65] font-mono block">
              02 / MATERIAL PURSUIT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F1EA] leading-tight">
              LUXURY AS A PHYSICAL SENSATION.
            </h2>
            <p>
              We reject transient micro-trends. Every garment is constructed from dense, high-thread-count textiles—heavyweight 280 GSM combed cottons and 450 GSM loopback fleece engineered to drape with architectural gravity.
            </p>
            <p>
              The feeling of putting on a Quiet Battles silhouette is deliberate: it provides the comforting, grounded embrace of armor while remaining plush and welcoming against the skin.
            </p>
            <div className="pt-4">
              <Link
                to="/products/gentle-armor"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest-xl text-[#F5F1EA] hover:text-[#A88B65] font-medium transition-colors"
              >
                <span>EXPLORE THE GENTLE ARMOR PIECE</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default About;
