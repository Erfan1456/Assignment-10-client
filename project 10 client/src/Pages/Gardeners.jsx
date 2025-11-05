import React, { useEffect, useState } from "react";
import Loader from "./../Utilities/Loader";

const Gardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true); // added loading state

  useEffect(() => {
    document.title = "growTogether | Gardeners";

    fetch("http://localhost:5001/users") // replace with your API
      .then((res) => res.json())
      .then((data) => {
        setGardeners(data);
        setLoading(false); // stop loading when data is fetched
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // stop loading on error
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen text-base-content py-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        🌿 Gardeners Profiles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {gardeners.map((gardener) => (
          <div
            key={gardener.name}
            className="bg-info bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105"
          >
            <img
              src={gardener.image}
              alt={gardener.name}
              className="w-24 h-24 rounded-full border-2 border-green-300 mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-green-700">
              {gardener.name}
            </h2>
            <p className="text-base-content mb-2">{gardener.age} years old</p>

            <div className="divider my-5 text-base-content"></div>

            <div>
              <p className="text-base-content mb-2">
                Gender: {gardener.gender}
              </p>
              <p
                className={`mb-2 font-medium ${
                  gardener.status === "Active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                Status: {gardener.status}
              </p>
              <p className="text-base-content text-sm mb-2">
                Experience: {gardener.experience}
              </p>
              <p className="text-base-content text-sm mb-2">
                Total Tips Shared: {gardener.totalSharedTips}
              </p>
              <p className="text-base-content text-sm mb-2">
                Favorite Plants: {gardener.favoritePlants.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gardeners;
