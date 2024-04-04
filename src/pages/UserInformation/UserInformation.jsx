import imguser from "../../assets/Images/UserInfo/Ellipse 3250.svg";
import "./UserInformation.css";
import { CiEdit } from "react-icons/ci";
import { CiCreditCard2 } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import UserDetails from "./UserDetails";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slices/apiSlice";
import { useParams } from "react-router-dom";

function UserInformation() {
  const { userId } = useParams();
  console.log("params", userId);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchData({ endpoint: `admin-dash/user-management-info/${userId}/` }));
  }, [dispatch, userId]);

  const userInfo = data;
  console.log(userInfo);

  const informationItems = [
    { label: "Word", value: userInfo?.user_info?.words_left, unit: "" },
    { label: "Image", value:userInfo?.user_info?.images_left, unit: "" },

  ];
  const personalDetails = [
    { label: "Full Name", value: userInfo?.user_info?.name },
    { label: "Email", value: userInfo?.user_info?.email },
    { label: "User Status", value: userInfo?.user_info?.is_active ?"Active":"Not Active"},
    { label: "User Group", value: userInfo?.user_info?.is_staff ? "Admin" : "User" },
    { label: "Registered On", value: userInfo?.user_info?.date_joined_date },
    { label: "Last Updated On", value: userInfo?.user_info?.date_joined_time },
    { label: "Country", value:  userInfo?.user_info?.country },
    { label: "Phone", value: userInfo?.user_info?.phone_number },
    {label:"subscription plan" ,value:userInfo?.user_info?.subscription_plan}
  ];

  //Loader
  if (loading) {
    return (
      <div className="d-flex height-spinner align-items-center justify-content-center">
        <div
          className="spinner-border"
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="  col-xl-4 col-lg-4 col-xxl-4 col-md-12 col-sm-12 p-3  bg-transparent ">
        <div className=" bg-white shadow rounded-5">
          <div className=" pe-4 ps-4 py-3 pb-0">
            <h6 className="fw-bolder p-0">Personal Information</h6>
          </div>
          <hr className="  text-dark " />
          <div className="row justify-content-center  pt-3">
            {informationItems.map((item, index) => (
              <div
                key={index}
                className="col-6 text-center pb-3 pe-2 ps-1">
                <small className="fw-bold d-block pb-2">{item.value}</small>
                <small className="d-block fw-normal ">
                  {item.label} {item.unit}
                </small>
              </div>
            ))}
          </div>
          <hr className="  text-dark " />
          <div className=" py-3 d-flex justify-content-center align-items-center  ">
            <img
              src={userInfo?.user_info?.profile_picture}
              className=" ms-2  rounded-circle  mb-2 "
              height={85}
              width={85}
            />
          </div>
          <div className=" d-flex justify-content-center align-items-center  ">
            <div className=" p-0 d-block  pb-5">
              <small className=" text-center  fw-bold d-block ">
             {userInfo?.user_info?.name}
              </small>
              
              <div className="  d-flex justify-content-center gap-1">
                <button className=" rounded-5 p-2  hover-button border-0 text-white btn  button-pink">
                  <CiEdit size={20} /> UPDATE Credites
                </button>
                <button className=" rounded-5 p-2  hover-button border-0 text-white btn  button-pink">
                  {" "}
                  <CiCreditCard2 size={20} /> UPDATE Credites
                </button>
              </div>
              <div className="  d-flex justify-content-center gap-1">
                <button className=" hover-button rounded-5 p-2 border-0 text-white btn  button-pink">
                  {" "}
                  <IoIosAddCircleOutline size={20} /> add subscription
                </button>
              </div>
            </div>
          </div>
          <hr />
          {personalDetails.map((detail, index) => (
            <div
              key={index}
              className="ps-3 pe-3 ">
              <div className="row ">
                <div className="col-5  pb-2">
                  <small className="fw-semibold">{detail.label}</small>
                </div>

                <div className="col-7">
                  <small className="fw-normal">{detail.value}</small>
                </div>
                <hr />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xxl-8 py-3">
        <UserDetails  userInfo={userInfo}/>
      </div>
    </div>
  );
}

export default UserInformation;
