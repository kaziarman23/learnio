import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const handleClick = () => {
    toast.error("This is not a real link!");
  };
  return (
    <footer className="bg-gray-300 text-black">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:flex lg:justify-between lg:px-12">
        {/* Brand / About */}
        <div className="mb-10 max-w-sm lg:mb-0">
          <h2 className="text-2xl font-bold text-black">Learnio</h2>
          <p className="mt-4 text-sm leading-6 text-black">
            Unlock your potential with expert-led courses. Learn new skills,
            boost your career, and pursue your passions — all in one place.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <h6 className="mb-4 text-lg font-semibold text-black">Services</h6>
            <ul className="space-y-2">
              <li
                onClick={handleClick}
                className="cursor-pointer hover:text-black"
              >
                Web Development
              </li>
              <li
                onClick={handleClick}
                className="cursor-pointer hover:text-black"
              >
                App Development
              </li>
              <li
                onClick={handleClick}
                className="cursor-pointer hover:text-black"
              >
                Game Development
              </li>
            </ul>
          </div>

          <div>
            <h6 className="mb-4 text-lg font-semibold text-black">Company</h6>
            <ul className="space-y-2">
              <li
                onClick={handleClick}
                className="cursor-pointer hover:text-black"
              >
                About us
              </li>
              <li
                onClick={handleClick}
                className="cursor-pointer hover:text-black"
              >
                Contact
              </li>
              <li
                onClick={handleClick}
                className="cursor-pointer hover:text-black"
              >
                Teach on Learnio
              </li>
            </ul>
          </div>

          <div>
            <h6 className="mb-4 text-lg font-semibold text-black">Follow Us</h6>
            <div className="flex space-x-5">
              <FaFacebook
                onClick={handleClick}
                className="h-6 w-6 cursor-pointer"
              />
              <FaInstagram
                onClick={handleClick}
                className="h-6 w-6 cursor-pointer"
              />
              <FaTwitter
                onClick={handleClick}
                className="h-6 w-6 cursor-pointer"
              />
              <FaLinkedin
                onClick={handleClick}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-black">
        © {new Date().getFullYear()} Learnio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
