import axios from "axios"
import { useDispatch } from "react-redux"
import { setLocation } from "../State/Weatherslice"
import LoadingBar from "react-top-loading-bar"
import { useRef } from "react"
// import "react-top-loading-bar/dist/index.css" // Import CSS file for react-top-loading-bar
import React from "react"

const Randomizer = () => {
  const dispatch = useDispatch()
  const loadingBarRef = useRef(null)

  const getRandomLocationWeather = async () => {
    try {
      if (loadingBarRef.current) {
        loadingBarRef.current.staticStart() // Check if loadingBarRef is not null before using it
      }

      const latitude = Math.random() * (90 - -90) + -90
      const longitude = Math.random() * (180 - -180) + -180

      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )
      const locationName = response.data.locality
      dispatch(setLocation({ id: locationName }))

      if (loadingBarRef.current) {
        loadingBarRef.current.complete() // Check if loadingBarRef is not null before using it
      }
    } catch (error) {
      console.log("Error fetching weather data:", error)
    }
  }

  return (
    <>
      {/* Loading bar component */}
      <LoadingBar color="#129FF8" ref={loadingBarRef} />
      <button className="randomizer" onClick={getRandomLocationWeather}>
        Random Location
      </button>
    </>
  )
}

export default Randomizer
