import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { ContentProvider } from './context/ContentContext';
import { CartProvider } from './context/CartContext';
import { AppRoutes } from './routes/AppRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AdminProvider>
          <ContentProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </ContentProvider>
        </AdminProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
