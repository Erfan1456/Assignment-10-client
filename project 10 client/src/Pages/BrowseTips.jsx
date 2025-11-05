import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import Loader from "./../Utilities/Loader";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // NEW: filter state
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "GrowTogether | Browse Tips";

    // Fetch only public tips from backend
    fetch("http://localhost:5001/tips")
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tips:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  // 🔍 Filter logic
  const filteredTips =
    filter === "All"
      ? tips.filter((tip) => tip.availability === "Public")
      : tips.filter(
          (tip) => tip.availability === "Public" && tip.difficulty === filter
        );

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-6xl mx-auto dark:bg-base-200 rounded-3xl shadow-xl shadow-base-100 md:p-6 px-2 py-6 overflow-x-auto">
        <h1 className="md:text-3xl text-2xl font-bold text-green-700 mb-6 text-center">
          🌱 Browse Garden Tips
        </h1>

        {/* 🔽 Filter Dropdown */}
        <div className="flex justify-end mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered w-48 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200"
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {filteredTips.length === 0 ? (
          <p className="text-center text-gray-600">No tips found.</p>
        ) : (
          <table className="table w-full border border-gray-200">
            <thead className="bg-green-100 dark:bg-green-900 text-white">
              <tr>
                <th className="hidden md:table-cell">#</th>
                <th>Image</th>
                <th>Title</th>
                <th className="hidden md:table-cell">Category</th>
                <th className="hidden md:table-cell">Difficulty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTips.map((tip, index) => (
                <tr key={tip._id} className="hover:bg-base-300">
                  <td className="hidden md:block">{index + 1}</td>
                  <td>
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="font-medium">{tip.title}</td>
                  <td className="hidden md:table-cell">{tip.category}</td>
                  <td className="md:table-cell hidden">
                    <span
                      className={`hidden md:block badge ${
                        tip.difficulty === "Easy"
                          ? "badge-success"
                          : tip.difficulty === "Medium"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {tip.difficulty}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/tipsDetails/${tip._id}`)}
                      className="btn btn-sm bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <FaEye />{" "}
                      <span className="hidden md:block">See More</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BrowseTips;
