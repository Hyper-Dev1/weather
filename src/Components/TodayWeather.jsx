import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const TodayWeather = () => {
  const location = useSelector((state) => state.location.value);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=4a7fb94ad0db4a7eb7372029230712&q=${location}&days=1&aqi=no&alerts=no`
        );
        const data = response.data;
        setWeatherData(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="todayWeather">
      <div className="imgTodayWeather">
        <img src={`./Assets/New folder/Night/${weatherData.current.condition.code}.svg`} alt="" />
      </div>
      <div className="weatherDesc">
        <h2>
          {weatherData.current.temp_c}<span>&deg;C</span>
        </h2>
        <h3>
          {weatherData.location.localtime.split(' ')[0]}, <span>{weatherData.location.localtime.split(' ')[1]}</span>
        </h3>
        <hr />
        <div className="descImg">
          <img src={`./Assets/${weatherData.current.condition.icon}`} alt="Weather" />
          <p>{weatherData.current.condition.text}</p>
        </div>
        <div className="descImg">
          <img src="./Assets/rain.svg" alt="Cloud" />
          <p>Rain - 30%</p>
        </div>
      </div>
      <div className="weatherLocation">
        <img src={`./Assets/${weatherData.current.condition.icon}`} alt="Location" />
        <h2>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h2>
      </div>
    </div>
  );
};

export default TodayWeather;
