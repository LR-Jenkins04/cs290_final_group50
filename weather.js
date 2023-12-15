let currentCity = '';
let isCelsius = false;
let bookmarks = [];

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

        // Update the bookmark button text
        this.updateBookmarkButton();
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
    },

    addBookmark: function () {
        if (currentCity && !bookmarks.includes(currentCity)) {
            bookmarks.push(currentCity);
            this.updateBookmarkButton();
            this.saveBookmarks();
            updateBookmarksDropdown();
        }
    },
    removeBookmark: function (city) {
        const index = bookmarks.indexOf(city);
        if (index !== -1) {
            bookmarks.splice(index, 1);
            this.updateBookmarkButton();
            this.saveBookmarks();
            updateBookmarksDropdown();
        }
    
       
        fetch('/bookmarks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city: city }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove bookmark on the server.');
            }
            return response.text();
        })
        .then(message => console.log(message))
        .catch(error => console.error('Error removing bookmark:', error));
    },
    
    toggleBookmark: function (city) {
      
        const cityIndex = bookmarks.indexOf(city);
    
        if (cityIndex !== -1) {
           
            this.removeBookmark(city);
            console.log(`${city} removed from bookmarks.`);
        } else {
           
            bookmarks.push(city);
            this.updateBookmarkButton();
            this.saveBookmarks();
            updateBookmarksDropdown(); 
            console.log(`${city} added to bookmarks.`);
        }
    },
    
    updateBookmarkButton: function () {
        const bookmarkButton = document.querySelector(".bookmark-button");
        if (currentCity && bookmarks.includes(currentCity)) {
            bookmarkButton.innerText = "Unbookmark";
        } else {
            bookmarkButton.innerText = "Bookmark";
        }
        updateBookmarksDropdown();
    },
    saveBookmarks: function () {
        // Save the bookmarks array to the server
        fetch('/bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city: currentCity}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update bookmarks on the server.');
            }
        })
        .catch(error => console.error('Error updating bookmarks:', error));
        
    },

   

    addBookmark: function () {
        if (currentCity && !bookmarks.includes(currentCity)) {
            bookmarks.push(currentCity);
            this.updateBookmarkButton();
            this.saveBookmarks();
            updateBookmarksDropdown(); // Call the function after adding a bookmark
        }
    },
    
    



};

function updateBookmarksDropdown(bookmarks) {
    const bookmarksDropdown = document.getElementById('bookmarksDropdown');
    bookmarksDropdown.innerHTML = ''; // Clear previous content

    if (!bookmarks || bookmarks.length === 0) {
        const noBookmarksItem = document.createElement('div');
        noBookmarksItem.classList.add('dropdown-item');
        noBookmarksItem.innerText = 'No bookmarks yet!';
        bookmarksDropdown.appendChild(noBookmarksItem);
    } else {
        bookmarks.forEach(city => {
            const dropdownItem = document.createElement('div');
            dropdownItem.classList.add('dropdown-item');
            dropdownItem.innerText = city;
            dropdownItem.addEventListener('click', () => {
                // When a city is clicked, fetch its weather
                weather.fetchWeather(city);
            });
            bookmarksDropdown.appendChild(dropdownItem);
        });
    }
}


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


function fetchAndUpdateBookmarks() {
    fetch('/bookmarks')
        .then(response => response.json())
        .then(bookmarks => {
            updateBookmarksDropdown(bookmarks);
        })
        .catch(error => console.error('Error fetching bookmarks:', error));
}

// Fetch and update bookmarks on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndUpdateBookmarks();

    // Set up an interval to fetch and update bookmarks every 5 seconds (adjust as needed)
    setInterval(fetchAndUpdateBookmarks, 1000); // 5000 milliseconds = 5 seconds
});

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

    if (currentCity) {
        weather.fetchWeather(currentCity);
    }
});

// Event listener for bookmark button click
document.querySelector(".bookmark-button").addEventListener("click", function () {

    weather.toggleBookmark(currentCity);
    console.log(bookmarks);
});

