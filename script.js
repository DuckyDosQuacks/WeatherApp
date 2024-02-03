const search_input = document.querySelector('.search-input')
const search_button = document.querySelector('.search-button')

const weather_info = document.querySelector('.weather-info')

const weather_image = document.querySelector('.weather-image')
const weather_description = document.querySelector('.weather-desc')

const temperature = document.querySelector('.temperature')
const wind_speed = document.querySelector('.wind-speed')
const humidity_rate = document.querySelector('.humidity-rate')

const user_location = document.querySelector('.location')


const api_key = "YKYVXQ6S8WJX3VMCJ5XEM8KLJ"

// Request API
async function GetWeather(location) {
    const request = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${api_key}`)
    const data = await request.json()
    return data
}

// Update HTML Elements
function UpdateElements(data) {
    weather_info.classList.remove('hide-elements')

    user_location.innerHTML = `${data.address}`
    temperature.innerHTML = `${data.currentConditions.feelslike}ºC`
    wind_speed.innerHTML = `${Math.floor(data.currentConditions.windspeed)}km/h`
    humidity_rate.innerHTML = `${Math.floor(data.currentConditions.humidity)}%`

}

// Update Weather Image
const UpdateWeatherImage = {
    "Partially cloudy":         () => weather_image.src = 'images/cloud-sun.png',
    "Clear":                    () => weather_image.src = 'images/clear.png',
    "Overcast":                 () => weather_image.src = 'images/clouds.png',
    "Rain, Partially cloudy":   () => weather_image.src = 'images/rain.png'
}

// Update Weather Description
const UpdateWeatherDescription = {
    "Partially cloudy":         () => weather_description.innerHTML = 'Parcialmente Nublado',
    "Clear":                    () => weather_description.innerHTML = 'Limpo',
    "Overcast":                 () => weather_description.innerHTML = 'Nublado',
    "Rain, Partially cloudy":   () => weather_description.innerHTML = 'Chuva'
}

// Main Function
async function WeatherApp() {
    const weather_data = await GetWeather(search_input.value)

    UpdateElements(weather_data)
    UpdateWeatherImage[weather_data.currentConditions.conditions]()
    UpdateWeatherDescription[weather_data.currentConditions.conditions]()

    console.log(weather_data)

}

// Search Button Clicked
search_button.addEventListener('click', WeatherApp)