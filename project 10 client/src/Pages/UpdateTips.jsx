import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const UpdateTips = () => {
  const { id } = useParams(); // Get tip ID from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);

  // Fetch existing tip data
  useEffect(() => {
    fetch(`http://localhost:5001/tips/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5001/tips/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("🌿 Tip Updated Successfully!");
        navigate("/myTips"); // go back to your tips page
      })
      .catch((err) => console.error(err));
  };

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-3 text-gray-700">
          <span className="loading loading-spinner loading-lg text-green-600"></span>
          <p>Loading your tip...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-start py-12 px-4"
      style={{
        backgroundImage:
          "url('https://tse2.mm.bing.net/th/id/OIF.C2t7yo416jHs38qqR5tyMA?rs=1&pid=ImgDetMain&o=7&rm=3')",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Header */}
      <div className="relative z-10 text-center text-white mb-10">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-md">
          🌿 Update Your Garden Tip
        </h1>
        <p className="text-lg text-green-100 drop-shadow">
          Edit and improve your gardening wisdom
        </p>
      </div>

      {/* User Info */}
      <div className="relative z-10 flex flex-col items-center text-center mb-10">
        <img
          src={
            user?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <h3 className="text-lg font-semibold text-white mt-3 drop-shadow-md">
          {user ? user.displayName : "Guest User"}
        </h3>
        <p className="text-gray-200 drop-shadow-sm">
          {user ? user.email : "guest@example.com"}
        </p>
      </div>

      {/* Glass Form */}
      <div className="relative z-10 max-w-2xl w-full bg-white/60 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-8 mb-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-800">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>

          {/* Plant Type */}
          <div>
            <label className="block font-medium text-gray-800">
              Plant Type / Topic
            </label>
            <input
              type="text"
              name="plantType"
              value={formData.plantType}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block font-medium text-gray-800">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-800">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium text-gray-800">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-800">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            >
              <option value="">Select Category</option>
              <option value="Composting">Composting</option>
              <option value="Plant Care">Plant Care</option>
              <option value="Vertical Gardening">Vertical Gardening</option>
              <option value="Hydroponics">Hydroponics</option>
              <option value="Balcony Gardening">Balcony Gardening</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block font-medium text-gray-800">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            >
              <option value="">Select Availability</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Update Tip 🌻
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTips;
