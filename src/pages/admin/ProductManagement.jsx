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
import { formatCurrency } from '../../utils/formatCurrency';
import { slugify } from '../../utils/slugify';
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Save,
  Shirt,
  Star,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Tag,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const ProductManagement = () => {
  useDocumentTitle('Product Management');
  const { productsList, seriesList, addProduct, updateProduct, deleteProduct } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    slug: '',
    category: 'Oversized T-shirt',
    collection: 'SERIES 01 – THE GENTLE ARMOR™',
    seriesSlug: 'series-01',
    price: 1499,
    originalPrice: 1999,
    description: '',
    editorialNote: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockQuantity: 48,
    images: [],
    status: 'published',
    featured: false,
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    productsList.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [productsList]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.slug?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.collection?.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && (product.status === 'published' || !product.status)) ||
        (statusFilter === 'draft' && product.status === 'draft');

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [productsList, searchQuery, categoryFilter, statusFilter]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormErrors({});
    setNewImageUrl('');
    setFormData({
      name: '',
      shortName: '',
      slug: '',
      category: 'Oversized T-shirt',
      collection: seriesList[0]?.fullTitle || 'SERIES 01 – THE GENTLE ARMOR™',
      seriesSlug: seriesList[0]?.slug || 'series-01',
      price: 1499,
      originalPrice: 1999,
      description: 'An expression of quiet strength. Crafted to drape with sculptural elegance and comfort.',
      editorialNote: 'Cut from heavyweight 280 GSM combed organic cotton with reinforced structural seams.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      stockQuantity: 40,
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      ],
      status: 'published',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormErrors({});
    setNewImageUrl('');
    setFormData({
      name: product.name || '',
      shortName: product.shortName || product.name || '',
      slug: product.slug || '',
      category: product.category || 'Oversized T-shirt',
      collection: product.collection || 'SERIES 01 – THE GENTLE ARMOR™',
      seriesSlug: product.seriesSlug || 'series-01',
      price: product.price || 1499,
      originalPrice: product.originalPrice || 0,
      description: product.description || '',
      editorialNote: product.editorialNote || '',
      sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
      stockQuantity: product.stockQuantity ?? 0,
      images: Array.isArray(product.images) && product.images.length > 0
        ? [...product.images]
        : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'],
      status: product.status || 'published',
      featured: !!product.featured,
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: editingProduct ? prev.slug : slugify(val),
    }));
    if (formErrors.name) {
      setFormErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleToggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      const newSizes = exists
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()],
    }));
    setNewImageUrl('');
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSetPrimaryImage = (index) => {
    setFormData((prev) => {
      const copy = [...prev.images];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return { ...prev, images: copy };
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.slug.trim()) errors.slug = 'Slug is required';
    if (Number(formData.price) <= 0) errors.price = 'Price must be greater than zero';
    if (Number(formData.stockQuantity) < 0) errors.stockQuantity = 'Stock cannot be negative';
    if (!formData.images || formData.images.length === 0) {
      errors.images = 'At least one product image is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || 0,
      stockQuantity: Number(formData.stockQuantity),
      shortName: formData.shortName || formData.name,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      setNotification({
        type: 'success',
        title: 'Product Updated',
        message: `Successfully saved changes for "${payload.name}".`,
      });
    } else {
      addProduct(payload);
      setNotification({
        type: 'success',
        title: 'Product Added',
        message: `"${payload.name}" is now available in the store.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (product) => {
    const newStatus = product.status === 'draft' ? 'published' : 'draft';
    updateProduct(product.id, { status: newStatus });
    setNotification({
      type: 'info',
      title: 'Status Updated',
      message: `"${product.name}" is now marked as ${newStatus.toUpperCase()}.`,
    });
  };

  const handleToggleFeatured = (product) => {
    const newFeatured = !product.featured;
    updateProduct(product.id, { featured: newFeatured });
    setNotification({
      type: 'info',
      title: 'Featured Status Updated',
      message: newFeatured
        ? `"${product.name}" is now featured on the Homepage hero showcase.`
        : `"${product.name}" removed from featured showcase.`,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const name = deleteTarget.name;
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
      setNotification({
        type: 'error',
        title: 'Product Deleted',
        message: `"${name}" was permanently removed from inventory.`,
      });
    }
  };

  const columns = [
    { title: 'Item', className: 'w-20' },
    { title: 'Product & Category' },
    { title: 'Price (INR)' },
    { title: 'Stock & Sizes' },
    { title: 'Featured', align: 'center' },
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
            CMS / MERCHANDISE
          </span>
          <h2 className="font-serif text-3xl font-light text-[#F5F1EA]">
            Product Management
          </h2>
          <p className="text-xs font-mono text-[#A7A29B] mt-1">
            Manage garment catalog, stock inventory, sizing, and luxury editorial pricing. Synchronized with the live cart.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus size={14} />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search garment name, category, slug..."
            className="w-full sm:max-w-xs"
          />

          {/* Category Filter Dropdown */}
          <div className="flex items-center gap-2 bg-[#151515] border border-[#2B2B2B] px-3 py-1.5 font-mono text-xs">
            <Tag size={13} className="text-[#A88B65]" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-[#F5F1EA] outline-none text-xs font-mono cursor-pointer"
            >
              <option value="all" className="bg-[#151515]">All Categories ({productsList.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#151515]">
                  {cat}
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

      {/* Products Data Table */}
      <DataTable
        columns={columns}
        isEmpty={filteredProducts.length === 0}
        emptyMessage={
          searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
            ? 'No garments match your active filters.'
            : 'No products currently cataloged.'
        }
        actionText="Add First Garment"
        onAction={handleOpenAdd}
      >
        {filteredProducts.map((product) => {
          const primaryImage =
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop';
          const isPublished = product.status === 'published' || !product.status;
          const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 10;
          const isOutOfStock = product.stockQuantity === 0;

          return (
            <tr key={product.id} className="hover:bg-[#1C1C1C] transition-colors group">
              {/* Product Thumbnail */}
              <td className="p-4">
                <div className="w-16 h-16 bg-[#0A0A0A] border border-[#333333] overflow-hidden group-hover:border-[#A88B65] transition-colors relative">
                  <img
                    src={primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop';
                    }}
                  />
                  {Array.isArray(product.images) && product.images.length > 1 && (
                    <span className="absolute bottom-0 right-0 bg-black/80 px-1 py-0.5 text-[9px] font-mono text-neutral-300">
                      +{product.images.length - 1}
                    </span>
                  )}
                </div>
              </td>

              {/* Title & Category */}
              <td className="p-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65] font-semibold block">
                  {product.category}
                </span>
                <span className="text-sm font-serif text-[#F5F1EA] block">
                  {product.name}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  /{product.slug}
                </span>
              </td>

              {/* Price */}
              <td className="p-4">
                <div className="font-mono">
                  <span className="text-sm text-[#F5F1EA] font-semibold block">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-[11px] text-neutral-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </td>

              {/* Stock & Sizing */}
              <td className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        isOutOfStock
                          ? 'bg-rose-500'
                          : isLowStock
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <span
                      className={`text-xs font-mono font-medium ${
                        isOutOfStock
                          ? 'text-rose-400'
                          : isLowStock
                          ? 'text-amber-400'
                          : 'text-[#F5F1EA]'
                      }`}
                    >
                      {isOutOfStock ? 'Sold Out' : `${product.stockQuantity} in stock`}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {(product.sizes || []).map((sz) => (
                      <span
                        key={sz}
                        className="text-[9px] font-mono px-1.5 py-0.5 bg-[#0F0F0F] border border-[#2B2B2B] text-neutral-400"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              </td>

              {/* Featured Flag */}
              <td className="p-4 text-center">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(product)}
                  className={`p-1.5 transition-colors ${
                    product.featured
                      ? 'text-amber-400 hover:text-neutral-400'
                      : 'text-neutral-600 hover:text-amber-400'
                  }`}
                  title={product.featured ? 'Unmark from Homepage feature' : 'Feature on Homepage'}
                  aria-label="Toggle featured"
                >
                  <Star size={16} fill={product.featured ? 'currentColor' : 'none'} />
                </button>
              </td>

              {/* Status */}
              <td className="p-4">
                <StatusBadge status={product.status || 'published'} />
              </td>

              {/* Actions */}
              <td className="p-4 text-right space-x-1 whitespace-nowrap">
                {/* Toggle Quick Status */}
                <button
                  type="button"
                  onClick={() => handleToggleStatus(product)}
                  className={`p-2 transition-colors ${
                    isPublished
                      ? 'text-neutral-400 hover:text-amber-400'
                      : 'text-neutral-400 hover:text-emerald-400'
                  }`}
                  title={isPublished ? 'Unpublish (Draft)' : 'Publish live'}
                  aria-label="Toggle publication"
                >
                  {isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>

                {/* View Live */}
                <Link
                  to={`/products/${product.slug}`}
                  target="_blank"
                  className="inline-block p-2 text-neutral-400 hover:text-[#A88B65] transition-colors"
                  title="View live garment page"
                  aria-label="View product"
                >
                  <ExternalLink size={14} />
                </Link>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(product)}
                  className="p-2 text-neutral-400 hover:text-[#F5F1EA] transition-colors"
                  title="Edit garment"
                  aria-label="Edit product"
                >
                  <Edit3 size={14} />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(product)}
                  className="p-2 text-neutral-400 hover:text-rose-400 transition-colors"
                  title="Delete garment"
                  aria-label="Delete product"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          );
        })}
      </DataTable>

      {/* Product Create / Edit Modal */}
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
              <Shirt size={20} className="text-[#A88B65]" />
              <h3 className="font-serif text-2xl text-[#F5F1EA]">
                {editingProduct ? 'Edit Garment Specification' : 'Add New Luxury Garment'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              {/* Row 1: Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Garment Full Name"
                  required
                  error={formErrors.name}
                >
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. THE GENTLE ARMOR OVERSIZED TEE"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField
                  label="URL Slug"
                  required
                  error={formErrors.slug}
                  helperText="e.g. gentle-armor"
                >
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="gentle-armor"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>
              </div>

              {/* Row 2: Category & Series */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Category">
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Oversized T-shirt, Heavyweight Hoodie..."
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField label="Affiliated Collection">
                  <select
                    value={formData.seriesSlug}
                    onChange={(e) => {
                      const selSeries = seriesList.find((s) => s.slug === e.target.value);
                      setFormData({
                        ...formData,
                        seriesSlug: e.target.value,
                        collection: selSeries ? selSeries.fullTitle : formData.collection,
                      });
                    }}
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

              {/* Row 3: Price, Original Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  label="Selling Price (INR ₹)"
                  required
                  error={formErrors.price}
                >
                  <input
                    type="number"
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField label="Original MRP (INR ₹)" helperText="For discount markdowns">
                  <input
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: e.target.value })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>

                <FormField
                  label="Units In Stock"
                  required
                  error={formErrors.stockQuantity}
                >
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, stockQuantity: e.target.value })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  />
                </FormField>
              </div>

              {/* Row 4: Size Selection Pills */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-mono text-[#F5F1EA] block">
                  Available Sizing
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map((sz) => {
                    const active = formData.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider border transition-colors flex items-center gap-1.5 cursor-pointer ${
                          active
                            ? 'bg-[#F5F1EA] text-black border-[#F5F1EA] font-semibold'
                            : 'bg-[#0A0A0A] text-[#A7A29B] border-[#333333] hover:border-neutral-500'
                        }`}
                      >
                        {active && <Check size={12} />}
                        <span>{sz}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Product Story & Editorial Fabric Notes */}
              <FormField label="Short Description (Manifesto / Cut Description)">
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Manifesto statement describing silhouette and purpose..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors resize-none"
                />
              </FormField>

              <FormField label="Editorial Note / Fabric & Craftsmanship Accordion Text">
                <textarea
                  rows={3}
                  value={formData.editorialNote}
                  onChange={(e) => setFormData({ ...formData, editorialNote: e.target.value })}
                  placeholder="Detailed material provenance, weave gauge, finish..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors resize-none"
                />
              </FormField>

              {/* Row 6: Image Gallery Manager */}
              <div className="space-y-3 p-4 bg-[#111111] border border-[#2B2B2B]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-[#F5F1EA] flex items-center gap-2">
                    <ImageIcon size={14} className="text-[#A88B65]" />
                    <span>Garment Imagery Gallery ({formData.images.length})</span>
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    First image acts as primary showcase
                  </span>
                </div>

                {/* Add Image Input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-2.5 text-[#F5F1EA] outline-none text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#A88B65] text-[#F5F1EA] hover:text-white uppercase font-mono tracking-wider font-semibold border border-[#333333] transition-colors cursor-pointer"
                  >
                    Add Image
                  </button>
                </div>
                {formErrors.images && (
                  <p className="text-[11px] text-rose-400 font-mono">* {formErrors.images}</p>
                )}

                {/* Images Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group bg-[#0A0A0A] border border-[#333333] aspect-[3/4] overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`Garment view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono bg-black/80 px-1 py-0.5 text-white">
                            {idx === 0 ? 'Primary' : `#${idx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="text-rose-400 hover:text-rose-300 p-1"
                            title="Remove image"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(idx)}
                            className="text-[9px] font-mono uppercase bg-[#151515] hover:bg-[#A88B65] text-white py-1 px-1.5 text-center transition-colors border border-white/20"
                          >
                            Make Primary
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 7: Toggles (Status & Featured) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <FormField label="Publication Status">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none transition-colors"
                  >
                    <option value="published">Published (Available for Purchase)</option>
                    <option value="draft">Draft (Admin Only)</option>
                  </select>
                </FormField>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#F5F1EA]">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 accent-[#A88B65] cursor-pointer"
                    />
                    <span>Highlight in Homepage Featured Showcase</span>
                  </label>
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
                  <span>{editingProduct ? 'Save Garment' : 'Add to Collection'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={!!deleteTarget}
        title="Delete Garment"
        itemDescription={`"${deleteTarget?.name}" (${deleteTarget?.category})`}
        warningMessage="This item will be permanently removed from the storefront catalog. Active carts containing snapshots of this item will retain snapshot data safely."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageTransition>
  );
};

export default ProductManagement;
