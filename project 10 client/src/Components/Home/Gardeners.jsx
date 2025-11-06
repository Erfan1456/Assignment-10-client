import React, { useEffect, useState } from "react";
import { FaLeaf, FaMapMarkerAlt } from "react-icons/fa";
import BASE_URL from "../../Utilities/backendURL";

const Gardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/activeUsers`)
      .then((res) => res.json())
      .then((data) => {
        setGardeners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gardeners:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-green-700 font-semibold">
        Loading active gardeners...
      </div>
    );
  }

  if (gardeners.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        No active gardeners found.
      </div>
    );
  }

  return (
    <div className=" py-12 px-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        🌿 Active Gardeners
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gardeners.map((gardener) => (
          <div
            key={gardener._id}
            className="bg-info border border-green-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Gardener Image */}
            <img
              src={gardener.image}
              alt={gardener.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-green-200 object-cover"
            />

            {/* Info */}
            <div className="text-center mt-4 space-y-2">
              <h2 className="text-xl font-bold text-green-700 flex items-center justify-center gap-1">
                <FaLeaf className="text-green-600" /> {gardener.name}
              </h2>
              <p className="text-base-content text-sm">
                {gardener.gender}, {gardener.age} years old
              </p>
              <p className="text-green-700 flex items-center justify-center gap-1 text-sm">
                <FaMapMarkerAlt /> {gardener.location}
              </p>
              <p className="text-base-content text-sm">
                Total Shared Tips:{" "}
                <span className="font-semibold text-green-700">
                  {gardener.totalSharedTips}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gardeners;
