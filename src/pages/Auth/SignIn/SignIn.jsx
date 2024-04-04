import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../Auth/auth.css";
import logo from "../../../assets/Images/logo.svg";
// import google from "../../../assets/Images/google.png";
import { Link } from "react-router-dom";
// import { SiFacebook } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorSignIn, setErrorSignIn] = useState("");
  // const emailFromLocal = localStorage.getItem("email");
  // const passwordFromLocal = localStorage.getItem("password");
  // const token = localStorage.getItem("token");
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Enter email"),
      password: Yup.string().required("Enter password"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://srv475086.hstgr.cloud/api/user/login/`,
          values
        );

        // Assuming the response contains user data
        const userData = response.data;
        const tokenKey = userData.tokens.access;
        console.log(userData.user.is_staff);
        // Save token to localStorage
        if (checkBoxValue) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        localStorage.setItem("token", tokenKey);
        localStorage.setItem("is_staff", userData.user.is_staff);

        if (userData.user.is_staff) {
          navigate("/userdashboard");
        }
        // navigate("/ChatRoutes");
        // window.location.reload();
      } catch (error) {
        // Handle error
        setErrorSignIn(error);
      }
    },
  });

  return (
    <section
      className="d-flex justify-content-center align-items-center  bg-white "
      dir="ltr">
      <div className="d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 h_vh_IN">
        <LazyLoadImage
          alt={"hi"}
          effect="blur"
          src={logo}
          className="h-100 img_xxl"
          opacity="true"
          placeholderSrc={logo}
        />
        <form
          className="mt-5 d-flex flex-column gap-1 align-content-end w-100 px-5  gap-2"
          onSubmit={formik.handleSubmit}>
          <label
            htmlFor="email"
            className=" fs_auth fw-bold  text-move">
            Your Email{" "}
          </label>
          <input
            id="email"
            type="text"
            className="input_style_auth px-4"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
          <label
            htmlFor="password"
            className="fs_auth fw-bold  text-move">
            Password
          </label>
          <span className=" span_input">
            <input
              id="password"
              type="password"
              className="input_style_auth px-4"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
          </span>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
          <div className="form-check fw-bold  text-move">
            <input
              className="form-check-input"
              type="checkbox"
              value={checkBoxValue}
              onChange={() => setCheckBoxValue(!checkBoxValue)}
              id="flexCheckDefault"
            />
            <label
              className="form-check-label fs_auth"
              htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <div className=" text-center text-danger">{errorSignIn}</div>
          <button
            type="submit"
            className="button_auth fs_auth"
            style={{ background: "#ed5ab3", border: "1px" }}>
            Sign In
          </button>
        </form>
        {/* <p className=" fw-normal my-2  text-muted ">Or sign in with</p> */}

        <div className="d-flex flex-column gap-3 align-content-end w-100 px-5  gap-2">
          {/* <button className="button_auth fs_auth">
            Sign in with Google
            <LazyLoadImage
              alt={"hi"}
              effect="blur"
              src={google}
              className="h-100"
              opacity="true"
              placeholderSrc={google}
            />
          </button> */}

          {/* <button className="button_auth fs_auth">
            Sign in with Facebook
            <SiFacebook className=" white fs-5" />
          </button> */}
        </div>
        <Link
          to="/forgotpassword"
          className="mt-4 fs-6 text-black-50 ">
          Forgot your password?
        </Link>
        {/* <span className="mt-4 d-flex gap-2">
          <p className=" fs-6 text-black-50">Do not have an account?</p>
          <Link
            to="/signup"
            className="fs-6 fw-bolder  text-move    ">
            Create an account
          </Link>
        </span> */}
      </div>
    </section>
  );
};

export default SignIn;
