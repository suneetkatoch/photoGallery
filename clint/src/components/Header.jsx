import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCartArrowDown } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

import useMobile from "../hooks/useMobile";
import UploadImage1 from "./uploadImage1";


function Header() {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  

  const isSearchPage = location.pathname === "/search";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
 const [ Uploadimage,setUploadimage] = useState(false);
  const handleMobileMenu = () => {
    if (!user._id) {
      navigate("/login");
    } else {
      navigate("/user-menu");
    }
  };
  const token = localStorage.getItem('accessToken');;

  return (
    <header className="sticky top-0 bg-white z-50 shadow-md">
      {!isMobile || !isSearchPage ? (
        
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              width={isMobile ? 120 : 180}
              className="transition-all duration-300"
            />
          </Link>

          {/* Search (Desktop) */}
         

          {/* Account and Cart */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Icon */}
            <button
              onClick={handleMobileMenu}
              className="lg:hidden text-neutral-600 hover:text-green-600 transition"
            >
              <FaUserCircle size={28} />
            </button>

            {/* Desktop User Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {token ? (
                <div>
                  <button>Logout</button>
                  <div>
                   <button onClick={()=>setUploadimage(true)}>Add Image</button>
                  </div>

                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-700 font-medium transition"
                >
                  Login
                </Link>
              )}
              {Uploadimage && <UploadImage1 close={()=>setUploadimage(false)} />}

              {/* Cart Button */}
              
            </div>
          </div>
        </div>
      ) : null}

      
    </header>
  );
}

export default Header;
