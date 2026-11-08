import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { DEMO_ADMIN_CONFIG } from '../../utils/constants';
import { Shield, Lock, Mail, AlertCircle, Key, ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminLogin = () => {
  useDocumentTitle('CMS Security Portal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authError, setAuthError } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleFillDemo = () => {
    setEmail(DEMO_ADMIN_CONFIG.email);
    setPassword(DEMO_ADMIN_CONFIG.password);
    setAuthError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-6 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,139,101,0.05)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-md w-full bg-[#151515] border border-[#2B2B2B] p-8 sm:p-10 shadow-2xl relative z-10 space-y-8">
        {/* Monogram / Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#0A0A0A] border border-[#A88B65] mx-auto rounded-full flex items-center justify-center text-[#A88B65] mb-4">
            <Lock size={20} />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest-2xl text-[#A88B65] block">
            QUIET BATTLES ATELIER
          </span>
          <h1 className="font-serif text-3xl font-light text-[#F5F1EA]">
            EDITORIAL CMS LOGIN
          </h1>
          <p className="text-xs text-[#A7A29B] font-mono">
            {DEMO_ADMIN_CONFIG.disclaimer}
          </p>
        </div>

        {/* Demo Quick-Fill Assistant Pill */}
        <div className="bg-[#0A0A0A] border border-[#333333] p-4 text-xs font-mono space-y-3">
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
            <div>User: <span className="text-[#F5F1EA]">{DEMO_ADMIN_CONFIG.email}</span></div>
            <div>Pass: <span className="text-[#F5F1EA]">{DEMO_ADMIN_CONFIG.password}</span></div>
          </div>
        </div>

        {/* Error message */}
        {authError && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-wider text-[#F5F1EA] block">
              ATELIER EMAIL
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@quietbattles.demo"
                className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] pl-10 pr-4 py-3 text-sm font-mono text-[#F5F1EA] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-wider text-[#F5F1EA] block">
              SECURITY KEY
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] pl-10 pr-4 py-3 text-sm font-mono text-[#F5F1EA] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest font-mono font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span>ENTER CMS DASHBOARD</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#222222]">
          <Link
            to="/"
            className="text-xs font-mono text-neutral-500 hover:text-[#A88B65] transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
export default AdminLogin;
