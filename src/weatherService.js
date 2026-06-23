const weatherService = (function createWeatherService() {
  const _key = "3HGKBA5NMGXPYYKD35PX7EH34";

  const fetchWeather = async (location) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${_key}`
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

  return { fetchWeather };
})();

export { weatherService };
