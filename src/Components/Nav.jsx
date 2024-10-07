import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import Cart from './Cart&Payment/Cart.jsx'; // Import Cart component

const Nav = () => {
    const [hidden, setHidden] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [user, setUser] = useState(null);
    const [nav, setNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUser = JSON.parse(storedUserInfo);
            setIsLoggedIn(true);
            setUser(parsedUser);
            setProfileImage(parsedUser.profileImage);
        }

        const handleAuthChange = () => {
            const updatedUserInfo = localStorage.getItem('userInfo');
            if (updatedUserInfo) {
                const parsedUser = JSON.parse(updatedUserInfo);
                setIsLoggedIn(true);
                setUser(parsedUser);
                setProfileImage(parsedUser.profileImage);
            } else {
                setIsLoggedIn(false);
                setUser(null);
                setProfileImage(null);
            }
        };

        window.addEventListener('userLogin', handleAuthChange);
        window.addEventListener('userLogout', handleAuthChange);
        window.addEventListener('userDeleted', handleAuthChange);

        return () => {
            window.removeEventListener('userLogin', handleAuthChange);
            window.removeEventListener('userLogout', handleAuthChange);
            window.removeEventListener('userDeleted', handleAuthChange);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1180);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNav = () => {
        setNav(!nav);
    };

    const search = () => {
        setActiveSection(activeSection === 'search' ? '' : 'search');
        setHidden(!hidden);
    };

    const signOut = () => {
        localStorage.removeItem('userInfo');
        window.dispatchEvent(new Event("userLogout"));
        navigate('/');
    };

    const toggleProfileDropdown = () => {
        setActiveSection(activeSection === 'profile' ? '' : 'profile');
        setIsProfileDropdown(prevState => !prevState);
    };

    // Toggle Cart
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const navItems = [
        { id: 1, text: 'Home', path: '/' },
        { id: 2, text: 'All Categories', path: '/categories' },
        { id: 3, text: 'About', path: '/who-we-are' },
        { id: 4, text: 'Blog', path: '/blog' },
        { id: 5, text: 'Contact', path: '/contact-us' },
    ];

    return (
        <div className='relative'>
            <div className='flex justify-between items-center h-12 mx-2 px-4 text-white'>
                {/* Left Section: Logo */}
                <div className="flex items-center space-x-1">
                    <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className="h-6" alt="Logo" />
                    <img src="./public/logo.png" className="h-6" alt="Logo" />
                </div>

                {/* Center Section: Desktop Navigation */}
                {!isMobile && (
                    <ul className='hidden lg:flex'>
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                className='p-2 rounded-xl m-2 cursor-pointer duration-300 text-gray-700 hover:text-green-600 hover:scale-105'
                            >
                                <Link to={item.path}>{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Right Section: Search, Profile, and Cart */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn && (
                        <button
                            onClick={search}
                            className={`p-2 rounded-full transition-colors duration-300 ${activeSection === 'search' ? 'bg-orange-200' : ' bg-green-200'}`}
                        >
                            <img className="h-8" src="https://img.icons8.com/ios/50/search--v1.png" alt="Search" />
                        </button>
                    )}
                    {!hidden && activeSection === 'search' && (
                        <div className="absolute top-14 right-14 flex text-white items-center bg-gray-800 text  shadow-inner rounded-md p-1 z-50">
                            <input
                                className="input rounded-md px-4 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 bg-gray-500"
                                placeholder="Search..."
                                type="text"
                            />
                            <button onClick={search} className="h-8 w-8">
                                <img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/multiply.png" alt="multiply" />
                            </button>
                        </div>
                    )}

                    {/* Profile Section */}
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                className={`bg-white rounded-full p-2 transition-colors duration-300 ${activeSection === 'profile' ? 'bg-orange-500' : 'hover:bg-green-500'}`}
                                onClick={toggleProfileDropdown}
                            >
                                {profileImage ? (
                                    <img className="h-8 w-8 rounded-full" src={profileImage} alt="User Profile" />
                                ) : (
                                    <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </button>

                            {/* Profile Dropdown */}
                            <div className={`absolute right-0 mt-2 py-2 shadow-lg rounded-lg bg-white ${isProfileDropdown ? 'block' : 'hidden'}`}>
                                <ProfileDropdown user={user} onLogout={signOut} />
                            </div>
                        </div>
                    ) : (
                        <Link to="/signin" className="text-white rounded-full px-4 py-2 flex items-center" style={{ background: "#00b106" }}>
                            Sign In
                        </Link>
                    )}

                    {/* Cart Icon */}
                    {isLoggedIn && (
                        <button
                            className={`p-2 rounded-full transition-colors duration-300 ${isCartOpen ? 'bg-orange-500' : 'bg-white hover:bg-green-500'}`}
                            onClick={toggleCart}
                        >
                            <img className="h-8" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="Cart" />
                        </button>
                    )}
                </div>

                {/* Mobile Navigation Icon */}
                {isMobile && (
                    <div className="lg:hidden" onClick={handleNav}>
                        {nav ? <AiOutlineClose size={20} color="black" /> : <AiOutlineMenu size={20} color="black" />}
                    </div>
                )}
            </div>

            {/* Mobile Navigation Menu */}
            {isMobile && nav && (
                <div className="absolute top-12 right-0 z-10 w-1/3 h-auto bg-black transition-transform duration-300 ease-in-out rounded-md lg:hidden">
                    <ul className='space-y-2 p-4'>
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                className='p-4 cursor-pointer text-gray-400 text-sm hover:scale-110'
                                onClick={handleNav}
                            >
                                <Link to={item.path}>{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Cart Component */}
            {isCartOpen && <Cart onClose={toggleCart} />}
        </div>
    );
};

export default Nav;
