import React from 'react';
import brgLogo from '../assets/brgLogo.png'
const Header = () => {
    return (
        <div className='flex items-center  h-[100px] w-screen bg-[#99CDA9] fixed z-9999 shadow-2xl  '>
            <img src={brgLogo} alt="Barangay logo" className='h-20 m-10' />
            <p className='font-bold text-3xl'>Barangay Lidong Sto. Domingo Albay</p>
        </div>
    );
};

export default Header;