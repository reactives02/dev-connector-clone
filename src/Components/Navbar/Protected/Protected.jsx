import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
  if (!localStorage.getItem('userID')) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;