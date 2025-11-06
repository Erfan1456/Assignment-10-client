import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import BASE_URL from "../../Utilities/backendURL";

const TipsUpdateModal = ({ tip, onUpdate, setTips }) => {
  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficulty: "",
    description: "",
    imageUrl: "",
    category: "",
    availability: "",
  });

  useEffect(() => {
    if (tip) {
      setFormData({
        title: tip.title || "",
        plantType: tip.plantType || "",
        difficulty: tip.difficulty || "",
        description: tip.description || "",
        imageUrl: tip.imageUrl || "",
        category: tip.category || "",
        availability: tip.availability || "",
      });
    }
  }, [tip]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tip) return;

    fetch(`${BASE_URL}/tips/${tip._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedTip) => {
        toast.success("🌿 Tip updated successfully!");

        const modal = document.getElementById("my_modal_1");
        if (modal) modal.close();

        if (setTips) {
          setTips((prevTips) =>
            prevTips.map((t) => (t._id === updatedTip._id ? updatedTip : t))
          );
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("Update failed!");
      });
  };

  if (!tip) return null;

  return (
    <dialog id="my_modal_1" className="modal">
      <form
        onSubmit={handleSubmit}
        className="modal-box max-w-lg bg-white dark:bg-base-200 space-y-4"
      >
        <h3 className="text-xl font-bold text-green-700 border-b pb-2">
          Update Gardening Tip
        </h3>

        {/* Author Info Card */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
          <FaUserCircle className="text-4xl text-green-600" />
          <div>
            <h4 className="font-semibold text-green-800">
              {tip.name || "Unknown Author"}
            </h4>
            <p className="text-sm text-gray-500">
              {tip.email || "No email provided"}
            </p>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            required
          />
        </div>

        {/* Plant Type */}
        <div>
          <label className="block font-medium text-gray-700">Plant Type</label>
          <input
            type="text"
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block font-medium text-gray-700">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            required
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
          <label className="block font-medium text-gray-700">
            Availability
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
            required
          >
            <option value="">Select Availability</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="modal-action flex justify-end gap-2">
          <button
            type="button"
            onClick={() => document.getElementById("my_modal_1").close()}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white"
          >
            Update Tip
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default TipsUpdateModal;
