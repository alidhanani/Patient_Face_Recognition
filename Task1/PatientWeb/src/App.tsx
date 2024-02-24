import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Root from "./page/Root";
import { auth } from "./firebase";
import Homepage from "./page/Homepage";
import PatientList from "./page/PatientList";
import UserProfile from "./page/UserProfile";
import PatientPage from "./page/PatientPage";
import VideoPage from "./page/VideoPage";
import ForgotPassword from "./page/ForgetPassword";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // You may want to add a loading spinner or other UI while checking the authentication status
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser ? <Homepage /> : <Root />} />
        {/* Only allow access to /login and /signup when currentUser is false */}
        {!currentUser && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}
        {currentUser && (
          <>
            <Route path="/patient" element={<PatientList />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/patient-page" element={<PatientPage />} />
            <Route path="/patient-video" element={<VideoPage />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
