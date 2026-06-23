# Odin: Weather App

## Description

A dynamic, real-time weather dashboard that provides current conditions and a 7-day forecast for any location worldwide. This project focuses on mastering asynchronous JavaScript, integrating multiple third-party APIs (Visual Crossing and Giphy), and implementing advanced UI features like dynamic theming and unit toggling. The application features a unique "Weather Mood" section that displays context-aware GIFs based on the local weather, all wrapped in a responsive, grid-based interface.

## Skills Demonstrated

- **Asynchronous JavaScript:** Deep implementation of `async/await` and the `fetch` API to handle multi-stage data requests and cross-API coordination.
- **API Data Sanitization:** Writing dedicated processing functions to parse complex, nested JSON responses into lean, application-specific objects, ensuring a clean separation between data and logic.
- **Robust Error Handling:** Utilizing `try...catch` blocks and the `response.ok` property to catch network failures and invalid user inputs, providing graceful feedback via custom UI error components.
- **Dynamic Webpack Asset Management:** Implementing **Dynamic Imports** to programmatically load weather icons based on API strings, optimizing the build bundle and reducing boilerplate code.
- **State Management & Logic:** Managing application state to allow seamless toggling between Fahrenheit/Imperial and Celsius/Metric systems across both current and forecasted data.
- **Dynamic Theming:** Using JavaScript to manipulate CSS Custom Properties (Variables) to change the entire color palette and "mood" of the application based on real-time weather conditions.
- **UX/UI Best Practices:** Incorporating visual loading indicators (spinners), handling asynchronous "popping" of content, and utilizing CSS Grid for a balanced, side-by-side dashboard layout.

## Attributions

- **Weather Data:** Provided by [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api).
- **Visual Moods:** Powered by [GIPHY](https://developers.giphy.com/).
- **Weather Icons:** Sourced from Flaticon, featuring work by:
  - [bouzix](https://www.flaticon.com/authors/bouzix) (Clear night, Partly cloudy night)
  - [Roman Danylyk](https://www.flaticon.com/authors/roman-danylyk) (Clear day)
  - [Andy Horvath](https://www.flaticon.com/authors/andy-horvath) (Partly cloudy)
  - [Freepik](https://www.flaticon.com/authors/freepik) (Cloud, Wind, Snow)
  - [HJ Studio](https://www.flaticon.com/authors/hj-studio) (Mist)
  - [apien](https://www.flaticon.com/authors/apien) (Rain)
