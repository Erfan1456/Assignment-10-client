import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { user, createUserWithGoogle } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "GrowTogether - Register";
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const { createUser, setUser, updateUser } = use(AuthContext);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLength = password.length >= 6;

    if (!hasUpper)
      return "Password must contain at least one uppercase letter.";
    if (!hasLower)
      return "Password must contain at least one lowercase letter.";
    if (!isLength) return "Password must be at least 6 characters long.";
    return null;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setSaving(false);
      setError(passwordError);
      return;
    }

    createUser(formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUser({ displayName: formData.name, photoURL: formData.photoURL })
          .then(() => {
            setUser({
              ...user,
              displayName: formData.name,
              photoURL: formData.photoURL,
            });
            toast.success("Welcome to GrowTogether! 🌿");
            setSuccess("Registration Successful!");
            setFormData({
              name: "",
              email: "",
              photoURL: "",
              password: "",
            });
            navigate("/");
          })
          .catch(() => {
            toast.error("Failed to update profile info.");
            setError("Failed to update profile info.");
          })
          .finally(() => setSaving(false));
      })
      .catch((error) => {
        toast.error("Failed to register");
        setError(error.message);
        setSaving(false);
      });
  };

  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Welcome to GrowTogether! 🌿");
        setUser(user);
      })
      .catch((error) => {
        toast.error("Google login failed.");
        setError(error.message);
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-400">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7663/7663830.png"
            alt="leaf logo"
            className="w-14 h-14 mx-auto mb-3"
          />
          <h2 className="text-3xl font-bold text-green-700">
            Join GrowTogether
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Start your journey with our gardening community 🌱
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-green-800">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-green-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
            />
          </div>

          {/* PhotoURL */}
          <div>
            <label className="block text-sm font-medium text-green-800">
              Profile Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-green-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Register Button */}
          <button
            disabled={saving}
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            {saving ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="divider my-5 text-gray-400">or</div>
        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 border-2 border-gray-400 py-2 rounded-lg hover:bg-green-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Redirect */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signup"
            className="text-green-700 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
