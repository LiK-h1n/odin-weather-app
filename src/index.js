import "./styles.css";
import { displayController } from "./display-controller.js";
import { weatherService } from "./weatherService.js";

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  displayController.clearError();
  displayController.hideDashboard();
  displayController.showSpinner();

  const location = document.querySelector("#location-input").value;
  const responseJSON = await weatherService.fetchWeather(location);

  if (responseJSON === null) {
    displayController.showError("City not found!");
  } else {
    const dayData = weatherService.processCurrentWeather(responseJSON);
    const weekData = weatherService.processWeeklyForecast(responseJSON);

    displayController.renderCurrent(dayData, true);
    displayController.renderForecast(weekData);
    displayController.showDashboard();
  }

  displayController.hideSpinner();
});
