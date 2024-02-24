import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiTable, HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import FirebaseAPI from "../service/Firebase";

export function DefaultSidebar() {
  const navigate = useNavigate();
  return (
    <Sidebar aria-label="Default sidebar example" className="h-screen">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/profile" icon={HiUser}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item href="/patient" icon={HiTable}>
            Patient
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            <button
              onClick={() => {
                FirebaseAPI()
                  .userLogout()
                  .then(() => {
                    navigate("/");
                  })
                  .catch((error) => {
                    console.error(error.message.toString());
                  });
              }}
            >
              Sign Out
            </button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
