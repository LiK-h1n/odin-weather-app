import "./styles.css";
import { displayController } from "./display-controller.js";
import { weatherService } from "./weatherService.js";
import { giphyService } from "./giphyService.js";

const searchForm = document.querySelector("#search-form");
const unitToggleButton = document.querySelector("#unit-toggle");

let isMetric = true;
let lastSearchedLocation = undefined;

async function updateWeather(location) {
  displayController.clearError();
  displayController.hideDashboard();
  displayController.showSpinner();

  let weatherJSON;

  if (isMetric) {
    weatherJSON = await weatherService.fetchWeather(location);
  } else {
    weatherJSON = await weatherService.fetchWeather(location, "us");
  }

  if (weatherJSON === null) {
    displayController.showError("City not found!");
  } else {
    const dayData = weatherService.processCurrentWeather(weatherJSON);
    const weekData = weatherService.processWeeklyForecast(weatherJSON);
    const imageJSON = await giphyService.fetchGIF(`${dayData.icon} weather`);
    const imageData = giphyService.processGIF(imageJSON);

    displayController.renderCurrent(dayData, isMetric);
    displayController.renderForecast(weekData);
    displayController.renderGIF(imageData);
    displayController.showDashboard();

    lastSearchedLocation = location;
  }

  displayController.hideSpinner();
}

function init() {
  updateWeather("Pathanamthitta");
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = document.querySelector("#location-input").value;

  updateWeather(location);
});

unitToggleButton.addEventListener("click", () => {
  if (lastSearchedLocation === undefined) {
    displayController.showError(
      "Please search for a location first to switch units."
    );
  } else {
    isMetric = isMetric ? false : true;

    updateWeather(lastSearchedLocation);
  }
});

init();
