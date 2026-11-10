import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { ArrowLeft, Compass } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const NotFound = () => {
  useDocumentTitle('Path Not Found (404)');
  return (
    <PageTransition className="min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
      <div className="max-w-xl text-center space-y-8 bg-[#151515] border border-[#2B2B2B] p-10 sm:p-14 shadow-2xl">
        <div className="w-16 h-16 mx-auto bg-[#0A0A0A] border border-[#333333] rounded-full flex items-center justify-center text-[#A88B65]">
          <Compass size={32} strokeWidth={1.5} />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest-2xl text-[#A88B65]">
            404 / UNKNOWN CORRIDOR
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F1EA]">
            THE PATH IS SILENT
          </h1>
          <p className="text-sm sm:text-base text-[#A7A29B] font-light leading-relaxed">
            The narrative or garment you are looking for has either moved to the deep archive or does not exist in this edition.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest-xl font-semibold hover:bg-[#A88B65] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>RETURN HOME</span>
          </Link>
          <Link
            to="/archive"
            className="w-full sm:w-auto px-6 py-3 border border-[#333333] text-[#F5F1EA] text-xs uppercase tracking-widest-xl hover:border-[#A88B65] hover:text-[#A88B65] transition-all text-center"
          >
            VIEW ARCHIVE
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
export default NotFound;
