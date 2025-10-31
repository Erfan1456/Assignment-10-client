import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Signup = () => {
  useEffect(() => {
    document.title = "GrowTogether - Login";
  }, []);

  const {
    signIn,
    setUser,
    user,
    setLoading,
    createUserWithGoogle,
    forgetPassword,
  } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [emailForgetPassword, setEmailForgetPassword] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate(location.state ? location.state : "/");
  }, [user, navigate]);

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

    signIn(formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Welcome back to GrowTogether!");
        setUser(user);
      })
      .catch(() => {
        toast.error("Login Failed. Check your credentials.");
      })
      .finally(() => {
        setSaving(false);
        setLoading(false);
      });

    setFormData({ email: "", password: "" });
  };

  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success("Successfully Logged In with Google!");
      })
      .catch(() => toast.error("Google Login Failed"));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!emailForgetPassword) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      await forgetPassword(emailForgetPassword);
      toast.success("Password reset email sent! Check your inbox.");
      setEmailForgetPassword("");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      toast.error("Failed to send reset email. Please check your address.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="bg-white/90 backdrop-blur-lg shadow-lg p-8 rounded-3xl w-full max-w-md border border-gray-400">
        <h2 className="text-3xl font-bold text-center mb-6 text-emerald-600">
          Welcome Back 🌱
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Log in to continue growing with your community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={saving}
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition font-semibold"
          >
            {saving ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider my-5 text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-400 py-2 rounded-lg hover:bg-emerald-50 transition font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 mt-6 text-sm">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-emerald-600 hover:underline">
              Register
            </Link>
          </p>

          <button
            className="text-emerald-600 hover:underline"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <h2 className="text-2xl font-bold text-center text-emerald-600">
            Reset Your Password
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Enter your email and we’ll send a reset link.
          </p>

          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={emailForgetPassword}
                onChange={(e) => setEmailForgetPassword(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col-reverse gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_1").close()}
                className="btn border border-gray-200"
              >
                Close
              </button>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition font-semibold"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Signup;
