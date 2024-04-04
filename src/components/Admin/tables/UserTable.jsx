import { CiServer } from "react-icons/ci";
import "./AdminTable.css";

const UserTable = ({ tableHeader, tableHeadRow, users, noshadow,userInfo }) => {
  return (
    <div
      style={{ boxShadow: " none " }}
      className={`custom-table-contaienr   ${
        noshadow && "shadow-none"
      }  h-100`}>
      <div className=" d-flex gap-2  custom-table-header align-items-center">
        <CiServer />
        <div className=" fw-bold">{tableHeader}</div>
      </div>
      <div className="table-responsive ">
        <table className="table ">
          <thead>
            <tr>
              {tableHeadRow?.map((column, index) => (
                <th
                  key={index}
                  className={`${
                    column === "User" || column === "Paid By"
                      ? "text-start"
                      : "text-center"
                  } custom-header-col`}
                  scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userInfo?.transactions?.map((user, index) => (
              <tr
                key={index}
                className="">
                <th
                  scope="row"
                  className=" custom-table-row d-flex gap-2">
                  <img
                    src={userInfo?.user_info?.profile_picture}
                    className=" user-image"
                    alt="user_Image"
                  />
                  <div className=" flex-column  d-flex justify-content-between">
                    <div className="user-title">{userInfo?.user_info?.name}</div>
                    <div className="user-email">{userInfo?.user_info?.email}</div>
                  </div>
                </th>
                {user?.status ? (
                  <td className="text-center align-middle">
                    <div className=" ">
                      <div
                        style={
                          user.status === "Completed"
                            ? { backgroundColor: "#001B79", color: "white" }
                            : user.status === "Cancelled"
                            ? { backgroundColor: "#E21B1B", color: "white" }
                            : { backgroundColor: "#d8d8d8", color: "black" }
                        }
                        className="user-group">
                        {user.status}
                      </div>
                    </div>
                  </td>
                ) : (
                  <td className="text-center align-middle">
                    <div className=" ">
                      <div className="user-group ">{user.Group}</div>
                    </div>
                  </td>
                )}
                {user?.price ? (
                  <td className="text-center align-middle">
                    <div className="paddingcenter">
                      <div className=" text-black user-total  ">
                        {user.price} $
                      </div>
                    </div>
                  </td>
                ) : (
                  <td className="text-center align-middle">
                    <div className="paddingcenter">
                      <div
                        style={
                          user.status === "Active"
                            ? { backgroundColor: "#001B79" }
                            : { backgroundColor: "#E21B1B" }
                        }
                        className="user-status">
                        {user.status}
                      </div>
                    </div>
                  </td>
                )}

                {user?.price && (
                  <td className="text-center align-middle">
                    <div>
                    <div className="user-registTime">
                    {user.Gateway}
                  </div>
                 
                    </div>
                  </td>
                )}

                <td className="text-center align-middle">
                  <div className=" flex-column d-flex justify-content-between">
                    <div className="user-registTime">
                      {user.paid_on_date}
                    </div>
                    <div className="user-email">{user?.paid_on_time}</div>
                  </div>
                </td>

                <td className="text-center align-middle">
                <div className=" flex-column d-flex justify-content-between">
                  <div className="user-registTime">
                    {user.plan_name}
                  </div>
              
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
