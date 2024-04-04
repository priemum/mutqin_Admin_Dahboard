import { useEffect, useState } from "react";
import "./Transaction.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import icon from "../../assets/Images/icon.svg";
import { CiSearch } from "react-icons/ci";
import { TbCoin } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slices/apiSlice";


const Transactions = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const [currentPage, setCurrentPage] = useState(1);
  const [Search, SetSearch] = useState();
  console.log("search", Search);

  const limit = 10;
  useEffect(() => {
    dispatch(
      fetchData({
        endpoint: `admin-dash/transaction-management/`,
        params: {
          limit: limit,
          offset: (currentPage - 1) * limit,
          search: Search,
        },
      })
    );
  }, [dispatch, currentPage, limit, Search]);

  const tableData = data?.results;
  const handleNextPage = () => {
    if (currentPage < (Math.ceil((data?.count/limit)))) {
      setCurrentPage(currentPage + 1);
    }
 
  };
  

  const handleLastpage = () => {

      setCurrentPage((Math.ceil((data?.count/limit))));
 
  };
  const handleFirstpage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const transactionsCol = [
    "User",
    "Status",
    "Plan Name",
    "Price",
    "Order ID",
    "Gateway",
    "Paid On",
    "Pricing Plan",
    "Actions",
  ];

  // Calculate the index range for the current page

  //                   changing between pages Pagination                          //
  const handlePageChange = () => {};

  //                             Formik   Search                                    //

  //Search Values
  const initialValues = {
    search: "",
  };
  const validationSchema = Yup.object({
    search: Yup.string(),
  });


  //handleSearch
const handleSearch = (values) => {
  console.log(values.search);
  SetSearch(values.search);
};

const onSubmit = (values, { resetForm }) => {
  handleSearch(values);
  resetForm();
};

  //                      Delete and  View User Transaction                             //
  const handleDelete = () => {};

  const handleView = (id) => {
    navigate(`/transactions/${id}`);
  };

  //Loader
  if (loading) {
    return (
      <div className="d-flex height-spinner align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" pb-5">
      {/* Start Header */}
      <div className="d-flex flex-column gap-1">
        <div className="header0title">Transactions</div>
        <div className="header1title">Admin</div>
      </div>
      {/* End Header */}

      <div>
        <div className=" d-grid   col-12  ">
          <div className="     table-contianer ">
            <div className="header0title border-bottom pb-4 ps-5">
              User Management
            </div>

            {/* Start Search */}

            <div className=" py-3">
              <div className=" d-flex justify-content-between align-items-center">
                <div className=" border-bottom">{limit}</div>
                <div className=" d-flex align-items-center  gap-1 border-bottom">
             
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {(formikProps) => (
                      //Inside the Formik component
                      <Form onSubmit={formikProps.handleSubmit}>
                      <button  type="submit" className="bg-transparent border-0">
                      <CiSearch style={{ color: "#aaaaaa" }} />
                    </button>
                        <Field
                          type="text"
                          name="search"
                          id="search"
                          className="border-bottom formik-input"
                        />
                        
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            {/* End Search */}

            {/* Start Table */}

            <table className="table">
              <thead>
                <tr>
                  {transactionsCol.map((col, index) => (
                    <th
                      scope="col"
                      className={`col-title  ${
                        col === "User" ? " text-start " : " text-center "
                      }`}
                      key={index}
                    >
                      <button
                        style={{
                          border: "none",
                          outline: "none",
                          backgroundColor: "white",
                        }}
                      >
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
                {tableData?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className=" d-flex gap-2">
                        <img
                          src={item?.user_info?.profile_picture}
                          alt={item?.user_info?.username}
                          width={50}
                          height={50}
                        />
                        <div className=" d-flex flex-column   justify-content-center">
                          <div className="userName-title">
                            {item?.user_info?.username}
                          </div>
                          <div className="userName-email">
                            {item?.user_info?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <div
                        style={
                          item.status === "Pending"
                            ? { backgroundColor: "#E8E8E8" }
                            : { backgroundColor: "#001B79" }
                        }
                        className=" h-100 d-flex  flex-column justify-content-center status"
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <div className=" flex-column d-flex">
                        <div className=" Plan_Name_plan">{item?.plan_name}</div>
                        <div className="Plan_Name_words">
                          {item.words_included}
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <div className="price-plan">{item?.price} $</div>
                    </td>
                    <td className="text-center align-middle">
                      <div className="price-plan">{item?.order_id}</div>
                    </td>
                    <td className="text-center align-middle">
                      <div className="price-plan">{item?.Gateway}</div>
                    </td>
                    <td className="text-center align-middle">
                      <div className=" d-flex flex-column justify-content-center">
                        <div className="paid-plan">{item?.paid_on_date}</div>
                        <div className="paid-plan">{item?.paid_on_time}</div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <div
                        style={
                          item?.Pricing_Plan === "Monthly"
                            ? {
                                backgroundColor: "#009CDE33",
                                color: "#009CDE",
                              }
                            : item.Pricing_Plan === "Prepaid"
                            ? {
                                backgroundColor: "#24FF0033",
                                color: "#24FF00",
                              }
                            : {
                                backgroundColor: "#ffdb4533",
                                color: "#FFDB45",
                              }
                        }
                        className={` plan-period  text-blue `}
                      >
                        {item?.pricing_plan}
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <div className=" d-flex justify-content-center  align-items-center gap-1">
                        <button
                          onClick={() => handleView(item?.order_id)}
                          className="button-buy "
                        >
                          <TbCoin style={{ color: "#FFDB45" }} />
                        </button>

                        <button
                          onClick={() => handleDelete(item?.id)}
                          style={{ color: "#001A72" }}
                          className=" button-delete"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* End Table */}

            {/*Start Pagination */}
            <nav className="  d-flex justify-content-between">
              <div>
                <div className=" pb-1 d-flex">
                  <div className=" px-2  border-bottom">{currentPage}</div>
                </div>
                <div className=" page-text">
                  Showing page {currentPage} of 1
                </div>
              </div>
              <ul className="pagination">
                <li className={`page-item `}>
                <button
                className="page-link"
                onClick={handleFirstpage}
             
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
              
                </li>
                <li className={`page-item `}>
                  <button
                    className="page-link"
                 
                    onClick={handlePrevPage}
                  >
                    <MdOutlineArrowBackIos />
                  </button>
                </li>

                <li className={`page-item `}>
                  <button
                    className="page-link"

                    // onClick={() => handlePageChange(index + 1)}
                  >
                    {currentPage}
                  </button>
                </li>
                <li className={`page-item `}>
                  <button
                    className="page-link"
                    // onClick={handleNextPage}
                    onClick={handleNextPage}
                  >
                    <MdOutlineArrowForwardIos />
                  </button>
                </li>
                <li className={`page-item `}>
                  <button
                    className="page-link"
                    onClick={handleLastpage}
                  >
                
                    <MdKeyboardDoubleArrowRight />
                  </button>
                </li>
              </ul>
            </nav>
            {/*End Pagination */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
