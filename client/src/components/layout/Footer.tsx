import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaPhone,
  FaMapPin,
  FaMailchimp,
} from "react-icons/fa6";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#F5F1EB] text-black px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
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
            <h2 className="text-2xl font-[Playfair_Display]">
              Bethany Cushy Homes
            </h2>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              Premium Airbnb stays, professional cleaning services, and
              hospitality experiences in Kisii.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 mt-6">
              <a href="#" className="hover:text-[#C8A24A] transition">
                <FaInstagram size={20} />
              </a>

              <a href="#" className="hover:text-[#C8A24A] transition">
                <FaFacebook size={20} />
              </a>

              <a href="#" className="hover:text-[#C8A24A] transition">
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>

            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <a href="#home" className="hover:text-black">
                  Home
                </a>
              </li>
              <li>
                <a href="#stays" className="hover:text-black">
                  Stays
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-black">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-black">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>

            <div className="space-y-4 text-gray-600 text-sm">
              <div className="flex items-center gap-3">
                <FaPhone size={16} />
                <span>+254 7XX XXX XXX</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMailchimp size={16} />
                <span>bookings@bethanycushyhomes.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapPin size={16} />
                <span>Kisii Town, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Bethany Cushy Homes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
