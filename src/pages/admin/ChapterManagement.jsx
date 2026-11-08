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
  BookOpen,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Layers,
  Shirt,
  Filter,
} from 'lucide-react';
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

  const [searchQuery, setSearchQuery] = useState('');
  const [seriesFilter, setSeriesFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    number: '01',
    seriesSlug: 'series-01',
    theme: '',
    shortDescription: '',
    openingQuote: '',
    introHeading: '',
    introStory: '',
    storyHeading: '',
    storyContent: '',
    coverImage: '',
    secondaryImage: '',
    relatedProductSlug: 'gentle-armor',
    displayOrder: 1,
    status: 'published',
  });

  // Filtered and sorted chapters
  const filteredChapters = useMemo(() => {
    return chaptersList
      .filter((chap) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          chap.title?.toLowerCase().includes(query) ||
          chap.number?.toLowerCase().includes(query) ||
          chap.slug?.toLowerCase().includes(query) ||
          chap.theme?.toLowerCase().includes(query) ||
          chap.openingQuote?.toLowerCase().includes(query);

        const matchesSeries =
          seriesFilter === 'all' || chap.seriesSlug === seriesFilter;

        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'published' && (chap.status === 'published' || !chap.status)) ||
          (statusFilter === 'draft' && chap.status === 'draft');

        return matchesSearch && matchesSeries && matchesStatus;
      })
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [chaptersList, searchQuery, seriesFilter, statusFilter]);

  const handleOpenAdd = () => {
    setEditingChapter(null);
    setFormErrors({});
    const nextOrder = chaptersList.length + 1;
    const nextNumber = String(nextOrder).padStart(2, '0');
    setFormData({
      title: '',
      slug: `chapter-${nextNumber}`,
      number: nextNumber,
      seriesSlug: seriesList[0]?.slug || 'series-01',
      theme: 'The quiet strength within personal boundaries.',
      shortDescription: 'An editorial reflection on silent perseverance.',
      openingQuote: 'True armor is woven in silence.',
      introHeading: 'THE ARCHITECTURE OF SILENT RESOLVE.',
      introStory: 'In the quietest hours, we discover the boundaries that define our true strength.\n\nStrength does not need to declare itself.',
      storyHeading: 'THE SEAMS OF ENDURANCE.',
      storyContent: 'Every stitch in our garment mirrors an internal resilience—firm, patient and unyielding.',
      coverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1400&auto=format&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop',
      relatedProductSlug: productsList[0]?.slug || 'gentle-armor',
      displayOrder: nextOrder,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (chapter) => {
    setEditingChapter(chapter);
    setFormErrors({});
    setFormData({
      title: chapter.title || '',
      slug: chapter.slug || '',
      number: chapter.number || '01',
      seriesSlug: chapter.seriesSlug || 'series-01',
      theme: chapter.theme || '',
      shortDescription: chapter.shortDescription || '',
      openingQuote: chapter.openingQuote || '',
      introHeading: chapter.introHeading || 'THE BEAUTY OF WHAT REMAINS UNSAID.',
      introStory: chapter.introStory || chapter.mainStory || '',
      storyHeading: chapter.storyHeading || 'STRENGTH WITHOUT SOUND.',
      storyContent: chapter.storyContent || chapter.supportingStory || '',
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
    if (formErrors.title) {
      setFormErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Chapter title is required';
    if (!formData.slug.trim()) errors.slug = 'Slug is required';
    if (!formData.number.trim()) errors.number = 'Chapter number is required';
    if (!formData.coverImage.trim()) errors.coverImage = 'Cover image URL is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingChapter) {
      updateChapter(editingChapter.id, {
        ...formData,
        displayOrder: Number(formData.displayOrder) || 1,
        aliases: Array.from(new Set([formData.slug, `chapter-${formData.number}`])),
      });
      setNotification({
        type: 'success',
        title: 'Chapter Updated',
        message: `Saved updates for Chapter ${formData.number} – "${formData.title}".`,
      });
    } else {
      addChapter({
        ...formData,
        chapterNumber: parseInt(formData.number, 10) || chaptersList.length + 1,
        displayOrder: Number(formData.displayOrder) || chaptersList.length + 1,
        aliases: [formData.slug, `chapter-${formData.number}`],
      });
      setNotification({
        type: 'success',
        title: 'Chapter Created',
        message: `Chapter ${formData.number} – "${formData.title}" added successfully.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (chapter) => {
    const newStatus = chapter.status === 'draft' ? 'published' : 'draft';
    updateChapter(chapter.id, {
      status: newStatus,
      published: newStatus === 'published',
    });
    setNotification({
      type: 'info',
      title: 'Status Updated',
      message: `Chapter ${chapter.number} is now marked as ${newStatus.toUpperCase()}.`,
    });
  };

  const handleMoveOrder = (chapter, direction) => {
    const currentOrder = chapter.displayOrder || 1;
    const newOrder = direction === 'up' ? Math.max(1, currentOrder - 1) : currentOrder + 1;
    if (currentOrder === newOrder) return;

    updateChapter(chapter.id, { displayOrder: newOrder });
    setNotification({
      type: 'info',
      title: 'Display Order Adjusted',
      message: `Chapter ${chapter.number} display priority set to #${newOrder}.`,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const name = deleteTarget.title;
      deleteChapter(deleteTarget.id);
      setDeleteTarget(null);
      setNotification({
        type: 'error',
        title: 'Chapter Deleted',
        message: `Chapter "${name}" has been removed.`,
      });
    }
  };

  const columns = [
    { title: 'Cover', className: 'w-20' },
    { title: 'Chapter / Title' },
    { title: 'Parent Series' },
    { title: 'Related Product' },
    { title: 'Order', align: 'center' },
    { title: 'Status' },
    { title: 'Actions', align: 'right' },
  ];

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
            CMS / EDITORIAL
          </span>
          <h2 className="font-serif text-3xl font-light text-[#F5F1EA]">
            Chapter Management
          </h2>
          <p className="text-xs font-mono text-[#A7A29B] mt-1">
            Curate brand storytelling chapters, narrative essays, and product links. All updates update the public Archive and dynamic chapter readers in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus size={14} />
          <span>Add New Chapter</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search chapters, quotes, themes..."
            className="w-full sm:max-w-xs"
          />

          {/* Series Filter Dropdown */}
          <div className="flex items-center gap-2 bg-[#151515] border border-[#2B2B2B] px-3 py-1.5 font-mono text-xs">
            <Layers size={13} className="text-[#A88B65]" />
            <select
              value={seriesFilter}
              onChange={(e) => setSeriesFilter(e.target.value)}
              className="bg-transparent text-[#F5F1EA] outline-none text-xs font-mono cursor-pointer"
            >
              <option value="all" className="bg-[#151515]">All Series ({seriesList.length})</option>
              {seriesList.map((s) => (
                <option key={s.id} value={s.slug} className="bg-[#151515]">
                  Series {s.number} – {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Buttons */}
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

      {/* Chapters Data Table */}
      <DataTable
        columns={columns}
        isEmpty={filteredChapters.length === 0}
        emptyMessage={
          searchQuery || seriesFilter !== 'all' || statusFilter !== 'all'
            ? 'No chapters found matching active filters.'
            : 'No storytelling chapters available.'
        }
        actionText="Create First Chapter"
        onAction={handleOpenAdd}
      >
        {filteredChapters.map((chapter) => {
          const parentSeries = seriesList.find((s) => s.slug === chapter.seriesSlug);
          const relatedProduct = productsList.find(
            (p) => p.slug === chapter.relatedProductSlug
          );
          const isPublished = chapter.status === 'published' || !chapter.status;

          return (
            <tr key={chapter.id} className="hover:bg-[#1C1C1C] transition-colors group">
              {/* Cover Thumbnail */}
              <td className="p-4">
                <div className="w-16 h-12 bg-[#0A0A0A] border border-[#333333] overflow-hidden group-hover:border-[#A88B65] transition-colors">
                  <img
                    src={chapter.coverImage}
                    alt={chapter.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop';
                    }}
                  />
                </div>
              </td>

              {/* Chapter No. & Title */}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65] font-semibold">
                    CHAPTER {chapter.number}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    /{chapter.slug}
                  </span>
                </div>
                <span className="text-sm font-serif text-[#F5F1EA] block">
                  {chapter.title}
                </span>
                <p className="text-[11px] text-[#A7A29B] font-mono italic line-clamp-1 max-w-sm mt-0.5">
                  &ldquo;{chapter.openingQuote || chapter.theme}&rdquo;
                </p>
              </td>

              {/* Parent Series */}
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#2B2B2B] text-xs font-mono text-[#F5F1EA]">
                  <Layers size={11} className="text-[#A88B65]" />
                  <span>{parentSeries ? `Series ${parentSeries.number}` : chapter.seriesSlug}</span>
                </span>
              </td>

              {/* Related Product */}
              <td className="p-4">
                {relatedProduct ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#2B2B2B] text-xs font-mono text-neutral-300">
                    <Shirt size={11} className="text-[#A88B65]" />
                    <span className="max-w-[130px] truncate">{relatedProduct.name}</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-neutral-600 font-mono">None</span>
                )}
              </td>

              {/* Display Order with Up/Down Controls */}
              <td className="p-4 text-center">
                <div className="inline-flex items-center gap-1 bg-[#0F0F0F] border border-[#2B2B2B] px-2 py-0.5">
                  <button
                    type="button"
                    onClick={() => handleMoveOrder(chapter, 'up')}
                    className="text-neutral-500 hover:text-white p-0.5"
                    title="Move higher priority"
                    aria-label="Move up"
                  >
                    <ArrowUp size={11} />
                  </button>
                  <span className="text-xs font-mono text-[#F5F1EA] px-1 font-semibold">
                    #{chapter.displayOrder || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleMoveOrder(chapter, 'down')}
                    className="text-neutral-500 hover:text-white p-0.5"
                    title="Move lower priority"
                    aria-label="Move down"
                  >
                    <ArrowDown size={11} />
                  </button>
                </div>
              </td>

              {/* Status */}
              <td className="p-4">
                <StatusBadge status={chapter.status || 'published'} />
              </td>

              {/* Actions */}
              <td className="p-4 text-right space-x-1 whitespace-nowrap">
                {/* Toggle Quick Status */}
                <button
                  type="button"
                  onClick={() => handleToggleStatus(chapter)}
                  className={`p-2 transition-colors ${
                    isPublished
                      ? 'text-neutral-400 hover:text-amber-400'
                      : 'text-neutral-400 hover:text-emerald-400'
                  }`}
                  title={isPublished ? 'Unpublish (Draft)' : 'Publish live'}
                  aria-label="Toggle status"
                >
                  {isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>

                {/* View Live */}
                <Link
                  to={`/archive/${chapter.seriesSlug || 'series-01'}/${chapter.slug}`}
                  target="_blank"
                  className="inline-block p-2 text-neutral-400 hover:text-[#A88B65] transition-colors"
                  title="View live chapter page"
                  aria-label="View chapter"
                >
                  <ExternalLink size={14} />
                </Link>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(chapter)}
                  className="p-2 text-neutral-400 hover:text-[#F5F1EA] transition-colors"
                  title="Edit chapter"
                  aria-label="Edit chapter"
                >
                  <Edit3 size={14} />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(chapter)}
                  className="p-2 text-neutral-400 hover:text-rose-400 transition-colors"
                  title="Delete chapter"
                  aria-label="Delete chapter"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          );
        })}
      </DataTable>

      {/* Chapter Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#151515] border border-[#333333] max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={20} className="text-[#A88B65]" />
              <h3 className="font-serif text-2xl text-[#F5F1EA]">
                {editingChapter ? 'Edit Chapter Story' : 'Create New Chapter Story'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              {/* Row 1: Title & Number */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <FormField
                  label="Chapter Title"
                  required
                  error={formErrors.title}
                  className="sm:col-span-3"
                >
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. THE SILENCE"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField
                  label="Chapter No."
                  required
                  error={formErrors.number}
                  helperText="01 to 05"
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

              {/* Row 2: Slug & Parent Series */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="URL Slug"
                  required
                  error={formErrors.slug}
                  helperText="e.g. the-silence or chapter-01"
                >
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="the-silence"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField label="Parent Series">
                  <select
                    value={formData.seriesSlug}
                    onChange={(e) => setFormData({ ...formData, seriesSlug: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  >
                    {seriesList.map((s) => (
                      <option key={s.id} value={s.slug}>
                        Series {s.number} – {s.title}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              {/* Row 3: Related Product & Status & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Related Product">
                  <select
                    value={formData.relatedProductSlug}
                    onChange={(e) => setFormData({ ...formData, relatedProductSlug: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  >
                    {productsList.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Display Order">
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField label="Publication Status">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Admin Only)</option>
                  </select>
                </FormField>
              </div>

              {/* Row 4: Theme & Opening Quote */}
              <FormField label="Theme Statement">
                <input
                  type="text"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  placeholder="e.g. The strength of staying quiet."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                />
              </FormField>

              <FormField label="Opening Editorial Quote">
                <input
                  type="text"
                  value={formData.openingQuote}
                  onChange={(e) => setFormData({ ...formData, openingQuote: e.target.value })}
                  placeholder="e.g. Some of the strongest battles are fought where nobody can see."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                />
              </FormField>

              {/* Row 5: Short Description */}
              <FormField label="Short Description (Chapter Card Synopsis)">
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief summary displayed on the Series chapter grid..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors resize-none"
                />
              </FormField>

              {/* Row 6: Narrative Essay (Reflection Section) */}
              <div className="p-4 bg-[#111111] border border-[#2B2B2B] space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65] block">
                  Editorial Essay (Part 1 – Reflection)
                </span>
                <FormField label="Heading">
                  <input
                    type="text"
                    value={formData.introHeading}
                    onChange={(e) => setFormData({ ...formData, introHeading: e.target.value })}
                    placeholder="e.g. THE BEAUTY OF WHAT REMAINS UNSAID."
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>
                <FormField label="Body Paragraphs (Separate with double linebreaks)">
                  <textarea
                    rows={4}
                    value={formData.introStory}
                    onChange={(e) => setFormData({ ...formData, introStory: e.target.value })}
                    placeholder="Write the initial philosophical reflection here..."
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>
              </div>

              {/* Row 7: Narrative Essay (Strength Section) */}
              <div className="p-4 bg-[#111111] border border-[#2B2B2B] space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65] block">
                  Editorial Essay (Part 2 – Garment & Armor Connection)
                </span>
                <FormField label="Heading">
                  <input
                    type="text"
                    value={formData.storyHeading}
                    onChange={(e) => setFormData({ ...formData, storyHeading: e.target.value })}
                    placeholder="e.g. STRENGTH WITHOUT SOUND."
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>
                <FormField label="Body Paragraphs">
                  <textarea
                    rows={4}
                    value={formData.storyContent}
                    onChange={(e) => setFormData({ ...formData, storyContent: e.target.value })}
                    placeholder="Write the connection to physical armor and craftsmanship..."
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>
              </div>

              {/* Row 8: Imagery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <FormField
                    label="Primary Cover Image URL"
                    required
                    error={formErrors.coverImage}
                  >
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                    />
                  </FormField>
                  <ImagePreview url={formData.coverImage} alt="Cover image preview" aspect="portrait" />
                </div>

                <div className="space-y-3">
                  <FormField label="Secondary Atmospheric Image URL">
                    <input
                      type="url"
                      value={formData.secondaryImage}
                      onChange={(e) => setFormData({ ...formData, secondaryImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                    />
                  </FormField>
                  <ImagePreview url={formData.secondaryImage} alt="Secondary image preview" aspect="portrait" />
                </div>
              </div>

              {/* Modal Actions */}
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
                  <span>{editingChapter ? 'Save Chapter' : 'Publish Chapter'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={!!deleteTarget}
        title="Delete Chapter"
        itemDescription={`Chapter ${deleteTarget?.number} – "${deleteTarget?.title}"`}
        warningMessage="This chapter and its narrative editorial will no longer be visible on the public series page or chapter reader."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageTransition>
  );
};

export default ChapterManagement;
