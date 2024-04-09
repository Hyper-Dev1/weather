import Highlight from "./Components/Highlight"
import Randomizer from "./Components/Randomizer"
import Search from "./Components/Search"
import TodayWeather from "./Components/TodayWeather"
import WeatherForcast from "./Components/WeatherForcast"
import "./Style/App.scss"

const App = () => {
  

  return (
    <>
      <main>
        <div className="sideBar">
          <Search />
          <Randomizer />
          <TodayWeather />
        </div>
        <div className="mainHighlights">
          <div className="hrNav">
            <div className="degBtn">
              <button>&deg;C </button>
              <button>&deg;F </button>
            </div>
          </div>
          <WeatherForcast />
          <Highlight />
        </div>
      </main>
    </>
  )
}

export default App
