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

$(document).ready(function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $('form').on('submit', function (e) {
        e.preventDefault(); 

        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();
        const message = $('#contactMessage').val().trim();

        if (name && email && message) {
            toastr.success("Your message has been sent successfully!");
            $('#contactName').val('');
            $('#contactEmail').val('');
            $('#contactMessage').val('');
        } else {
            toastr.error("All fields are required. Please complete the form.");
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const themeSelector = document.getElementById('theme-selector');
    const savedTheme = localStorage.getItem('theme') || 'default';

    document.body.className = `${savedTheme}-theme`;
    themeSelector.value = savedTheme;

    themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;

        document.body.className = '';
        document.body.classList.add(`${selectedTheme}-theme`);

        localStorage.setItem('theme', selectedTheme);
    });
});
