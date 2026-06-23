import { weatherService } from "./weatherService.js";

const responseJSON = await weatherService.fetchWeather("bangalore");
const todayData = weatherService.processCurrentWeather(responseJSON);

console.log(todayData);
