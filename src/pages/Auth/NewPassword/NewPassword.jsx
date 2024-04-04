import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../Auth/auth.css";
import logo from "../../../assets/Images/logo.svg";

import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const NewPassword = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Enter the password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Must match the entered password")
      .required("Enter password confirmation"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // You can make an API call to change the password
      try {
        const response = await axios.post(
          `https://srv475086.hstgr.cloud/api/reset_password/${id}`,
          values
        );

        // Assuming the response contains user data
        const userData = response.data;
        setMessage(userData.details);

        navigate("/signin");
      } catch (error) {
        // Handle error

        // Assuming there's a response with error data
        const userDataError = error.response.data;

        // Display error message
        setMessage("Error occurred.", userDataError);
      }
    },
  });

  return (
    <section
      className="d-flex justify-content-center  ar  "
      dir="rtl">
      <div className=" py-5  d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 ">
        <LazyLoadImage
          alt={"hi"}
          effect="blur"
          src={logo}
          className="h-100 img_xxl"
          opacity="true"
          placeholderSrc={logo}
        />
        <h2 className="mt-5 text-move fw-bolder mt-1 text-move">
          Create a New Password
        </h2>
        <p
          style={{ fontSize: "15px", width: "80%" }}
          className="text-move fw-normal mt-1 text-center">
          Please enter your new password with confirmation. Your new password
          will require you to log in again.
        </p>

        <form
          className="d-flex flex-column justify-content-between w-100 px-5 h-75 "
          onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-column gap-2">
            <label
              htmlFor="password"
              className="fs_auth fw-bold  text-move">
              Password
            </label>
            <span className=" span_input">
              <input
                id="password"
                type="password"
                className="input_style_auth ps-4"
                placeholder=" Password"
                {...formik.getFieldProps("password")}
              />
            </span>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}

            <label
              htmlFor="confirmPassword"
              className="fs_auth fw-bold  text-move">
              Confirm Password
            </label>
            <span className=" span_input">
              <input
                id="confirmPassword"
                type="password"
                className="input_style_auth ps-4"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
              />
              {/* ... */}
            </span>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <div className=" text-text-move">{message}</div>
          <button
            type="submit"
            style={{ background: "#ed5ab3", border: "1px" }}
            className="btn-move mt-3 fs_auth">
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewPassword;
