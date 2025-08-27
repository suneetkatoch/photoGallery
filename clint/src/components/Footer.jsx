import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
function Footer() {
  return (
    <footer className="h-15 shadow-md border-t ">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2 ">
        <p >© All Rights Reserved 2024</p>
        <div className="flex justify-center items-center gap-4 text-2xl">
          <a className="hover:text-primary-100" href="https://www.facebook.com/">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/">
          <AiFillInstagram />

          </a>
          <a href="https://www.youtube.com/">
          <FaYoutube />
          </a>
          <a href="https://www.whatsapp.com/">
          <IoLogoWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
