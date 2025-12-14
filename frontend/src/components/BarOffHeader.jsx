import React from 'react';
import brgLogo from '../assets/brgLogo.png'

const BarOffHeader = () => {
    return (
        <div className='flex items-center  h-[100px] w-screen bg-amber-300 fixed top-0 left-0 z-50 shadow-2xl mb-20'>
                    <img src={brgLogo} alt="Barangay logo" className='h-20 m-10' />
                    <p className='font-bold text-3xl'>Barangay Lidong Sto. Domingo Albay</p>
        </div>
    );
};

export default BarOffHeader;