import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/shared/Header";
import Footer from "../pages/shared/Footer";
import { useEffect } from "react";

const MainLayout = () => {
  //* hooks
  const { pathname } = useLocation();

  //* effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Header />
      <div className="min-h-[85vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
