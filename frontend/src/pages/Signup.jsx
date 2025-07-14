import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(UserDataContext);

  const submitHandeler = async (e) => {
    e.preventDefault();
    setError("");
    const newUser = {
      firstname,
      lastname,
      email,
      password,
    };
    // console.log(newUser);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/register`,
        newUser
      );
      if (response.status == 200 || response.status == 201) {
        const data = response.data;
        setUser(data.user);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError("Signup failed: unexpected response");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "sign up failed"
      );
    }
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
            Create An Account
          </h1>
        </div>

        <form
          action=""
          onSubmit={(e) => {
            submitHandeler(e);
          }}
        >
          {error && (
            <div className="text-red-600 text-center mb-3 sm:mb-4 text-sm sm:text-base px-2">
              {error}
            </div>
          )}

          <label className="block text-base sm:text-lg font-medium text-black mb-2">
            What's Your Full Name
          </label>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
            <input
              type="text"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className="w-full p-3 sm:p-4 border-2 border-[#e473ff] rounded-lg focus:outline-none focus:border-[#f20e89] transition-colors text-sm sm:text-base"
              placeholder="First name"
              required
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className="w-full p-3 sm:p-4 border-2 border-[#e473ff] rounded-lg focus:outline-none focus:border-[#f20e89] transition-colors text-sm sm:text-base"
              placeholder="Last name"
              required
            />
          </div>

          <label className="block text-base sm:text-lg font-medium text-black mb-2">
            What's Your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full mb-4 sm:mb-6 p-3 sm:p-4 border-2 border-[#e473ff] rounded-lg focus:outline-none focus:border-[#f20e89] transition-colors text-sm sm:text-base"
            placeholder="Your email"
            required
          />

          <label className="block text-base sm:text-lg font-medium text-black mb-2">
            Your Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full p-3 sm:p-4 border-2 mb-4 sm:mb-6 border-[#e473ff] rounded-lg focus:outline-none focus:border-[#f20e89] transition-colors text-sm sm:text-base"
            placeholder="Your password"
            required
          />

          <button 
            type="submit"
            className="w-full bg-[#f20e89] text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-[#d60c73] active:bg-[#c40a68] transition-colors border-2 border-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f20e89] focus:ring-offset-2 focus:ring-offset-[#ececec]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6 px-2">
          Already have an Account?{" "}
          <Link 
            className="font-bold text-blue-700 hover:text-blue-800 transition-colors" 
            to="/login"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}