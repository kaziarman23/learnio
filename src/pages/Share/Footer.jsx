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
      <footer className="footer bg-[#e9dfad] p-5 text-black sm:grid-cols-3 xl:p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <p onClick={handleClick} className="link-hover link">
            Web Development
          </p>
          <p onClick={handleClick} className="link-hover link">
            App Development
          </p>
          <p onClick={handleClick} className="link-hover link">
            Game Development
          </p>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <p onClick={handleClick} className="link-hover link">
            About us
          </p>
          <p onClick={handleClick} className="link-hover link">
            Contact
          </p>
          <p onClick={handleClick} className="link-hover link">
            Teach on Learnio
          </p>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <FaFacebook
              onClick={handleClick}
              className="h-8 w-8 cursor-pointer"
            />
            <FaInstagram
              onClick={handleClick}
              className="h-8 w-8 cursor-pointer"
            />
            <FaTwitter
              onClick={handleClick}
              className="h-8 w-8 cursor-pointer"
            />
          </div>
        </nav>
      </footer>
  );
};

export default Footer;
