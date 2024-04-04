import { BarChart } from "@mui/x-charts/BarChart";
import img1 from "../../assets/Images/ChartIcons/layer1.svg";
import img2 from "../../assets/Images/ChartIcons/users-group-two-rounded-svgrepo-com 1.svg";
import { useEffect, useState } from "react";

function ChatSummary({ data }) {
  const [chartWidth, setChartWidth] = useState(500);

  const finance_overview_graph = data?.finance_overview_graph;
  const total_new_users_graph = data?.total_new_users_graph;
  const financeLabels = finance_overview_graph?.labels;
  const financeData = finance_overview_graph?.data;
  const usersLabels = total_new_users_graph?.labels;
  const usersData = total_new_users_graph?.data;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartWidth(window.innerWidth - 70); // Adjust as needed
      } else {
        setChartWidth(500);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="row mt-5 ">
        <div className="col-12 col-xl-6 col-xxl-6 mb-2 ">
          <div className="ps-2 pe-2 bg-white shadow-sm rounded-5">
            <div className="p-3 d-flex">
              <img
                src={img1}
                alt="icon"
              />
              <h5 className="fw-bolder text-bold ps-3"> Finance Overview</h5>
            </div>
            <div className="ps-3 pe-3 d-block">
              <h3 className="fw-bolder">0.00 $</h3>
              <p className="text-muted">Total Earnings Current Year</p>
            </div>
            <div className="bg-xy m-1">
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: financeLabels || [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ],
                  },
                ]}
                series={[
                  {
                    data: financeData || [(0, 0, 0, 0, 0, 0, 0, 0)],
                    color: "#FFDB45",
                  },
                ]}
                width={chartWidth}
                height={360}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6 col-xxl-6 mb-2">
          <div className="bg-white rounded-5 shadow-sm">
            <div className="p-3 d-flex">
              <img
                src={img2}
                alt="icon"
              />
              <h5 className="fw-bolder text-bold ps-3"> Total New Users</h5>
            </div>
            <div className="ps-3 pe-3 d-block">
              <h3 className="fw-bolder">0.00 $</h3>
              <p className="text-muted">Total Earnings Current Year</p>
            </div>
            <div className="  bg-xy  m-1 ">
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: usersLabels || [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ],
                  },
                ]}
                series={[{ data: usersData || [(0, 0, 0, 0, 0, 0, 0, 0)] }]}
                width={chartWidth}
                height={360}
                colors="#ff0000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSummary;
