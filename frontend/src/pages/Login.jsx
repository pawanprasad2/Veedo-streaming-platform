import React, { useState } from "react";
import {
  Mail,
  Lock,
  Video,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import AuthImageLogin from "../components/AuthImageLogin";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import toast from "react-hot-toast";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth.isLoggingIn);
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error(" email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("password is required");
    if (formData.password.length < 6)
      return toast.error("password is must be atleast 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const success = validateForm();
    if (success === true) {
      console.log(formData);
      dispatch(login(formData));
    }
  };

  return (
    <div className="min-h-screen grid  lg:grid-cols-2 bg-white">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-[#e6e8f0]">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3">
              <div className="size-16 rounded-2xl bg-pink-100 flex items-center justify-center shadow-sm">
                <Video className="size-8 text-pink-600" strokeWidth={2} />
              </div>
              <h1 className="text-3xl font-bold righteous-regular text-black mt-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 righteous-regular text-base">
                Sign in to your veedo account
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium righteous-regular text-black">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 size-5" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border-2  border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white text-black placeholder-gray-400"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium righteous-regular text-black">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 size-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white text-black placeholder-gray-400"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-pink-600 righteous-regular flex justify-center items-center hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 flex animate-spin" /> Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Pattern */}
      <AuthImageLogin
        title="Welcome Back"
        subtitle="Your journey. Your videos. Your people."
      />
    </div>
  );
}

export default Login;
