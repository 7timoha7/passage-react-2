import Layout from '../components/UI/Layout/Layout';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import WhatsAppButton from '../components/UI/WhatsAppButton/WhatsAppButton';
import DrPluggin from '../components/UI/Dr/DrPluggin';

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Layout>
        <WhatsAppButton />
        <DrPluggin />
        <Outlet />
      </Layout>
    </>
  );
};

export default Home;
