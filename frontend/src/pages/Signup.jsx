import React, { useState } from "react";
import { Mail, User, Lock, Video, EyeOff, Eye } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/* Left Side - Signup Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-[#e6e8f0]">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3">
              <div className="size-16 rounded-2xl bg-pink-100 flex items-center justify-center shadow-sm">
                <Video className="size-8 text-pink-600" strokeWidth={2} />
              </div>
              <h1 className="text-3xl font-bold text-black mt-2">
                Create Account
              </h1>
              <p className="text-gray-600 text-base">
                Join our video community today
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 size-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white text-black placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 size-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white text-black placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 size-5" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white text-black placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 size-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white text-black placeholder-gray-400"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-pink-400 hover:text-pink-600 transition-colors" />
                  ) : (
                    <Eye className="size-5 text-pink-400 hover:text-pink-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Pattern */}
      <AuthImagePattern
        title="Veedo"
        subtitle="Create, upload, and share amazing videos with the world"
      />
    </div>
  );
}

export default Signup;
