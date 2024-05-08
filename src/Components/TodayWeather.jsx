import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"


// Define DateTimeConverter component
const DateTimeConverter = ({ dateTime }) => {
  const [day, setDay] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {
    const dateObj = new Date(dateTime)

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const dayOfWeek = days[dateObj.getDay()]

    const hours = dateObj.getHours() % 12 || 12
    const minutes = dateObj.getMinutes()
    const ampm = dateObj.getHours() >= 12 ? "PM" : "AM"

    const timeString = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`

    setDay(dayOfWeek)
    setTime(timeString)
  }, [dateTime])

  return (
    <h3>
      {day}, <span>{time}</span>
    </h3>
  )
}

const TodayWeather = () => {
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
  return (
    <div className="loading">
      <div className="todayWeatherL">
        <div className="imgTodayWeatherL"></div>
        <div className="weatherDescL"></div>
        <hr />
        <div className="weatherDescL"></div>
      </div>
    </div>
  )
  }

  return (
    <div className="todayWeather">
      <div className="imgTodayWeather">
        <img
          src={`./Assets/Icons/${weatherData.current.is_day}/${weatherData.current.condition.code}.svg`}
          alt={`${weatherData.current.condition.text}`}
        />
      </div>
      <div className="weatherDesc">
        <h2>
          {weatherData.current.temp_c}
          <span>&deg;C</span>
        </h2>
        <DateTimeConverter dateTime={weatherData.location.localtime} />
        <hr />
        <div className="descImg">
          <img
            src={`./Assets/Icons/${weatherData.current.is_day}/${weatherData.current.condition.code}.svg`}
            alt="Weather"
          />
          <p>{weatherData.current.condition.text}</p>
        </div>
        <div className="descImg">
          <img src="./Assets/rain.svg" alt="Cloud" />
          <p>
            Rain -{" "}
            {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
          </p>
        </div>
      </div>
      <div className="weatherLocation">
        <img src="./Assets/landscape.jpg" alt="Location" />
        <h2>
          {weatherData.location.name}, {weatherData.location.region}
          <br />
          {weatherData.location.country}
        </h2>
      </div>
    </div>
  )
}

export default TodayWeather
