import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const DashboardCard = ({
  title,
  count,
  subtitle,
  icon: Icon,
  linkTo,
  linkText = 'Manage',
}) => {
  return (
    <div className="bg-[#151515] border border-[#2B2B2B] p-6 flex flex-col justify-between hover:border-[#A88B65]/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-mono text-[#A7A29B] block mb-2">
            {title}
          </span>
          <div className="text-3xl sm:text-4xl font-mono font-medium text-[#F5F1EA]">
            {count}
          </div>
        </div>

        {Icon && (
          <div className="p-3 bg-[#0A0A0A] border border-[#2B2B2B] text-[#A88B65] rounded">
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#222222] flex items-center justify-between">
        <span className="text-xs text-neutral-400 font-mono">
          {subtitle}
        </span>
        {linkTo && (
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono text-[#A88B65] hover:text-[#F5F1EA] transition-colors"
          >
            <span>{linkText}</span>
            <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </div>
  );
};
