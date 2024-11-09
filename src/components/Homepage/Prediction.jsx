import { FaRegCheckCircle } from "react-icons/fa";

const Prediction = () => {
  return (
    <div className="my-5 text-white">
      <h1 className="mb-1">Prediction</h1>
      <div className="text-black p-3 bg-blue-100  rounded-lg">
        <div className="flex justify-start items-center gap-2">
          <FaRegCheckCircle className="text-black" />
          <text>Temperature Prediction</text>
        </div>
        <div className="flex justify-start items-center gap-2">
          <FaRegCheckCircle className="text-black" />
          <text>Rain Prediction</text>
        </div>
        <div className="flex justify-start items-center gap-2">
          <FaRegCheckCircle className="text-black" />
          <text>Other Prediction</text>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
