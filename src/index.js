import "./styles.css";
import { displayController } from "./display-controller.js";
import { weatherService } from "./weatherService.js";

const searchForm = document.querySelector("#search-form");
const unitToggleButton = document.querySelector("#unit-toggle");

let isMetric = true;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  displayController.clearError();
  displayController.hideDashboard();
  displayController.showSpinner();

  const location = document.querySelector("#location-input").value;
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
  }

  displayController.hideSpinner();
});

unitToggleButton.addEventListener("click", () => {
  isMetric = isMetric ? false : true;
});
