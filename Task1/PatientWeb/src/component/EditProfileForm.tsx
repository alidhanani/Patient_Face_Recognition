import { useState } from "react";
import FirebaseAPI from "../service/Firebase";
import Time from "../service/Time";

const EditProfileForm = ({ handleSave, setEditMode }) => {
  const [fullName, setFullname] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const handleSaveClick = () => {
    // Update user email in Firebase Auth
    FirebaseAPI()
      .updatePatientInformation({
        username: fullName,
        createDate: Time(),
        firstName: firstName,
        lastName: lastName,
      })
      .then(() => handleSave())
      .catch((error) => console.log(error.message.toString()));
  };

  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-600 font-bold">Full Name:</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={fullName}
          onChange={(e) => setFullname(e.currentTarget.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-bold">First Name:</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={firstName}
          onChange={(e) => setFirstname(e.currentTarget.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-bold">Last Name:</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={lastName}
          onChange={(e) => setLastname(e.currentTarget.value)}
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSaveClick}
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
