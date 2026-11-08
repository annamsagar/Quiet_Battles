import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { PageTransition } from '../../components/common/PageTransition';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ImagePreview } from '../../components/admin/ImagePreview';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { slugify } from '../../utils/slugify';
import { Plus, Edit3, Trash2, ExternalLink, X, Save, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const SeriesManagement = () => {
  useDocumentTitle('Series Management');
  const { seriesList, addSeries, updateSeries, deleteSeries } = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  const handleOpenAdd = () => {
    setEditingSeries(null);
    setFormData({
      title: '',
      slug: '',
      number: `0${seriesList.length + 1}`,
      description: '',
      extendedDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (series) => {
    setEditingSeries(series);
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
      // Auto-generate slug if new or matching
      slug: editingSeries ? prev.slug : slugify(val),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingSeries) {
      updateSeries(editingSeries.id, {
        ...formData,
        fullTitle: `SERIES ${formData.number} – ${formData.title}™`,
      });
    } else {
      addSeries({
        ...formData,
        fullTitle: `SERIES ${formData.number} – ${formData.title}™`,
        chapterCount: 0,
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteSeries(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <PageTransition className="space-y-8">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65]">
            CMS / EDITIONS
          </span>
          <h2 className="font-serif text-3xl font-light text-[#F5F1EA]">
            Series Management
          </h2>
          <p className="text-xs font-mono text-[#A7A29B] mt-1">
            Create, edit, and organize seasonal collections. Changes instantly reflect on the public Archive.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Add New Series</span>
        </button>
      </div>

      {/* Series Table / Cards */}
      <div className="bg-[#151515] border border-[#2B2B2B] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#1A1A1A] border-b border-[#2B2B2B] text-[#A7A29B] uppercase tracking-wider">
            <tr>
              <th className="p-4">Cover</th>
              <th className="p-4">Edition</th>
              <th className="p-4">Title & Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222]">
            {seriesList.map((series) => (
              <tr key={series.id} className="hover:bg-[#1C1C1C] transition-colors">
                <td className="p-4">
                  <div className="w-16 h-12 bg-[#0A0A0A] border border-[#333333] overflow-hidden">
                    <img
                      src={series.coverImage}
                      alt={series.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4 text-[#A88B65] font-semibold">
                  SERIES {series.number}
                </td>
                <td className="p-4">
                  <span className="text-sm font-serif text-[#F5F1EA] block">
                    {series.title}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    /{series.slug}
                  </span>
                </td>
                <td className="p-4 text-[#A7A29B] max-w-xs truncate">
                  {series.description}
                </td>
                <td className="p-4">
                  <StatusBadge status={series.status || 'published'} />
                </td>
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  <Link
                    to={`/archive/${series.slug}`}
                    target="_blank"
                    className="inline-block p-1.5 text-neutral-400 hover:text-[#A88B65]"
                    title="View live series"
                  >
                    <ExternalLink size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(series)}
                    className="p-1.5 text-neutral-400 hover:text-[#F5F1EA]"
                    title="Edit series"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(series)}
                    className="p-1.5 text-neutral-400 hover:text-rose-400"
                    title="Delete series"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Series Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#151515] border border-[#333333] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
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
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#F5F1EA] uppercase">Series Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. THE GENTLE ARMOR"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#F5F1EA] uppercase">Number</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="01"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#F5F1EA] uppercase">Slug (URL Path)</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="series-01"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#F5F1EA] uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft / Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F5F1EA] uppercase">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Concise curatorial statement..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F5F1EA] uppercase">Extended Description (Detail Page)</label>
                <textarea
                  rows={3}
                  value={formData.extendedDescription}
                  onChange={(e) => setFormData({ ...formData, extendedDescription: e.target.value })}
                  placeholder="In-depth curatorial notes for the series detail page..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F5F1EA] uppercase">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                />
              </div>

              {/* Real-time Image Preview */}
              <ImagePreview url={formData.coverImage} label="Cover Image Preview" />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222222]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-neutral-400 hover:text-white uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors"
                >
                  <Save size={14} />
                  <span>{editingSeries ? 'Save Modifications' : 'Create Series'}</span>
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
        message="Are you certain you wish to remove this series? Any linked chapters will remain orphaned."
        itemName={deleteTarget ? `SERIES ${deleteTarget.number} – ${deleteTarget.title}` : ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageTransition>
  );
};
export default SeriesManagement;
