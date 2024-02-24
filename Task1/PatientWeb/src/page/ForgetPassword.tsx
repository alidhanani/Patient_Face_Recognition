import React, { useState } from "react";
import FirebaseAPI from "../service/Firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleResetPassword = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setResetError("Invalid email address");
      return;
    }

    // Trigger password reset
    FirebaseAPI()
      .resetPassword(email)
      .then(() => {
        setResetSuccess(true);
        setResetError("");
      })
      .catch((error) => {
        setResetSuccess(false);
        setResetError(error.message || "Password reset failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>

          {resetSuccess && (
            <p className="text-green-500 text-center">
              Password reset email sent successfully!
            </p>
          )}
          {resetError && (
            <p className="text-red-500 text-center">{resetError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
