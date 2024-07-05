import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{display:"flex", gap:"20px"}}>
        <Link to="/board">Board</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
   
    </nav>
  );
};

export default Navbar;
