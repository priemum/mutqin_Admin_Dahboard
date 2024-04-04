import { CiServer } from "react-icons/ci";
import "./AdminTable.css";

const AdminTable = ({ tableHeader, tableHeadRow, users, noshadow }) => {
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
            {users?.map((user, index) => (
              <tr
                key={index}
                className="">
                <th
                  scope="row"
                  className=" custom-table-row d-flex gap-2">
                  <img
                    src={user.userData.icon}
                    className=" user-image"
                    alt="user_Image"
                  />
                  <div className=" flex-column  d-flex justify-content-between">
                    <div className="user-title">{user.userData.title}</div>
                    <div className="user-email">{user.userData.email}</div>
                  </div>
                </th>
                {user?.Total ? (
                  <td className="text-center align-middle">
                    <div className=" ">
                      <div
                        style={
                          user.Status === "Completed"
                            ? { backgroundColor: "#001B79", color: "white" }
                            : user.Status === "Cancelled"
                            ? { backgroundColor: "#E21B1B", color: "white" }
                            : { backgroundColor: "#d8d8d8", color: "black" }
                        }
                        className="user-group">
                        {user.Status}
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
                {user?.Total ? (
                  <td className="text-center align-middle">
                    <div className="paddingcenter">
                      <div className=" text-black user-total  ">
                        {user.Total}
                      </div>
                    </div>
                  </td>
                ) : (
                  <td className="text-center align-middle">
                    <div className="paddingcenter">
                      <div
                        style={
                          user.Status === "Active"
                            ? { backgroundColor: "#001B79" }
                            : { backgroundColor: "#E21B1B" }
                        }
                        className="user-status">
                        {user.Status}
                      </div>
                    </div>
                  </td>
                )}

                {user?.Total && (
                  <td className="text-center align-middle">
                    <div>
                      <img src={user.Gateway} />
                    </div>
                  </td>
                )}

                <td className="text-center align-middle">
                  <div className=" flex-column d-flex justify-content-between">
                    <div className="user-registTime">
                      {user.Registered_On.registTime}
                    </div>
                    <div className="user-email">{user.Registered_On.hour}</div>
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

export default AdminTable;
