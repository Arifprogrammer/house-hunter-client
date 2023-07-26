import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useRole from "../hooks/useRole";
import RenterLi from "../components/RenterLi";
import OwnerLi from "../components/OwnerLi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isRole] = useRole();
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-x-auto w-full px-20 py-12">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <Outlet />
        </div>
        <div className="drawer-side bg-slate-900">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu px-4 w-80 h-full text-base-content space-y-6 flex flex-col justify-center">
            {/* Sidebar content here */}
            <div className="mb-12">
              <img
                src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
                alt=""
                className="mx-auto h-32 w-32 rounded-full border-4 border-white object-cover"
              />
              <h1 className="text-white mt-6 text-center text-xl font-bold">
                {user?.displayName}
              </h1>
            </div>
            {isRole.renter && <RenterLi />}
            {isRole.owner && <OwnerLi />}
            <div className="h-[2px] bg-slate-400"></div>{" "}
            <li>
              <Link
                to="/"
                className="font-semibold lg:border-b-4 lg:border-b-white hover:border-b-red-700 lg:text-white hover:text-red-700 lg:transition lg:duration-200 text-lg"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
