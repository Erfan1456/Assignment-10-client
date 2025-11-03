import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaThumbsUp, FaCalendarAlt, FaUser } from "react-icons/fa";

const TipsDetails = () => {
  const { id } = useParams(); // Get tip ID from URL
  const [tip, setTip] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    document.title = "growTogether - Tip Details";

    // Fetch tip by ID from backend
    fetch(`http://localhost:5001/tips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTip(data);
        console.log(data);
        setLikes(data.likes || 0); // optional likes field
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!tip) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading tip details...
      </div>
    );
  }

  const handleLike = () => {
    if (!tip) return;

    // Optimistically update the UI
    setLikes((prev) => prev + 1);

    // Send PATCH request to backend
    fetch(`http://localhost:5001/tips/${tip._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }), // send updated like count
    })
      .then((res) => res.json())
      .then((data) => {
        // Optionally update tip state with new likes from server
        setTip((prev) => ({ ...prev, likes: data.likes }));
      })
      .catch((err) => {
        console.error("Failed to update likes:", err);
        // Revert UI if failed
        setLikes((prev) => prev - 1);
      });
  };

  const formattedDate = new Date(tip.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-start py-12 px-4">
      <div className="max-w-4xl w-full bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl shadow-green-200 p-8 space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-green-800 drop-shadow-md">
          {tip.title}
        </h1>

        {/* Tip Image */}
        <div className="overflow-hidden rounded-xl border shadow-md">
          <img
            src={tip.imageUrl}
            alt={tip.title}
            className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">Plant Type:</span> {tip.plantType}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {tip.category}
          </p>
          <p>
            <span className="font-semibold">Difficulty:</span> {tip.difficulty}
          </p>
          <p>
            <span className="font-semibold">Availability:</span>{" "}
            {tip.availability}
          </p>
          <p className="sm:col-span-2 flex items-center gap-2">
            <FaUser className="text-green-600" />
            Submitted by: {tip.name}
          </p>
          <p className="sm:col-span-2 flex items-center gap-2">
            <FaCalendarAlt className="text-green-600" /> Submitted on:{" "}
            {formattedDate}
          </p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            Description
          </h2>
          <p className="text-gray-700 text-lg">{tip.description}</p>
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-xl font-semibold shadow-md transition transform hover:scale-105"
        >
          <FaThumbsUp /> Like ({likes})
        </button>
      </div>
    </div>
  );
};

export default TipsDetails;
