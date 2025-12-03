"use client";

import Link from 'next/link'
import { useTheme } from "@/app/Context/ThemeContext";

const Footer = () => {

  return (
    <div className='border-t-2 dark:border-gray-700 border-gray-300 w-full bg-gray-50 p-4 dark:bg-gray-800 dark:text-white'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-around'>
        <div>
            <h2 className='font-semibold'>Civic<span className='text-orange-600 dark:text-orange-400'>Voice</span> &copy; {new Date().getFullYear()}</h2>
            <p>Empowering civic engagement with transparency and trust.</p>
        </div>

        <div className='flex flex-col md:gap-2 md:mt-0 mt-4 font-semibold'>
            <div className='flex md:gap-4 md:flex-row flex-col'>
                <Link href="">About us</Link>
                <span className="opacity-70 hidden md:block">•</span>
                <Link href="">Contact us</Link>
                <span className="opacity-70 hidden md:block">•</span>
                <Link href="">Support</Link>
            </div>
            <div className='flex md:gap-4 md:flex-row flex-col'>
                <Link href="">Privacy Policy</Link>
                <span className="opacity-70 hidden md:block">•</span>
                <Link href="">Terms of Services</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
