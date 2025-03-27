import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useAuthStore } from "./stores/auth.store";
import { useEffect } from "react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
    console.log(authUser);
  }, [checkAuth]);

  if (isCheckingAuth && authUser) {
    return (
      <div className="flex justify-center items-center h-[92.5vh]">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
