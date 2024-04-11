import axios from "axios"
import { useDispatch } from "react-redux"
import { setLocation } from "../State/Weatherslice"

const Randomizer = () => {
  const dispatch = useDispatch()

  const getRandomLocationWeather = async () => {
    try {
      const latitude = Math.random() * (90 - -90) + -90
      const longitude = Math.random() * (180 - -180) + -180

      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )
      const locationName = response.data.locality
      dispatch(setLocation({ id: locationName }))
    } catch (error) {
      console.log("Error fetching weather data:", error)
    }
  }

  return (
    <button className="randomizer" onClick={getRandomLocationWeather}>
      Random Location
    </button>
  )
}

export default Randomizer
