import React, { useState, lazy, Suspense, useEffect, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import Nav from './Components/Nav';
import Footer2 from './Components/Footer/Footer2';
import Home from './Components/Home';
const Cart = lazy(() => import("./Components/Cart&Payment/Cart"));
const PlaceOrder = lazy(() => import('./Components/Cart&Payment/PlaceOrder'));
const Sign_in = lazy(() => import('./Components/Sign_in'));
const Sign_up = lazy(() => import('./Components/Sign_up'));
const UserProfile = lazy(() => import('./Components/Profile/UserProfile'));
const WhoWeAre = lazy(() => import('./Components/Footer/WhoWeAre'));
const Blog = lazy(() => import('./Components/Footer/Blog'));
const Contact = lazy(() => import('./Components/Footer/Contact'));
const FAQ = lazy(() => import('./Components/Footer/FAQ'));

function App() {
  const [category, setCategory] = useState("All");
  // const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("App.jsx isLoggedIn:", isLoggedIn);
  //   if (!isLoggedIn) {
  //     navigate("/signin");
  //   }

  // }, [navigate, isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow">
        <Suspense
          fallback={
            <div className="w-screen h-screen flex flex-col items-center justify-center text-center bg-green-500 text-white">
              <div className="loader mt-4">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <style jsx>{`
                .loader {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .dot {
                  width: 12px;
                  height: 12px;
                  margin: 0 6px;
                  background-color: white;
                  border-radius: 50%;
                  animation: bounce 1.2s infinite ease-in-out;
                }
                @keyframes bounce {
                  0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                  }
                  40% {
                    transform: translateY(-20px);
                  }
                  60% {
                    transform: translateY(-10px);
                  }
                }
              `}</style>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home category={category} setCategory={setCategory} />} />
            <Route path="/signin" element={<Sign_in />} />
            <Route path="/signup" element={<Sign_up />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact-us" element={<Contact />} />
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
