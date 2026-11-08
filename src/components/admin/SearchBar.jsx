import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search records...',
  className = '',
}) => {
  return (
    <div className={`relative min-w-[240px] ${className}`}>
      <Search
        size={14}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] pl-10 pr-9 py-2 text-xs font-mono text-[#F5F1EA] placeholder:text-neutral-600 outline-none transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={onClear || (() => onChange(''))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
          title="Clear search"
          aria-label="Clear search"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
