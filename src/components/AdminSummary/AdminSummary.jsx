import { BiSolidUpArrow } from "react-icons/bi";
import { FaLink } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import img1 from "../../assets/Images/AdminSummary/img1.svg";
import img2 from "../../assets/Images/AdminSummary/img2.svg";
import img3 from "../../assets/Images/AdminSummary/img3.svg";
import img4 from "../../assets/Images/AdminSummary/img4.svg";
import img5 from "../../assets/Images/AdminSummary/img5.svg";
import img6 from "../../assets/Images/AdminSummary/img6.svg";
import img7 from "../../assets/Images/AdminSummary/img7.svg";
import img8 from "../../assets/Images/AdminSummary/img8.svg";
import "./adminSummary.css";

function AdminSummary({ data }) {
  const users = data?.users;
  const income = data?.income;
  const subscribers = data?.subscribers;
  const TotalEstimatedSpending = data?.estimated_spending;
  const words_generated = data?.words_generated;
  const images_generated = data?.images_generated;
  const total_documents_generated = data?.total_documents_generated;
  const total_transactions = data?.total_transactions;

  function getPersentage(first, second) {
    if (second === 0) {
      return "undefined";
    }

    return Number((first / second) * 100);
  }
  const cardData = [
    {
      title: "Total New Users",
      subTitle: "(Current Month)",
      value: users?.total_new_users_current_month,
      changePercentage: getPersentage(
        users?.total_new_users_current_month,
        users?.total_new_users_last_month
      ),
      lastMonthValue: users?.total_new_users_last_month,
      totalYearValue: users?.total_new_users_current_year,
      source: img1,
    },

    {
      title: "Total New Subscribers",
      subTitle: "(Current Month)",
      value: subscribers?.total_subscribers_current_month,
      changePercentage: getPersentage(
        subscribers?.total_subscribers_current_month,
        subscribers?.total_subscribers_last_month
      ),
      lastMonthValue: subscribers?.total_subscribers_last_month,
      source: img2,
      totalYearValue: subscribers?.total_subscribers_current_year,
    },

    {
      title: "Total Income",
      subTitle: "(Current Month)",
      value: `$${income?.total_income_current_month}`,
      changePercentage: getPersentage(
        income?.total_income_current_month,
        income?.total_income_last_month
      ),
      lastMonthValue: `$${income?.total_income_last_month}`,
      totalYearValue: `$${income?.total_income_current_year}`,
      source: img3,
    },
    {
      title: "Total Estimated Spending",
      subTitle: "(Current Month)",
      value: `$${TotalEstimatedSpending?.total_estimated_spending_current_month}`,
      changePercentage: getPersentage(
        TotalEstimatedSpending?.total_estimated_spending_current_month,
        TotalEstimatedSpending?.total_estimated_spending_last_month
      ),
      lastMonthValue: `$${TotalEstimatedSpending?.total_estimated_spending_last_month}`,
      totalYearValue: `$${TotalEstimatedSpending?.total_estimated_spending_current_year}`,
      source: img4,
    },
    {
      title: "Total Words Generated",
      subTitle: "(Current Month)",
      value: words_generated?.total_words_generated_current_month,
      changePercentage: getPersentage(
        words_generated?.total_words_generated_current_month,
        words_generated?.total_words_generated_last_month
      ),
      lastMonthValue: words_generated?.total_words_generated_last_month,
      totalYearValue: words_generated?.total_words_generated_current_year,
      source: img5,
    },
    {
      title: "Total Images Generated",
      subTitle: "(Current Month)",
      value: images_generated?.total_images_generated_current_month,
      changePercentage: getPersentage(
        images_generated?.total_images_generated_current_month,
        images_generated?.total_images_generated_last_month
      ),
      lastMonthValue: images_generated?.total_images_generated_last_month,
      totalYearValue: images_generated?.total_images_generated_current_year,
      source: img6,
    },
    {
      title: "Total Documents Create",
      subTitle: "(Current Month)",
      value: total_documents_generated?.total_documents_generated_current_month,
      changePercentage: getPersentage(
        total_documents_generated?.total_documents_generated_current_month,
        total_documents_generated?.total_documents_generated_last_month
      ),
      lastMonthValue:
        total_documents_generated?.total_documents_generated_last_month,
      totalYearValue:
        total_documents_generated?.total_documents_generated_current_year,
      source: img7,
    },
    {
      title: "Total Transactions",
      subTitle: "(Current Month)",
      value: total_transactions?.total_transactions_current_month,
      changePercentage: getPersentage(
        total_transactions?.total_transactions_current_month,
        total_transactions?.total_transactions_last_month
      ),
      lastMonthValue: total_transactions?.total_transactions_last_month,
      totalYearValue: total_transactions?.total_transactions_current_year,
      source: img8,
    },
  ];

  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-container col-xl-3 col-xxl-3 col-md-6   px-4 py-3  p-md-2">
          <div className="border-summary-cards shadow-sm bg-white p-3 ps-4">
            <div className="d-block">
              <h6 className="fw-bolder header-size      d-block pt-0 mb-0 ">
                {card.title}
              </h6>
              <small className="text-muted text-small fw-bolder opacity-50">
                {card.subTitle}
              </small>
              <div className="row py-4 pb-0 pe-1 ps-1">
                <div className="col-8 d-block">
                  <div className="d-flex">
                    <div>
                      <h3 className="fw-bolder pb-0 mb-0 mt-0">{card.value}</h3>
                      <small className="text-muted p-0 fw-bolder">month</small>
                    </div>
                    <div>
                      <BiSolidUpArrow className="text-pink" />
                      <span className="text-muted">
                        {card.changePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-block">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={card.source}
                      alt="img1"
                    />
                  </div>
                </div>
              </div>
              <div className="row ps-3  ps-md-0  pe-3 pe-md-0 py-4 ">
                <div className="col-4 p-0 d-block">
                  <div>
                    <small className="text-muted text-size-small opacity-50">
                      Last Month
                    </small>
                    <div className="d-flex align-items-center">
                      <FaLink
                        className="text-pink"
                        size={15}
                      />
                      <span className="fw-bolder">{card.lastMonthValue}</span>
                    </div>
                  </div>
                </div>
                <div className="col-8 text-center d-block p-0">
                  <div>
                    <span className="text-muted  text-size-small opacity-50">
                      Total (Current Year)
                    </span>
                    <div className="d-flex align-items-center justify-content-center">
                      <IoBookmark
                        className="text-pink "
                        size={15}
                      />
                      <span className="fw-bolder">{card.totalYearValue}</span>
                    </div>
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

export default AdminSummary;
