import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    alert('У вас нет прав для просмотра этой страницы(');
    return <Navigate to="/teams" />;
  }
  
  return children;
};

export default ProtectedRoute;

