import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../Utilities/Loader";
import TipsUpdateModal from "../Components/myTips/TipsUpdateModal";
import Swal from "sweetalert2";
import BASE_URL from "./../Utilities/backendURL";

const MyTips = () => {
  const [tips, setTips] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null); // 👈 store tip for modal
  const [loading2, setLoading2] = useState(true);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return; // wait for user to be loaded

    document.title = "GrowTogether | My Tips";

    fetch(`${BASE_URL}/tips`)
      .then((res) => res.json())
      .then((data) => {
        setTips(
          data.filter(
            (tip) => user.displayName === tip.name && user.email === tip.email
          )
        );
        setLoading2(false); // ✅ set loading false after data is set
      })
      .catch((err) => {
        console.error("Error fetching tips:", err);
        setLoading2(false); // ✅ also set loading false on error
      });
  }, [user]);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger mx-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${BASE_URL}/tips/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                setTips((prev) => prev.filter((tip) => tip._id !== id));
              }
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: `${err}`,
                icon: "error",
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleUpdate = (tip) => {
    setSelectedTip(tip); // 👈 store selected tip in state
    const modal = document.getElementById("my_modal_1");
    if (modal) modal.showModal(); // 👈 open modal
  };

  if (loading || loading2) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-base-200 rounded-2xl shadow-xl md:p-6 px-2 py-6">
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
                  <th className="hidden md:table-cell">#</th>
                  <th className="table-cell">Title</th>
                  <th className="hidden md:table-cell">Category</th>
                  <th className="hidden md:table-cell">Plant Type</th>
                  <th className="table-cell">Visibility</th>
                  <th className="hidden md:table-cell">Created At</th>
                  <th className="table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tips.map((tip, index) => (
                  <tr
                    key={tip._id}
                    className="hover:bg-green-50 dark:hover:bg-base-300 transition"
                  >
                    {/* Index */}
                    <td className="hidden md:table-cell">{index + 1}</td>

                    {/* Title */}
                    <td className="font-semibold text-green-700">
                      {tip.title}
                    </td>

                    {/* Category */}
                    <td className="hidden md:table-cell">{tip.category}</td>

                    {/* Plant Type */}
                    <td className="hidden md:table-cell">{tip.plantType}</td>

                    {/* Availability */}
                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          tip.availability === "Public"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-pink-800"
                        }`}
                      >
                        {tip.availability}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="hidden md:table-cell">
                      {new Date(tip.createdAt).toLocaleDateString("en-US")}
                    </td>

                    {/* Actions */}
                    <td className="flex flex-col md:flex-row gap-2">
                      <button
                        onClick={() => handleUpdate(tip)}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pass selected tip to modal */}
      <TipsUpdateModal tip={selectedTip} setTips={setTips} />
    </div>
  );
};

export default MyTips;
