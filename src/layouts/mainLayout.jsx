import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
