"use client";

import { useTheme } from "@/app/Context/ThemeContext";
import Link from "next/link";
import React, { useState } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { darkMode, toggletheme } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="p-2 flex justify-between bg-white dark:bg-gray-800 dark:text-white shadow-md md:justify-between md:pl-8 pl-2 md:pr-20 pr-2 transition-all duration-300">

      {/* Logo */}
      <h2 className="font-bold text-2xl">
        Civic<span className="text-orange-600 dark:text-orange-400">Voice</span>
      </h2>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {/* Theme Toggle (Desktop) */}
        <span onClick={toggletheme} className="cursor-pointer">
          {darkMode ? (
            <FaSun className="text-2xl text-yellow-400" />
          ) : (
            <FaMoon className="text-2xl" />
          )}
        </span>

        <Link href="/SignUp" className="px-4 py-2 rounded-md bg-blue-600 text-white dark:bg-blue-500 cursor-pointer font-semibold">
          Sign Up
        </Link>
      </div>

      {/* Mobile Right Section */}
      <div className="flex md:hidden items-center gap-6">

        {/* Hamburger / Close */}
        <div
          onClick={() => setMobileMenu(!mobileMenu)}
          className="cursor-pointer text-2xl"
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="absolute top-12 border-t-2 border-gray-100 dark:border-gray-800 right-0 bg-white dark:bg-gray-900 w-full shadow-lg p-6 flex flex-col gap-4 md:hidden">

          {/* Theme toggle row with text + icon */}
          <div
            onClick={toggletheme}
            className="flex gap-4 items-center cursor-pointer"
          >
            {darkMode ? (
              <FaSun className="text-2xl text-yellow-400" />
            ) : (
              <FaMoon className="text-2xl" />
            )}
            <p className="text-lg font-medium">
              {darkMode ? "Light" : "Dark"}
            </p>
          </div>

          {/* Sign Up Button */}
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white dark:bg-blue-500 font-semibold w-fit">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
