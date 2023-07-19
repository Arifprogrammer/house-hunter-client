import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import useRole from "../../hooks/useRole";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isRole] = useRole();
  const listItem = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-900 font-semibold lg:border-b-4 border-b-blue-900 bg-transparent"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-blue-900 lg:text-white hover:text-blue-900 lg:transition lg:duration-200 hover:bg-transparent"
          }
        >
          Home
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              to={`${
                (isRole.renter && "/dashboard/bookedhouse") ||
                (isRole.admin && "/dashboard/managehouse")
              }`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-900 font-semibold lg:border-b-4 border-b-blue-900 bg-transparent"
                  : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-blue-900 lg:text-white hover:text-blue-900 lg:transition lg:duration-200 hover:bg-transparent"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="lg:hidden">
            <button className="font-semibold" onClick={logOut}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <li className="lg:hidden">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-blue-900 font-semibold lg:border-b-4 border-b-blue-900"
                : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-blue-900 lg:text-white hover:text-blue-900"
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <section className="fixed z-10 w-full bg-lime-400">
      <div className="navbar p-0 my-container rounded-sm text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-1 ml-2 p-2 shadow bg-slate-50 rounded-box w-52 font-semibold text-black"
            >
              {listItem}
            </ul>
          </div>
          <div className="hidden lg:flex">
            <h1 className="py-5 text-3xl text-white font-extrabold">
              House
              <span className="text-blue-900 font-extrabold italic text-xl -mt-6 pl-1">
                Hunter
              </span>
            </h1>
          </div>
        </div>
        <div className="navbar-center">
          <div className="lg:hidden">
            <h1 className="py-5 text-3xl text-white font-extrabold">
              House
              <span className="text-blue-900 font-extrabold italic text-xl -mt-6 pl-1">
                Hunter
              </span>
            </h1>
          </div>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal mr-3 gap-4  hidden lg:flex">
            {listItem}
          </ul>
          {user ? (
            <div className=" hidden lg:flex items-center gap-6">
              <button
                className="py-3 px-8 font-semibold  text-white  bg-blue-900 hover:text-blue-900 hover:bg-white lg:transition lg:duration-200"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="py-3 px-8 font-semibold  text-white  bg-blue-900  hidden lg:flex hover:text-blue-900 hover:bg-white lg:transition lg:duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
