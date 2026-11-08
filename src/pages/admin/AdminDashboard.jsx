import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardCard } from '../../components/admin/DashboardCard';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { useContent } from '../../context/ContentContext';
import {
  Layers,
  BookOpen,
  Shirt,
  Plus,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';
import { formatCurrency } from '../../utils/formatCurrency';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminDashboard = () => {
  useDocumentTitle('CMS Dashboard Overview');
  const { seriesList, chaptersList, productsList } = useContent();

  const totalSeries = seriesList.length;
  const totalChapters = chaptersList.length;
  const totalProducts = productsList.length;

  const publishedSeries = seriesList.filter((s) => s.status === 'published' || s.published).length;
  const publishedChapters = chaptersList.filter((c) => c.status === 'published' || c.published).length;
  const publishedProducts = productsList.filter((p) => p.status === 'published').length;

  const publishedContent = publishedSeries + publishedChapters + publishedProducts;
  const totalContent = totalSeries + totalChapters + totalProducts;
  const publishedPercentage = totalContent > 0 ? Math.round((publishedContent / totalContent) * 100) : 100;

  return (
    <PageTransition className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-[#151515] border border-[#2B2B2B] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest-2xl text-[#A88B65]">
            QUIET BATTLES ATELIER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F1EA]">
            DASHBOARD OVERVIEW.
          </h2>
          <p className="text-xs sm:text-sm text-[#A7A29B] font-mono">
            Manage seasonal collections, storytelling chapters, and curated garment specifications.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/series"
            className="px-4 py-2.5 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow"
          >
            <Plus size={13} />
            <span>ADD SERIES</span>
          </Link>
          <Link
            to="/admin/chapters"
            className="px-4 py-2.5 bg-[#222222] text-[#F5F1EA] hover:bg-[#333333] border border-[#333333] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus size={13} />
            <span>ADD CHAPTER</span>
          </Link>
          <Link
            to="/admin/products"
            className="px-4 py-2.5 bg-[#222222] text-[#F5F1EA] hover:bg-[#333333] border border-[#333333] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus size={13} />
            <span>ADD PRODUCT</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="TOTAL SERIES"
          count={totalSeries}
          subtitle={`${publishedSeries} active edition${publishedSeries === 1 ? '' : 's'}`}
          icon={Layers}
          linkTo="/admin/series"
          linkText="Manage"
        />
        <DashboardCard
          title="TOTAL CHAPTERS"
          count={totalChapters}
          subtitle={`${publishedChapters} published story chapter${publishedChapters === 1 ? '' : 's'}`}
          icon={BookOpen}
          linkTo="/admin/chapters"
          linkText="Manage"
        />
        <DashboardCard
          title="TOTAL PRODUCTS"
          count={totalProducts}
          subtitle={`${publishedProducts} published garment${publishedProducts === 1 ? '' : 's'}`}
          icon={Shirt}
          linkTo="/admin/products"
          linkText="Manage"
        />
        <DashboardCard
          title="PUBLISHED CONTENT"
          count={publishedContent}
          subtitle={`${publishedPercentage}% publication rate`}
          icon={CheckCircle}
          linkTo="/archive"
          linkText="Live Site"
        />
      </div>

      {/* Content Distribution Progress Overview */}
      <div className="bg-[#151515] border border-[#2B2B2B] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5F1EA] uppercase">
            <BarChart3 size={15} className="text-[#A88B65]" />
            <span>CONTENT DISTRIBUTION RATIO</span>
          </div>
          <span className="text-[11px] font-mono text-[#A88B65]">
            {publishedContent} PUBLISHED / {totalContent - publishedContent} DRAFT
          </span>
        </div>

        {/* Minimalist Multi-segment Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-[#0A0A0A] rounded-full overflow-hidden flex border border-[#333333]">
            <div
              style={{ width: `${(publishedSeries / (totalContent || 1)) * 100}%` }}
              className="bg-[#A88B65] h-full"
              title={`Series: ${publishedSeries}`}
            />
            <div
              style={{ width: `${(publishedChapters / (totalContent || 1)) * 100}%` }}
              className="bg-amber-600/70 h-full"
              title={`Chapters: ${publishedChapters}`}
            />
            <div
              style={{ width: `${(publishedProducts / (totalContent || 1)) * 100}%` }}
              className="bg-emerald-600/70 h-full"
              title={`Products: ${publishedProducts}`}
            />
            <div
              style={{ width: `${((totalContent - publishedContent) / (totalContent || 1)) * 100}%` }}
              className="bg-neutral-800 h-full"
              title={`Drafts: ${totalContent - publishedContent}`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A88B65]" />
              <span>Series ({publishedSeries})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600/70" />
              <span>Chapters ({publishedChapters})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600/70" />
              <span>Products ({publishedProducts})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              <span>Drafts ({totalContent - publishedContent})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Series, Chapters, Products Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Series */}
        <div className="bg-[#151515] border border-[#2B2B2B] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <h3 className="font-serif text-xl font-light text-[#F5F1EA]">
              Recent Series
            </h3>
            <Link to="/admin/series" className="text-xs font-mono text-[#A88B65] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#222222]">
            {seriesList.slice(0, 4).map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-sm font-serif text-[#F5F1EA] block truncate font-medium">
                    {s.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    Series {s.number} • {s.chapterCount || 5} Ch.
                  </span>
                </div>
                <StatusBadge status={s.status || 'published'} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Chapters */}
        <div className="bg-[#151515] border border-[#2B2B2B] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <h3 className="font-serif text-xl font-light text-[#F5F1EA]">
              Recent Chapters
            </h3>
            <Link to="/admin/chapters" className="text-xs font-mono text-[#A88B65] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#222222]">
            {chaptersList.slice(0, 4).map((chap) => (
              <div key={chap.id} className="py-3 flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-sm font-serif text-[#F5F1EA] block truncate font-medium">
                    {chap.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    CH. {chap.number} • {chap.theme}
                  </span>
                </div>
                <StatusBadge status={chap.status || 'published'} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-[#151515] border border-[#2B2B2B] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <h3 className="font-serif text-xl font-light text-[#F5F1EA]">
              Product Inventory
            </h3>
            <Link to="/admin/products" className="text-xs font-mono text-[#A88B65] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#222222]">
            {productsList.slice(0, 4).map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-sm font-serif text-[#F5F1EA] block truncate font-medium">
                    {prod.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {formatCurrency(prod.price)} • Stock: {prod.stockQuantity || 0}
                  </span>
                </div>
                <StatusBadge status={prod.status || 'published'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default AdminDashboard;
