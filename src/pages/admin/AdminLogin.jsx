import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { DEMO_ADMIN_CONFIG } from '../../utils/constants';
import { Shield, Lock, Mail, AlertCircle, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminLogin = () => {
  useDocumentTitle('CMS Security Portal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, authError, setAuthError } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleFillDemo = () => {
    setEmail(DEMO_ADMIN_CONFIG.email);
    setPassword(DEMO_ADMIN_CONFIG.password);
    setFieldErrors({});
    setAuthError(null);
  };

  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email format.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setIsSubmitting(true);
    const result = login(email, password);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 700);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-6 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,139,101,0.05)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-md w-full bg-[#151515] border border-[#2B2B2B] p-8 sm:p-10 shadow-2xl relative z-10 space-y-8">
        {/* Monogram & Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#0A0A0A] border border-[#A88B65] mx-auto rounded-full flex items-center justify-center text-[#A88B65] mb-4">
            <Lock size={20} />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest-2xl text-[#A88B65] block">
            QUIET BATTLES™
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#A7A29B] block">
            CONTENT MANAGEMENT SYSTEM
          </span>
          <h1 className="font-serif text-3xl font-light text-[#F5F1EA] pt-1">
            WELCOME BACK.
          </h1>
        </div>

        {/* Demo Quick-Fill Assistant Pill */}
        <div className="bg-[#0A0A0A] border border-[#333333] p-4 text-xs font-mono space-y-2.5">
          <div className="flex items-center justify-between text-[#A88B65]">
            <div className="flex items-center gap-1.5 font-semibold">
              <Key size={13} />
              <span>TEST CREDENTIALS</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[10px] text-white underline hover:text-[#A88B65] transition-colors"
            >
              Autofill Form
            </button>
          </div>
          <div className="text-[#A7A29B] space-y-1 text-[11px]">
            <div>User: <span className="text-[#F5F1EA] select-all">{DEMO_ADMIN_CONFIG.email}</span></div>
            <div>Pass: <span className="text-[#F5F1EA] select-all">{DEMO_ADMIN_CONFIG.password}</span></div>
          </div>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Success Feedback */}
        {isSuccess && (
          <div className="p-3.5 bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 size={15} className="flex-shrink-0" />
            <span>Authenticated successfully. Loading CMS dashboard...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-mono tracking-wider text-[#F5F1EA] block">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="admin@quietbattles.demo"
                className={`w-full bg-[#0A0A0A] border pl-10 pr-4 py-3 text-sm font-mono text-[#F5F1EA] outline-none transition-colors ${
                  fieldErrors.email ? 'border-rose-500' : 'border-[#333333] focus:border-[#A88B65]'
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-[11px] text-rose-400 font-mono mt-1">* {fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-mono tracking-wider text-[#F5F1EA] block">
              PASSWORD
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' }));
                }}
                placeholder="••••••••••••"
                className={`w-full bg-[#0A0A0A] border pl-10 pr-4 py-3 text-sm font-mono text-[#F5F1EA] outline-none transition-colors ${
                  fieldErrors.password ? 'border-rose-500' : 'border-[#333333] focus:border-[#A88B65]'
                }`}
              />
            </div>
            {fieldErrors.password && (
              <p className="text-[11px] text-rose-400 font-mono mt-1">* {fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full py-4 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest font-mono font-semibold transition-colors flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
          >
            <span>{isSubmitting ? 'AUTHENTICATING...' : 'SIGN IN.'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Security & Prototype Disclosure */}
        <div className="pt-2 border-t border-[#222222] space-y-3 text-center">
          <p className="text-[10px] text-neutral-500 font-mono leading-relaxed">
            <strong className="text-[#A88B65]">PROTOTYPE DISCLOSURE:</strong> This is a frontend-only demonstration authentication session. Session state is managed locally in your browser without contacting an external database.
          </p>
          <div>
            <Link
              to="/"
              className="text-xs font-mono text-[#A7A29B] hover:text-[#A88B65] transition-colors"
            >
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default AdminLogin;
