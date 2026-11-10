import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LoadingState } from '../components/common/LoadingState';

// Public Pages (Lazy Loaded for performance & code-splitting)
const Home = lazy(() => import('../pages/Home'));
const Archive = lazy(() => import('../pages/Archive'));
const SeriesDetail = lazy(() => import('../pages/SeriesDetail'));
const ChapterDetail = lazy(() => import('../pages/ChapterDetail'));
const Shop = lazy(() => import('../pages/Shop'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Admin Pages (Lazy Loaded)
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const SeriesManagement = lazy(() => import('../pages/admin/SeriesManagement'));
const ChapterManagement = lazy(() => import('../pages/admin/ChapterManagement'));
const ProductManagement = lazy(() => import('../pages/admin/ProductManagement'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingState message="Loading Quiet Battles..." />}>
      <Routes>
        {/* ================= PUBLIC STOREFRONT ROUTES ================= */}
        <Route element={<PublicLayout />}>
          {/* / */}
          <Route index element={<Home />} />

          {/* /archive */}
          <Route path="archive" element={<Archive />} />

          {/* Series Routes (Dynamic & Explicit) */}
          <Route path="archive/:seriesSlug" element={<SeriesDetail />} />

          {/* Chapter Routes (Dynamic & Explicit) */}
          <Route path="archive/:seriesSlug/:chapterSlug" element={<ChapterDetail />} />

          {/* Shop & Collections Catalog Routes */}
          <Route path="shop" element={<Shop />} />
          <Route path="collections" element={<Shop />} />
          <Route path="products" element={<Shop />} />

          {/* Product Detail Routes (Explicit & Dynamic) */}
          <Route path="products/gentle-armor" element={<ProductDetail />} />
          <Route path="products/:productSlug" element={<ProductDetail />} />

          {/* Core Brand Pages */}
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ================= ADMIN AUTHENTICATION ================= */}
        <Route path="admin/login" element={<AdminLogin />} />

        {/* ================= PROTECTED ADMIN CMS ROUTES ================= */}
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="series" element={<SeriesManagement />} />
          <Route path="chapters" element={<ChapterManagement />} />
          <Route path="products" element={<ProductManagement />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
