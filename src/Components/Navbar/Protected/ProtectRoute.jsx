import { Navigate } from "react-router-dom";
const ProtectRute = ({ isLoggedIn, children }) => {
  if (localStorage.getItem('userID')) {
    return <Navigate to="/developers" replace />;
  }
  return children;
};
export default ProtectRute;