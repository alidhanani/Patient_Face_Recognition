import React, { useEffect, useState } from "react";
import useUserStore from "../../store/UserStore";
import { useNavigate } from "react-router-dom";
import FirebaseAPI from "../../service/Firebase";
import ConfirmationModal from "../../component/ConfirmatiomModal";
import { FileInfo } from "../../service/FirebaseAPIType";

const PatientTable = () => {
  const [fileNames, setFileNames] = useState<FileInfo[]>([]);
  const userInfo = useUserStore((state) => state.patientInfo);
  const [didDelete, setDidDelete] = useState(false);
  const setPatientVideoPath = useUserStore(
    (state) => state.setpatientVideoPath
  );
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState("");

  useEffect(() => {
    console.log(userInfo);

    FirebaseAPI()
      .fetchStorageFilename(`videos/` + userInfo.uid)
      .then((data) => {
        if (data.filename) {
          console.log(data.filename);

          setFileNames(data.filename);
        }
      });
  }, [didDelete]);

  const handleViewClick = (fileName) => {
    // Handle view button click, e.g., navigate to a screen to view the file
    setPatientVideoPath(`videos/${userInfo.uid}/${fileName}`);
    navigate("/patient-video");
  };

  const handleDeleteClick = (fileName) => {
    // Handle delete button click, e.g., delete the file from Firebase Storage
    setFileToDelete(fileName);
    setShowDeleteModal(true);
    setDidDelete(!didDelete);
  };

  const handleConfirmDelete = () => {
    FirebaseAPI()
      .deleteFileFromStorage(`videos/${userInfo.uid}/${fileToDelete}`)
      .then(() => {
        setDidDelete(!didDelete);
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.log(error.message.toString());
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <table className="bg-white p-8 rounded shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Filename</th>
            <th className="py-2 px-4 border-b">Datatime</th>
            <th className="py-2 px-4 border-b">View</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {fileNames.map((data) => (
            <tr>
              <td className="py-2 px-4 border-b">{data.name}</td>
              <td className="py-2 px-4 border-b">
                {data.lastModified.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleViewClick(data.name)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeleteClick(data.name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default PatientTable;
