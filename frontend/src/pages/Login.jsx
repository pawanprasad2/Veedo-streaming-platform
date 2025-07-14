import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData,setUserData]=useState({})
  const { user, setUser, loading } = useContext(UserDataContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userData = {
      email: email,
      password: password,
    };
    console.log(userData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        userData
      );
      if (response.status == 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Login error:", error);
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user]);

  return (
    <div className="bg-[#0d0d0f] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-[#ececec] border-2 sm:border-4 border-[#f20e89] rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Sign in to your account
          </p>
        </div>

        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {error && (
            <div className="text-red-600 text-center mb-3 sm:mb-4 text-sm sm:text-base px-2">
              {error}
            </div>
          )}

          <label className="block text-base sm:text-lg font-medium text-black mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 sm:mb-6 p-3 sm:p-4 border-2 border-[#e473ff] rounded-lg focus:outline-none focus:border-[#f20e89] transition-colors text-sm sm:text-base"
            placeholder="Enter your email"
            required
          />

          <label className="block text-base sm:text-lg font-medium text-black mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 sm:mb-6 p-3 sm:p-4 border-2 border-[#e473ff] rounded-lg focus:outline-none focus:border-[#f20e89] transition-colors text-sm sm:text-base"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#f20e89] text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-[#d60c73] active:bg-[#c40a68] transition-colors border-2 border-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f20e89] focus:ring-offset-2 focus:ring-offset-[#ececec]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6 px-2">
          Don't have an account?
          <Link
            className="font-bold ml-1 text-blue-700 hover:text-blue-800 transition-colors"
            to="/signup"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
