import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Home from "../pages/Home/Home/Home";
import SpecificHouse from "../pages/SpecificHouse/SpecificHouse";
import Dashboard from "../layouts/DashboardLayout";
import BookedHouse from "../pages/Dashboard/Renter/BookedHouse";
import ManageHouse from "../pages/Dashboard/Owner/ManageHouse";
import AddHouse from "../pages/Dashboard/Owner/AddHouse";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch("https://house-hunter-server-sage.vercel.app/totalhouses"),
      },
      {
        path: "/houses/:id",
        element: <SpecificHouse />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      //! renter routes
      {
        path: "bookedhouse",
        element: <BookedHouse />,
      },
      //! owner routes
      {
        path: "managehouse",
        element: <ManageHouse />,
      },
      {
        path: "newhouse",
        element: <AddHouse />,
      },
    ],
  },
]);

export default Router;
