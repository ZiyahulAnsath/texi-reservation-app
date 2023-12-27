import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";

// const links = ["Services", "Blog", "About"];

// const styles = {
//   hover_Effect: "hover:text-[#F68519] my-8 text-[30px]",
// };

const Navbar = () => {
  //   const [menuOpen, setMenuOpen] = useState(false)
  //   const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    // <nav className="bg-gray-200 h-12 w-full shadow-xl rounded-none">
    //   {/* Desktop Menu */}
    // </nav>
    <div className="flex justify-between p-2 md:px-10 border-b-[2px] shadow-sm">
      <div className="flex gap-10">
        <Image src="/next.svg" alt="logo" width={100} height={60} />
        <div className="flex gap-6">
          <h4 className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all">
            Home
          </h4>
          <h4 className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all">
            History
          </h4>
          <h4 className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all">
            Help
          </h4>
        </div>
      </div>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
