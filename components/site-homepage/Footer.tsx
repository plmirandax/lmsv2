
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer border-r z-10 border-t-[#33353F] border-l-transparent border-r-transparent dark:text-white light:text-black">
      <div className="container p-12 flex justify-between">
        <p className="text-slate-600">© 2024 RD Realty Development Corporation.</p>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
