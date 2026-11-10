import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSeriesData } from '../data/seriesData';
import { initialChapterData } from '../data/chapterData';
import { initialProductData } from '../data/productData';
import { STORAGE_KEYS } from '../utils/constants';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  // 1. Series State
  const [seriesList, setSeriesList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SERIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed parsing series from localStorage:', e);
    }
    return initialSeriesData;
  });

  // 2. Chapter State
  const [chaptersList, setChaptersList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed parsing chapters from localStorage:', e);
    }
    return initialChapterData;
  });

  // 3. Product State
  const [productsList, setProductsList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed parsing products from localStorage:', e);
    }
    return initialProductData;
  });

  // Persist to LocalStorage
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

  // ==================== SERIES CRUD ====================
  const addSeries = (newSeries) => {
    const id = `series-${Date.now()}`;
    const item = {
      ...newSeries,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSeriesList((prev) => [item, ...prev]);
    return item;
  };

  const updateSeries = (id, updatedFields) => {
    setSeriesList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedFields, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteSeries = (id) => {
    setSeriesList((prev) => prev.filter((item) => item.id !== id));
  };

  const getSeriesBySlug = (slug) => {
    return seriesList.find((s) => s.slug === slug);
  };

  // ==================== CHAPTER CRUD ====================
  const addChapter = (newChapter) => {
    const id = `chap-${Date.now()}`;
    const item = {
      ...newChapter,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setChaptersList((prev) => [...prev, item]);
    return item;
  };

  const updateChapter = (id, updatedFields) => {
    setChaptersList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedFields, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteChapter = (id) => {
    setChaptersList((prev) => prev.filter((item) => item.id !== id));
  };

  const getChaptersBySeries = (seriesSlug) => {
    return chaptersList
      .filter((c) => c.seriesSlug === seriesSlug && c.published !== false && (c.status === 'published' || !c.status))
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  };

  const getAllChaptersForSeries = (seriesSlug) => {
    return chaptersList
      .filter((c) => c.seriesSlug === seriesSlug)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  };

  const getChapterBySlug = (seriesSlug, chapterSlug) => {
    return chaptersList.find(
      (c) =>
        c.seriesSlug === seriesSlug &&
        (c.slug === chapterSlug || c.aliases?.includes(chapterSlug))
    );
  };

  // ==================== PRODUCT CRUD ====================
  const addProduct = (newProduct) => {
    const id = `prod-${Date.now()}`;
    const item = {
      ...newProduct,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProductsList((prev) => [item, ...prev]);
    return item;
  };

  const updateProduct = (id, updatedFields) => {
    setProductsList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedFields, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteProduct = (id) => {
    setProductsList((prev) => prev.filter((item) => item.id !== id));
  };

  const getProductBySlug = (slug) => {
    return productsList.find((p) => p.slug === slug);
  };

  // Reset function to restore baseline demo data
  const resetToDefaultData = () => {
    setSeriesList(initialSeriesData);
    setChaptersList(initialChapterData);
    setProductsList(initialProductData);
    localStorage.removeItem(STORAGE_KEYS.SERIES);
    localStorage.removeItem(STORAGE_KEYS.CHAPTERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  };

  return (
    <ContentContext.Provider
      value={{
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

