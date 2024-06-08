import React, { useState } from 'react'
import ContentCard from '../../../components/card-content/ContentCard';
import { Helmet } from "react-helmet";
import Box from '@mui/material/Box';

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>Creative HR | Dashboard</title>
            </Helmet>
            <section className="p-6 mx-8 mt-16 rounded-lg w-full">
                <div className='mt-[-40px] ms-2 mb-3'>
                    <h2 className='text-[30px]' style={{ fontWeight: '700' }}>Hai, Deni Rahmadani !</h2>
                    <p className='text-gray-500'>Ayo semangat belajar hari ini</p>
                </div>
                <ContentCard>
                    <div className="flex">
                        <Box sx={{ width: '100%', typography: 'body1', zIndex: 1 }}>
                            hehe
                        </Box>
                    </div>
                </ContentCard>
            </section>
        </>
    );
};

export default Dashboard;
