"use client";

import { useTheme } from "@/app/Context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { 
  FaSun, 
  FaMoon, 
  FaBars, 
  FaTimes, 
  FaUserCircle, 
  FaBell 
} from "react-icons/fa";

const Navbar = () => {
  const { darkMode, toggletheme } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const activeClass =
    "bg-orange-600 text-white font-semibold rounded-md px-3 py-1 flex items-center gap-1 transition-colors";

  const inactiveClass =
    "hover:bg-orange-300 hover:text-white rounded-md px-3 py-1 flex items-center gap-1 transition-colors";

  return (
    <div className="p-2 flex justify-between bg-white dark:bg-gray-800 dark:text-white shadow-md md:pl-8 pl-2 md:pr-20 pr-2 transition-all duration-300">

      {/* Logo */}
      <h2 className="font-bold text-2xl">
        Civic<span className="text-orange-600 dark:text-orange-400">Voice</span>
      </h2>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {/* Theme toggle */}
        <span onClick={toggletheme} className="cursor-pointer">
          {darkMode ? (
            <FaSun className="text-2xl text-yellow-400" />
          ) : (
            <FaMoon className="text-2xl" />
          )}
        </span>

        {/* Notifications */}
        <FaBell className="text-2xl cursor-pointer" />

        {/* Profile */}
        <FaUserCircle className="text-3xl cursor-pointer" />
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center gap-6">
        <div onClick={() => setMobileMenu(!mobileMenu)} className="cursor-pointer text-2xl">
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="absolute top-12 right-0 w-full bg-white dark:bg-gray-900 shadow-lg p-6 flex flex-col gap-6 md:hidden">

          {/* theme */}
          <div onClick={toggletheme} className="flex gap-4 items-center cursor-pointer">
            {darkMode ? (
              <FaSun className="text-2xl text-yellow-400" />
            ) : (
              <FaMoon className="text-2xl" />
            )}
            <p className="text-lg font-medium">
              {darkMode ? "Light" : "Dark"}
            </p>
          </div>

          {/* Notifications */}
          <div className="flex gap-4 items-center cursor-pointer">
            <FaBell className="text-2xl" />
            <span>Notifications</span>
          </div>

          {/* Profile */}
          <div className="flex gap-4 items-center cursor-pointer">
            <FaUserCircle className="text-3xl" />
            <span>Profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
