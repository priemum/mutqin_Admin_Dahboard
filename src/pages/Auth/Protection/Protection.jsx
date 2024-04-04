import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../SignIn/SignIn";

const Protection = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const is_staff = localStorage.getItem("is_staff");

  useEffect(() => {
    if (token && is_staff == "false") {
      navigate("/signin");
    }
  }, [token, is_staff]);

  return token && is_staff == "true" ? children : null;
};

export default Protection;
