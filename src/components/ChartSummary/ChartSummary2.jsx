import { BarChart } from "@mui/x-charts/BarChart";

import img2 from "../../assets/Images/ChartIcons/users-group-two-rounded-svgrepo-com 1.svg";
import { useEffect, useState } from "react";

function ChartSummary2({ data }) {
  const [chartWidth, setChartWidth] = useState(460);
  //total_new_users_per_days_in_current_month

  const TNUPDICM = data?.total_new_users_per_days_in_current_month;
  const lableTNUPDICM = TNUPDICM?.labels;
  const dataTNUPDICM = TNUPDICM?.data;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartWidth(window.innerWidth - 32); // Adjust as needed
      }
      {
        setChartWidth(460);
      }
      if (window.innerWidth < 768 && window.innerWidth < 1020) {
        setChartWidth(window.innerWidth - 32); // Adjust as needed
      } else {
        setChartWidth(460);
      }
      if (window.innerWidth > 1020) {
        setChartWidth(1000); // Adjust as needed
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="row mt-5">
        <div className="col-12 col-xl-12 col-xxl-12 mb-2">
          <div className="bg-white rounded-5 shadow-sm">
            <div className="p-3 d-flex">
              <img
                src={img2}
                alt="icon"
              />
              <h5 className="fw-bolder text-bold ps-3">
                {" "}
                New Registered Users
              </h5>
            </div>
            <div className="ps-3 pe-3 d-block">
              <p className="text-muted">Total Earnings Current Year</p>
            </div>
            <div className="   bg-xy me-md-4 ms-md-4 ">
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: lableTNUPDICM || [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                      "13",
                      "14",
                      "15",
                      "16",
                      "17",
                      "18",
                      "19",
                      "20",
                      "21",
                      "22",
                      "23",
                      "24",
                      "25",
                    ],
                  },
                ]}
                series={[
                  {
                    data: dataTNUPDICM || [
                      4, 5, 6, 3, 7, 8, 9, 2, 1, 5, 7, 9, 25, 24, 10, 15, 12, 6,
                      9, 18, 22, 9, 15, 2, 2, 8,
                    ],
                    color: "#003087",
                  },
                ]}
                width={chartWidth}
                height={360}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartSummary2;
