import { useContext } from 'react';
import { BiLogoTailwindCss, BiMoon } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaTemperatureEmpty } from 'react-icons/fa6';
import { MdOutlineWbSunny } from 'react-icons/md';
import { PiWindBold } from 'react-icons/pi';
import { WiHumidity } from 'react-icons/wi';
import GContext from '../Contexts/GContext';
import { convertTimestampToHoursMinutes, getConcernLevel } from '../Utils';

const Highlights = () => {
  const { jsonData, highlightedData, location, aqiData } = useContext(GContext);

  const sunriseTime = convertTimestampToHoursMinutes(jsonData?.city.sunrise);
  const sunsetTime = convertTimestampToHoursMinutes(jsonData?.city.sunset);

  return (
    <div className='my-5 text-black p-3 bg-blue-100 rounded-lg'>
      <h1 className='mb-5 text-xl'>Todays Highlights</h1>
      {/* Information Card Blocks */}
      <div className='flex flex-wrap justify-start items-center gap-3'>
        {/* Humidity */}
        <div className='p-3 bg-blue-200 text-black rounded-lg'>
          <h6 className='text-md'>Humidity</h6>
          <div className='py-2 flex justify-between items-center gap-5'>
            <WiHumidity className='text-3xl' />
            <p className='text-3xl'>
              {highlightedData && highlightedData[0].main.humidity}
              <span className='text-xs'> %</span>
            </p>
          </div>
        </div>
        {/* wind */}
        <div className='p-3 bg-blue-200 text-black rounded-lg'>
          <h6 className='text-md'>Wind</h6>
          <div className='py-2 flex justify-between items-center gap-5'>
            <PiWindBold className='text-2xl' />
            <p className='text-3xl'>
              {highlightedData && highlightedData[0].wind.speed}
              <span className='text-xs'> m/s</span>
            </p>
          </div>
        </div>
        {/* Pressure */}
        <div className='p-3 bg-blue-200 text-black  rounded-lg'>
          <h6 className='text-md'>Pressure</h6>
          <div className='py-2 flex justify-between items-center gap-5'>
            <BiLogoTailwindCss className='text-3xl' />
            <p className='text-3xl'>
              {highlightedData && highlightedData[0].main.pressure}
              <span className='text-xs'> hPa</span>
            </p>
          </div>
        </div>
        {/* Visibility */}
        <div className='p-3 bg-blue-200 text-black 0 rounded-lg'>
          <h6 className='text-md'>Visibility</h6>
          <div className='py-2 flex justify-between items-center gap-5'>
            <FaEye className='text-2xl' />
            <p className='text-3xl'>
              {highlightedData && highlightedData[0].visibility}
              <span className='text-xs'> m</span>
            </p>
          </div>
        </div>
        {/* Feels Like */}
        <div className='p-3 bg-blue-200 text-black  rounded-lg'>
          <h6 className='text-md'>Feels Like</h6>
          <div className='py-2 flex justify-between items-center gap-5'>
            <FaTemperatureEmpty className='text-2xl' />
            <div className='flex justify-start items-start'>
              <span className='text-3xl'>
                {highlightedData && highlightedData[0].main.feels_like}
              </span>
              <span className='text-sm -mt-1'>o</span>
              <span className='text-lg mt-1'>C</span>
            </div>
          </div>
        </div>
      </div>
      {/* Sunrise & Sunset */}
      <div className='flex flex-wrap justify-start items-center gap-3'>
        <div className='mt-5 flex flex-start'>
          <div className='p-4 bg-blue-200 text-black  rounded-lg'>
            <h6 className='mb-2 text-md'>Sunrise & Sunset</h6>
            <div className='flex justify-start items-center gap-10'>
              <div className='flex justify-center items-center gap-2'>
                <MdOutlineWbSunny className='text-3xl' />
                <div className='text-center'>
                  <p className='mb-1 text-sm text-black'>Sunrise</p>
                  <p className='text-xl'>
                    {sunriseTime.hours < 10
                      ? '0' + sunriseTime.hours
                      : sunriseTime.hours}
                    :
                    {sunriseTime.minutes < 10
                      ? '0' + sunriseTime.minutes
                      : sunriseTime.minutes}{' '}
                    AM
                  </p>
                </div>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <BiMoon className='text-3xl' />
                <div className='text-center'>
                  <p className='mb-1 text-sm text-black'>Sunset</p>
                  <p className='text-xl'>
                    {sunsetTime.hours > 12
                      ? sunsetTime.hours - 12 < 10
                        ? '0' + sunriseTime.hours
                        : sunriseTime.hours
                      : sunsetTime.hours < 10
                      ? '0' + sunsetTime.hours
                      : sunsetTime.hours}
                    :
                    {sunsetTime.minutes < 10
                      ? '0' + sunsetTime.minutes
                      : sunsetTime.minutes}{' '}
                    {sunsetTime.hours > 12 ? 'PM' : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AQI index */}
        <div className='mt-5 flex flex-start bg-blue-200'>
          <div className='p-4 text-black rounded-lg'>
            <div className='flex justify-start items-center gap-10'>
              <div className='flex flex-col h-full'>
                <div className='text-black text-md mb-2'>
                  {location} AQI Index{' '}
                </div>
                <div className='text-black text-xl my-[10px]'>
                  {aqiData?.aqi}{' '}
                  {'(' + getConcernLevel(aqiData?.aqi)?.levelsOfConcern + ')'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-5 flex flex-start gap-3">
          <div className="p-4 bg-slate-950 text-gray-400 rounded-lg">
            <div className="flex justify-start items-center gap-10">
              <div className="flex flex-col max-h-20">
                <div className="text-gray-400 text-md mb-1">
                  {location} Pollutants
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-gray-400 text-md mr-1">
                    CO : {aqiData?.data[0].co} µg/m³
                  </div>
                  <div className="text-gray-400 text-md mr-1">
                    NO2 : {aqiData?.data[0].no2} µg/m³
                  </div>
                  <div className="text-gray-400 text-md mr-1">
                    O3 : {aqiData?.o3} µg/m³
                  </div>
                  <div className="text-gray-400 text-md mr-1">
                    PM10 : {aqiData?.pm10} µg/m³
                  </div>
                  <div className="text-gray-400 text-md mr-1">
                    PM2.5 : {aqiData?.pm25} µg/m³
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Highlights;
