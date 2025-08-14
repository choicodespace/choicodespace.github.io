import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './components/MainLayout.jsx';
import HomePage from './components/HomePage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import TopPage from './pages/TopPage.jsx';
import ContactUs from './pages/ContactUs.jsx';
import BookNow from './pages/BookNow.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';

import {CartProvider} from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

import PaymentPage from './pages/PaymentPage.jsx';
import PaymentThankYou from './pages/PaymentThankYou.jsx';

// Auth Routes
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ShopPage from './pages/ShopPage.jsx'
import ProductDetailPage from './components/ProductDetailPage.jsx';
import WishlistPage from './pages/WishListPage.jsx';
import CheckoutPage from './pages/CheckOutPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import ThankYou from './pages/ThankYou.jsx';  
import Settings from './pages/SettingsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              {/* Routes WITH NavBar */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/top" element={<TopPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/book" element={<BookNow />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
              </Route>

              {/* Public Routes */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin-dashboard" element={
                  <AdminDashboard />
              } />

              {/* Protected Routes */}
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation" element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              } />
              <Route path="/shipping" element={
                  <ShippingPage />
              } />
              <Route path="/thank-you" element={
                  <ThankYou />
              } />
              <Route path="/payment" element={
                  <PaymentPage />
              } />
              <Route path="/payment-thank-you" element={
                  <PaymentThankYou />
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />


              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
