import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import GallerySection from './components/GallerySection';
import WhyChooseSection from './components/WhyChooseSection';
import LeadershipSection from './components/LeadershipSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAdmissions from './pages/admin/AdminAdmissions';
import AdminContacts from './pages/admin/AdminContacts';
import AdminGallery from './pages/admin/AdminGallery';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <GallerySection />
      <WhyChooseSection />
      <LeadershipSection />
      <CTASection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/life-at-gos" element={<Home />} />
          <Route path="/campuses" element={<Home />} />
          <Route path="/admissions" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/gallery" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/admissions" 
            element={
              <ProtectedRoute adminOnly>
                <AdminAdmissions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/contacts" 
            element={
              <ProtectedRoute adminOnly>
                <AdminContacts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/gallery" 
            element={
              <ProtectedRoute adminOnly>
                <AdminGallery />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/announcements" 
            element={
              <ProtectedRoute adminOnly>
                <AdminAnnouncements />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
