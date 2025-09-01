import React, { useState, useEffect } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom"; // ✅ Import Link
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function LoginUser() {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    
  };
  const login = async (e) => {
    e.preventDefault();
    if (data.email == "" || data.password == "") {
      toast.error("please fill all the fields");
    } else {
      try {
        const login = await axios.post(
          "https://photogallery-5.onrender.com/api/user/login",
          data,
          { withCredentials: true }
        );

        if (login.status == 200) {
          
           
          setData({
            email: "",
            password: "",
          });

          localStorage.setItem("refreshToken", login.data.data.refreshToken);
          localStorage.setItem("accessToken", login.data.data.accessToken);
          localStorage.setItem("userData", JSON.stringify(login.data.data));

          toast.success(login.data.message);
          navigate("/gallery");
          
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-yellow-100 via-green-100 to-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-green-300">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-primary-200">
            Welcome to SK-Ecom
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-secondary-200">
            <BiLogInCircle size={28} />
            <span className="text-xl font-semibold">Login</span>
          </div>
        </div>

        <form onSubmit={login} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={data.email}
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:border-primary-100 focus:ring-primary-200 pr-10"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaRegEye size={18} />
              )}
            </div>
          </div>
          {/* Forgot Password Link */}
          <div className="text-right text-sm mt-1">
           
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-secondary-200 text-white font-semibold py-2 rounded-md hover:bg-green-800 transition-all duration-300 shadow-md"
          >
            Login
          </button>

          {/* Sign Up Link as Button */}
         
        </form>
      </div>
    </section>
  );
}

export default LoginUser;
