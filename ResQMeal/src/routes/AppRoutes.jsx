import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Restaurants from '../pages/Restaurants';
import FoodListing from '../pages/FoodListing';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import TrackOrder from '../pages/TrackOrder';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminPanel from '../pages/AdminPanel';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import DonateNow from '../pages/DonateNow';
import TestimonialsPage from '../pages/TestimonialsPage';
import FoodHistory from '../pages/FoodHistory';
import Inventory from '../pages/Inventory';
import FAQs from '../pages/FAQs';
import Terms from '../pages/Terms';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/food/:restaurantId" element={<FoodListing />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
      <Route path="/track-order/:orderId" element={<PrivateRoute><TrackOrder /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/donate" element={<DonateNow />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/history" element={<PrivateRoute><FoodHistory /></PrivateRoute>} />
      <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;