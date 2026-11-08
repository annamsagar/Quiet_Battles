import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const EmptyState = ({
  title = 'No items found',
  description = 'The requested content is currently unavailable or has been archived.',
  actionText = 'Return to Archive',
  actionLink = '/archive',
  icon: Icon = Compass,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 text-center bg-[#151515] border border-[#333333] my-8 max-w-xl mx-auto">
      <div className="p-4 bg-[#1B1B1B] rounded-full border border-[#333333] mb-4 text-[#A88B65]">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-2xl text-[#F5F1EA] mb-2">{title}</h3>
      <p className="text-sm text-[#A7A29B] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest bg-[#F5F1EA] text-[#0A0A0A] font-medium hover:bg-[#A88B65] hover:text-white transition-all duration-300"
        >
          <ArrowLeft size={14} />
          {actionText}
        </Link>
      )}
    </div>
  );
};

