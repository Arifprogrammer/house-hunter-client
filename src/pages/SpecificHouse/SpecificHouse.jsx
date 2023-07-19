import { useParams } from "react-router-dom";

const SpecificHouse = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default SpecificHouse;
