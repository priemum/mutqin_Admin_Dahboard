import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarAdmin from "./NavBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import "./Adminlayout.css";
import { PiArrowFatLineRightFill } from "react-icons/pi";

const Adminlayout = () => {
  const [open, setOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" lay-out px-2  gap-4 d-flex">
      {open && (
        <aside className="   admin-side-bar">
          <SideBarAdmin setOpen={setOpen} />
        </aside>
      )}
      <div className=" position-relative">
        <PiArrowFatLineRightFill
          style={
            open
              ? {
                  transform: "rotate(180deg)",
                  transition: " ease",
                  transitionDuration: "1000ms",
                }
              : { transition: "ease", transitionDuration: "1000ms" }
          }
          onClick={() => setOpen(!open)}
          className="  closeIcon  top-50"
        />
      </div>
      <div className=" flex-grow-1">
        <header>
          <NavBarAdmin />
        </header>
        <div className=" me-auto  dashboard-container  ">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Adminlayout;
