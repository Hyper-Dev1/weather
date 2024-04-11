import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import Carditem from "./Carditem"

const WeatherForcast = () => {
  const location = useSelector((state) => state.location.value)
  const [weatherData, setWeatherData] = useState(null)
  const [temperatureUnit, setTemperatureUnit] = useState("C") 

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=4a7fb94ad0db4a7eb7372029230712&q=${location}&days=1&aqi=yes&alerts=no`
        )
        const data = response.data
        setWeatherData(data.forecast.forecastday[0].hour)
      } catch (error) {
        console.log("Error fetching weather data:", error)
      }
    }

    if (location) {
      fetchWeatherData()
    }
  }, [location])

  const handleTemperatureChange = (unit) => {
    setTemperatureUnit(unit)
  }

  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="hrNav">
        <div className="degBtn">
          <label className="switch">
            <input
              type="radio"
              name="temperatureUnit"
              value="C"
              checked={temperatureUnit === "C"}
              onChange={() => handleTemperatureChange("C")}
            />
            <p>&deg;C</p>
          </label>
          <label className="switch">
            <input
              type="radio"
              name="temperatureUnit"
              value="F"
              checked={temperatureUnit === "F"}
              onChange={() => handleTemperatureChange("F")}
            />
            <p>&deg;F</p>
          </label>
        </div>
      </div>
      <div className="cardCont">
        {weatherData.map((item, index) => (
          <Carditem
            key={index}
            time={item.time}
            temperature={temperatureUnit === "C" ? item.temp_c : item.temp_f}
            temperatureFeel={
              temperatureUnit === "C" ? item.feelslike_c : item.feelslike_f
            }
            iconSrc={`./Assets/Icons/${item.is_day}/${item.condition.code}.svg`}
            unit={temperatureUnit}
          />
        ))}
      </div>
    </>
  )
}

export default WeatherForcast


