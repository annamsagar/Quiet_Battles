import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { PageTransition } from '../../components/common/PageTransition';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ImagePreview } from '../../components/admin/ImagePreview';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { slugify } from '../../utils/slugify';
import { Plus, Edit3, Trash2, ExternalLink, X, Save, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ChapterManagement = () => {
  useDocumentTitle('Chapter Management');
  const {
    chaptersList,
    seriesList,
    productsList,
    addChapter,
    updateChapter,
    deleteChapter,
  } = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    number: '01',
    seriesSlug: 'series-01',
    theme: '',
    shortDescription: '',
    openingQuote: '',
    mainStory: '',
    supportingStory: '',
    coverImage: '',
    secondaryImage: '',
    relatedProductSlug: 'gentle-armor',
    displayOrder: 1,
    status: 'published',
  });

  const handleOpenAdd = () => {
    setEditingChapter(null);
    const nextNum = chaptersList.length + 1;
    setFormData({
      title: '',
      slug: `chapter-0${nextNum}`,
      number: `0${nextNum}`,
      seriesSlug: seriesList[0]?.slug || 'series-01',
      theme: '',
      shortDescription: '',
      openingQuote: '',
      mainStory: '',
      supportingStory: '',
      coverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1400&auto=format&fit=crop',
      secondaryImage: '',
      relatedProductSlug: productsList[0]?.slug || 'gentle-armor',
      displayOrder: nextNum,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (chapter) => {
    setEditingChapter(chapter);
    setFormData({
      title: chapter.title || '',
      slug: chapter.slug || '',
      number: chapter.number || '01',
      seriesSlug: chapter.seriesSlug || 'series-01',
      theme: chapter.theme || '',
      shortDescription: chapter.shortDescription || '',
      openingQuote: chapter.openingQuote || '',
      mainStory: chapter.mainStory || '',
      supportingStory: chapter.supportingStory || '',
      coverImage: chapter.coverImage || '',
      secondaryImage: chapter.secondaryImage || '',
      relatedProductSlug: chapter.relatedProductSlug || 'gentle-armor',
      displayOrder: chapter.displayOrder || 1,
      status: chapter.status || 'published',
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingChapter ? prev.slug : slugify(val),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      ...formData,
      published: formData.status === 'published',
      aliases: [formData.slug, `chapter-${formData.number}`],
    };

    if (editingChapter) {
      updateChapter(editingChapter.id, payload);
    } else {
      addChapter(payload);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteChapter(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <PageTransition className="space-y-8">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65]">
            CMS / NARRATIVES
          </span>
          <h2 className="font-serif text-3xl font-light text-[#F5F1EA]">
            Chapter Management
          </h2>
          <p className="text-xs font-mono text-[#A7A29B] mt-1">
            Author and edit editorial chapters. Every modification updates the series overview and chapter story reader immediately.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>New Chapter</span>
        </button>
      </div>

      {/* Chapter Table */}
      <div className="bg-[#151515] border border-[#2B2B2B] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#1A1A1A] border-b border-[#2B2B2B] text-[#A7A29B] uppercase tracking-wider">
            <tr>
              <th className="p-4">Cover</th>
              <th className="p-4">Order / No.</th>
              <th className="p-4">Title & Theme</th>
              <th className="p-4">Parent Series</th>
              <th className="p-4">Related Garment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222]">
            {chaptersList.map((chap) => (
              <tr key={chap.id} className="hover:bg-[#1C1C1C] transition-colors">
                <td className="p-4">
                  <div className="w-16 h-12 bg-[#0A0A0A] border border-[#333333] overflow-hidden">
                    <img
                      src={chap.coverImage}
                      alt={chap.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4 text-[#A88B65] font-semibold">
                  CH. {chap.number} (#{chap.displayOrder})
                </td>
                <td className="p-4">
                  <span className="text-sm font-serif text-[#F5F1EA] block">
                    {chap.title}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {chap.theme}
                  </span>
                </td>
                <td className="p-4 text-neutral-400">
                  {chap.seriesSlug}
                </td>
                <td className="p-4 text-[#A88B65]">
                  {chap.relatedProductSlug || 'gentle-armor'}
                </td>
                <td className="p-4">
                  <StatusBadge status={chap.status || 'published'} />
                </td>
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  <Link
                    to={`/archive/${chap.seriesSlug || 'series-01'}/${chap.slug}`}
                    target="_blank"
                    className="inline-block p-1.5 text-neutral-400 hover:text-[#A88B65]"
                    title="View live chapter"
                  >
                    <ExternalLink size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(chap)}
                    className="p-1.5 text-neutral-400 hover:text-[#F5F1EA]"
                    title="Edit chapter"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(chap)}
                    className="p-1.5 text-neutral-400 hover:text-rose-400"
                    title="Delete chapter"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chapter Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#151515] border border-[#333333] max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={20} className="text-[#A88B65]" />
              <h3 className="font-serif text-2xl text-[#F5F1EA]">
                {editingChapter ? 'Edit Chapter Chronicle' : 'Create New Chapter Chronicle'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[#F5F1EA] uppercase">Chapter Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. THE SILENCE"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Chapter Number</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="chapter-01"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Parent Series</label>
                  <select
                    value={formData.seriesSlug}
                    onChange={(e) => setFormData({ ...formData, seriesSlug: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  >
                    {seriesList.map((s) => (
                      <option key={s.id} value={s.slug}>
                        Series {s.number} – {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Theme Tagline</label>
                  <input
                    type="text"
                    required
                    value={formData.theme}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    placeholder="The strength of staying quiet."
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Related Product</label>
                  <select
                    value={formData.relatedProductSlug}
                    onChange={(e) => setFormData({ ...formData, relatedProductSlug: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  >
                    {productsList.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#F5F1EA] uppercase">Opening Quote</label>
                <input
                  type="text"
                  value={formData.openingQuote}
                  onChange={(e) => setFormData({ ...formData, openingQuote: e.target.value })}
                  placeholder="Some of the strongest battles are fought where nobody can see."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#F5F1EA] uppercase">Short Description (Cards)</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief synopsis for archive overview cards..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#F5F1EA] uppercase">Main Story Content (Paragraphs separated by blank lines)</label>
                <textarea
                  rows={4}
                  required
                  value={formData.mainStory}
                  onChange={(e) => setFormData({ ...formData, mainStory: e.target.value })}
                  placeholder="Full editorial narrative..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
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

              <ImagePreview url={formData.coverImage} label="Chapter Cover Preview" />

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
                  <span>{editingChapter ? 'Save Chapter' : 'Publish Chapter'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={!!deleteTarget}
        title="Delete Chapter"
        message="Are you sure you want to permanently delete this narrative chapter?"
        itemName={deleteTarget ? `CH. ${deleteTarget.number} – ${deleteTarget.title}` : ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageTransition>
  );
};
export default ChapterManagement;
