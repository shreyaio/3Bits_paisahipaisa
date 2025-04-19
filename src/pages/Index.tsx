
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    console.log("Index page loaded - redirecting to Home page");
  }, []);

  // Simply redirect to the Home component
  return <Navigate to="/" replace />;
};

export default Index;
