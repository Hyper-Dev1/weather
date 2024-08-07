import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css" // Import Swiper CSS
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import SwiperCore from "swiper"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import Carditem from "./Carditem"


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const HourlyForecastSwiper = () => {

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const location = useSelector((state) => state.location.value)
  const [weatherData, setWeatherData] = useState(null)
  const [temperatureUnit, setTemperatureUnit] = useState("C")

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=no`
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
    return (
      <>
        <div className="loading">
          <div className="hrNavL">
            <div className="degBtnL">
              <button></button>
              <button></button>
            </div>
          </div>
          <div className="cardContL">
            <div className="cardItemL"></div>
            <div className="cardItemL"></div>
            <div className="cardItemL"></div>
            <div className="cardItemL"></div>
            <div className="cardItemL"></div>
            <div className="cardItemL"></div>
            <div className="cardItemL"></div>
            <div className="cardItemL"></div>
          </div>
        </div>
      </>
    )
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
        <Swiper
          spaceBetween={0}
          slidesPerView={8.1}
          breakpoints={{
            300: {
              slidesPerView: 2.5,
            },
            375: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 6,
            },
            1200: {
              slidesPerView: 8.1,
            },
            // 1440: {
            //   slidesPerView: 10,
            // },
            // 2560: {
            //   slidesPerView: 10,
            // },
            
          }}
          // navigation
          // pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {weatherData.map((item, index) => (
            <SwiperSlide key={index}>
              <Carditem
                time={item.time}
                temperature={
                  temperatureUnit === "C" ? item.temp_c : item.temp_f
                }
                temperatureFeel={
                  temperatureUnit === "C" ? item.feelslike_c : item.feelslike_f
                }
                iconSrc={`./Assets/Icons/${item.is_day}/${item.condition.code}.svg`}
                unit={temperatureUnit}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default HourlyForecastSwiper
