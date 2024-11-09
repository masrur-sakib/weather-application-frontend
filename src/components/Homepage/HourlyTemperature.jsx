const HourlyTemperature = ({ time, weather, temperature }) => {
  return (
    <div className="w-24 flex flex-col justify-center items-center gap-3 text-black p-3 bg-blue-100  rounded-lg">
      <p>{time}</p>

      <img className="h-10 text-3xl text-white" src={`/${weather}.png`} />
      <div className="flex justify-start items-start">
        <span>{temperature}</span>
        <span className="text-sm -mt-1">o</span>
        <span className="text-lg"> C</span>
      </div>
    </div>
  );
};

export default HourlyTemperature;
