import React from 'react'
import logo from '../../../assets/h.gif'

const Header = () => {
    return (
        <section className={`w-full h-[86vh] flex justify-center items-center px-4 py-2 transition duration-300`}>
            <div className="flex flex-grow justify-center ">
                <div className="text-left mt-[-80px] " style={{ lineHeight: '1.2' }}>
                    <h5 className={`fw-bold mt-5 ms-2`} style={{ fontSize: '50px', fontFamily: 'sans-serif' }} >
                        <span style={{ color: '#B5C18E' }}>Creativehr <br /> <b style={{ color: '#feba5b' }}>Empowering growth through innovative training solutions</b> </span>
                    </h5>
                    <p className={`ms-2 mt-2 fw-bold`} style={{ fontSize: '16px', color: '#595b5b' }}>Join a journey of learning, consulting & transformative programming [B2B | B2G | B2C] !</p>
                </div>
            </div>
            <div className="flex flex-grow justify-center">
                <div className="text-right mt-14">
                    <img
                        style={{ marginBottom: "55px", borderRadius: "25px", width: '1300px', height: '530px' }}
                        src={logo}
                        alt="hero"
                    />
                </div>
            </div>
        </section>
    )
}

export default Header
