import { useState } from "react";
import { DefaultSidebar } from "../component/Sidebar";
import EditProfileForm from "../component/EditProfileForm";
import UserProfileDetails from "../component/UserProfileDetails";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div className="flex">
      <DefaultSidebar />
      <div className="flex-1 bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
          {editMode ? (
            // Render an edit form when editMode is true
            <EditProfileForm
              handleSave={handleSave}
              setEditMode={setEditMode}
            />
          ) : (
            // Render user profile details
            <UserProfileDetails handleEditProfile={handleEditProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
