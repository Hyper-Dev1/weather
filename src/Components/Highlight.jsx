import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

const getUVIndexCategory = (uvIndex) => {
  if (uvIndex >= 0 && uvIndex <= 2) {
    return "Low 😊"
  } else if (uvIndex > 2 && uvIndex <= 5) {
    return "Moderate 🙂"
  } else if (uvIndex > 5 && uvIndex <= 7) {
    return "High 😎"
  } else if (uvIndex > 7 && uvIndex <= 10) {
    return "Very High 😎"
  } else if (uvIndex > 10) {
    return "Extreme ☀️"
  } else {
    return "Invalid UV Index"
  }
}

const getAirQualityCategory = (aqi) => {
  if (aqi >= 0 && aqi <= 50) {
    return "Good 😊"
  } else if (aqi > 50 && aqi <= 100) {
    return "Moderate 🙂"
  } else if (aqi > 100 && aqi <= 150) {
    return "Unhealthy for Sensitive Groups 😷"
  } else if (aqi > 150 && aqi <= 200) {
    return "Unhealthy 😷"
  } else if (aqi > 200 && aqi <= 300) {
    return "Very Unhealthy 😷"
  } else {
    return "Hazardous ☠️"
  }
}
const getVisibilityCategory = (visibility) => {
  if (visibility > 10) {
    return "Excellent 👍"
  } else if (visibility >= 5 && visibility <= 10) {
    return "Good 😊"
  } else if (visibility >= 1 && visibility < 5) {
    return "Moderate 🙂"
  } else if (visibility >= 0.5 && visibility < 1) {
    return "Poor 😕"
  } else if (visibility >= 0.2 && visibility < 0.5) {
    return "Very Poor 😞"
  } else {
    return "Extremely Poor 😷"
  }
}
const getHumidityCategory = (humidity) => {
  if (humidity >= 0 && humidity <= 40) {
    return "Dry 😅"
  } else if (humidity > 40 && humidity <= 60) {
    return "Comfortable 😊"
  } else if (humidity > 60 && humidity <= 80) {
    return "Humid 🌧️"
  } else {
    return "Very Humid 😓"
  }
}
const getWindStatusCategory = (windSpeed) => {
  if (windSpeed <= 10) {
    return "Calm 🍃"
  } else if (windSpeed > 10 && windSpeed <= 30) {
    return "Breezy 🌬️"
  } else if (windSpeed > 30 && windSpeed <= 50) {
    return "Windy 💨"
  } else {
    return "Very Windy 🌪️"
  }
}

const Highlight = () => {
  const location = useSelector((state) => state.location.value)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=4a7fb94ad0db4a7eb7372029230712&q=${location}&days=1&aqi=yes&alerts=no`
        )
        const data = response.data
        setWeatherData(data)
      } catch (error) {
        console.log("Error fetching weather data:", error)
      }
    }

    if (location) {
      fetchWeatherData()
    }
  }, [location])

  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <div className="highlight">
      <h2 className="highlightTitle">Today Highlight</h2>
      <div className="highlightGrid">
        <div className="gridItem">
          <h3>UV Index</h3>
          <h2>{weatherData.current.uv}</h2>
          {/* <div className="circularChart"></div> 
          */}
          <p>{getUVIndexCategory(weatherData.current.uv)}</p>
        </div>
        <div className="gridItem">
          <h3>Wind Status</h3>
          <div className="cardDesc">
            <h2>
              {weatherData.current.wind_kph}
              <span>km/h</span>
            </h2>
            <p>{getWindStatusCategory(weatherData.current.wind_kph)}</p>
          </div>
        </div>
        <div className="gridItem">
          <h3>Sunrise & Sunset</h3>
          <div className="SunSet">
            <div className="miniCard">
              <img src="./Assets/arrow-up.svg" alt="sunrise" />
              <p>{weatherData.forecast.forecastday[0].astro.sunrise}</p>
            </div>
            <div className="miniCard">
              <img src="./Assets/arrow-down-2.svg" alt="sunset" />
              <p>{weatherData.forecast.forecastday[0].astro.sunset}</p>
            </div>
          </div>
        </div>
        <div className="gridItem">
          <h3>Humidity</h3>
          <div className="cardDesc">
            <h2>
              {weatherData.current.humidity}
              <span>%</span>
            </h2>
            <p>{getHumidityCategory(weatherData.current.humidity)}</p>
          </div>
        </div>
        <div className="gridItem">
          <h3>Visibility</h3>
          <div className="cardDesc">
            <h2>
              {weatherData.current.vis_km}
              <span>km</span>
            </h2>
            <p>{getVisibilityCategory(weatherData.current.vis_km)}</p>
          </div>
        </div>
        <div className="gridItem">
          <h3>Air Quality</h3>
          <div className="cardDesc">
            <h2>{weatherData.current.air_quality["us-epa-index"]}</h2>
            <p>
              {getAirQualityCategory(
                weatherData.current.air_quality["us-epa-index"]
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Highlight
