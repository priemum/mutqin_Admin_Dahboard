import { Fragment, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../Auth/auth.css";
import logo from "../../../assets/Images/logo.svg";
import axios from "axios";

const ForgotPassword = () => {
  const [message, setMessage] = useState(null);
  const [messageError, setMessageError] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Enter your email"),
  });

  const handleSubmit = async (values) => {
    // Handle form submission here

    try {
      const response = await axios.post(
        `https://srv475086.hstgr.cloud/api/forgot_password/`,
        values
      );
      // Assuming the response contains user data
      const userData = response.data;
      console.log(userData);

      setMessage(userData.details);
    } catch (error) {
      // Handle error
      setMessageError("An error occurred");
    }
  };

  return (
    <Fragment>
      <section
        className="d-flex  bg-white   vh-100 justify-content-center align-items-center  "
        dir="ltr">
        <div className=" py-5 pb-5 mb-5 d-flex    flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 ">
          <LazyLoadImage
            alt={"hi"}
            effect="blur"
            src={logo}
            className="h-100 img_xxl"
            opacity="true"
            placeholderSrc={logo}
          />
          <h2 className="mt-5  text-move fw-bolder mt-1 primary  mt-1 ">
            Forgot Password?{" "}
          </h2>
          <p
            style={{ fontSize: "15px", width: "80%" }}
            className="text-move fw-normal mt-1 text-center">
            Don{"'"}t worry! Enter your email address below, and we{"'"}ll send
            you a reset password code.
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="d-flex flex-column justify-content-between w-100 px-5 h-75 ">
                <div>
                  <label
                    htmlFor="email"
                    className=" mb-2 fs_auth text-move fw-bold  primary">
                    Your Email
                  </label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className="input_style_auth ps-4  "
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div style={{ color: "#692BEF" }}>{message}</div>
                <div style={{ color: "red" }}>{messageError}</div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ background: " #692BEF", border: "1px" }}
                  className=" btn-move  mt-3 btn-move text-white">
                  {isSubmitting ? "Sending..." : "Send Reset Instructions"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </Fragment>
  );
};

export default ForgotPassword;
