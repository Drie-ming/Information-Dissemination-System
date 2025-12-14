import React from 'react';
import BarOffHeader from '@/components/BarOffHeader';
import BarOffFooter from '@/components/BarOffFooter';
import { Outlet } from 'react-router';

const BarOffiPage = () => {
    return (
        <>
        <BarOffHeader/>
        <Outlet name = "BarOffOutlet"/>
        <BarOffFooter/>
        </>
    );
};

export default BarOffiPage;