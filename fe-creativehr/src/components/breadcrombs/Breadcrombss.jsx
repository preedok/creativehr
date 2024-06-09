import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
const Breadcrombss = ({ menu, submenu }) => {
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const navigate = useNavigate();
    return (
        <div className='bg-[#ffffff] px-5 mx-2 w-[98%] py-1 rounded-sm' style={{ borderBottomLeftRadius: '18px', borderLeft: '5px solid #0F2167', borderRight: '5px solid #0F2167' }}>
            <h1 className='text-[#0F2167]' style={{ fontWeight: '600', fontSize: '25px' }}>{menu}</h1>
            <div role="presentation" className='my-3' onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    <HomeIcon onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }} className='mt-[-3px] text-[#0F2167]'/> 
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        {menu}
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href="/material-ui/react-breadcrumbs/"
                        aria-current="page"
                    >
                       {submenu}
                    </Link>
                </Breadcrumbs>
            </div>
        </div>
    );
};

export default Breadcrombss;
