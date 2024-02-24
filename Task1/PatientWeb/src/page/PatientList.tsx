import { useEffect, useState } from "react";
import { DefaultSidebar } from "../component/Sidebar";
import useUserStore from "../store/UserStore";
import { useNavigate } from "react-router-dom";
import FirebaseAPI from "../service/Firebase";

// Sidebar component

// Homepage component with toggleable sidebar
const PatientList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<any[]>([]);
  const setDataListStore = useUserStore((state) => state.setPatientInfo);

  useEffect(() => {
    FirebaseAPI()
      .fetchPatientList()
      .then((data) => {
        if (data.data) {
          setDataList(data.data);
        }
      });
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <DefaultSidebar />

      {/* Main Content */}
      <div className={`container mx-auto mt-8 flex-1ml-0`}>
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">User List</h2>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setDataListStore({
                      username: item.data.username,
                      email: item.data.email,
                      uid: item.data.id,
                    });
                    navigate("/patient-page");
                  }}
                >
                  <td className="py-2 px-4 border-b">{item.data.id}</td>
                  <td className="py-2 px-4 border-b">{item.data.username}</td>
                  <td className="py-2 px-4 border-b">{item.data.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
