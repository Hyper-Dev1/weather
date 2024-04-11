import PropTypes from "prop-types" // Import PropTypes

const Carditem = ({ time, iconSrc, temperature,temperatureFeel,unit }) => {
  const getTimeIn12HourFormat = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  const getTemperatureWithoutDecimal = (temperature) => {
    return Math.round(temperature)
  }

  return (
    <div className="cardItem">
      <p>{getTimeIn12HourFormat(time)}</p>
      <img src={iconSrc} alt="" />
      <div className="cardDeg">
        <p>
          {getTemperatureWithoutDecimal(temperature)}
          <span className="deg">&deg;{unit}</span> 
        </p>
        <p>
          {getTemperatureWithoutDecimal(temperatureFeel)}
          <span className="deg">&deg;{unit}</span>
        </p>
      </div>
    </div>
  )
}

// Add prop validation
Carditem.propTypes = {
  time: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  temperatureFeel: PropTypes.number.isRequired,
}

export default Carditem
