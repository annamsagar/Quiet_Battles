import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndHome = () => {
    try {
      localStorage.removeItem('quiet_battles_series');
      localStorage.removeItem('quiet_battles_chapters');
      localStorage.removeItem('quiet_battles_products');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#F5F1EA] flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-[#A88B65] selection:text-black">
          <div className="max-w-xl w-full bg-[#151515] border border-[#2B2B2B] p-8 sm:p-12 text-center shadow-2xl relative">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65] block mb-3">
              SYSTEM RESILIENCE • ERROR RECOVERY
            </span>

            <div className="w-14 h-14 bg-[#0A0A0A] border border-[#333333] rounded-full mx-auto mb-6 flex items-center justify-center text-[#A88B65]">
              <AlertTriangle size={24} strokeWidth={1.5} />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F1EA] mb-3">
              SOMETHING WENT UNNOTICED.
            </h1>

            <p className="text-xs sm:text-sm text-[#A7A29B] font-mono leading-relaxed max-w-md mx-auto mb-8">
              A temporary pause in the sequence. The interface encountered an unhandled exception, but your state can be safely restored.
            </p>

            {this.state.error && (
              <div className="bg-[#0A0A0A] border border-[#2B2B2B] p-3 rounded mb-8 text-left overflow-x-auto max-h-32 text-[11px] font-mono text-rose-300">
                <span className="text-neutral-500 block mb-1">Details:</span>
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-3 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetAndHome}
                className="w-full sm:w-auto px-6 py-3 bg-[#222222] text-[#F5F1EA] hover:bg-[#333333] border border-[#333333] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset to Default</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

