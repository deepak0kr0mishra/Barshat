const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

function getWeatherCondition(code) {

    if (code === 0) return "Saaf mausam";
    if (code >= 1 && code <= 3) return "Badal ";
    if (code >= 45 && code <= 48) return "Dhua Dhua ho gaya sab ";
    if (code >= 51 && code <= 67) return "Halki barish ";
    if (code >= 71 && code <= 77) return "Kabhi nahi hoga india me - snow";
    if (code >= 80 && code <= 82) return "Barish ho raha hai ";
    if (code >= 95) return "Duniya Khatam";

    return "Ghanta";
}


searchButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (city === "") {
        return;
    }
    condition.textContent = "Ruk ja bhai aa raha hai data .....";
    try {
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            console.log("city not found");
            return;
        }
        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;


        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`
        );
        const weatherData = await weatherResponse.json();

        cityName.textContent = location.name;
        temperature.textContent = `${weatherData.current.temperature_2m}°C`;
        humidity.textContent = `${weatherData.current.relative_humidity_2m}%`;
        wind.textContent = `${weatherData.current.wind_speed_10m} Km/h`;
        condition.textContent = getWeatherCondition(weatherData.current.weather_code);
    } catch (error) {
        console.log(error);
        condition.textContent = "Kosis karte ja bhai ek din khud har man jayega !!"

    }

});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});