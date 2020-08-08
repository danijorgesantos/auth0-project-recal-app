import React from 'react';
import uni from "./icons/uni.svg"

const Navbar = () => {
  return (
    <nav className="x-header main-navigation">
      <img src={uni} className="img-size-nav" alt="logo" />
    </nav>
  );
};

export default Navbar;
