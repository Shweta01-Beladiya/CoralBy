import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ShopAllBrands from "./pages/ShopAllBrands";
import Home from "./pages/home";
import Login from './pages/login';
import Fashion from "./pages/Fashion";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from './Store/store';

import Layout from './pages/Layout';
import Header from './component/Header';

import Wishlists from "./pages/Wishlists";
import Addtocart from './component/Addtocart';
import ProductDetails from './pages/ProductDetails';
import OurBrandPage from './pages/OurBrandPage';
import Profile from './pages/Profile'
import Help_Support from './pages/Help_Support';

import CareerPage from './pages/CareerPage'
import BlogPage from './pages/Blogs';

import TrackOrder from './pages/TrackOrder';
import TermsAndCondition from './pages/TermsAndCondition';
import ContactUs from './pages/ContactUs';
import Privacy_policy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ProductSafety from './pages/ProductSafety';
import ScamWarning from './pages/ScamWarning';
import BlogDetailsPage from './pages/Blogdetails';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/header" element={<Header />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/ShopAllBrands" element={<ShopAllBrands />} />
            <Route path="/addtocart" element={<Addtocart />} />
            <Route path='/profile/:tab' element={<Profile />} />
            <Route path='/prodctDetails' element={<ProductDetails />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path='/HelpAndSupport' element={<Help_Support />} />
            <Route path='/termsAndCondition' element={<TermsAndCondition />} />
            <Route path='/privacyPolicy' element={<Privacy_policy />} />
            <Route path='/returnPolicy' element={<ReturnPolicy />} />
            <Route path='/productSafety' element={<ProductSafety />} />

            <Route path='/blogs' element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/scamwarning' element={<ScamWarning />} />


            <Route path='/ourBrandPage' element={<OurBrandPage />} />
            <Route path='/careerPage' element={<CareerPage />} />
            <Route path='/trackOrder' element={<TrackOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlists />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
