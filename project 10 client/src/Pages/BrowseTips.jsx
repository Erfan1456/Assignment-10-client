import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "GrowTogether | Browse Tips";

    // Fetch only public tips from backend
    fetch("http://localhost:5001/tips")
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        console.log(data[0].availability);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tips:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-green-100 p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🌱 Browse Garden Tips
        </h1>

        {tips.length === 0 ? (
          <p className="text-center text-gray-600">No public tips available.</p>
        ) : (
          <table className="table w-full border border-gray-200">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip, index) => {
                if (tip.availability === "Public") {
                  return (
                    <tr key={tip._id} className="hover:bg-green-50">
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={tip.imageUrl}
                          alt={tip.title}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      </td>
                      <td className="font-medium">{tip.title}</td>
                      <td>{tip.category}</td>
                      <td>
                        <span
                          className={`badge ${
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
                          <FaEye /> See More
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BrowseTips;
