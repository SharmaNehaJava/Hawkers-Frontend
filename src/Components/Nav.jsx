import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { AuthContext } from '../context/AuthContext.jsx';
import { HashLink } from 'react-router-hash-link';


const Nav = () => {
    const { isLoggedIn, login } = useContext(AuthContext);
    const [hidden, setHidden] = useState(true);
    const [nav, setNav] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [user, setUser] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [cartItems, setCartItems] = useState([]); // Track cart items
    const navigate = useNavigate();  // Initialize useNavigate hook

    useEffect(() => {
        if (isLoggedIn) {
            const parsedUser = JSON.parse(localStorage.getItem('userInfo'));
            login();
            // setUser(parsedUser);
            setProfileImage(parsedUser.profileImage);
        }

        // Fetch cart items from localStorage or an API
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleNav = () => {
        setNav(!nav);
    };

    // const signOut = () => {
    //     logout();
    //     navigate('/');
    // };

    const toggleProfileDropdown = () => {
        setActiveSection(activeSection === 'profile' ? '' : 'profile');
        setIsProfileDropdown(prevState => !prevState);
    };

    const toggleCartPage = () => {
        navigate('/cart');  // Navigate to the Cart page
    };

    const toggleSearchComponent = () => {
        setHidden(!hidden); // Toggle the visibility of the search component
    };

    const navItems = [
        { id: 1, text: 'Home', path: '/' },
        { id: 2, text: 'Product', path: '/#product' },  // Anchor link to #product
        { id: 3, text: 'About', path: '/who-we-are' },
        { id: 4, text: 'Blog', path: '/blog' },
        { id: 5, text: 'Contact', path: '/contact-us' },
    ];
    
    return (
        <div className='fixed top-0 w-full z-50 bg-white shadow-md opacity-90'>
            <div className='flex justify-between items-center h-12 mx-2 px-4 text-black'>
                <div className="flex items-center space-x-1">
                    <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className="h-6" alt="Logo" />
                    <img src="logo.png" alt="HAWKERS" className='h-8' />
                </div>

                {!isMobile && (
                    <ul className='hidden lg:flex'>
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                className='p-2 rounded-xl m-2 cursor-pointer duration-300 text-black hover:text-green-600 hover:scale-105'
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
                        <button
                            onClick={toggleSearchComponent} // Toggle search visibility
                            className={`p-2 rounded-full transition-colors duration-300 ${activeSection === 'search' ? 'bg-green-400' : 'hover:bg-green-300'}`}
                        >
                            <img className="h-8" src="https://img.icons8.com/ios/50/search--v1.png" alt="Search" />
                        </button>
                    )}

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                className={`bg-white rounded-full p-2 transition-colors duration-300 ${activeSection === 'profile' ? 'bg-green-400' : 'hover:bg-green-300'}`}
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
                        <div className="relative">
                            <button
                                className={`p-2 rounded-full transition-colors duration-300 ${false ? 'bg-orange-500' : 'bg-white hover:bg-green-300'}`}
                                onClick={toggleCartPage}  // Navigate to cart page
                            >
                                <img className="h-8" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="Cart" />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full px-1">
                                        {/* Display a dot if the cart is not empty */}
                                    </span>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {isMobile && (
                    <div className="lg:hidden" onClick={handleNav}>
                        {nav ? <AiOutlineClose size={20} color="black" /> : <AiOutlineMenu size={20} color="black" />}
                    </div>
                )}
            </div>

            {/* Search Component */}
            {!hidden && (
                <div className="absolute top-12 left-0 right-0 z-50 bg-white shadow-lg p-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default Nav;
