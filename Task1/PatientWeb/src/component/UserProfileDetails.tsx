import { useEffect, useState } from "react";
import FirebaseAPI from "../service/Firebase";

const UserProfileDetails = ({ handleEditProfile }) => {
  const [data, setData] = useState<Patient>();

  useEffect(() => {
    FirebaseAPI()
      .fetchProfileData()
      .then((data) => {
        setData(data.user);
      })
      .catch((e) => console.log(e.message.toString()));
  }, []);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-600 font-bold">User ID:</label>
        <span className="text-gray-800">{data?.UID}</span>
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 font-bold">Fullname:</label>
        <span className="text-gray-800">{data?.Fullname}</span>
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 font-bold">Firstname:</label>
        <span className="text-gray-800">{data?.Firstname}</span>
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 font-bold">Lastname:</label>
        <span className="text-gray-800">{data?.Lastname}</span>
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 font-bold">Email:</label>
        <span className="text-gray-800">{data?.Email}</span>
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 font-bold">Create Date:</label>
        <span className="text-gray-800">{data?.CreatedDate}</span>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleEditProfile}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfileDetails;
