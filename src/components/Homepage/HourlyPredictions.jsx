import HourlyTemperature from './HourlyTemperature';
import { useContext } from 'react';
import GContext from '../Contexts/GContext';

const HourlyPredictions = () => {
  const { tem3Hr } = useContext(GContext);
  return (
    <div className='my-5 text-black'>
      <h1 className='mb-1'>Today at</h1>
      <div className='flex flex-wrap items-center gap-3'>
        {tem3Hr?.map((tem3Hr, index) => {
          return (
            <div key={index}>
              <HourlyTemperature
                time={
                  tem3Hr.dateTime.getHours() >= 12
                    ? tem3Hr.dateTime.getHours() > 12
                      ? tem3Hr.dateTime.getHours() - 12 + ' PM'
                      : tem3Hr.dateTime.getHours() + ' PM'
                    : tem3Hr.dateTime.getHours() + ' AM'
                }
                weather={tem3Hr.weather[0].icon}
                temperature={tem3Hr.main.temp}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyPredictions;
