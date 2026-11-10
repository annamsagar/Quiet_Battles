import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { seriesService } from '../services/seriesService';
import { chapterService } from '../services/chapterService';
import { productService } from '../services/productService';
import { productImageService } from '../services/productImageService';
import { authService } from '../services/authService';
import { initialSeriesData } from '../data/seriesData';
import { initialChapterData } from '../data/chapterData';
import { initialProductData } from '../data/productData';
import { STORAGE_KEYS } from '../utils/constants';

const ContentContext = createContext(null);

// Normalization Helpers
const normalizeSeries = (s) => {
  if (!s) return null;
  const num = s.number || (s.slug === 'series-01' ? '01' : s.slug?.match(/\d+/)?.[0] || '01');
  const cover = s.coverImageUrl || s.coverImage || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop';
  const statusStr = (s.status || 'published').toLowerCase();

  return {
    ...s,
    id: s.id,
    number: num,
    title: s.title,
    fullTitle: s.fullTitle || (s.title?.toUpperCase().includes('SERIES') ? s.title : `SERIES ${num} – ${s.title}™`),
    slug: s.slug,
    description: s.description || '',
    extendedDescription: s.extendedDescription || s.description || '',
    coverImage: cover,
    coverImageUrl: cover,
    status: statusStr,
    published: statusStr === 'published',
    releaseYear: s.releaseYear || '2026',
    editorialQuote: s.editorialQuote || 'Every scar carries a story. Every silence holds a strength. Wear what made you.',
    featured: s.featured ?? (s.slug === 'series-01'),
  };
};

const normalizeChapter = (c, seriesList = []) => {
  if (!c) return null;
  const num = String(c.chapterNumber || c.number || 1).padStart(2, '0');
  const chapterNum = Number(c.chapterNumber || c.number || 1);
  const cover = c.coverImageUrl || c.coverImage || 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1600&auto=format&fit=crop';
  const secondary = c.secondaryImageUrl || c.secondaryImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop';
  const statusStr = (c.status || 'published').toLowerCase();
  const matchedSeries = seriesList.find((s) => s.id === c.seriesId || s.slug === c.seriesSlug);
  const seriesSlug = c.seriesSlug || matchedSeries?.slug || 'series-01';

  return {
    ...c,
    id: c.id,
    title: c.title,
    slug: c.slug,
    number: num,
    chapterNumber: chapterNum,
    seriesId: c.seriesId || matchedSeries?.id || null,
    seriesSlug,
    theme: c.theme || '',
    shortDescription: c.shortDescription || '',
    openingQuote: c.openingQuote || '',
    storyContent: c.storyContent || c.introStory || '',
    introHeading: c.introHeading || 'THE BEAUTY OF WHAT REMAINS UNSAID.',
    introStory: c.introStory || c.storyContent || '',
    storyHeading: c.storyHeading || 'STRENGTH WITHOUT SOUND.',
    coverImage: cover,
    coverImageUrl: cover,
    secondaryImage: secondary,
    secondaryImageUrl: secondary,
    relatedProductId: c.productId || c.relatedProductId || null,
    relatedProductSlug: c.relatedProductSlug || 'gentle-armor',
    displayOrder: c.displayOrder || chapterNum,
    status: statusStr,
    published: statusStr === 'published',
    aliases: Array.isArray(c.aliases) ? c.aliases : [c.slug, `chapter-${num}`],
  };
};

const normalizeProduct = (p, seriesList = []) => {
  if (!p) return null;
  const matchedSeries = seriesList.find((s) => s.id === p.seriesId || s.slug === p.seriesSlug);
  const seriesSlug = p.seriesSlug || matchedSeries?.slug || 'series-01';
  const statusStr = (p.status || 'published').toLowerCase();

  // Extract array of image URLs
  let imageUrls = [];
  if (Array.isArray(p.images)) {
    imageUrls = p.images.map((img) => (typeof img === 'string' ? img : img.imageUrl)).filter(Boolean);
  }
  if (imageUrls.length === 0) {
    imageUrls = ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'];
  }

  const sizes = Array.isArray(p.availableSizes) && p.availableSizes.length > 0
    ? Array.from(p.availableSizes)
    : Array.isArray(p.sizes) && p.sizes.length > 0
    ? p.sizes
    : ['S', 'M', 'L', 'XL', 'XXL'];

  return {
    ...p,
    id: p.id,
    name: p.name,
    shortName: p.shortName || p.name,
    slug: p.slug,
    category: p.category || 'Oversized T-shirt',
    collection: p.collection || (p.seriesTitle ? `SERIES 01 – ${p.seriesTitle}` : 'SERIES 01 – THE GENTLE ARMOR™'),
    seriesId: p.seriesId || matchedSeries?.id || null,
    seriesSlug,
    price: Number(p.price) || 1499,
    originalPrice: p.originalPrice || Math.round((Number(p.price) || 1499) * 1.33),
    currency: 'INR',
    description: p.description || '',
    editorialNote: p.editorialNote || p.description || '',
    sizes,
    stockQuantity: p.stockQuantity ?? 48,
    status: statusStr,
    published: statusStr === 'published',
    featured: p.featured ?? true,
    images: imageUrls,
    rawImages: Array.isArray(p.images) ? p.images : [],
    fabricDetails: p.fabricDetails || [
      '280 GSM Heavyweight French Terry Loopback Cotton',
      '100% Combed Compact Ring-Spun Organic Yarn',
      'Bio-softened silicone wash for velvety matte touch',
      'Drop-shoulder boxy silhouette with reinforced rib collar',
    ],
    careInstructions: p.careInstructions || [
      'Machine wash cold (30°C) with similar dark tones',
      'Turn garment inside out before washing and ironing',
      'Do not bleach or tumble dry; dry flat in natural shade',
      'Iron on low heat; avoid direct contact with branding prints',
    ],
    specs: p.specs || {
      fit: 'Relaxed / Drop Shoulder Oversized',
      weight: '280 GSM Heavyweight',
      origin: 'Consciously handcrafted in India',
      composition: '100% Sustainable Cotton',
    },
  };
};

export const ContentProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Initial State from LocalStorage or defaults
  const [seriesList, setSeriesList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SERIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(normalizeSeries);
      }
    } catch (e) {
      console.warn('Failed parsing series from localStorage:', e);
    }
    return initialSeriesData.map(normalizeSeries);
  });

  const [chaptersList, setChaptersList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((c) => normalizeChapter(c, initialSeriesData));
      }
    } catch (e) {
      console.warn('Failed parsing chapters from localStorage:', e);
    }
    return initialChapterData.map((c) => normalizeChapter(c, initialSeriesData));
  });

  const [productsList, setProductsList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map((p) => normalizeProduct(p, initialSeriesData));
      }
    } catch (e) {
      console.warn('Failed parsing products from localStorage:', e);
    }
    return initialProductData.map((p) => normalizeProduct(p, initialSeriesData));
  });

  // Persist to LocalStorage cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(seriesList));
    } catch (e) {
      console.error('Error saving series to localStorage:', e);
    }
  }, [seriesList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chaptersList));
    } catch (e) {
      console.error('Error saving chapters to localStorage:', e);
    }
  }, [chaptersList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsList));
    } catch (e) {
      console.error('Error saving products to localStorage:', e);
    }
  }, [productsList]);

  // Fetch backend content
  const refreshContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const isAdmin = authService.hasToken();
      // 1. Fetch Series
      let backendSeries = [];
      try {
        backendSeries = isAdmin ? await seriesService.getAllSeries() : await seriesService.getPublicSeries();
      } catch (err) {
        console.warn('Could not fetch series via admin endpoint, trying public series:', err.message);
        backendSeries = await seriesService.getPublicSeries().catch(() => []);
      }

      // 2. Fetch Chapters
      let backendChapters = [];
      try {
        backendChapters = isAdmin ? await chapterService.getAllChapters() : await chapterService.getPublicChaptersBySeries('series-01');
      } catch (err) {
        console.warn('Could not fetch chapters via admin endpoint, trying public chapters:', err.message);
        backendChapters = await chapterService.getPublicChaptersBySeries('series-01').catch(() => []);
      }

      // 3. Fetch Products
      let backendProducts = [];
      try {
        backendProducts = isAdmin ? await productService.getAllProducts() : await productService.getPublicProducts();
      } catch (err) {
        console.warn('Could not fetch products via admin endpoint, trying public products:', err.message);
        backendProducts = await productService.getPublicProducts().catch(() => []);
      }

      // Update state if backend returned valid records
      if (Array.isArray(backendSeries) && backendSeries.length > 0) {
        const normalized = backendSeries.map(normalizeSeries);
        setSeriesList(normalized);
      }

      if (Array.isArray(backendChapters) && backendChapters.length > 0) {
        const normalizedChapters = backendChapters.map((c) => normalizeChapter(c, backendSeries));
        setChaptersList(normalizedChapters);
      }

      if (Array.isArray(backendProducts) && backendProducts.length > 0) {
        const normalizedProducts = backendProducts.map((p) => normalizeProduct(p, backendSeries));
        setProductsList(normalizedProducts);
      }
    } catch (err) {
      console.warn('Backend API sync notice: Using cached data', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  // ==================== SERIES CRUD ====================
  const addSeries = async (newSeries) => {
    const payload = {
      title: newSeries.title,
      slug: newSeries.slug,
      description: newSeries.description || '',
      coverImageUrl: newSeries.coverImage || newSeries.coverImageUrl,
      status: (newSeries.status || 'published').toUpperCase(),
    };

    try {
      const created = await seriesService.createSeries(payload);
      const normalized = normalizeSeries({ ...newSeries, ...created });
      setSeriesList((prev) => [normalized, ...prev.filter((s) => s.id !== normalized.id)]);
      return normalized;
    } catch (err) {
      console.warn('Backend series creation failed, saving locally:', err.message);
      const fallbackItem = normalizeSeries({
        ...newSeries,
        id: `series-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setSeriesList((prev) => [fallbackItem, ...prev]);
      return fallbackItem;
    }
  };

  const updateSeries = async (id, updatedFields) => {
    const payload = {
      title: updatedFields.title,
      slug: updatedFields.slug,
      description: updatedFields.description || '',
      coverImageUrl: updatedFields.coverImage || updatedFields.coverImageUrl,
      status: (updatedFields.status || 'published').toUpperCase(),
    };

    // If ID is numeric, attempt backend update
    const isNumericId = typeof id === 'number' || /^\d+$/.test(id);
    if (isNumericId) {
      try {
        const updated = await seriesService.updateSeries(id, payload);
        const normalized = normalizeSeries({ ...updatedFields, ...updated });
        setSeriesList((prev) => prev.map((item) => (item.id === id ? normalized : item)));
        return normalized;
      } catch (err) {
        console.warn('Backend series update failed, updating locally:', err.message);
      }
    }

    setSeriesList((prev) =>
      prev.map((item) =>
        item.id === id
          ? normalizeSeries({ ...item, ...updatedFields, updatedAt: new Date().toISOString() })
          : item
      )
    );
  };

  const deleteSeries = async (id) => {
    const isNumericId = typeof id === 'number' || /^\d+$/.test(id);
    if (isNumericId) {
      try {
        await seriesService.deleteSeries(id);
      } catch (err) {
        console.warn('Backend series delete error:', err.message);
      }
    }
    setSeriesList((prev) => prev.filter((item) => item.id !== id));
  };

  const getSeriesBySlug = (slug) => {
    return seriesList.find((s) => s.slug === slug || String(s.id) === String(slug));
  };

  // ==================== CHAPTER CRUD ====================
  const addChapter = async (newChapter) => {
    // Resolve seriesId
    const matchedSeries = seriesList.find(
      (s) => s.slug === newChapter.seriesSlug || s.id === newChapter.seriesId
    ) || seriesList[0];
    const seriesId = matchedSeries?.id && /^\d+$/.test(matchedSeries.id) ? Number(matchedSeries.id) : 32;

    // Resolve productId if matching product slug
    const matchedProduct = productsList.find(
      (p) => p.slug === newChapter.relatedProductSlug || p.id === newChapter.relatedProductId
    );
    const productId = matchedProduct?.id && /^\d+$/.test(matchedProduct.id) ? Number(matchedProduct.id) : null;

    const payload = {
      title: newChapter.title,
      slug: newChapter.slug,
      chapterNumber: Number(newChapter.chapterNumber || newChapter.number || chaptersList.length + 1),
      theme: newChapter.theme || '',
      shortDescription: newChapter.shortDescription || '',
      openingQuote: newChapter.openingQuote || '',
      storyContent: newChapter.storyContent || newChapter.introStory || '',
      coverImageUrl: newChapter.coverImage || newChapter.coverImageUrl,
      secondaryImageUrl: newChapter.secondaryImage || newChapter.secondaryImageUrl,
      displayOrder: Number(newChapter.displayOrder) || chaptersList.length + 1,
      status: (newChapter.status || 'published').toUpperCase(),
      seriesId,
      productId,
    };

    try {
      const created = await chapterService.createChapter(payload);
      const normalized = normalizeChapter({ ...newChapter, ...created }, seriesList);
      setChaptersList((prev) => [...prev.filter((c) => c.id !== normalized.id), normalized]);
      return normalized;
    } catch (err) {
      console.warn('Backend chapter creation failed, saving locally:', err.message);
      const fallbackItem = normalizeChapter(
        {
          ...newChapter,
          id: `chap-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        seriesList
      );
      setChaptersList((prev) => [...prev, fallbackItem]);
      return fallbackItem;
    }
  };

  const updateChapter = async (id, updatedFields) => {
    const isNumericId = typeof id === 'number' || /^\d+$/.test(id);

    if (isNumericId) {
      const matchedSeries = seriesList.find(
        (s) => s.slug === updatedFields.seriesSlug || s.id === updatedFields.seriesId
      ) || seriesList[0];
      const seriesId = matchedSeries?.id && /^\d+$/.test(matchedSeries.id) ? Number(matchedSeries.id) : 32;

      const matchedProduct = productsList.find(
        (p) => p.slug === updatedFields.relatedProductSlug || p.id === updatedFields.relatedProductId
      );
      const productId = matchedProduct?.id && /^\d+$/.test(matchedProduct.id) ? Number(matchedProduct.id) : null;

      const payload = {
        title: updatedFields.title,
        slug: updatedFields.slug,
        chapterNumber: Number(updatedFields.chapterNumber || updatedFields.number || 1),
        theme: updatedFields.theme || '',
        shortDescription: updatedFields.shortDescription || '',
        openingQuote: updatedFields.openingQuote || '',
        storyContent: updatedFields.storyContent || updatedFields.introStory || '',
        coverImageUrl: updatedFields.coverImage || updatedFields.coverImageUrl,
        secondaryImageUrl: updatedFields.secondaryImage || updatedFields.secondaryImageUrl,
        displayOrder: Number(updatedFields.displayOrder) || 1,
        status: (updatedFields.status || 'published').toUpperCase(),
        seriesId,
        productId,
      };

      try {
        const updated = await chapterService.updateChapter(id, payload);
        const normalized = normalizeChapter({ ...updatedFields, ...updated }, seriesList);
        setChaptersList((prev) => prev.map((item) => (item.id === id ? normalized : item)));
        return normalized;
      } catch (err) {
        console.warn('Backend chapter update failed, updating locally:', err.message);
      }
    }

    setChaptersList((prev) =>
      prev.map((item) =>
        item.id === id
          ? normalizeChapter({ ...item, ...updatedFields, updatedAt: new Date().toISOString() }, seriesList)
          : item
      )
    );
  };

  const deleteChapter = async (id) => {
    const isNumericId = typeof id === 'number' || /^\d+$/.test(id);
    if (isNumericId) {
      try {
        await chapterService.deleteChapter(id);
      } catch (err) {
        console.warn('Backend chapter delete error:', err.message);
      }
    }
    setChaptersList((prev) => prev.filter((item) => item.id !== id));
  };

  const getChaptersBySeries = (seriesSlug) => {
    return chaptersList
      .filter(
        (c) =>
          (c.seriesSlug === seriesSlug || c.seriesId === seriesSlug) &&
          c.published !== false &&
          (c.status === 'published' || !c.status)
      )
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  };

  const getAllChaptersForSeries = (seriesSlug) => {
    return chaptersList
      .filter((c) => c.seriesSlug === seriesSlug || c.seriesId === seriesSlug)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  };

  const getChapterBySlug = (seriesSlug, chapterSlug) => {
    return chaptersList.find(
      (c) =>
        (c.seriesSlug === seriesSlug || !seriesSlug) &&
        (c.slug === chapterSlug || c.aliases?.includes(chapterSlug))
    );
  };

  // ==================== PRODUCT CRUD ====================
  const addProduct = async (newProduct) => {
    const matchedSeries = seriesList.find(
      (s) => s.slug === newProduct.seriesSlug || s.id === newProduct.seriesId
    ) || seriesList[0];
    const seriesId = matchedSeries?.id && /^\d+$/.test(matchedSeries.id) ? Number(matchedSeries.id) : 32;

    const payload = {
      name: newProduct.name,
      slug: newProduct.slug,
      description: newProduct.description || '',
      price: Number(newProduct.price) || 1499,
      category: newProduct.category || 'Oversized T-shirt',
      stockQuantity: Number(newProduct.stockQuantity) || 0,
      availableSizes: Array.isArray(newProduct.sizes) && newProduct.sizes.length > 0 ? newProduct.sizes : ['S', 'M', 'L', 'XL', 'XXL'],
      status: (newProduct.status || 'published').toUpperCase(),
      seriesId,
    };

    try {
      const created = await productService.createProduct(payload);

      // Add product images if provided
      if (Array.isArray(newProduct.images) && newProduct.images.length > 0) {
        for (let i = 0; i < newProduct.images.length; i++) {
          const imgUrl = typeof newProduct.images[i] === 'string' ? newProduct.images[i] : newProduct.images[i].imageUrl;
          if (imgUrl) {
            try {
              await productImageService.addProductImage(created.id, {
                imageUrl: imgUrl,
                altText: `${created.name} Image ${i + 1}`,
                displayOrder: i + 1,
              });
            } catch (imgErr) {
              console.warn('Could not add product image:', imgErr.message);
            }
          }
        }
      }

      const normalized = normalizeProduct({ ...newProduct, ...created }, seriesList);
      setProductsList((prev) => [normalized, ...prev.filter((p) => p.id !== normalized.id)]);
      return normalized;
    } catch (err) {
      console.warn('Backend product creation failed, saving locally:', err.message);
      const fallbackItem = normalizeProduct(
        {
          ...newProduct,
          id: `prod-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        seriesList
      );
      setProductsList((prev) => [fallbackItem, ...prev]);
      return fallbackItem;
    }
  };

  const updateProduct = async (id, updatedFields) => {
    const isNumericId = typeof id === 'number' || /^\d+$/.test(id);

    if (isNumericId) {
      const matchedSeries = seriesList.find(
        (s) => s.slug === updatedFields.seriesSlug || s.id === updatedFields.seriesId
      ) || seriesList[0];
      const seriesId = matchedSeries?.id && /^\d+$/.test(matchedSeries.id) ? Number(matchedSeries.id) : 32;

      const payload = {
        name: updatedFields.name,
        slug: updatedFields.slug,
        description: updatedFields.description || '',
        price: Number(updatedFields.price) || 1499,
        category: updatedFields.category || 'Oversized T-shirt',
        stockQuantity: Number(updatedFields.stockQuantity) || 0,
        availableSizes: Array.isArray(updatedFields.sizes) ? updatedFields.sizes : ['S', 'M', 'L', 'XL'],
        status: (updatedFields.status || 'published').toUpperCase(),
        seriesId,
      };

      try {
        const updated = await productService.updateProduct(id, payload);
        const normalized = normalizeProduct({ ...updatedFields, ...updated }, seriesList);
        setProductsList((prev) => prev.map((item) => (item.id === id ? normalized : item)));
        return normalized;
      } catch (err) {
        console.warn('Backend product update failed, updating locally:', err.message);
      }
    }

    setProductsList((prev) =>
      prev.map((item) =>
        item.id === id
          ? normalizeProduct({ ...item, ...updatedFields, updatedAt: new Date().toISOString() }, seriesList)
          : item
      )
    );
  };

  const deleteProduct = async (id) => {
    const isNumericId = typeof id === 'number' || /^\d+$/.test(id);
    if (isNumericId) {
      try {
        await productService.deleteProduct(id);
      } catch (err) {
        console.warn('Backend product delete error:', err.message);
      }
    }
    setProductsList((prev) => prev.filter((item) => item.id !== id));
  };

  const getProductBySlug = (slug) => {
    return productsList.find((p) => p.slug === slug || String(p.id) === String(slug));
  };

  // Reset function to restore baseline demo data
  const resetToDefaultData = () => {
    setSeriesList(initialSeriesData.map(normalizeSeries));
    setChaptersList(initialChapterData.map((c) => normalizeChapter(c, initialSeriesData)));
    setProductsList(initialProductData.map((p) => normalizeProduct(p, initialSeriesData)));
    localStorage.removeItem(STORAGE_KEYS.SERIES);
    localStorage.removeItem(STORAGE_KEYS.CHAPTERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  };

  return (
    <ContentContext.Provider
      value={{
        loading,
        error,
        refreshContent,
        seriesList,
        chaptersList,
        productsList,
        // Series
        addSeries,
        updateSeries,
        deleteSeries,
        getSeriesBySlug,
        // Chapters
        addChapter,
        updateChapter,
        deleteChapter,
        getChaptersBySeries,
        getAllChaptersForSeries,
        getChapterBySlug,
        // Products
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        // Reset
        resetToDefaultData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
