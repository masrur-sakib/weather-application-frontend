import { useContext } from "react";
import { FaCalendar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import GContext from "../Contexts/GContext";

const Summary = () => {
  const { location, highlightedData, country } = useContext(GContext);

  return (
    <div className="my-5 text-black p-3 bg-blue-100  rounded-lg">
      <div>
        Now
        <br />
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-start">
            <span className="text-5xl mr-1">
              {highlightedData && highlightedData[0].main.temp}
            </span>
            <span className="text-md">o</span>
            <span className="text-lg mt-1">C</span>
          </div>
          <div>
            <img
              className="mr-4 text-5xl"
              src={`/${
                highlightedData && highlightedData[0].weather[0].icon
              }.png`}
            />
          </div>
        </div>
        <p className="mt-2 mb-6 text-sm text-black">
          {highlightedData &&
            highlightedData[0].weather[0].description.toUpperCase()}
        </p>
        <hr className="mb-1 bg-black" />
        <div className="p-1 flex justify-start items-center text-sm text-black">
          <FaCalendar className="mr-3" />
          <p>{highlightedData && highlightedData[0].date}</p>
        </div>
        <div className="p-1 flex justify-start items-center text-sm text-black">
          <IoLocationSharp className="mr-3" />
          <p>
            {location} {country?.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
