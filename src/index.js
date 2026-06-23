import { weatherService } from "./weatherService.js";

const responseJSON = await weatherService.fetchWeather("Ladakh");
const todayData = weatherService.processCurrentWeather(responseJSON);
const weekData = weatherService.processWeeklyForecast(responseJSON);

console.log(todayData);
