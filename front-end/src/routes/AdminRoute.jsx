import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("admin_token");
  const role = localStorage.getItem("admin_role");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const user = { role: role };

  return <Outlet context={{ user }} />;
};

export default AdminRoute;