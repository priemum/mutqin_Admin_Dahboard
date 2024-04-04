import img1 from "../../assets/Images/UserInfo/list-right.svg";
import img2 from "../../assets/Images/UserInfo/image-1.svg";
import img3 from "../../assets/Images/UserInfo/sound-2.svg";
import img4 from "../../assets/Images/UserInfo/chart-vertical.svg";
import headicon from "../../assets/Images/UserInfo/shape1.svg";
import headicon2 from "../../assets/Images/UserInfo/shape.svg";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState } from "react";
import UserDetailsChart from "./UserDetailsChart";
import AdminTable from "../../components/Admin/tables/AdminTable";

import icon from "../../assets/Images/icon.svg";
import visa from "../../assets/Images/transactions/visa.svg";
import paypal from "../../assets/Images/transactions/paypal.svg";
import card from "../../assets/Images/transactions/card.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slices/apiSlice";
import UserTable from "../../components/Admin/tables/UserTable";

function UserDetails({userInfo}) {
  const [percentage, setpercentage] = useState(userInfo?.subscription?.percentage);



  const Data = [
    { title: "Words Generated", value:userInfo?.user_genrated?.Words_Generated, img: img1 },
    { title: "Images Created", value:userInfo?.user_genrated?.Images_Generated, img: img2 },
 
  ];
  const TransactionsTable = [
    "Paid By",
    "Status",
    "Total",
    "Gateway",
    "Date",
    "Plan Name"
  ];

  const usersTransactions = [
    {
      userData: {
        icon: icon,
        title: "Ali djawad",
        email: "Ali.djawad2345@gmail.com",
      },
      Status: "Pending",
      Total: "$18.07",
      Gateway: visa,
      Registered_On: { registTime: "27 Jan 2024", hour: "13:54 PM" },
    },
    {
      userData: {
        icon: icon,
        title: "Ali djawad",
        email: "Ali.djawad2345@gmail.com",
      },
      Status: "Completed",
      Total: "$18.07",
      Gateway: paypal,
      Registered_On: { registTime: "27 Jan 2024", hour: "13:54 PM" },
    },
    {
      userData: {
        icon: icon,
        title: "Ali djawad",
        email: "Ali.djawad2345@gmail.com",
      },
      Status: "Completed",
      Total: "$18.07",
      Gateway: paypal,
      Registered_On: { registTime: "27 Jan 2024", hour: "13:54 PM" },
    },
    {
      userData: {
        icon: icon,
        title: "Ali djawad",
        email: "Ali.djawad2345@gmail.com",
      },
      Status: "Completed",
      Total: "$18.07",
      Gateway: paypal,
      Registered_On: { registTime: "27 Jan 2024", hour: "13:54 PM" },
    },

    {
      userData: {
        icon: icon,
        title: "Ali djawad",
        email: "Ali.djawad2345@gmail.com",
      },
      Status: "Cancelled",
      Total: "$18.07",
      Gateway: card,
      Registered_On: { registTime: "27 Jan 2024", hour: "13:54 PM" },
    },
  ];
  return (
    <div>
      <section>
        <div className="row">
          {Data.map((item, index) => (
            <div
              key={index}
              className="col-md-6 bg-container p-3 pe-2 ps-2 ">
              <div className="rounded-5 shadow bg-white pe-2 ps-2">
                <div className="row p-4 py-4 pb-4">
                  <div className="col-10">
                    <small className="fw-bold d-block  ">{item.title}</small>
                    <span className="fw-bold">{item.value}</span>
                  </div>
                  <div className="col-2">
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        <img
                          src={item.img}
                          alt={item.title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className=" rounded-5 p-4 mt-4 bg-white  shadow">
          <div className=" d-flex">
            <img src={headicon} />
            <span className=" fw-bold ms-2"> Subscription</span>
          </div>

          <h4 className=" mt-4  fw-bold    ">Free Trial</h4>
          <small className=" text-muted  fw-bold ">
            No Subscription / ${userInfo?.subscription?.subscription_price} Per Month
          </small>
          <p className=" text-muted   fw-semibold pb-2 py-2">
            Total words available: {userInfo?.subscription?.total_words_available} . Total prepaid words available{" "}
            {userInfo?.subscription?.prepaid_words_available}.
          </p>

          <ProgressBar now={percentage} />
        </div>
        <div className=" rounded-5 p-4 mt-4 bg-white  shadow">
          <div className=" d-flex">
            <img src={headicon2} />
            <span className=" fw-bold ms-2"> Words & Images Generated</span>
            <span className=" fw-bold text-muted ms-2"> (Current Year)</span>
          </div>
          <UserDetailsChart userInfo={userInfo} wordsImagesGeneratedGraph={userInfo?.words_images_generated_graph}  />
        </div>

        <div className=" rounded-5 p-4 mt-4 bg-white  shadow">
          <UserTable
            tableHeader="Latest Transactions"
            tableHeadRow={TransactionsTable}
            users={usersTransactions}
            userInfo={userInfo}
            noshadow


          />
          
        </div>
      </section>
    </div>
  );
}

export default UserDetails;
