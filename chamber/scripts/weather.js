const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecast = document.querySelector('#forecast');

const long = -111.84;
const lat = 40.56;
const key = 'd92b4fd3a0c3645dbc2571b58f644c40'
const unitType = 'imperial'

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=${unitType}`
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=${unitType}`;


async function currentWeatherFetch() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const currentData = await response.json();
            currentWeatherResults(currentData);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function currentWeatherResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

async function forecastFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const forecastData = await response.json();
            forecastResults(forecastData);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function forecastResults(data) {
    const forecastDays = [];

    const timezoneOffset = data.city.timezone;
    const nowInForecastTimezone = new Date(Date.now() + timezoneOffset * 1000);
    const today = nowInForecastTimezone.toISOString().split("T")[0];

    data.list.forEach((day) => {
        const date = day.dt_txt.split(" ")[0];
        const time = day.dt_txt.split(" ")[1];
        if (date <= today) return;
        let forecastDay = forecastDays.find((item) => item.date === date);

        if (!forecastDay) {
            forecastDay = {
                date: date,
                temperatures: [],
                description: day.weather[0].description,
                icon: day.weather[0].icon
            };

            forecastDays.push(forecastDay);
        }

        if (time === "12:00:00") {
            forecastDay.description = day.weather[0].description;
            forecastDay.icon = day.weather[0].icon;
        }

        forecastDay.temperatures.push(day.main.temp);
    })

    const threeDayForecast = forecastDays.slice(0, 3);

    threeDayForecast.forEach((day) => {
        const high = Math.max(...day.temperatures);
        day.high = high;

        const card = document.createElement(`section`);
        const dayOfWeek = document.createElement(`h3`);
        const image = document.createElement(`img`);
        const cardDescription = document.createElement(`p`);
        const cardHigh = document.createElement(`p`);

        card.classList.add("forecast-card")
        const date = new Date(`${day.date}T12:00:00`);

        dayOfWeek.textContent = date.toLocaleDateString("en-US", {
            weekday: "long"
        });
        cardDescription.textContent = day.description;
        cardHigh.innerHTML = `${Math.round(high)}&deg;F`;
        cardHigh.classList.add("forecast-temp");

        image.setAttribute('src', `https://openweathermap.org/img/wn/${day.icon}@2x.png`);
        image.setAttribute('alt', day.description)

        card.appendChild(dayOfWeek);
        card.appendChild(image);
        card.appendChild(cardDescription);
        card.appendChild(cardHigh);

        forecast.appendChild(card);

    })
}


currentWeatherFetch();
forecastFetch();