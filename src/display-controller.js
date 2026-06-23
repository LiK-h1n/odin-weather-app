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

  const renderCurrent = async (data, isMetric) => {
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

    const iconUrl = await loadWeatherIcon(data.icon);

    currentIcon.src = iconUrl;
    currentIcon.alt = data.conditions;

    updateTheme(data.icon);
  };

  const renderForecast = async (weeklyData) => {
    const forecastHTML = await Promise.all(
      weeklyData.map(async (dayData) => {
        const iconUrl = await loadWeatherIcon(dayData.icon);
        return `
          <div class="forecast-card">
            <strong>${dayData.day}</strong>
            <img src="${iconUrl}" alt="${dayData.conditions}">
            <small>${dayData.conditions}</small>
            <span>${Math.round(dayData.high)}° / ${Math.round(dayData.low)}°</span>
            <small>${dayData.precipitation}% Rain</small>
          </div>
        `;
      })
    );

    forecastGrid.innerHTML = forecastHTML.join("");
  };

  const showError = (message) => {
    errorText.textContent = message;
    errorBox.classList.remove("hidden");
  };

  const clearError = () => {
    errorBox.classList.add("hidden");
  };

  const loadWeatherIcon = async (iconName) => {
    try {
      const iconModule = await import(`./assets/icons/${iconName}.png`);

      return iconModule.default;
    } catch (err) {
      console.error("Icon not found", err);

      return null;
    }
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
    loadWeatherIcon,
  };
})();

export { displayController };
