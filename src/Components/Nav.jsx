import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Nav = () => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [user, setUser] = useState(null);
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setIsLoggedIn(true);
            const storedUserInfo = JSON.parse(userInfo);
            setProfileImage(storedUserInfo.profileImage);
            setUser(storedUserInfo);
        }
    }, []);

    const search = () => {
        setHidden(!hidden);
    };

    const signOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('userInfo');
    };

    const navItems = [
        { id: 1, text: 'Home' },
        { id: 2, text: 'All Categories' },
        { id: 3, text: 'About' },
        { id: 4, text: 'Blog' },
        { id: 5, text: 'Contact' },
    ];

    return (
        <div className='flex justify-between items-center h-12 max-w-[1240px] mx-auto px-4 text-white'>
            {/* Logo */}
            <div className="flex items-center space-x-1">
                <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className="h-6" alt="Logo" />
                <img src="./public/logo.png" className="h-6" alt="Logo" />
            </div>

            {/* Desktop Navigation */}
            <ul className='sm:hidden '>
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className='p-4 rounded-xl m-2 cursor-pointer duration-300 text-gray-700 hover:text-green-600'
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
            <div className="flex items-center space-x-4 ">
                {!hidden && (
                    <div className="flex items-center bg-white shadow-inner rounded-full">
                        <input className="input rounded-full px-4 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300" placeholder="Search..." type="text" />
                        <button onClick={search} className="h-8 w-8">
                            <img src="https://img.icons8.com/ios/50/multiply.png" alt="Close" />
                        </button>
                    </div>
                )}
                {hidden && (
                    <button onClick={search} className="bg-white p-2 rounded-full">
                        <img className="h-8" src="https://img.icons8.com/ios/50/search--v1.png" alt="Search" />
                    </button>
                )}
                {isLoggedIn ? (
                    <div className="relative">
                        <button className={`bg-white rounded-full p-2 ${window.location.pathname === '/profile' ? 'ring-2 ring-blue-500' : ''}`} onClick={toggleProfileDropdown}>
                            {profileImage ? (
                                <img className="h-8 w-8 rounded-full" src={profileImage} alt="User Profile" />
                            ) : (
                                <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </button>
                        {isProfileDropdownOpen && <ProfileDropdown user={user} onLogout={signOut} />}
                    </div>
                ) : (
                    <Link to="/signin" className="text-white rounded-full px-4 py-2 flex items-center" style={{ background: "#00b106" }}>
                        Sign In
                    </Link>
                )}
                <button className="bg-white rounded-full p-2">
                    <img className="h-8" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="Cart" />
                </button>
            </div>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNav} className='block lg:hidden'>
                {nav ? <AiOutlineClose size={20} color="black" /> : <AiOutlineMenu size={20} color="black" />}
            </div>

            {/* Mobile Navigation Menu */}
            {nav && (
                <div className="fixed top-12 right-0 z-10 w-1/3 h-auto bg-black transition-transform duration-300 ease-in-out rounded-md lg:hidden">
                    <ul className='p-4'> 
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className='p-4 rounded-xl m-2 cursor-pointer duration-300 text-white hover:text-green-600 bg-gray-800 '
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Nav;
