import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaThumbsUp, FaCalendarAlt, FaUser } from "react-icons/fa";

const TipsDetails = () => {
  const { id } = useParams(); // Get tip ID from URL
  const [tip, setTip] = useState(null);
  const [likes, setLikes] = useState([]);
  const [checkLike, setCheckLike] = useState(false);

  // Simulated logged-in user (replace with your auth context)
  const currentUser = {
    name: "Erfan Khan",
    email: "erfan@gmail.com",
  };

  // Fetch tip details
  useEffect(() => {
    fetch(`http://localhost:5001/tips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTip(data);
        setLikes(data.likes || []);
        const userLiked = data.likes?.some(
          (like) => like.email === currentUser.email
        );
        setCheckLike(userLiked);
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

  const handleLike = async () => {
    if (!tip) return;

    let updatedLikes;

    if (checkLike) {
      // User already liked — remove them
      updatedLikes = likes.filter((like) => like.email !== currentUser.email);
    } else {
      // User not liked — add them
      updatedLikes = [
        ...likes,
        { name: currentUser.name, email: currentUser.email },
      ];
    }

    // Optimistically update UI
    setLikes(updatedLikes);
    setCheckLike(!checkLike);

    // Send PUT request to update backend
    try {
      const res = await fetch(`http://localhost:5001/tips/${tip._id}`, {
        method: "PUT", // <-- Changed from PATCH to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: updatedLikes }),
      });

      if (!res.ok) throw new Error("Failed to update likes");

      const updatedTip = await res.json();
      setTip(updatedTip);
    } catch (err) {
      console.error("Error updating likes:", err);
      // revert UI on failure
      setLikes(likes);
      setCheckLike(checkLike);
    }
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
          className={`flex items-center gap-2 ${
            checkLike
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white py-3 px-5 rounded-xl font-semibold shadow-md transition transform hover:scale-105`}
        >
          <FaThumbsUp /> {checkLike ? "Unlike" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default TipsDetails;
