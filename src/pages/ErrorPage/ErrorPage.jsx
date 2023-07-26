import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useRouteError } from "react-router-dom";
import errorPic from "../../assets/404.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-12 lg:gap-16 px-4 lg:px-0">
      <div id="error-page">
        <img src={errorPic} alt="" className="w-full" />
      </div>
      <span
        className="p-5 text-xl bg-lime-400 rounded-full text-white"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </span>
    </section>
  );
};

export default ErrorPage;
