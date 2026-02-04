import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between mt-16">
      <h3 className="font-roboto text-xl text-zinc-50">BuddyBuild</h3>
      <ul className="flex items-center justify-center gap-4">
        <li className="text-zinc-300 font-poppins text-xs cursor-pointer hover:text-zinc-50 transition-all duration-300">
          About
        </li>
        <li className="text-zinc-300 font-poppins text-xs cursor-pointer hover:text-zinc-50 transition-all duration-300">
          Features
        </li>
        <li className="text-zinc-300 font-poppins text-xs cursor-pointer hover:text-zinc-50 transition-all duration-300">
          Pricing
        </li>
        <li className="text-zinc-300 font-poppins text-xs cursor-pointer hover:text-zinc-50 transition-all duration-300">
          Contact
        </li>
      </ul>
      <p className="text-zinc-500 font-poppins text-xs">
        © 2026 BuddyBuild. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
