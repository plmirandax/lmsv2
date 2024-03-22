"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from './MenuOverlay'
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation"
import { LoginModal } from '../../components/forms/loginModal'

const navLinks = [
  {
    title: "About Us",
    path: "#about",
  },
  {
    title: "Properties",
    path: "#projects",
  },
  {
    title: "Contact Us",
    path: "#contact",
  },
];

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const router = useRouter()

  return (
    
    <nav className="fixed mx-auto border top-0 left-0 right-0 z-10 bg-white dark:bg-[#070713] light:bg-white">
      <div className="flex container lg:py-4 flex-wrap items-center justify-center mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl font-semibold dark:text-white light:text-black mr-auto"
        >
          <Image
            rel="preload" fetchPriority="high"
            src="/images/rdrdc.webp"
            alt="hero image"
            className="absolute transform translate-x -translate-y top-2.5 left-8 dark:text-white light:text-black"
            width={40}
            height={40}
          />
        </Link>
        <div className="menu hidden md:block md:w-auto dark:text-white light:text-black" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 dark:text-white light:text-black">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex ml-auto space-x-4 pr-24"> {/* Increased right padding to 4rem (64px) */}
          <LoginModal />
          <ModeToggle />
        </div>
        <div className="mobile-menu block md:hidden dark:text-white light:text-black">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded dark:text-white light:text-black"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  )
}

export default Navbar