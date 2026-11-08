import React from 'react';
import { Compass, Plus } from 'lucide-react';

export const EmptyState = ({
  title = 'No records found',
  description = 'There are no active records in this section yet.',
  actionText = 'Create New Record',
  onAction,
}) => {
  return (
    <div className="bg-[#151515] border border-[#2B2B2B] p-12 text-center space-y-4 my-6">
      <div className="w-12 h-12 bg-[#0A0A0A] border border-[#333333] rounded-full mx-auto flex items-center justify-center text-[#A88B65]">
        <Compass size={22} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-2xl font-light text-[#F5F1EA]">
        {title}
      </h3>
      <p className="text-xs text-[#A7A29B] font-mono max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
        >
          <Plus size={14} />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
export default EmptyState;

