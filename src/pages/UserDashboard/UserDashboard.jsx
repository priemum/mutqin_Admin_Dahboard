import img1 from "../../assets/Images/userdashboard/user-check-rounded-svgrepo-com 1.svg";
import img2 from "../../assets/Images/userdashboard/customer-support-svgrepo-com 1.svg";
import img3 from "../../assets/Images/userdashboard/Group 1.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slices/apiSlice";
import { useEffect } from "react";

function UserDashboard() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const visitors_today = data?.visitors_today;
  const total_registered_users = data?.total_registered_users;
  const online_users_count = data?.online_users_count;

  console.log(visitors_today);
  useEffect(() => {
    dispatch(fetchData({ endpoint: "admin-dash/users-dash/" }));
  }, [dispatch]);

  const dataCards = [
    {
      title: "Total Registered Users",
      value: total_registered_users,
      img: img1,
    },
    { title: "Online Users", value: online_users_count, img: img2 },
    { title: "Visitors Today (Registered)", value: visitors_today, img: img3 },
    // Add more data as needed
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
      {dataCards.map((item, index) => (
        <div
          key={index}
          className="col-md-4 bg-container p-4">
          <div className="rounded-5 shadow bg-white pe-2 ps-2">
            <div className="row p-4 py-4 pb-4">
              <div className="col-md-10">
                <small className="fw-bold d-block  ">{item.title}</small>
                <span className="fw-bold">{item.value}</span>
              </div>
              <div className="col-md-2">
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
  );
}

export default UserDashboard;
