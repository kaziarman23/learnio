import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-black text-white">
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link className="link link-hover">Web Development</Link>
        <Link className="link link-hover">App Development</Link>
        <Link className="link link-hover">Game Development</Link>
        <Link className="link link-hover">Grapic deginer</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <Link className="link link-hover">Teach on Learnio</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <FaFacebook className="w-8 h-8 cursor-pointer" />
          <FaInstagram className="w-8 h-8 cursor-pointer" />
          <FaTwitter className="w-8 h-8 cursor-pointer" />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
