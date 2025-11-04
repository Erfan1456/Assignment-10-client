import { useEffect, useState } from "react";
import { FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const TrendingTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "growTogether - Trending Tips";

    fetch("http://localhost:5001/trendingTips") // Fetch trending tips
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
    return (
      <div className="flex items-center justify-center min-h-screen text-green-700 font-semibold">
        Loading tips...
      </div>
    );
  }

  if (tips.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        No tips found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-8">
        🌿 Trending Gardening Tips
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip) => (
          <div
            key={tip._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-green-100 hover:shadow-xl transition-transform hover:scale-105 flex flex-col md:flex-row-reverse"
          >
            {/* Tip Image */}
            {tip.imageUrl && (
              <img
                src={tip.imageUrl}
                alt={tip.title}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
              />
            )}

            {/* Tip Info */}
            <div className="py-4 px-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-green-700 mb-2">
                  {tip.title}
                </h2>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {tip.description}
                </p>
              </div>

              {/* Footer Info */}
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-2 font-medium text-green-700">
                    <FaUser /> {tip.name}
                  </span>

                  {/* Likes */}
                  <span className="flex items-center gap-1 text-red-500 font-semibold">
                    <FaHeart /> {tip.likes.length || 0}
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/tipsDetails/${tip._id}`}
                    className="text-green-600 hover:underline font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTips;
