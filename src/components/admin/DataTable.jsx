import React from 'react';
import { Compass } from 'lucide-react';

export const DataTable = ({
  columns = [],
  children,
  isEmpty = false,
  emptyMessage = 'No records found matching current criteria.',
  actionText = 'Create New Entry',
  onAction,
}) => {
  return (
    <div className="bg-[#151515] border border-[#2B2B2B] overflow-hidden shadow-2xl">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#1A1A1A] border-b border-[#2B2B2B] text-[#A7A29B] uppercase tracking-wider">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`p-4 font-semibold ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222]">
            {!isEmpty && children}
          </tbody>
        </table>

        {isEmpty && (
          <div className="py-16 px-6 text-center space-y-4">
            <div className="w-12 h-12 bg-[#0A0A0A] border border-[#333333] rounded-full mx-auto flex items-center justify-center text-[#A88B65]">
              <Compass size={22} strokeWidth={1.5} />
            </div>
            <p className="text-xs text-[#A7A29B] font-mono max-w-sm mx-auto leading-relaxed">
              {emptyMessage}
            </p>
            {onAction && (
              <button
                type="button"
                onClick={onAction}
                className="px-4 py-2 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                {actionText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default DataTable;
