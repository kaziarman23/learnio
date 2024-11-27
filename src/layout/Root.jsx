import { Outlet } from "react-router";
import Navbar from "../pages/Share/Navbar";
import Footer from "../pages/Share/Footer";

const Root = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
