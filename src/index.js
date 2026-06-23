import { weatherService } from "./weatherService.js";

const responseJSON = await weatherService.fetchWeather("bangalore");
const todayData = weatherService.processCurrentWeather(responseJSON);
const weekData = weatherService.processWeeklyForecast(responseJSON);

console.log(weekData);
