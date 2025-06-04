import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

import driverBg from "../../public/bg1.jpeg";
import ownerBg from "../../public/bg2.jpeg";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("driver");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    login({
      email,
      userType,
      name: email.split("@")[0],
    });

    navigate("/home");
  };

  const linkColorClass =
    userType === "driver" ? "text-primary-600" : "text-orange-500";
  const buttonColorClass =
    userType === "driver" ? "bg-primary-600" : "bg-orange-500";

  const backgroundImage =
    userType === "driver" ? `url(${driverBg})` : `url(${ownerBg})`;

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage }}
    >
      <div className="container mx-auto px-4">
        <nav className="py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-2xl text-white">
              Hi<span className="text-white">Car</span>
            </span>
          </Link>
          <Link
            to="/signup"
            className={`${buttonColorClass} text-white font-medium py-2 px-6 rounded-full transition-all duration-200`}
          >
            Sign Up
          </Link>
        </nav>

        <div className="flex justify-center items-center min-h-[80vh]">
          <motion.div
            className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

            <div className="flex mb-6">
              <button
                className={`flex-1 py-3 px-4 text-center rounded-md font-medium transition-all duration-200 ${
                  userType === "driver"
                    ? "bg-primary-600 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setUserType("driver")}
              >
                Driver
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center rounded-md font-medium transition-all duration-200 ${
                  userType === "owner"
                    ? "bg-orange-500 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setUserType("owner")}
              >
                Owner
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input-field pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-500" />
                    ) : (
                      <FiEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link
                    to="/forgot-password"
                    className={`text-sm ${linkColorClass}`}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                  userType === "driver"
                    ? "bg-primary-600 text-white"
                    : "bg-orange-500  text-white"
                }`}
              >
                Login as {userType === "driver" ? "Driver" : "Owner"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className={`${linkColorClass} font-medium`}
                >
                  Sign Up
                </Link>
              </p>
            </div>

            {userType === "driver" && (
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">
                  Not a driver?{" "}
                  <Link
                    to="/signup?type=owner"
                    className={`${linkColorClass} font-medium`}
                  >
                    Signup as an Owner
                  </Link>
                </p>
              </div>
            )}

            {userType === "owner" && (
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">
                  Not an owner?{" "}
                  <Link
                    to="/signup?type=driver"
                    className={`${linkColorClass} font-medium`}
                  >
                    Signup as a Driver
                  </Link>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
