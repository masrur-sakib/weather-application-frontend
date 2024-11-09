function convertTimestampToHoursMinutes(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return { hours, minutes };
}

function findMainObjectsForUniqueDates(data) {
  if (data?.list) {
    const uniqueDates = new Set();
    const mainObjects = [];
    for (const entry of data.list) {
      const date = new Date(entry.dt * 1000);
      const dateString = date.toDateString();

      if (!uniqueDates.has(dateString)) {
        uniqueDates.add(dateString);
        mainObjects.push({
          date: dateString,
          dateTime: date,
          main: entry.main,
          weather: entry.weather,
          visibility: entry.visibility,
          wind: entry.wind,
        });
      }
    }
    return mainObjects;
  }
}

function findMainObjectForTodaysDates(data) {
  if (data?.list) {
    const dataForFirstUniqueDate = [];

    const today = new Date().toDateString();

    for (const entry of data.list) {
      const date = new Date(entry.dt * 1000);
      const dateString = date.toDateString();

      if (today === dateString) {
        dataForFirstUniqueDate.push({
          date: dateString,
          dateTime: date,
          main: entry.main,
          weather: entry.weather,
        });
      }
    }

    return dataForFirstUniqueDate;
  }
}

const getConcernLevel = (value) => {
  if (value >= 0 && value <= 50) {
    return {
      aqiColor: "#008000",
      levelsOfConcern: "Good",
      DespOfAirQuality:
        "(0-50) Air quality is satisfactory, and air pollution poses little or no risk.",
    };
  } else if (value >= 51 && value <= 100) {
    return {
      aqiColor: "#FFFF00",
      levelsOfConcern: "Moderate",
      DespOfAirQuality:
        "(51-100) Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
    };
  } else if (value >= 101 && value <= 150) {
    return {
      aqiColor: "#FFA500",
      levelsOfConcern: "Unhealthy for Sensitive Groups",
      DespOfAirQuality:
        "(101-150) Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    };
  } else if (value >= 151 && value <= 200) {
    return {
      aqiColor: "#FF0000",
      levelsOfConcern: "Unhealthy",
      DespOfAirQuality:
        "(151-200) Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
    };
  } else if (value >= 201 && value <= 300) {
    return {
      aqiColor: "#800080",
      levelsOfConcern: "Very Unhealthy",
      DespOfAirQuality:
        "(201-300) Health alert: The risk of health effects is increased for everyone.",
    };
  } else if (value >= 301) {
    return {
      aqiColor: "#800000",
      levelsOfConcern: "Hazardous",
      DespOfAirQuality:
        "(more than>301) Health warning of emergency conditions: everyone is more likely to be affected.",
    };
  } else {
    return {
      aqiColor: "#0A0A0A",
      levelsOfConcern: "unknown",
      DespOfAirQuality: "Invalid AQI value",
    };
  }
};

export {
  convertTimestampToHoursMinutes,
  findMainObjectsForUniqueDates,
  findMainObjectForTodaysDates,
  getConcernLevel,
};
