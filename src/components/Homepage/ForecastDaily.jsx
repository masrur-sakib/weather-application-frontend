const ForecastDaily = ({ logo, temperature, date, day }) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="w-1/3 flex justify-around items-center">
        <img className="h-10 text-3xl text-sky-300" src={`/${logo}.png`} />
        <div className="flex justify-start items-start">
          <span>{temperature}</span>
          <span className="text-sm -mt-1 pl-1">o</span>
          <span className="text-sm mt-1">C</span>
        </div>
      </div>
      <div className="w-2/3 flex justify-between items-center">
        <p className="text-black">{date}</p>
        <p className="text-black">{day}</p>
      </div>
    </div>
  );
};

export default ForecastDaily;
