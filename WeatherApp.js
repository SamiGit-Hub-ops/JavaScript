
const API_KEY = "eacb885757a026c230d0aa9437dcd8bb";

/*
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

*/

const queryWeather = async (city) => {

    try {
        showLoading();
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        );

    if(!res.ok) throw new Error('City not found');

    const data = await res.json();
    
        displayWeather(data);

    }

    catch (error) {
        showError(error.message);

    }
    finally {
        hideLoading();
    }
  
};

document.querySelector('#searchBtn').addEventListener('click', () => {
    const city = document.querySelector('#cityInput').value;
    if(city) {
        queryWeather(city);
    }
});


function showLoading() {
    document.querySelector('#loading').innerHTML = '⏳Loading...';
}

function hideLoading() {
    document.querySelector('#loading').innerHTML = '';
}

function displayWeather(data) {
    const htmlResult = `
    <h2>${data.name} </h2>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>☁️ Condition: ${data.weather[0].description} </p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    ` ;
    
    document.querySelector('#result').innerHTML = htmlResult;
}


function showError(message) {
    document.querySelector('#result').innerHTML = `<p>❌ ${message}</p>`;
    
}
