import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";

const Footer = () => {
  const handleClick = () => {
    Swal.fire({
      title: "Error!",
      text: "This is not a real link",
      icon: "error",
      confirmButtonText: "Okey",
    });
  };
  return (
    <footer className="footer p-10 bg-[#c7c1c1] text-black">
      <nav>
        <h6 className="footer-title">Services</h6>
        <p onClick={handleClick} className="link link-hover">
          Web Development
        </p>
        <p onClick={handleClick} className="link link-hover">
          App Development
        </p>
        <p onClick={handleClick} className="link link-hover">
          Game Development
        </p>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <p onClick={handleClick} className="link link-hover">
          About us
        </p>
        <p onClick={handleClick} className="link link-hover">
          Contact
        </p>
        <p onClick={handleClick} className="link link-hover">
          Teach on Learnio
        </p>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <FaFacebook
            onClick={handleClick}
            className="w-8 h-8 cursor-pointer"
          />
          <FaInstagram
            onClick={handleClick}
            className="w-8 h-8 cursor-pointer"
          />
          <FaTwitter onClick={handleClick} className="w-8 h-8 cursor-pointer" />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
