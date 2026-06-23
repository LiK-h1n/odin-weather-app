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

  let responseJSON;

  if (isMetric) {
    responseJSON = await weatherService.fetchWeather(location);
  } else {
    responseJSON = await weatherService.fetchWeather(location, "us");
  }

  if (responseJSON === null) {
    displayController.showError("City not found!");
  } else {
    const dayData = weatherService.processCurrentWeather(responseJSON);
    const weekData = weatherService.processWeeklyForecast(responseJSON);

    displayController.renderCurrent(dayData, isMetric);
    displayController.renderForecast(weekData);
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

const json = await giphyService.fetchGIF("Sunny");
const url = giphyService.processGIF(json);
console.log(url);
