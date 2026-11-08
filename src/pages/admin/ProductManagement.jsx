import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { PageTransition } from '../../components/common/PageTransition';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ImagePreview } from '../../components/admin/ImagePreview';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { formatCurrency } from '../../utils/formatCurrency';
import { slugify } from '../../utils/slugify';
import { Plus, Edit3, Trash2, ExternalLink, X, Save, Shirt, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ProductManagement = () => {
  useDocumentTitle('Product Management');
  const { productsList, addProduct, updateProduct, deleteProduct } = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Oversized T-shirt',
    collection: 'SERIES 01 – THE GENTLE ARMOR™',
    price: 1499,
    originalPrice: 1999,
    description: '',
    editorialNote: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockQuantity: 48,
    imageUrlsText: '',
    status: 'published',
    featured: false,
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      category: 'Oversized T-shirt',
      collection: 'SERIES 01 – THE GENTLE ARMOR™',
      price: 1499,
      originalPrice: 1999,
      description: 'An expression of quiet strength.',
      editorialNote: 'Crafted with sculptural drape and heavyweight organic cotton.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      stockQuantity: 50,
      imageUrlsText: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      status: 'published',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      slug: product.slug || '',
      category: product.category || 'Oversized T-shirt',
      collection: product.collection || 'SERIES 01 – THE GENTLE ARMOR™',
      price: product.price || 1499,
      originalPrice: product.originalPrice || 0,
      description: product.description || '',
      editorialNote: product.editorialNote || '',
      sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
      stockQuantity: product.stockQuantity || 0,
      imageUrlsText: (product.images || []).join('\n'),
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
  };

  const handleToggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Parse image URLs from multiline string
    const images = formData.imageUrlsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      ...formData,
      price: Number(formData.price) || 0,
      originalPrice: Number(formData.originalPrice) || 0,
      stockQuantity: Number(formData.stockQuantity) || 0,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'],
    };

    delete productPayload.imageUrlsText;

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const availableSizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const previewFirstImage = formData.imageUrlsText.split('\n')[0]?.trim();

  return (
    <PageTransition className="space-y-8">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A88B65]">
            CMS / CATALOG
          </span>
          <h2 className="font-serif text-3xl font-light text-[#F5F1EA]">
            Product Management
          </h2>
          <p className="text-xs font-mono text-[#A7A29B] mt-1">
            Manage luxury garments, pricing, inventory stocks, and photography. Synchronized with the live shop.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#F5F1EA] text-black hover:bg-[#A88B65] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>New Product</span>
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-[#151515] border border-[#2B2B2B] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#1A1A1A] border-b border-[#2B2B2B] text-[#A7A29B] uppercase tracking-wider">
            <tr>
              <th className="p-4">Visual</th>
              <th className="p-4">Name & Slug</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Sizes</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222]">
            {productsList.map((product) => (
              <tr key={product.id} className="hover:bg-[#1C1C1C] transition-colors">
                <td className="p-4">
                  <div className="w-14 h-16 bg-[#0A0A0A] border border-[#333333] overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-serif text-[#F5F1EA]">
                      {product.name}
                    </span>
                    {product.featured && (
                      <span className="text-[#A88B65]" title="Signature Hero Product">
                        <Star size={12} fill="#A88B65" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono block">
                    /{product.slug}
                  </span>
                </td>
                <td className="p-4 text-[#F5F1EA] font-semibold">
                  {formatCurrency(product.price)}
                </td>
                <td className="p-4 text-neutral-400">
                  {product.category}
                </td>
                <td className="p-4 text-[#A7A29B]">
                  {(product.sizes || []).join(', ')}
                </td>
                <td className="p-4">
                  <span className={product.stockQuantity > 10 ? 'text-emerald-400' : 'text-amber-400'}>
                    {product.stockQuantity || 0} units
                  </span>
                </td>
                <td className="p-4">
                  <StatusBadge status={product.status || 'published'} />
                </td>
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  <Link
                    to={`/products/${product.slug}`}
                    target="_blank"
                    className="inline-block p-1.5 text-neutral-400 hover:text-[#A88B65]"
                    title="View in Store"
                  >
                    <ExternalLink size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(product)}
                    className="p-1.5 text-neutral-400 hover:text-[#F5F1EA]"
                    title="Edit product"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(product)}
                    className="p-1.5 text-neutral-400 hover:text-rose-400"
                    title="Delete product"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Form Modal */}
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
              <Shirt size={20} className="text-[#A88B65]" />
              <h3 className="font-serif text-2xl text-[#F5F1EA]">
                {editingProduct ? 'Edit Armor Silhouette' : 'Create New Armor Product'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. THE GENTLE ARMOR OVERSIZED TEE"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="gentle-armor"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Price (INR ₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1499"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Original Price (MSRP)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="1999"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Stock Units</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="48"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Oversized T-shirt"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#F5F1EA] uppercase">Collection Tag</label>
                  <input
                    type="text"
                    value={formData.collection}
                    onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                    placeholder="SERIES 01 – THE GENTLE ARMOR™"
                    className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none"
                  />
                </div>
              </div>

              {/* Sizes Selector */}
              <div className="space-y-2">
                <label className="text-[#F5F1EA] uppercase block">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {availableSizeOptions.map((sz) => {
                    const active = formData.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        className={`px-3 py-1.5 border transition-colors ${
                          active
                            ? 'bg-[#A88B65] text-black border-[#A88B65] font-bold'
                            : 'bg-[#0A0A0A] text-neutral-400 border-[#333333]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#F5F1EA] uppercase">Product Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Concise product overview..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#F5F1EA] uppercase">Image URLs (one URL per line)</label>
                <textarea
                  rows={3}
                  required
                  value={formData.imageUrlsText}
                  onChange={(e) => setFormData({ ...formData, imageUrlsText: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                  className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] p-3 text-[#F5F1EA] outline-none font-mono"
                />
              </div>

              {previewFirstImage && (
                <ImagePreview url={previewFirstImage} label="Primary Product Photo Preview" />
              )}

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-[#F5F1EA]">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-[#A88B65]"
                  />
                  <span>Feature on Homepage Showcase</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-[#A7A29B]">STATUS:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="bg-[#0A0A0A] border border-[#333333] focus:border-[#A88B65] px-2 py-1 text-[#F5F1EA] outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

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
                  <span>{editingProduct ? 'Save Product' : 'Create Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={!!deleteTarget}
        title="Delete Product"
        message="Are you certain you wish to remove this product from the catalog?"
        itemName={deleteTarget ? deleteTarget.name : ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageTransition>
  );
};
export default ProductManagement;
