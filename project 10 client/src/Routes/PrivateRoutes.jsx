import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../Utilities/Loader";
import Swal from "sweetalert2";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!loading && !user?.email) {
      Swal.fire({
        title: "Access Denied",
        text: "You need to login first to view this page!",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        setShowAlert(true); // trigger redirect after alert
      });
    }
  }, [loading, user]);

  if (loading) {
    return <Loader />;
  }

  if (user?.email) {
    return children;
  }

  // redirect after showing the alert
  if (showAlert) {
    return <Navigate state={location.pathname} to="/signup" />;
  }

  return null; // render nothing while alert is showing
};

export default PrivateRoutes;
