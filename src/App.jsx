import React, { useState, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import Footer2 from './Components/Footer/Footer2';
import Home from './Components/Home';
import Cart from "./Components/Cart&Payment/Cart";
import PlaceOrder from './Components/Cart&Payment/PlaceOrder'; 

const Sign_in = lazy(() => import('./Components/Sign_in'));
const Sign_up = lazy(() => import('./Components/Sign_up'));
const LazyUserProfile = lazy(() => import('./Components/Profile/UserProfile'));
const LazyWhoWeAre = lazy(() => import('./Components/Footer/WhoWeAre'));
const LazyBlog = lazy(() => import('./Components/Footer/Blog'));
const LazyContact = lazy(() => import('./Components/Footer/Contact'));
const LazyFAQ = lazy(() => import('./Components/Footer/FAQ'));

function App() {
  const [category, setCategory] = useState("All");

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow">
        <Suspense
          fallback={
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-green-500 text-white text-center">
              <img src="/logo.png" alt="Hawkers Logo" className="w-20 h-20 mb-4 object-cover" />
              <h1 className="text-4xl font-bold">HAWKERS</h1>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home category={category} setCategory={setCategory} />} />
            <Route path="/signin" element={<Sign_in />} />
            <Route path="/signup" element={<Sign_up />} />
            <Route path="/profile" element={<LazyUserProfile />} />
            <Route path="/who-we-are" element={<LazyWhoWeAre />} />
            <Route path="/blog" element={<LazyBlog />} />
            <Route path="/faq" element={<LazyFAQ />} />
            <Route path="/contact-us" element={<LazyContact />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} /> 
          </Routes>
        </Suspense>
      </div>
      <Footer2 />
    </div>
  );
}

export default App;
