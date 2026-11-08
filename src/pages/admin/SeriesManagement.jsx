import React, { useState, useMemo } from 'react';
import { useContent } from '../../context/ContentContext';
import { PageTransition } from '../../components/common/PageTransition';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ImagePreview } from '../../components/admin/ImagePreview';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { DataTable } from '../../components/admin/DataTable';
import { SearchBar } from '../../components/admin/SearchBar';
import { FormField } from '../../components/admin/FormField';
import { AdminNotification } from '../../components/admin/AdminNotification';
import { slugify } from '../../utils/slugify';
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Save,
  Layers,
  Eye,
  EyeOff,
  BookOpen,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const SeriesManagement = () => {
  useDocumentTitle('Series Management');
  const { seriesList, chaptersList, addSeries, updateSeries, deleteSeries } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    number: '01',
    description: '',
    extendedDescription: '',
    coverImage: '',
    status: 'published',
  });

  // Calculate dynamic chapter counts
  const chapterCounts = useMemo(() => {
    const map = {};
    chaptersList.forEach((c) => {
      const slug = c.seriesSlug || 'series-01';
      map[slug] = (map[slug] || 0) + 1;
    });
    return map;
  }, [chaptersList]);

  // Filtered series
  const filteredSeries = useMemo(() => {
    return seriesList.filter((series) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        series.title?.toLowerCase().includes(query) ||
        series.slug?.toLowerCase().includes(query) ||
        series.description?.toLowerCase().includes(query) ||
        series.number?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && (series.status === 'published' || !series.status)) ||
        (statusFilter === 'draft' && series.status === 'draft');

      return matchesSearch && matchesStatus;
    });
  }, [seriesList, searchQuery, statusFilter]);

  const handleOpenAdd = () => {
    setEditingSeries(null);
    setFormErrors({});
    const nextNum = String(seriesList.length + 1).padStart(2, '0');
    setFormData({
      title: '',
      slug: `series-${nextNum}`,
      number: nextNum,
      description: '',
      extendedDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (series) => {
    setEditingSeries(series);
    setFormErrors({});
    setFormData({
      title: series.title || '',
      slug: series.slug || '',
      number: series.number || '01',
      description: series.description || '',
      extendedDescription: series.extendedDescription || '',
      coverImage: series.coverImage || '',
      status: series.status || 'published',
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingSeries ? prev.slug : slugify(val),
    }));
    if (formErrors.title) {
      setFormErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Series title is required';
    if (!formData.slug.trim()) errors.slug = 'Slug is required';
    if (!formData.number.trim()) errors.number = 'Edition number is required';
    if (!formData.coverImage.trim()) errors.coverImage = 'Cover image URL is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingSeries) {
      updateSeries(editingSeries.id, {
        ...formData,
        fullTitle: `SERIES ${formData.number} – ${formData.title}™`,
      });
      setNotification({
        type: 'success',
        title: 'Series Updated',
        message: `Successfully saved changes for "${formData.title}".`,
      });
    } else {
      addSeries({
        ...formData,
        fullTitle: `SERIES ${formData.number} – ${formData.title}™`,
        chapterCount: 0,
      });
      setNotification({
        type: 'success',
        title: 'Series Created',
        message: `New series "${formData.title}" added to the Archive.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (series) => {
    const newStatus = series.status === 'draft' ? 'published' : 'draft';
    updateSeries(series.id, { status: newStatus });
    setNotification({
      type: 'info',
      title: 'Status Updated',
      message: `"${series.title}" is now marked as ${newStatus.toUpperCase()}.`,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const title = deleteTarget.title;
      deleteSeries(deleteTarget.id);
      setDeleteTarget(null);
      setNotification({
        type: 'error',
        title: 'Series Deleted',
        message: `"${title}" has been permanently removed from the CMS.`,
      });
    }
  };

  const columns = [
    { title: 'Cover', className: 'w-20' },
    { title: 'Edition / Title' },
    { title: 'Slug / URL' },
    { title: 'Chapters', align: 'center' },
    { title: 'Status' },
    { title: 'Actions', align: 'right' },
  ];

  const linkedChaptersCount = deleteTarget
    ? chapterCounts[deleteTarget.slug] || 0
    : 0;

  return (
    <PageTransition className="space-y-8">
      {/* Toast Notification */}
      <AdminNotification
        notification={notification}
        onDismiss={() => setNotification(null)}
      />

      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65]">
            CMS / COLLECTIONS
          </span>
          <h2 className="font-serif text-3xl font-light text-[#F5F1EA]">
            Series Management
          </h2>
          <p className="text-xs font-mono text-[#A7A29B] mt-1">
            Create, edit, and organize seasonal collections. Changes immediately propagate to the public Archive.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus size={14} />
          <span>Add New Series</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, number, slug..."
          className="w-full sm:max-w-xs"
        />

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#A7A29B] uppercase text-[10px] tracking-wider">Status:</span>
          {['all', 'published', 'draft'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 uppercase text-[10px] tracking-wider font-medium border transition-colors ${
                statusFilter === s
                  ? 'bg-[#A88B65] text-white border-[#A88B65]'
                  : 'bg-[#151515] text-[#A7A29B] border-[#2B2B2B] hover:text-[#F5F1EA] hover:border-[#444]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Series Data Table */}
      <DataTable
        columns={columns}
        isEmpty={filteredSeries.length === 0}
        emptyMessage={
          searchQuery || statusFilter !== 'all'
            ? 'No series found matching current search or status filter.'
            : 'No series editions registered in the system.'
        }
        actionText="Create First Series"
        onAction={handleOpenAdd}
      >
        {filteredSeries.map((series) => {
          const totalChapters = chapterCounts[series.slug] || 0;
          const isPublished = series.status === 'published' || !series.status;

          return (
            <tr key={series.id} className="hover:bg-[#1C1C1C] transition-colors group">
              {/* Cover Thumbnail */}
              <td className="p-4">
                <div className="w-16 h-12 bg-[#0A0A0A] border border-[#333333] overflow-hidden group-hover:border-[#A88B65] transition-colors">
                  <img
                    src={series.coverImage}
                    alt={series.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop';
                    }}
                  />
                </div>
              </td>

              {/* Edition & Title */}
              <td className="p-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65] block font-semibold">
                  SERIES {series.number}
                </span>
                <span className="text-sm font-serif text-[#F5F1EA] block">
                  {series.title}
                </span>
                <p className="text-[11px] text-[#A7A29B] font-mono line-clamp-1 max-w-sm mt-0.5">
                  {series.description}
                </p>
              </td>

              {/* Slug */}
              <td className="p-4">
                <span className="text-[11px] text-neutral-400 font-mono bg-[#0F0F0F] px-2 py-1 border border-[#2B2B2B]">
                  /{series.slug}
                </span>
              </td>

              {/* Linked Chapters */}
              <td className="p-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#2B2B2B] text-xs font-mono text-[#F5F1EA]">
                  <BookOpen size={12} className="text-[#A88B65]" />
                  <span>{totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}</span>
                </div>
              </td>

              {/* Status */}
              <td className="p-4">
                <StatusBadge status={series.status || 'published'} />
              </td>

              {/* Actions */}
              <td className="p-4 text-right space-x-1 whitespace-nowrap">
                {/* Toggle Quick Status */}
                <button
                  type="button"
                  onClick={() => handleToggleStatus(series)}
                  className={`p-2 transition-colors ${
                    isPublished
                      ? 'text-neutral-400 hover:text-amber-400'
                      : 'text-neutral-400 hover:text-emerald-400'
                  }`}
                  title={isPublished ? 'Unpublish (set to Draft)' : 'Publish live'}
                  aria-label="Toggle publication"
                >
                  {isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>

                {/* View Live */}
                <Link
                  to={`/archive/${series.slug}`}
                  target="_blank"
                  className="inline-block p-2 text-neutral-400 hover:text-[#A88B65] transition-colors"
                  title="View live series on storefront"
                  aria-label="View live series"
                >
                  <ExternalLink size={14} />
                </Link>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(series)}
                  className="p-2 text-neutral-400 hover:text-[#F5F1EA] transition-colors"
                  title="Edit series"
                  aria-label="Edit series"
                >
                  <Edit3 size={14} />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(series)}
                  className="p-2 text-neutral-400 hover:text-rose-400 transition-colors"
                  title="Delete series"
                  aria-label="Delete series"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          );
        })}
      </DataTable>

      {/* Series Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#151515] border border-[#333333] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Layers size={20} className="text-[#A88B65]" />
              <h3 className="font-serif text-2xl text-[#F5F1EA]">
                {editingSeries ? 'Edit Series Edition' : 'Create New Series Edition'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  label="Series Title"
                  required
                  error={formErrors.title}
                  className="sm:col-span-2"
                >
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. THE GENTLE ARMOR"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField
                  label="Edition No."
                  required
                  error={formErrors.number}
                  helperText="Two-digit code"
                >
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="01"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="URL Slug"
                  required
                  error={formErrors.slug}
                  helperText="Unique path identifier"
                >
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="series-01"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField label="Publication Status">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  >
                    <option value="published">Published (Visible Publicly)</option>
                    <option value="draft">Draft (Admin Only)</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Short Description (Lookbook Summary)">
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A concise summary of the collection's artistic direction..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors resize-none"
                />
              </FormField>

              <FormField label="Extended Narrative / Editorial Statement">
                <textarea
                  rows={3}
                  value={formData.extendedDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, extendedDescription: e.target.value })
                  }
                  placeholder="Deep-dive philosophy statement displayed on the series landing page..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors resize-none"
                />
              </FormField>

              <div className="space-y-3">
                <FormField
                  label="Cover Photography URL"
                  required
                  error={formErrors.coverImage}
                  helperText="High-resolution editorial image"
                >
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <ImagePreview
                  url={formData.coverImage}
                  alt="Series cover preview"
                  aspect="landscape"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222222]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent border border-[#333333] hover:border-neutral-500 text-[#A7A29B] hover:text-[#F5F1EA] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save size={14} />
                  <span>{editingSeries ? 'Save Series' : 'Publish Series'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={!!deleteTarget}
        title="Delete Series Edition"
        itemDescription={`"${deleteTarget?.title}" (Series ${deleteTarget?.number})`}
        warningMessage={
          linkedChaptersCount > 0
            ? `Safety Notice: This series currently contains ${linkedChaptersCount} chapter(s). Deleting this series will orphan these chapters in the public archive navigation.`
            : null
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageTransition>
  );
};

export default SeriesManagement;
