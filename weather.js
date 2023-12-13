let currentCity = '';

let weather = {
    apiKey: "46bad1ae254ac2b5233c60e46e28157f",
    fetchWeather: async function (city) {
        try {
            const response = await fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            );

            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }

            const data = await response.json();
            console.log(data);  // Log the response to the console
            // Set the current city before calling displayWeather
            currentCity = city;
            this.displayWeather(data);

            // Call getTime after displaying weather
            await this.getTime(currentCity);
        } catch (error) {
            console.error('Error fetching weather:', error.message);
        }
    },
    displayWeather: function (data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { description } = data.weather[0];
	const { id } = data.weather[0];

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".description").innerText =
            "Description: " + description;
        document.querySelector(".weather-details").classList.remove("loading");
	background(id);
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    getTime: async function (city) {
      const url = `https://weatherapi-com.p.rapidapi.com/timezone.json?q=${city}`;
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': 'fe8100db60msh60ea64ef35c4d60p1a3925jsnc81cbd17fe2a',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
      };
  
      try {
          const response = await fetch(url, options);
  
          if (!response.ok) {
              throw new Error(`Time data not available. Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data);  // Log the response to the console
  
          // Parse and format the time
          const datetime = new Date(data.location.localtime);
          const formattedTime = `${datetime.getHours()}:${datetime.getMinutes()}`;
  
          // Update the time on your page with the formatted time
          document.querySelector(".time").innerText = formattedTime;
  
          return data;
      } catch (error) {
          console.error('Error fetching time:', error.message);
          return null;
      }
  }
  
  
};

function background(id){
	
	if(id > 599 && id < 623){
	//display snow.png
	//below is attempted code, ite returns an error
	document.getElementsByClassName('background').background-image == "/backgrounds/snow.png";
	} else if( id > 199 && id < 233){
	//display thunder.png

	} else if( (id > 299 && id < 532) || id == 701){
	//display rain.png

	} else if( id > 800 && id < 805){
	//display cloudy.png

	} else if(id == 711){
	//display smoke.png
	
	} else if(id == 741){
	//display fog.png
	
	} else{
	//display clear.png
	
	}
	
};
document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
