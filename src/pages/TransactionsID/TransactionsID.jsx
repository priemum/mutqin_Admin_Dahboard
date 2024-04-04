import { useParams, useNavigate } from "react-router-dom";
import "./TransactionId.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slices/apiSlice";
import { useEffect } from "react";


const TransactionsID = () => {
  const { transactionsId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  
  useEffect(() => {
    dispatch(
      fetchData({
        endpoint: `admin-dash/transaction-management-info/${transactionsId}/`,
       
      })
    );
  }, [dispatch]);


  const userTransaction = [
    { title: "Transaction Date", details: data?.paid_on_date },
    { title: "Transaction Time", details: data?.paid_on_time },
    { title: "Price Plan", details: data?.pricing_plan },
    { title: "Total Price", details: data?.price   },
    { title: "Payment Status", details: data?.status  },
    { title: "Plan Name", details:data?.plan_name},
    { title: "Words Included", details: data?.words_included },
    { title: "Payment Gateway", details: data?.Gateway },
    { title: "Payment Frequency", details:data?.payment_frequency},
    { title: "User Name", details: data?.user_info?.username },
    { title: "User Email", details:  data?.user_info?.email },
    { title: "Country", details: data?.user_info?.country },
  ];
  const handleReturn = () => {
    navigate("/transactions");
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
  
  //Loader
  if (error) {
    return (
      <div className="d-flex height-spinner align-items-center justify-content-center">
        <div
          className=" text-danger alert-danger"
          role="status">
          <span className="visually-hidden">this service not availble now</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className=" mb-4">
        <div className="header0title">Show Transactions Details</div>
        <div className="header1title">Admin</div>
      </div>
      <div className="pb-2">
        <div className=" transaction-container">
          <div className="transaction-header ps-5 py-3 border-bottom">
            Transactions ID : {transactionsId}
          </div>
          <div className="ps-5">
            <div className=" pt-5 row">
              {userTransaction.map((trans, index) => (
                <div
                  className=" col-lg-4 col-sm-6 col-6 mb-4"
                  key={index}>
                  <div className="trans-title pb-1">{trans.title}:</div>
                  <div className="trans-details">{trans.details}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className=" ps-5 pe-5 pb-5 pt-4 d-flex justify-content-between">
              <button
                onClick={() => handleReturn()}
                className="trans-button">
                GET INVOICE
              </button>
              <button className="trans-button"  onClick={() => handleReturn() }>RETURN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsID;
