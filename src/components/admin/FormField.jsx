import React from 'react';

export const FormField = ({
  label,
  required = false,
  error = '',
  helperText = '',
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-[11px] uppercase tracking-wider font-mono text-[#F5F1EA] flex items-center justify-between">
          <span>
            {label} {required && <span className="text-[#A88B65] font-bold">*</span>}
          </span>
          {helperText && !error && (
            <span className="text-[10px] text-neutral-500 font-mono normal-case">
              {helperText}
            </span>
          )}
        </label>
      )}

      {children}

      {error && (
        <p className="text-[11px] text-rose-400 font-mono tracking-wide mt-1 animate-fadeIn">
          * {error}
        </p>
      )}
    </div>
  );
};
export default FormField;

