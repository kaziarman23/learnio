import { Outlet } from "react-router";
import Navbar from "../pages/Share/Navbar";

const Root = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
