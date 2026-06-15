import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#f5f1eb] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
        {/* Logo */}

        <div className="flex items-center">
          <div
            className="
                h-20 w-20 
                md:h-32 md:w-32 
                rounded-full 
                bg-[#F5F1EB] 
                shadow-md 
                flex items-center justify-center
              "
          >
            <img
              src={logo}
              alt="Bethany Cushy Homes"
              className="
                  h-12 w-12 
                  md:h-20 md:w-20 
                  object-contain
                "
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-[17px] font-medium text-black">
          <a href="#home" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#stays" className="relative group">
            Stays
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#services" className="relative group">
            Services
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#about" className="relative group">
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#contact" className="relative group">
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-800 transition">
            Book Now
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-6">
          <div className="flex flex-col gap-6 text-lg font-medium">
            <a href="#home">Home</a>
            <a href="#stays">Stays</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>

            <button className="bg-black text-white py-3 rounded-full mt-2">
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
