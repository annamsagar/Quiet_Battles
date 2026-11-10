import React from 'react';

export const LoadingState = ({ message = 'Loading story...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <div className="w-12 h-12 border border-[#333333] border-t-[#A88B65] rounded-full animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest-xl text-[#A7A29B] font-mono">
        {message}
      </span>
    </div>
  );
};

