import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
        {children}
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Layout;
