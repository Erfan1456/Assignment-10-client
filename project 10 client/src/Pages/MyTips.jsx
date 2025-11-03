import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../Utilities/Loader";

const MyTips = () => {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);

  // Example user email (replace with actual logged-in user's email if you have auth)
  const userEmail = "erfan@example.com";

  // Fetch user's own tips
  useEffect(() => {
    document.title = "growTogether - My Tips";

    fetch(`http://localhost:5001/tips`)
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch((err) => console.error("Error fetching tips:", err));
  }, [userEmail]);

  // Handle delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this tip?")) return;

    fetch(`http://localhost:5001/tips/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Tip deleted successfully!");
          setTips((prev) => prev.filter((tip) => tip._id !== id));
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  // Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/updateTip/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-base-200 rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          My Shared Tips
        </h1>

        {tips.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't shared any tips yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-200 rounded-lg">
              <thead className="bg-green-100 dark:bg-green-900">
                <tr className="text-gray-700 dark:text-gray-100">
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Plant Type</th>
                  <th>Visibility</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tips.map((tip, index) => {
                  if (
                    user.displayName === tip.name &&
                    user.email === tip.email
                  ) {
                    return (
                      <tr
                        key={tip._id}
                        className="hover:bg-green-50 dark:hover:bg-base-300 transition"
                      >
                        <td>{index + 1}</td>
                        <td className="font-semibold text-green-700">
                          {tip.title}
                        </td>
                        <td>{tip.category}</td>
                        <td>{tip.plantType}</td>
                        <td>
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              tip.availability === "Public"
                                ? "bg-green-200 text-green-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            {tip.availability}
                          </span>
                        </td>
                        <td>
                          {new Date(tip.createdAt).toLocaleDateString("en-US")}
                        </td>
                        <td className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(tip._id)}
                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(tip._id)}
                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTips;
