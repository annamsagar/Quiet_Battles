import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmation = ({
  isOpen,
  title = 'Confirm Permanent Removal',
  message = 'Are you sure you want to delete this item? This action will remove it from LocalStorage and the public store.',
  itemName = '',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#151515] border border-rose-500/50 max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 text-rose-400 mb-4">
          <AlertTriangle size={24} />
          <h3 className="font-serif text-2xl text-[#F5F1EA]">
            {title}
          </h3>
        </div>

        <div className="space-y-4 text-sm text-[#A7A29B] font-light leading-relaxed mb-6">
          <p>{message}</p>
          {itemName && (
            <div className="p-3 bg-[#0A0A0A] border border-[#333333] font-mono text-xs text-[#F5F1EA] truncate">
              {itemName}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222222]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs uppercase font-mono tracking-wider text-[#A7A29B] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs uppercase font-mono tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-lg"
          >
            <Trash2 size={13} />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

