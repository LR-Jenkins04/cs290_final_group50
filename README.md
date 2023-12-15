# Weather App - CS290 Final Project - Group 50
Authors: Soham Das, Michael Balzer, America Pacheco

The Weather App is a web application that allows users to check the current weather conditions and local time for a specific city.

## Features

- **Weather Information:** Provides real-time weather data, including temperature, humidity, and wind speed.
- **Search Functionality:** Users can search for the weather of any city around the world.
- **Timezone Information:** Displays the local time of the searched city.
- **Dynamic Background Art:** Dynamically displays the background art to match the weather in the searched location
- **Bookmark Functionality:** Users can bookmark their favorite cities to search weather statistics for their favorite cities easily.
- **Imperial and Metric Support** Users have the option to choose between viewing temperature in either metric or imperial.

## Technologies Used

- HTML
- CSS
- JavaScript

## APIs Used

- [OpenWeatherMap API](https://openweathermap.org/api): Used to retrieve weather data for the specified city.
- [WeatherAPI](https://weatherapi.com): Used to retrieve timezone information for the specified city.

## How to Use

1. Download folder as zip or clone the repository on GitHub. 

2. Once extracted, use terminal to navigate to the downloaded directory, and run command node server.js. Navigate on browser to http://localhost:3000/.

3. Enter the name of the city you want to check the weather for in the search bar.

4. Press the "Search" button or press Enter.

5. The weather details, including temperature, humidity, wind speed, and local time, will be displayed.

6. Users are able to bookmark and unbookmark cities to dynamically add to a bookmarks list that gives a shortcut to searching the weather for a particular location.

## Application Structure

- **index.html:** The main HTML file containing the structure of the web page.
- **style.css:** The CSS file for styling the web page.
- **weather.js:** The JavaScript file responsible for fetching and displaying weather information.
- **README.md:** The documentation file providing information about the application.
- **server.js:** The JavaScript file responsible for dynamically updating and storing data.
- **bookmarks.json:** The JSON file that holds the user's bookmarks data.
- **backgrounds:** A directory that holds the dynamically updating background image.

## Styling

The application uses a simple and clean design to provide a user-friendly interface. The CSS file (`style.css`) includes styling for various elements, ensuring a visually appealing presentation.

## Dependencies

No external libraries or frameworks are used in this application. The weather data is fetched using standard web technologies and APIs.

## Future Improvements

- Implement a way to distinguish cities easily (i.e. Portland, Maine vs Portland, Oregon).
- Implement a way to filter through bookmarks
- Add an interactive weather map that displays realtime weather data including wind currents, rain, snow, etc.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/) and [WeatherAPI](https://weatherapi.com).
- Icons from [Material Icons](https://material.io/resources/icons/).


