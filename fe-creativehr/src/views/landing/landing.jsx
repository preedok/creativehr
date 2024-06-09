import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import Navbar from './components/Navbar';
import Header from './components/Header'
import styled from '../../assets/bg1.png'

const Landing = () => {
    return (
        <>
            <Helmet>
                <title>Creative HR | Home</title>
            </Helmet>
            <section className={styled.navbarBackground}>
                <Navbar />
                <div className='mx-12'>
                    <Header />
                </div>
                <div className="text-center p-10">
                    hehe
                </div>
                <div className="text-center p-10">
                    hehe
                </div>
                <div className="text-center p-10">
                    hehe
                </div>
                <div className="text-center p-10">
                    hehe
                </div>
                <div className="text-center p-10">
                    hehe
                </div>
                <div className="text-center p-10">
                    hehe
                </div>
            </section>

        </>
    );
}

export default Landing;

