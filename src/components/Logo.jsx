import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src="/Logo.svg" alt="Logo" className="h-16 mr-20 w-auto" />
    </Link>
  );
};

export default Logo; 