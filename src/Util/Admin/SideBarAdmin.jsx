import React, { useEffect, useState } from "react";
import "./SideBarAdmin.css";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";

const list = [
  { title: "Dashboard", icon: <RxDashboard />, link: "/" },
  { title: "User Dashboard", icon: <FiUsers />, link: "/userdashboard" },
  {
    title: "Registered Users",
    icon: <LuUserCheck />,
    link: "/registeredusers",
  },
  {
    title: "Transactions",
    icon: <PiArrowsCounterClockwise />,
    link: "/transactions",
  },
];

const SideBarAdmin = ({ setOpen }) => {
  const location = useLocation();

  return (
    <div className="  shadow-sm  side-bar-edit  h-100 bg-white w-100">
      <div className=" mb-4  d-flex justify-content-between">
        <div className=" side-title">AI PANEL</div>
        <FaWindowClose
          className=" close-icon"
          onClick={() => setOpen((open) => !open)}
        />
      </div>
      <ul className=" d-flex flex-column fw-normal gap-3 list-unstyled">
        {list.map((page, index) => (
          <li key={index}>
            <Link
              to={page.link}
              className={`${
                location.pathname === page.link
                  ? " isActiveLink "
                  : " text-black "
              }  d-flex    gap-3 w-100 bg align-items-center link-hovers`}>
              {page.icon}
              <div>{page.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="  logout-icon">
        <button className=" w-100 border-0 bg-white p-0 logout-button  d-flex gap-3 align-items-center">
          <CiLogout />
          <div>log out</div>
        </button>
      </div>
    </div>
  );
};

export default SideBarAdmin;
