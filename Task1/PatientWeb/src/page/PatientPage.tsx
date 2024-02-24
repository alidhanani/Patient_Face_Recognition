import { DefaultSidebar } from "../component/Sidebar";
import PatientInformation from "./Patient/Patient.info";
import PatientTable from "./Patient/Patient.table";

// UserPage.js
const PatientPage = () => {
  return (
    <div className="flex">
      <DefaultSidebar />
      <div className="flex-1 flex flex-col p-4"> {/* Added a container with flex styles */}
        <PatientInformation />
        <PatientTable />
      </div>
    </div>
  );
};

export default PatientPage;
