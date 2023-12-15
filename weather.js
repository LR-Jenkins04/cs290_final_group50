let currentCity = '';
let isCelsius = false; 

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
            console.log(data);
            currentCity = city;
            this.displayWeather(data);
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

        // Convert temperature based on the switch state
        const temperature = isCelsius ? temp : (temp * 9/5) + 32;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temperature.toFixed(2) + (isCelsius ? "°C" : "°F");
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".description").innerText = "Description: " + description;
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
            console.log(data);
        
            const datetime = new Date(data.location.localtime);
            const hours = datetime.getHours();
            const minutes = datetime.getMinutes();
        
            // Format the time
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        
            const formattedTime = `${hours}:${formattedMinutes}`;
            document.querySelector(".time").innerText = formattedTime;
        
            return data;
        } catch (error) {
            console.error('Error fetching time:', error.message);
            return null;
        }
    }
};

// Function to update background based on weather ID
function background(id) {
    console.log("weather ID is: ", id);
    var background = document.querySelector(".backgroundContainer");
    if (id > 599 && id < 623) {
        //display snow.png
        background.style.backgroundImage = 'url("/backgrounds/snow.png")';
    } else if (id > 199 && id < 233) {
        //display thunder.png
        background.style.backgroundImage = 'url("/backgrounds/thunder.png")';
    } else if ((id > 299 && id < 532) || id == 701) {
        //display rain.png
        background.style.backgroundImage = 'url("/backgrounds/rain.png")';
    } else if (id > 800 && id < 805) {
        //display cloudy.png
        background.style.backgroundImage = 'url("/backgrounds/cloudy.png")';
    } else if (id == 711) {
        //display smoke.png
        background.style.backgroundImage = 'url("/backgrounds/smoke.png")';
    } else if (id == 741) {
        //display fog.png
        background.style.backgroundImage = 'url("/backgrounds/fog.png")';
    } else {
        //display clear.png
        background.style.backgroundImage = 'url("/backgrounds/clear.png")';
    }
};

// Event listener for search button click
document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
});

// Event listener for search bar keyup
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Event listener for temperature switch change
document.getElementById('temperature-toggle').addEventListener('change', function () {
    isCelsius = this.checked;

    if(currentCity){
        weather.fetchWeather(currentCity);
    }
});
