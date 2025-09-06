import React from 'react';
import { Link } from 'react-router-dom';
import useMenuStore from '../../../store/store';
import { Button } from "../ui/button";
import { Menu, X } from 'lucide-react';
import {BlurFade} from "../../components/magicui/blur-fade"

function Navbar() {
  const { isOpen, toggleMenu, closeMenu } = useMenuStore();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Books", path: "/all-books" },
    { name: "Cart", path: "/cart" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="w-full bg-secondary border-b border-black px-4 md:px-8 py-4 flex items-center justify-between">
      <BlurFade delay={0.5}>
      <div className="flex items-center gap-4">
        <img src="/purepage.svg" alt="PurePage Logo" className="h-6 w-6 shadow-2xl" />
        <Link to="/">
          <h1 className="font-semibold text-lg md:text-2xl">PurePage</h1>
        </Link>
        
      </div>
      </BlurFade>
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className="text-black hover:text-primary transition-colors"
          >
            <BlurFade delay={0.75}>
            {link.name}
            </BlurFade>
          </Link>
          
        ))}
      </div>

      
        <BlurFade delay={1} className="">
      <div className="hidden md:flex items-center gap-4">
        <Button className="hover:bg-primary/80">Sign-up</Button>
        <Button className="hover:bg-primary/80">Login</Button>
      </div>
      </BlurFade>

      {/* Mobile layout */}
      
       <div className="sm:block md:hidden flex items-center gap-4">
        <Button className="hover:bg-primary/80">Sign-up</Button>
        <Button className="hover:bg-primary/80">Login</Button>
      </div>

      {/* Mobile Menu Button */}
      <Button className="md:hidden" onClick={toggleMenu}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="transition-transform duration-400 absolute top-[69px] left-0 w-full bg-secondary flex flex-col items-center md:hidden shadow-lg z-50 py-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="text-black hover:text-primary py-2"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
      )}
      
    </nav>
  );
}

export default Navbar;
