import axios from "axios"
import { debounce } from "lodash"
import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { setLocation } from "../State/Weatherslice"
import LoadingBar from "react-top-loading-bar"

const Search = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dispatch = useDispatch()
  const loadingBarRef = useRef(null)

  const search = async (searchQuery) => {
    try {
      if (searchQuery.trim() === "") {
        setResults([])
        setShowSuggestions(false)
        return
      }

      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchQuery}`
      )
      setResults(response.data)
      setShowSuggestions(true)
    } catch (error) {
      console.log("Error fetching data")
    }
  }

  const debouncedSearch = debounce(search, 300)

  const handleInputChange = (event) => {
    const { value } = event.target
    setQuery(value)
    debouncedSearch(value)
  }

  const handleSuggestionClick = (id, country) => () => {
    loadingBarRef.current.staticStart()
    dispatch(setLocation({ id }))
    loadingBarRef.current.complete()
    setShowSuggestions(false)
    setQuery(id + "," + country)
  }

  const handleReset = () => {
    setQuery("")
    setResults([])
    setShowSuggestions(false)
  }

  return (
    <div className="search">
      <div className="searchBar">
        <img
          src="./Assets/Icons/search.svg"
          alt="Search Icon"
          className="bar-img"
        />
        <input
          type="text"
          name="location"
          placeholder="Search for places...."
          value={query}
          onChange={handleInputChange}
        />
        <button type="reset" onClick={handleReset}>
          <img src="./Assets/Icons/add.svg" alt="Delete" />
        </button>
      </div>
      <div
        className="searchSuggestion"
        style={{ display: showSuggestions ? "block" : "none" }}
      >
        {results.map((item) => (
          <div className="searchSuggestionItem" key={item.id}>
            {/* Use an arrow function to pass a callback */}
            <button onClick={handleSuggestionClick(item.name, item.country)}>
              {item.name}, {item.country}
            </button>
          </div>
        ))}
      </div>
      {/* Loading bar component */}
      <LoadingBar color="#129FF8" ref={loadingBarRef} />
    </div>
  )
}

export default Search
