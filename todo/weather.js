const API_KEY = "b8799c0be39111747db2c2f86d31e12d";


function onGeoOk(position) {
    const lat = position.coords.latitude;
    const log = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}`;
    fetch(url).then(response =>response.json()).then(data => {
        const cityName = data.name;
        const weather = data.weather[0].main;
        const temp = data.main.temp;

        const weatherContainer = document.querySelector("#weather h2:first-child"); 
        const cityContainer = document.querySelector("#weather h2:last-child"); 

       
        weatherContainer.innerText = `${weather} / ${temp}`;
        cityContainer.innerText = cityName;
        document.querySelector("#progress").className = HIDDEN;
    });

}

function onGeoError() {
    alert("can't find your current location.  \nPlease check your configuration !! ");
}


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);