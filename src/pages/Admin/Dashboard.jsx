import AdminSummary from "../../components/AdminSummary/AdminSummary";
import ChatSummary2 from "../../components/ChartSummary/ChartSummary2";
import ChatSummary from "../../components/ChartSummary/ChartSummary";
import "./Dashboard.css";
import AdminTable from "../../components/Admin/tables/AdminTable";
import icon from "../../assets/Images/icon.svg";
import visa from "../../assets/Images/transactions/visa.svg";
import paypal from "../../assets/Images/transactions/paypal.svg";
import card from "../../assets/Images/transactions/card.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slices/apiSlice";
import { useEffect } from "react";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchData({ endpoint: "admin-dash/admin-dash/" }));
  }, [dispatch]);

  const latest_registrations = data?.latest_registrations;
  console.log("latest_registrations", latest_registrations);
  // const latest_transactions = data?.latest_transactions;
  const RegistrationsTable = ["User", "Group", "Status", "Registered On"];
  const TransactionsTable = [
    "Paid By",
    "Status",
    "Total",
    "Gateway",
    "Date",
  ];
  const usersRegistrations = latest_registrations?.map((register) => ({
    userData: {
      icon: register.profile_picture,
      title: register.username,
      email: register.email,
    },
    Group: register.is_staff ? "Admin" : "User",
    Status: register.is_active ? "Active" : "unActive",
    Registered_On: { registTime: register.date, hour: register.time },
  }));

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
    <div className=" dashboard-container">
      <header>
        <h5 className="mb-0  pb-0 fw-bold">Admin Dashboard</h5>
        <p>admin</p>
      </header>

      <AdminSummary data={data} />

      <ChatSummary data={data} />

      <div className="row  mt-4">
        <div className="  d-grid   col-lg-6 col-12 mb-4  ">
          <AdminTable
            tableHeader="Latest Registrations"
            tableHeadRow={RegistrationsTable}
            users={usersRegistrations}
          />
        </div>
        <div className=" d-grid   col-lg-6 col-12   mb-4 ">
          <AdminTable
            tableHeader="Latest Transactions"
            tableHeadRow={TransactionsTable}
            users={usersTransactions}
          />
        </div>
      </div>
      <ChatSummary2 data={data} />
    </div>
  );
};

export default Dashboard;
