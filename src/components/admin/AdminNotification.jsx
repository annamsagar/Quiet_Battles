import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminNotification = ({
  notification,
  onDismiss,
  duration = 4000,
}) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [notification, duration, onDismiss]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-6 right-6 z-50 max-w-md w-full shadow-2xl"
      >
        <div
          className={`p-4 rounded border backdrop-blur-md flex items-start gap-3 ${
            isSuccess
              ? 'bg-[#151515]/95 border-emerald-500/60 text-[#F5F1EA]'
              : isError
              ? 'bg-[#151515]/95 border-rose-500/60 text-[#F5F1EA]'
              : 'bg-[#151515]/95 border-[#A88B65]/60 text-[#F5F1EA]'
          }`}
        >
          {isSuccess && <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />}
          {isError && <AlertTriangle size={18} className="text-rose-400 mt-0.5 flex-shrink-0" />}
          {!isSuccess && !isError && <Info size={18} className="text-[#A88B65] mt-0.5 flex-shrink-0" />}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold">
              {notification.title || (isSuccess ? 'Action Succeeded' : isError ? 'Error Encountered' : 'CMS Notification')}
            </h4>
            <p className="text-xs text-[#A7A29B] font-mono mt-1 leading-relaxed">
              {notification.message}
            </p>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="text-neutral-400 hover:text-white p-1"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default AdminNotification;

