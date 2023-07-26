import { NavLink } from "react-router-dom";
const OwnerLi = () => {
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/managehouse"
          className={({ isActive }) =>
            isActive
              ? "text-red-700 font-semibold lg:border-b-4 border-b-red-700 text-lg"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-red-700 lg:text-white hover:text-red-700 lg:transition lg:duration-200 text-lg"
          }
        >
          Manage Houses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/newhouse"
          className={({ isActive }) =>
            isActive
              ? "text-red-700 font-semibold lg:border-b-4 border-b-red-700 text-lg"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-red-700 lg:text-white hover:text-red-700 lg:transition lg:duration-200 text-lg"
          }
        >
          Add New House
        </NavLink>
      </li>
    </>
  );
};

export default OwnerLi;
