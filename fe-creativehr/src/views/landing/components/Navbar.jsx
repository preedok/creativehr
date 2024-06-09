import React, { useState, useEffect } from 'react';
import logo from '../../../assets/logo.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <nav className={`bg-white ${isScrolled ? 'shadow-md fixed w-full' : ''}`} style={{ transition: 'opacity 0.6s, height 0.6s' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="w-[100px] h-[90px]" />
                        <span className="text-gray-800 ms-[-20px] text-xl font-semibold">Creativehr</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-9">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out">Home</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out">About Us</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out">Products</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out">Blog</a>
                        <div className="relative">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out focus:outline-none flex items-center">
                                Training <ArrowDropDownIcon className="ml-1" />
                            </button>
                            {isOpen && (
                                <ul className="absolute bg-white shadow-md mt-2 py-2 rounded w-48">
                                    <li><a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">Regular Training</a></li>
                                    <li><a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">In House Training</a></li>
                                    <li><a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">Video Training</a></li>
                                    <li><a href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">Webinar</a></li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="space-x-4">
                        <button className="text-white bg-[#feba5b] hover:bg-blue-600 transition-colors duration-200 ease-in-out px-9 rounded-full py-2">Login</button>
                        <button className="text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 ease-in-out px-7 rounded-full py-2">Register</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
