import { weatherService } from "./weatherService.js";

const weather = await weatherService.fetchWeather("bangalore");
console.log(weather);
