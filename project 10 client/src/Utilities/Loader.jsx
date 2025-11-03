import { FaLeaf } from "react-icons/fa";

const Loader = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center space-y-4">
      {/* Animated spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-success border-t-transparent"></div>

      {/* Optional leaf icon */}
      <FaLeaf className="text-success text-3xl animate-bounce" />

      {/* Loading message */}
      <p className="text-lg font-semibold text-success">{message}</p>
    </div>
  );
};

export default Loader;
