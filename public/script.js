

const weatherIcons = {
    "Clear": "☀️",
    "Clouds": "☁️",
    "Rain": "🌧️",
    "Drizzle": "🌦️",
    "Thunderstorm": "⛈️",
    "Snow": "❄️",
    "Mist": "🌫️",
    "Smoke": "💨",
    "Haze": "🌫️",
    "Dust": "🌪️",
    "Fog": "🌫️",
    "Sand": "🌪️",
    "Ash": "🌋",
    "Squall": "🌪️",
    "Tornado": "🌪️"
  };


document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');


    if (!city) {
        errorDiv.innerText = 'Please enter a city name.';
        
        resultDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');

        errorDiv.classList.remove('hidden');
        return;
    }

    try {
 
        const containsNumber = /\d/.test(city);
        if (containsNumber) {
            resultDiv.classList.add('hidden');
            errorDiv.classList.add('hidden');
            throw new Error("Invalid City name");
        }
        
        const response = await fetch(`http://localhost:5000/get/weather/${city}`);
        if (!response.ok) {
            resultDiv.classList.add('hidden');
            errorDiv.classList.add('hidden');
            throw new Error('City not found');
        }

        const data = await response.json(); // Parse response to JSON

       
        document.getElementById('cityName').innerText = `City: ${data.city}`;
        document.getElementById('temperature').innerText = `Temperature: ${data.temperature}`;
        document.getElementById('mainDesc').innerText = ` ${data.mainDesc} ${weatherIcons[data.mainDesc] || "?"}`;


        document.getElementById('date').innerText = `Date: ${data.calltime}`;

        resultDiv.classList.remove('hidden');

        fetchAndDisplayHistory();

    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.classList.remove('hidden');
    }
});

const fetchAndDisplayHistory = async () => {
    const historyDiv = document.getElementById('history');
    const errorDiv = document.getElementById('error');


    historyDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    try {
        const response = await fetch(`http://localhost:5000/get/history`);
        
        if (!response.ok) {
            throw new Error('Unable to fetch history');
        }

        const data = await response.json(); 

        if (data.length === 0) {
            historyDiv.innerHTML = '<p>No history found.</p>';
            return;
        }


        let tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.weatherRecords.forEach(record => {
            const city = record.city;
            const temperature = record.temperature;
            const description = record.description;
            tableHtml += `
                <tr>
                    <td>${city}</td>
                    <td>${temperature}</td>
                    <td>${description}</td>
                </tr>
            `;
        });
        tableHtml += `</tbody></table>`;

        historyDiv.innerHTML = tableHtml;
    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.classList.remove('hidden');
    }
};


window.onload = fetchAndDisplayHistory;
