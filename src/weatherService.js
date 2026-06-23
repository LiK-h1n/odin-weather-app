import { parseISO, format } from "date-fns";

const weatherService = (function createWeatherService() {
  const _key = "3HGKBA5NMGXPYYKD35PX7EH34";

  const fetchWeather = async (location, unitGroup = "metric") => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unitGroup}&key=${_key}&contentType=json`
      );

      if (!response.ok) {
        throw new Error(`City not found (Status: ${response.status})`);
      }

      const responseJSON = await response.json();

      return responseJSON;
    } catch (error) {
      console.log("Error fetching weather:", error.message);

      return null;
    }
  };

  const processCurrentWeather = (responseJSON) => {
    const todayJSON = responseJSON.days[0];
    const location = responseJSON.address;
    const temperature = todayJSON.temp;
    const conditions = todayJSON.conditions;
    const high = todayJSON.tempmax;
    const low = todayJSON.tempmin;
    const feelsLike = todayJSON.feelslike;
    const humidity = todayJSON.humidity;
    const precipitation = todayJSON.precipprob;
    const wind = todayJSON.windspeed;

    return {
      location,
      temperature,
      conditions,
      high,
      low,
      feelsLike,
      humidity,
      precipitation,
      wind,
    };
  };

  const processWeeklyForecast = (responseJSON) => {
    let weekData = [];

    for (let i = 1; i < responseJSON.days.length; ++i) {
      const currentDayJSON = responseJSON.days[i];
      const date = parseISO(currentDayJSON.datetime);
      const day = format(date, "EEEE");
      const conditions = currentDayJSON.conditions;
      const high = currentDayJSON.tempmax;
      const low = currentDayJSON.tempmin;
      const precipitation = currentDayJSON.precipprob;

      weekData.push({ day, conditions, high, low, precipitation });
    }

    return weekData;
  };

  return { fetchWeather, processCurrentWeather, processWeeklyForecast };
})();

export { weatherService };
