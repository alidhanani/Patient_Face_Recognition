import useUserStore from '../../store/UserStore';


const PatientInformation = () => {
  const userInfo = useUserStore((state) => state.patientInfo);

  return (
    <div className="bg-white p-8 rounded shadow-md mb-4">
      <h1>User Information</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Username:</td>
            <td className="py-2 px-4 border-b">{userInfo.username}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Email:</td>
            <td className="py-2 px-4 border-b">{userInfo.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientInformation;
