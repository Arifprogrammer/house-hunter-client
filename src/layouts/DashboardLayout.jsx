import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DashboardLayout = () => {
  //* hooks
  const { pathname } = useLocation();

  //* effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <div></div>;
};

export default DashboardLayout;
