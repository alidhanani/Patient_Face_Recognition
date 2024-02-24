import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database, storage } from "../firebase";
import { onValue, ref, set, update } from "firebase/database";
import {
  ref as refStorage,
  listAll,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
  StorageReference,
  getMetadata,
} from "firebase/storage";
import Time from "./Time";
import {
  CallbackFunctionLogin,
  CallbackFunctionUserExist,
  CallbackFunctionProfile,
  CallbackFunctionStorageFilename,
  CallbackFunctionLogout,
  CallbackFunctionUpdatePatientInfo,
  CallbackFunctionFileDelete,
  CallbackFunctionFileURL,
  CallbackFunctionUploadVideo,
  CallbackFunctionFetchPatientList,
  CallbackFunctionPasswordReset,
} from "./FirebaseAPIType";

const FirebaseAPI = () => {
  const loginWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<CallbackFunctionLogin> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          resolve({
            success: true,
            userCred: data,
          });
        })
        .catch((error) => {
          reject({
            success: false,
            userCred: null,
            message: error,
          });
        });
    });
  };

  const resetPassword = (
    email: string
  ): Promise<CallbackFunctionPasswordReset> => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve({
            success: true,
            message: "Success",
          });
        })
        .catch((error) => {
          reject({
            success: false,
            message: error,
          });
        });
    });
  };

  const userExist = (): Promise<CallbackFunctionUserExist> => {
    return new Promise((resolve, reject) => {
      if (auth.currentUser) {
        resolve({
          exist: true,
        });
      } else {
        reject({
          exist: false,
        });
      }
    });
  };

  const signUpWithEmailAndPassword = (
    email: string,
    password: string,
    patientInfo: Patient
  ): Promise<CallbackFunctionLogin> => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          set(ref(database, "admin/" + data.user.uid), {
            username: patientInfo.Fullname,
            email: email,
            id: data.user.uid,
            createDate: Time(),
            firstName: patientInfo.Firstname,
            lastName: patientInfo.Lastname,
          })
            .then(() => {
              resolve({
                success: true,
                userCred: data,
              });
            })
            .catch((error) => {
              reject({
                success: false,
                userCred: null,
                message: error,
              });
            });
        })
        .catch((error) => {
          reject({
            success: false,
            userCred: null,
            message: error,
          });
        });
    });
  };

  const fetchProfileData = (): Promise<CallbackFunctionProfile> => {
    return new Promise((resolve, reject) => {
      try {
        const starCountRef = ref(database, "admin/" + auth.currentUser.uid);
        onValue(starCountRef, (snapshot) => {
          const dataFetch = snapshot.val();
          resolve({
            success: true,
            user: {
              Username: dataFetch["username"],
              UID: dataFetch["id"],
              Email: dataFetch["email"],
              Fullname: dataFetch["username"],
              Firstname: dataFetch["firstName"],
              Lastname: dataFetch["lastName"],
              CreatedDate: dataFetch["createDate"],
            },
          });
        });
      } catch (error) {
        reject({
          success: false,
          message: error,
        });
      }
    });
  };

  const fetchStorageFilename = (
    filepath: string
  ): Promise<CallbackFunctionStorageFilename> => {
    return new Promise(async (resolve, reject) => {
      const storageRef = refStorage(storage, filepath);

      try {
        const listResult = await listAll(storageRef);

        // Fetch metadata for each file to get the last modified date
        const fileInfoPromises = listResult.items.map(async (item) => {
          const metadata = await getMetadata(item);
          return {
            name: item.name,
            lastModified: new Date(metadata.updated),
          };
        });

        // Resolve the promise when all metadata is fetched
        const fileInfos = await Promise.all(fileInfoPromises);

        // Extract file names from the list result
        const fileNames = fileInfos.map((info) => info.name);

        resolve({
          success: true,
          filename: fileInfos,
        });
      } catch (error) {
        reject({
          success: false,
          message: error,
        });
      }
    });
  };

  const userLogout = (): Promise<CallbackFunctionLogout> => {
    return new Promise(async (resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          resolve({
            success: true,
            message: "Success",
          });
        })
        .catch((error) => {
          reject({
            success: false,
            message: error,
          });
        });
    });
  };

  const updatePatientInformation = (patientUpdateInfo: {
    username: string;
    createDate: string;
    firstName: string;
    lastName: string;
  }): Promise<CallbackFunctionUpdatePatientInfo> => {
    return new Promise(async (resolve, reject) => {
      if (auth.currentUser) {
        update(
          ref(database, "admin/" + auth.currentUser.uid),
          patientUpdateInfo
        )
          .then(() => {
            resolve({
              success: true,
              patient: patientUpdateInfo,
            });
          })
          .catch((error) => {
            reject({
              success: false,
              message: error,
            });
          });
      }
    });
  };

  const deleteFileFromStorage = (
    filename: string
  ): Promise<CallbackFunctionFileDelete> => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileRef = refStorage(storage, filename);
        await deleteObject(fileRef)
          .then(() => {
            resolve({
              success: true,
              message: "file deleted",
            });
          })
          .catch((error) => {
            reject({
              success: false,
              message: error,
            });
          });
      } catch (error) {
        reject({
          success: false,
          message: error,
        });
      }
    });
  };

  const fetchVideoURL = (
    videoPath: string
  ): Promise<CallbackFunctionFileURL> => {
    console.log(videoPath);

    return new Promise(async (resolve, reject) => {
      try {
        const storageRef = refStorage(storage, videoPath); // Replace with your actual storage path
        const downloadURL = await getDownloadURL(storageRef);
        resolve({
          success: true,
          url: downloadURL,
        });
      } catch (error) {
        reject({
          success: false,
          message: error,
        });
      }
    });
  };

  const uploadVideo = (uri: string): Promise<CallbackFunctionUploadVideo> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = refStorage(
          storage,
          `videos/${auth.currentUser.uid}/` + Date.now() + ".mp4"
        );
        await uploadBlob(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        resolve({
          success: true,
          url: downloadURL,
        });
      } catch (error) {
        reject({
          success: false,
          message: error,
        });
      }
    });
  };

  const uploadBlob = async (
    storageRef: StorageReference,
    blob: Blob | ArrayBuffer
  ) => {
    return new Promise<void>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress tracking if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading:", error);
          reject(error);
        },
        () => {
          // Upload completed successfully
          console.log("Upload complete");
          resolve();
        }
      );
    });
  };

  const fetchPatientList = (): Promise<CallbackFunctionFetchPatientList> => {
    return new Promise(async (resolve, reject) => {
      try {
        const starCountRef = ref(database, "patient");
        onValue(starCountRef, (snapshot) => {
          const dataFetch = snapshot.val();

          // Check if dataFetch is not null
          if (dataFetch) {
            // Create an array to store the data
            const newDataList: { key: string; data: any }[] = [];

            // Iterate through keys and save data to the array
            Object.keys(dataFetch).forEach((key) => {
              const dataForKey = dataFetch[key];
              newDataList.push({
                key: key,
                data: dataForKey,
              });
            });

            // Set the state with the array of data
            resolve({
              success: true,
              data: newDataList,
            });
          }
        });
      } catch (error) {
        reject({
          success: false,
          message: error,
        });
      }
    });
  };

  return {
    loginWithEmailAndPassword,
    userExist,
    signUpWithEmailAndPassword,
    fetchProfileData,
    fetchStorageFilename,
    userLogout,
    updatePatientInformation,
    deleteFileFromStorage,
    fetchVideoURL,
    uploadVideo,
    fetchPatientList,
    resetPassword,
  };
};

export default FirebaseAPI;
