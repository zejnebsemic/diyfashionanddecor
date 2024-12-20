const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");
const imgDescription = document.getElementById("imgDescription");

function openFullImg(pic, description) {
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
    imgDescription.textContent = description;
}

function closeFullImg() {
    fullImgBox.style.display = "none";
}


document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "caeb673f2236fedb8017b2ce9619b923";
    const city = "Sarajevo";
    const weatherDescription = document.getElementById("weather-description");
    const temperature = document.getElementById("temperature");
    const weatherIcon = document.getElementById("weather-icon");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.weather && data.main) {
                weatherDescription.textContent = data.weather[0].description;
                temperature.textContent = `Temperature: ${data.main.temp}°C`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherIcon.style.display = "inline";
            } else {
                weatherDescription.textContent = "Unable to fetch weather data.";
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherDescription.textContent = "Error fetching weather data.";
        });
});
