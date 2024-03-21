import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 dark:text-white light:text-black sm:text-xl rounded md:p-0 hover:text-black dark:hover:bg-black dark:hover:text-white light:hover:bg-white light:hover:text-black"
    >
      {title}
    </Link>
  );
};

export default NavLink;
