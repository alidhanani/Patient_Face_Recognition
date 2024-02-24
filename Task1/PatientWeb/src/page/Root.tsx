import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseAPI from "../service/Firebase";

const Root = () => {
  const navigate = useNavigate();
  const [exist, setExist] = useState(false);

  useLayoutEffect(() => {
    FirebaseAPI()
      .userExist()
      .then((data) => {
        if (data.exist) {
          navigate("/");
        }
        setExist(data.exist);
      });
  }, [exist]);

  const moveToSignup = () => {
    navigate("/signup");
  };

  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Your App</h1>
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={moveToLogin}
          >
            Login
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={moveToSignup}
          >
            Signup
          </button>
        </div>
        <div className="mt-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={moveToForgotPassword}
          >
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Root;
