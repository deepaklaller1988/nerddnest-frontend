import { isAuthenticated } from "@/redux/slices/auth.slice";
import React from "react";
import { useSelector } from "react-redux";

const isAuthenticatedUser: React.FC = () => {
  const authenticated = useSelector(isAuthenticated);

  if (authenticated) {
    return <div>Welcome, you are authenticated!</div>;
  } else {
    return <div>Please log in.</div>;
  }
};

export default isAuthenticatedUser;
