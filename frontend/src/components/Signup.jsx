import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/api/users/register", {
        username,
        email,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-700 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?signup,technology')",
      }}
    >
      <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-white text-center">
          Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
            <FiUser className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
            <FiMail className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
            <FiLock className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
            <FiLock className="w-6 h-6 text-gray-400 ml-3" />
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-300 hover:underline">
                Login
              </Link>
            </p>

            <button
              type="submit"
              className="px-6 py-2 text-white bg-indigo-500 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-300 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}

export default Signup;