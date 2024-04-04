import { useState, useEffect } from "react";
import "./RegisteredUsers.css";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import "jspdf-autotable";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import * as XLSX from "xlsx";
import copy from "clipboard-copy";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData } from "../../redux/slices/apiSlice";

const RegisteredUsers = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    dispatch(
      fetchData({
        endpoint: `admin-dash/user-management/`,
        params: { limit: limit, offset: (currentPage - 1) * limit },
      })
    );
  }, [dispatch, currentPage, limit]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();

  // const [filteredUserData, setFilteredUserData] = useState([]);
  const transactionsCol = [
    "User",
    "Group",
    "Words Left",
    "Images Left",

    // "Minutes Left",
    "Country",
    "Status",
    "Created On",
    "Actions",
  ];

  const handlePrint = () => {
    window.print();
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteData(`users/${id}`));
      console.log("Data deleted successfully ", id);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const exportToExcel = () => {
    const dataToExport = data.results.map((item) => ({
      Name: item.name,
      Email: item.email,
      Country: item.country,
      Group: item.group,
      "Words Left": item.words_left,
      "Images Left": item.images_left,

      Status: item.is_active === true ? "active" : "not active",
      "Created On": `${item.date_joined_date} ${item.date_joined_time}`,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registered Users");
    XLSX.writeFile(wb, "registered_users.xlsx");
  };
  const handleCopy = () => {
    const table = document.querySelector(".table");
    const range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    // Show toast message
    toast.success("Text copied!", {
      position: "bottom-right",
      className: "custom-toast-container",
      progressClassName: "custom-progress-bar",
      icon: <MdCheckCircle style={{ color: "#ed5ab3" }} />,
    });
  };

  const exportToCsv = () => {
    // Check if data and data.results are not null or undefined
    if (!data || !data.results) {
      return [];
    }

    // Format data for CSV export
    const dataToExport = data.results.map((item) => ({
      Name: item.name,
      Email: item.email,
      Country: item.country,

      Group: item.is_staff === true ? "Admin" : "User",
      "Words Left": item.words_left,
      "Images Left": item.images_left,

      Status: item.is_active === true ? "active" : "not active",
      "Created On date": item.datae_joined_date,
      "Created On time": item.date_joined_time,
    }));

    return dataToExport;
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "Name",
          "Email",
          "Country",
          "Group",
          "Words Left",
          "Images Left",
          "Status",
          "Created On",
        ],
      ],
      body: data?.results.map((item) => [
        item.name,
        item.email,
        item.country,

        item.is_staff === true ? "Admin" : "User",
        item.words_left,
        item.images_left,
        item.chars_left,
        item.is_active === true ? "active" : "not active",
        `${item.date_joined_date} ${item.date_joined_time}`,
      ]),
    });
    doc.save("registered_users.pdf");
  };
  const handleView = (id) => {
    navigate(`/userinformation/${id}`);
  };
  const handleEdit = (id,username,name,is_active,is_staff,phone_number,email) => {
    navigate(`/useredit/${id}/${username}/${name}/${is_active}/${is_staff}/${phone_number}/${email}`);
  };

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
    <div className=" pb-5">
      <div className=" d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column gap-1">
          <div className="header0title">Transactions</div>
          <div className="header1title">Admin</div>
        </div>
        <div>
          <button className="export-button">Create new user</button>
        </div>
      </div>
      <div>
        <div className=" d-grid   col-12  ">
          <div className="     table-contianer ">
            <div className="header0title border-bottom pb-4 ps-5">
              User Management
            </div>
            <div className=" py-3">
              <div className=" d-flex justify-content-between align-items-center">
                <div className=" ms-5 d-flex gap-2 align-items-center">
                  <button
                    className=" export-button"
                    onClick={handleCopy}>
                    Copy
                  </button>

                  <CSVLink
                    data={exportToCsv()}
                    filename={"registered_users.csv"}
                    target="_blank"
                    className="export-button">
                    Export CSV
                  </CSVLink>

                  <button
                    className=" export-button"
                    onClick={exportToExcel}>
                    EXCEL
                  </button>
                  <button
                    className=" export-button"
                    onClick={exportToPdf}>
                    PDF
                  </button>
                  <button
                    className=" export-button"
                    onClick={handlePrint}>
                    PRINT
                  </button>
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  {transactionsCol.map((col, index) => (
                    <th
                      scope="col"
                      className={` col-title  ${
                        col === "User" ? " text-start " : " text-center "
                      }`}
                      key={index}>
                      <button
                        style={{
                          border: "none",
                          outline: "none",
                          backgroundColor: "white",
                        }}>
                        {col !== "User" && (
                          <HiOutlineArrowsUpDown
                            style={{
                              color: "#001A72",
                              paddingRight: "5px",
                              fontSize: "16px",
                            }}
                          />
                        )}

                        {col}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data?.results?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className=" d-flex gap-2">
                        <img
                          src={item.profile_picture}
                          alt={item.name}
                          width={50}
                          className=" rounded-circle"
                          height={50}
                        />
                        <div className=" d-flex flex-column   justify-content-center">
                          <div className="userName-title">{item.name}</div>
                          <div className="userName-email">{item.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="text-center align-middle">
                      <div className=" d-flex    justify-content-center align-items-center ">
                        <div
                          className={`${
                            item.is_staff === true
                              ? "active-admin"
                              : "inactive-admin"
                          } h-100 px-2  status`}>
                          {item.is_staff === true ? "Admin" : "User"}
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <div className=" price-plan ">{item.words_left}</div>
                    </td>
                    <td className="text-center align-middle">
                      <div className="price-plan">{item.images_left}</div>
                    </td>

                    {/* <td className="text-center align-middle">
                        <div className="price-plan">{item.Minutes_Left}</div>
                      </td> */}
                    <td className="text-center align-middle">
                      <div className="price-country">{item.country}</div>
                    </td>
                    <td className="text-center align-middle">
                      <div className=" d-flex    justify-content-center align-items-center ">
                        <div
                          className={`${
                            item.is_active === true ? "active-plan-period" : ""
                          } plan-period  px-2 `}>
                          {item.is_active === true ? "active" : "not active"}
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <div className=" d-flex flex-column justify-content-center">
                        <div className="paid-plan">{item.date_joined_date}</div>
                        <div className="paid-plan">{item.date_joined_time}</div>
                      </div>
                    </td>

                    <td className="text-center align-middle">
                      <div className=" d-flex  align-items-center gap-1">
                        <button
                          onClick={() => handleView(item.id)}
                          className=" button-see ">
                          <IoEyeOutline style={{ color: "#001A72" }} />
                        </button>
                        <button
                          onClick={() => handleEdit(item.id ,item.username,item.name,item.is_active,item.is_staff,item.phone_number ,item.email)}
                          style={{ color: "#001A72 " }}
                          className="button-edit-regist">
                          <FaUserEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          style={{ color: "#001A72" }}
                          className=" button-delete">
                          <FaUserTimes />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav className="  d-flex justify-content-between">
              <div>
                <div className=" pb-1 d-flex">
                  <div className=" px-2  border-bottom">{limit}</div>
                </div>
                <div className=" page-text">Showing page {currentPage} of </div>
              </div>
              <ul className="pagination">
                <li className={`page-item `}>
                  <button
                    className="page-link"
                    onClick={handlePrevPage}>
                    <MdOutlineArrowBackIos />
                  </button>
                </li>

                <li className={`page-item`}>
                  <button className="page-link">{currentPage}</button>
                </li>

                <li className={`page-item`}>
                  <button
                    className="page-link"
                    onClick={handleNextPage}>
                    <MdOutlineArrowForwardIos />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUsers;
