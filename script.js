async function fetchWeatherData(city) {
    try {
        const response = await fetch(`http://localhost:5000/get/weather/${city}`);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        updateWeatherUI(data);
        fetchAndDisplayHistory(); // Fetch and update history after a successful search
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data) {
    cityElement.textContent = data.city;
    temperature.textContent = `${data.temperature}`;
    windSpeed.textContent = `${data.windspeed} km/h`;
    humidity.textContent = `${data.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.mainDesc;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.mainDesc);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
            
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');

    errorDiv.classList.remove('hidden');
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help";
}

// Fetch history and update the table
async function fetchAndDisplayHistory() {
    try {
        const response = await fetch("http://localhost:5000/get/history");
        if (!response.ok) {
            throw new Error("Unable to fetch history");
        }

        const historyData = await response.json();
        const historyBody = document.getElementById("history-body");

        // Clear existing table rows
        historyBody.innerHTML = "";

        if (historyData.length === 0) {
            historyBody.innerHTML = "<tr><td colspan='4'>No history found.</td></tr>";
            return;
        }

        // Loop through history data and create rows
        historyData.weatherRecords.forEach((record) => {
            const row = document.createElement("tr");

            const cityCell = document.createElement("td");
            cityCell.textContent = record.city;

            const tempCell = document.createElement("td");
            tempCell.textContent = record.temperature;

            const descCell = document.createElement("td");
            descCell.textContent = record.description;


            row.appendChild(cityCell);
            row.appendChild(tempCell);
            row.appendChild(descCell);

            historyBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching history:", error);
    }
}

// Fetch history when the page loads
window.onload = fetchAndDisplayHistory;
