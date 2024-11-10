import { createContext, useState, useEffect } from 'react';
import {
  findMainObjectsForUniqueDates,
  findMainObjectForTodaysDates,
} from '../Utils';
const APIKEY = '60fddad1a66b4259a400bd0692258fcf';
const GContext = createContext({});
// const domain = 'http://127.0.0.1:8000';

export const GProvider = ({ children }) => {
  const [location, setLocation] = useState('');
  const [highlightedData, sethighlightedData] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [jsonData, setJsonData] = useState();
  const [tem3Hr, setTem3Hr] = useState();
  const [country, setCountry] = useState();
  const [aqiData, setAqiData] = useState();
  const [startDate, setStartDate] = useState(
    new Date('2023-09-20T05:00:00.000Z')
  );

  const [aqiClk, setAqiClk] = useState(false);

  const [finishDate, setFinishDate] = useState(new Date());

  const getLocationInfo = async (lat, long) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=${APIKEY}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          setLocation(data.results[0].components.city);
          setCountry(data.results[0].components.country_code);
        } else {
          alert('Geolocation request failed.');
        }
      })
      .catch((error) => console.error(error));

    const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=8ba6b335dba627de6b394efff8b1d5a8&units=metric`;

    await fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
      })
      .catch((error) => console.error(error));

    const url2 = `http://api.waqi.info/feed/geo:${lat};${long}?token=2022663e245bcc479f2fddb57ce1b4638b8937ec`;
    await fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        setAqiData(data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (latitude && longitude) {
      const fatchData = async () => {
        const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8ba6b335dba627de6b394efff8b1d5a8&units=metric`;

        const url2 = `http://api.waqi.info/feed/geo:${latitude};${longitude}?token=2022663e245bcc479f2fddb57ce1b4638b8937ec`;

        await fetch(url1)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setJsonData(data);
          })
          .catch((error) => console.error(error));

        await fetch(url2)
          .then((response) => response.json())
          .then((data) => {
            setAqiData(data.data);
          })
          .catch((error) => console.error(error));
      };

      fatchData();
    }
  }, [latitude, longitude]);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    setLongitude(crd.longitude);
    setLatitude(crd.latitude);
    getLocationInfo(crd.latitude, crd.longitude);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'prompt') {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'denied') {
            console.log('dined call');
            getLocationInfo(23.7644025, 90.389015);
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      alert('Geolocation is not supported by this browser.');
      getLocationInfo(23.7644025, 90.389015);
    }
  }, []);

  // useEffect(() => {
  //   const url = `${domain}/forecastDate`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (aqiClk) {
  //         setStartDate(new Date(data.lastDateAqi));
  //       } else {
  //         setStartDate(new Date(data.lastDate));
  //       }
  //     });
  // }, [aqiClk]);

  useEffect(() => {
    sethighlightedData(findMainObjectsForUniqueDates(jsonData));
    setTem3Hr(findMainObjectForTodaysDates(jsonData));
  }, [jsonData]);

  return (
    <GContext.Provider
      value={{
        location,
        setLocation,
        longitude,
        latitude,
        setLongitude,
        setLatitude,
        jsonData,
        setJsonData,
        highlightedData,
        tem3Hr,
        country,
        setCountry,
        aqiData,
        startDate,
        setStartDate,
        finishDate,
        setFinishDate,
        aqiClk,
        setAqiClk,
      }}
    >
      {children}
    </GContext.Provider>
  );
};

export default GContext;
