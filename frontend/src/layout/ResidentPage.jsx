import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const ResidentPage = () => {
    return (
        <>
        <Header/>
        <Outlet name = "ResOutlet"/>
        <Footer/>
        </>
    );
};

export default ResidentPage;