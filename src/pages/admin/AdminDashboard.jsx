import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardCard } from '../../components/admin/DashboardCard';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { useContent } from '../../context/ContentContext';
import { Layers, BookOpen, Shirt, Plus, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';
import { formatCurrency } from '../../utils/formatCurrency';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminDashboard = () => {
  useDocumentTitle('CMS Dashboard');
  const { seriesList, chaptersList, productsList } = useContent();

  const totalSeries = seriesList.length;
  const totalChapters = chaptersList.length;
  const totalProducts = productsList.length;

  const publishedContent =
    seriesList.filter((s) => s.status === 'published').length +
    chaptersList.filter((c) => c.status === 'published').length +
    productsList.filter((p) => p.status === 'published').length;

  return (
    <PageTransition className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-[#151515] border border-[#2B2B2B] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65]">
            CMS OVERVIEW
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F1EA]">
            QUIET BATTLES ATELIER DASHBOARD
          </h2>
          <p className="text-xs sm:text-sm text-[#A7A29B] font-mono">
            Manage storytelling chronicles, series architectures, and handcrafted products.
          </p>
        </div>

        {/* Quick Create Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/series"
            className="px-4 py-2 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>New Series</span>
          </Link>
          <Link
            to="/admin/chapters"
            className="px-4 py-2 bg-[#222222] text-[#F5F1EA] hover:bg-[#333333] border border-[#333333] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>New Chapter</span>
          </Link>
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-[#222222] text-[#F5F1EA] hover:bg-[#333333] border border-[#333333] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>New Product</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="TOTAL SERIES"
          count={totalSeries}
          subtitle="Narrative editions"
          icon={Layers}
          linkTo="/admin/series"
          linkText="Manage Series"
        />
        <DashboardCard
          title="TOTAL CHAPTERS"
          count={totalChapters}
          subtitle="Story episodes"
          icon={BookOpen}
          linkTo="/admin/chapters"
          linkText="Manage Chapters"
        />
        <DashboardCard
          title="TOTAL PRODUCTS"
          count={totalProducts}
          subtitle="Curated garments"
          icon={Shirt}
          linkTo="/admin/products"
          linkText="Manage Shop"
        />
        <DashboardCard
          title="PUBLISHED CONTENT"
          count={publishedContent}
          subtitle="Active live entities"
          icon={CheckCircle}
          linkTo="/archive"
          linkText="Live Archive"
        />
      </div>

      {/* Recent Content Showcase Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Chapters */}
        <div className="bg-[#151515] border border-[#2B2B2B] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <h3 className="font-serif text-xl font-light text-[#F5F1EA]">
              Active Chapters (Series 01)
            </h3>
            <Link to="/admin/chapters" className="text-xs font-mono text-[#A88B65] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#222222]">
            {chaptersList.slice(0, 5).map((chap) => (
              <div key={chap.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-[#A88B65] w-6">0{chap.number}</span>
                  <div className="truncate">
                    <span className="text-sm text-[#F5F1EA] block truncate font-medium">
                      {chap.title}
                    </span>
                    <span className="text-[11px] text-[#A7A29B] font-mono truncate block">
                      {chap.theme}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={chap.status || 'published'} />
                  <Link
                    to={`/archive/${chap.seriesSlug || 'series-01'}/${chap.slug}`}
                    target="_blank"
                    className="text-neutral-500 hover:text-[#A88B65] p-1"
                    title="View live page"
                  >
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Catalog */}
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
            {productsList.map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-[#0A0A0A] border border-[#333333] flex-shrink-0 overflow-hidden">
                    <img src={prod.images?.[0]} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="truncate">
                    <span className="text-sm text-[#F5F1EA] block truncate font-medium">
                      {prod.name}
                    </span>
                    <span className="text-[11px] text-[#A7A29B] font-mono">
                      {formatCurrency(prod.price)} • Stock: {prod.stockQuantity || 48}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={prod.status || 'published'} />
                  <Link
                    to={`/products/${prod.slug}`}
                    target="_blank"
                    className="text-neutral-500 hover:text-[#A88B65] p-1"
                    title="View live product"
                  >
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default AdminDashboard;
