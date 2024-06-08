import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import Button from "@mui/material/Button";
import { useLocation } from 'react-router-dom';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import logout from "../../assets/logout.png";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { clearAuth } from "../../utils/token";
import Swal from "sweetalert2";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const dataUser = localStorage.getItem('role')
    const isAdminP2 = dataUser && dataUser.includes("P2");
    const [activeMenu, setActiveMenu] = useState('dashboard');
    useEffect(() => {
        if (currentPath === '/dashboard') {
            setActiveMenu('dashboard');
        } else if (currentPath === '/transaction') {
            setActiveMenu('transaction');
        }
    }, [currentPath]);

    const handleMenuClick = (menu, path) => {
        setActiveMenu(menu);
        if (currentPath !== path) {
            setActiveMenu(menu);
        } else {
            setIsSidebarOpen(false);
        }
    };
    const handleMenuMonitoring = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    }
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const handleSubMenuItemClick = (submenuItem) => {
        console.log(`Clicked on submenu item: ${submenuItem}`);
    };
    const handleMenuLog = () => {
        setIsSubMenuOpenLog(!isSubMenuOpenLog);
    }
    const [isSubMenuOpenLog, setIsSubMenuOpenLog] = useState(false);
    const handleSubMenuItemClickLog = (submenuItem) => {
        console.log(`Clicked on submenu item: ${submenuItem}`);
    };
    const handleMenuSetting = () => {
        setIsSubMenuOpenSetting(!isSidebarOpenSetting);
    }
    const [isSidebarOpenSetting, setIsSubMenuOpenSetting] = useState(false);
    const handleSubMenuItemClickSetting = (submenuItem) => {
        console.log(`Clicked on submenu item: ${submenuItem}`);
    };
    const navigate = useNavigate();
    // const devices = import.meta.env.VITE_REACT_APP_API_URL_DEVICES
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };
    const onLogout = () => {
        Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Please wait...',
                    text: 'Currently processing ',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
                setTimeout(() => {
                    Swal.close();
                }, 1000);
                setTimeout(() => {
                    clearAuth();
                    navigate('/');
                }, 1200);
            }
        });
    };
    return (
        <>
            {/* Side Bar Navigation */}
            <div className={`fixed top-0 left-0 ${isSidebarOpen ? 'w-[275px] ' : 'w-[120px] '} rounded-[35px] h-[95%] transition-transform`} aria-label="Sidebar" style={{ zIndex: 99 }}>
                <div className="h-full flex flex-col bg-[#0F2167] m-5 rounded-[35px]">
                    <div className={`flex ${isSidebarOpen ? "bg-[#0F2167]  flex h-[70px] rounded-[35px]" : " bg-[#fffff] py-3 px-3 flex h-[70px] rounded-[35px]"}`} style={{ zIndex: 2 }}>
                        {isSidebarOpen ? (
                            <div className='flex '>
                                <img onClick={() => setIsSidebarOpen(!isSidebarOpen)} src={logo} style={{ width: '170px', height: '120px' }} className={`px-3 mt-[-15px] me-[85px] ms-[-40px] hidden lg:inline`} alt="Flowbite Logo" />
                                <button style={{ marginTop: '-15px' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <svg className={`w-8 h-8 text-[white] ms-[-35px]`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <svg className={`w-8 ms-1 h-8 text-[#ffffff]`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto pb-4">
                        {isSidebarOpen ? (
                            <div className="flex px-3 mt-4 flex-col items-center">
                                <div className="flex flex-col bg-[#9BB8CD] items-center m-auto py-2 px-12 rounded-lg">
                                    <div className='ms-1'>
                                        <img src={logout} alt="Logout Icon" width={70} height={70} />
                                    </div>
                                    <div className='flex text-center justify-center flex-col mt-2'>
                                        <h5 className='text-[white]' style={{ fontSize: '18px', fontWeight: '600' }}>{localStorage.getItem('fullname')}</h5>
                                        <h6 className='text-[#f6a682]' style={{ fontSize: '12px', fontWeight: '600' }}>{localStorage.getItem('role')}</h6>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <div className="flex gap-2 items-center m-auto bg-[#9BB8CD] py-5 px-4 rounded-lg">
                                    <img src={logout} alt="Logout Icon" width={40} height={40} />
                                </div>
                            </div>
                        )}

                        <ul className="space-y-2 font-medium mt-6 ms-2 px-4">
                            {isSidebarOpen && <p className='mb-[25px] font-bold text-white'>MENU UTAMA</p>}
                            <li onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                                <p onClick={() => handleMenuClick('dashboard')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'dashboard' ? 'bg-[#BED1CF] dark:bg-[#BED1CF] text-white' : 'hover:bg-[#BED1CF] dark:hover:bg-[#BED1CF]  group'}`}>
                                    <DashboardIcon />
                                    {isSidebarOpen && <Link to='/dashboard'>Dashboard</Link>}
                                </p>
                            </li>
                            <li onClick={() => navigate('/materi')} style={{ cursor: 'pointer' }}>
                                <p onClick={() => handleMenuClick('materi')} className={`flex gap-3 items-center p-2 rounded-lg text-gray-500 ${activeMenu === 'materi' ? 'bg-[#BED1CF] dark:bg-[#BED1CF] text-white' : 'hover:bg-[#BED1CF] dark:hover:bg-[#BED1CF]  group'}`}>
                                    <CastForEducationIcon />
                                    {isSidebarOpen && <Link to='/materi'>Materi Saya</Link>}
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className='flex justify-start m-6 pb-0'>
                        {isSidebarOpen ? (
                            <Button
                                onClick={onLogout}
                                sx={{ backgroundColor: 'red' }}
                                className='flex w-full justify-start m-4 pb-0'
                                variant='contained' size='small'
                            >
                                <ExitToAppIcon fontSize='small' />
                                Logout
                            </Button>
                        ) : (
                            <p
                                onClick={onLogout}
                                className='flex w-full justify-start ms-2 pb-0'
                                variant='contained' size='small'
                                style={{ cursor: 'pointer' }}

                            >
                                <ExitToAppIcon fontSize='medium' style={{ color: 'red' }} />
                            </p>
                        )}

                    </div>
                </div>
            </div>

        </>
    );
};

export default Sidebar;
