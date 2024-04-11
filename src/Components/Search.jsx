import axios from "axios"
import { debounce } from "lodash"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setLocation } from "../State/Weatherslice"

const Search = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false) // State to manage the visibility of suggestions
  const dispatch = useDispatch()

  const search = async (searchQuery) => {
    try {
      if (searchQuery.trim() === "") {
        setResults([])
        setShowSuggestions(false) // Hide suggestions when query is empty
        return
      }

      const response = await axios.get(
        `http://api.weatherapi.com/v1/search.json?key=4a7fb94ad0db4a7eb7372029230712&q=${searchQuery}`
      )
      setResults(response.data)
      setShowSuggestions(true) // Show suggestions when there are results
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

  const handleSuggestionClick = (id) => () => {
    dispatch(setLocation({ id })) // Pass the ID as an object
    console.log("clicked")
  }

  const handleReset = () => {
    setQuery("")
    setResults([])
    setShowSuggestions(false) // Hide suggestions when resetting
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
            <button onClick={handleSuggestionClick(item.name)}>
              {item.name}, {item.country}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
