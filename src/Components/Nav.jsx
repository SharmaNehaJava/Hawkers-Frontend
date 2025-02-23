import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { AuthContext } from '../context/AuthContext.jsx';
import { HashLink } from 'react-router-hash-link';
import CartContext from '../context/cartContext.jsx';

import axios from '../api/apiInstances.js';

const Nav = () => {
    const { addToCart, removeFromCart, updateCart } = useContext(CartContext);

    const { isLoggedIn, login } = useContext(AuthContext);
    const [hidden, setHidden] = useState(true);
    const [nav, setNav] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [user, setUser] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [activeItem, setActiveItem] = useState(null); // Track active nav item

    const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const { cart } = useContext(CartContext);
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        debouncedSearch(e.target.value);
    };

    useEffect(() => {
        if (!isSearchVisible) {
            setSearchQuery('');
            setSearchResults([]);
            setNoResults(false);
        }
    }, [isSearchVisible]);

    const debouncedSearch = useCallback(
        debounce((query) => {
            if (query) {
                setIsLoading(true);
                axios.get(`/api/products/search?name=${query}`)
                    .then(response => {
                        setSearchResults(response.data);
                        setNoResults(response.data.length === 0);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching search results:', error);
                        setIsLoading(false);
                    });
            } else {
                setSearchResults([]);
                setNoResults(false);
            }
        }, 1000),
        []
    );

    const handleNav = () => {
        setNav(!nav);
    };

    const handleNavItemClick = (id) => {
        setActiveItem(id);
    };

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const toggleProfileDropdown = () => {
        setActiveSection(activeSection === 'profile' ? '' : 'profile');
        setIsProfileDropdown(prevState => !prevState);
    };

    const toggleCartPage = () => {
        navigate('/cart');  // Navigate to the Cart page
    };

    const toggleSearchComponent = () => setIsSearchVisible(!isSearchVisible);

    const handleAdd = (item) => {
        const itemInCart = cart.find(cartItem => cartItem.productId === item._id);
        if (itemInCart) {
            updateCart(item._id, itemInCart.quantity + 1);
        } else {
            addToCart(item);
        }
    };

    const handleRemove = (item) => {
        const itemInCart = cart.find(cartItem => cartItem.productId === item._id);
        if (itemInCart.quantity === 1) {
            removeFromCart(item._id);
        } else {
            updateCart(item._id, itemInCart.quantity - 1);
        }
    };

    const navItems = [
        { id: 1, text: 'Home', path: '/' },
        { id: 2, text: 'Product', path: '/#product' },  // Anchor link to #product
        { id: 3, text: 'About', path: '/who-we-are' },
        { id: 4, text: 'Blog', path: '/blog' },
        { id: 5, text: 'Contact', path: '/contact-us' },
    ];
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='fixed top-0 w-full z-50 bg-white shadow-md opacity-90 h-12'>
            <div className='flex justify-between items-center h-12 mx-2 px-4 text-black'>
                <div className="flex items-center space-x-1">
                    <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className="h-6" alt="Logo" />
                    {!isMobile && (
                        <img src="logo.png" alt="HAWKERS" className='h-8' />
                    )}
                    
                </div>

                {!isMobile && (
                    <ul className='hidden lg:flex  space-x-6'>
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                className={`p-2 rounded-xl m-2 cursor-pointer duration-300 text-black hover:text-green-600 hover:scale-105 ${activeItem === item.id ? 'text-green-600' : ''}`}
                                onClick={() => handleNavItemClick(item.id)}
                            >
                                {item.text === 'Product' ? (
                                    <HashLink smooth to={item.path}>
                                        {item.text}
                                    </HashLink>
                                ) : (
                                    <Link to={item.path}>{item.text}</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex items-center space-x-4">
                    {isLoggedIn && (
                        <div
                            onMouseEnter={() => handleMouseEnter('search')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                onClick={toggleSearchComponent} // Toggle search visibility
                                className={`p-2 rounded-full transition-colors duration-300 ${activeSection === 'search' ? 'bg-green-300' : ' hover:bg-green-300'}`}
                            >
                                <img className="h-8" src="https://img.icons8.com/ios/50/search--v1.png" alt="Search" />
                            </button>
                            {isSearchVisible && (
                                <div className="absolute top-12 left-0 right-0 z-50 bg-white shadow-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            placeholder="Search..."
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        <button onClick={toggleSearchComponent} className="ml-2 p-2 bg-red-500 text-white rounded-full">
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        {isLoading && <p>Loading...</p>}
                                        {noResults && <p>No results found</p>}
                                        {searchResults.map(item => {
                                            const itemInCart = cart.find(cartItem => cartItem.productId === item._id);
                                            const quantity = itemInCart ? itemInCart.quantity : 0;
                                            return (
                                                <div key={item._id} className="flex items-center space-x-4 mb-4">
                                                    <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded-lg" />
                                                    <div className="flex-1">
                                                        <span className="block font-medium">{item.name}</span>
                                                        <span className="block text-gray-600">{item.price} Rs</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {quantity === 0 ? (
                                                            <button
                                                                onClick={() => handleAdd(item)}
                                                                className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
                                                            >
                                                                Add
                                                            </button>
                                                        ) : (
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => handleRemove(item)}
                                                                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="mx-2">{quantity}</span>
                                                                <button
                                                                    onClick={() => handleAdd(item)}
                                                                    className="bg-green-500 text-white px-3 py-2 rounded-lg"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                className={`bg-white rounded-full p-2 transition-colors duration-300 ${activeSection === 'profile' ? 'bg-green-300' : ' hover:bg-green-300'}`}
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
                            <div className={`absolute right-0 mt-2 py-2 shadow-lg rounded-lg bg-white ${isProfileDropdown ? 'block' : 'hidden'}`}>
                                <ProfileDropdown />
                            </div>
                        </div>
                    ) : (
                        <Link to="/signin" className="text-white rounded-full px-4 py-2 flex items-center" style={{ background: "#00b106" }}>
                            Sign In
                        </Link>
                    )}

                    {isLoggedIn && (
                        <div
                            onMouseEnter={() => handleMouseEnter('cart')}
                            onMouseLeave={handleMouseLeave}
                            className="relative"
                        >
                            <button
                                className={`p-2 rounded-full transition-colors duration-300 ${false ? 'bg-green-300' : ' hover:bg-green-300'} `}
                                onClick={toggleCartPage}  // Navigate to cart page
                            >
                                <img className="h-8" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="Cart" />
                                {cart.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-orange-300 text-white text-xs rounded-full px-1">
                                        {/* Display a dot if the cart is not empty */}
                                        <span className="block w-2 h-2 bg-red-500 rounded-full"></span>
                                    </span>
                                )}
                            </button>

                            {hoveredItem === 'cart' && (
                                <div className="absolute right-0 mt-2 py-2 shadow-lg rounded-lg bg-ornage-500">
                                    {/* Cart component or function */}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {isMobile && (
                    <button className="lg:hidden" onClick={handleNav}>
                        {nav ? <AiOutlineClose size={20} color="black" /> : <AiOutlineMenu size={24} color="black" />}
                    </button>
                )}
            </div>
            {isMobile && nav && (
                <div className="absolute top-12 right-0 w-48 bg-gray-900 border-2 border-green-500 text-white shadow-lg rounded-lg lg:hidden">
                    <ul className="flex flex-col p-4">
                        {navItems.map((item) => (
                            <li key={item.id} className="py-2 bg-gray-500 px-4 m-1 text-left rounded ">
                                <Link to={item.path} onClick={() => setNav(false)}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default Nav;

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}