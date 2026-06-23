const displayController = (() => {
  const dashboard = document.querySelector("#weather-dashboard");
  const spinner = document.querySelector("#loading-spinner");
  const locName = document.querySelector("#loc-name");
  const currentTemp = document.querySelector("#current-temp");
  const currentIcon = document.querySelector("#current-icon");
  const currentConditions = document.querySelector("#current-conditions");
  const currentHiLo = document.querySelector("#current-hi-lo");
  const currentFeelsLike = document.querySelector("#current-feels-like");
  const currentHumidity = document.querySelector("#current-humidity");
  const currentPrecip = document.querySelector("#current-precip");
  const currentWind = document.querySelector("#current-wind");
  const forecastGrid = document.querySelector("#forecast-grid");
  const weatherGif = document.querySelector("#weather-gif");
  const errorBox = document.querySelector("#error-box");
  const errorText = document.querySelector("#error-text");

  const showSpinner = () => {
    spinner.classList.remove("hidden");
  };

  const hideSpinner = () => {
    spinner.classList.add("hidden");
  };

  const showDashboard = () => {
    dashboard.classList.remove("hidden");
  };

  const hideDashboard = () => {
    dashboard.classList.add("hidden");
  };

  const updateTheme = (iconString) => {
    let theme = "theme-default";

    if (iconString.includes("clear") || iconString.includes("sun")) {
      theme = "theme-clear";
    }

    if (iconString.includes("rain") || iconString.includes("storm")) {
      theme = "theme-rain";
    }

    if (iconString.includes("cloud") || iconString.includes("fog")) {
      theme = "theme-cloudy";
    }

    document.body.className = theme;
  };

  const renderCurrent = (data, isMetric) => {
    const symbol = isMetric ? "C" : "F";
    const windSpeedStr = isMetric ? "kph" : "mph";

    locName.textContent = data.location;
    currentTemp.textContent = `${Math.round(data.temperature)}°${symbol}`;
    currentConditions.textContent = data.conditions;
    currentHiLo.textContent = `${Math.round(data.high)}° / ${Math.round(data.low)}°`;
    currentFeelsLike.textContent = `${Math.round(data.feelsLike)}°`;
    currentHumidity.textContent = `${data.humidity}%`;
    currentPrecip.textContent = `${data.precipitation}%`;
    currentWind.textContent = `${data.wind} ${windSpeedStr}`;

    updateTheme(data.icon);
  };

  const renderForecast = (weeklyData) => {
    forecastGrid.innerHTML = weeklyData
      .map(
        (dayData) => `
      <div class="forecast-card">
        <strong>${dayData.day}</strong>
        <small>${dayData.conditions}</small>
        <span>${Math.round(dayData.high)}° / ${Math.round(dayData.low)}°</span>
        <small>${dayData.precipitation}% Rain</small>
      </div>
    `
      )
      .join("");
  };

  const showError = (message) => {
    errorText.textContent = message;
    errorBox.classList.remove("hidden");
  };

  const clearError = () => {
    errorBox.classList.add("hidden");
  };

  return {
    showSpinner,
    hideSpinner,
    showDashboard,
    hideDashboard,
    renderCurrent,
    renderForecast,
    showError,
    clearError,
  };
})();

export { displayController };
