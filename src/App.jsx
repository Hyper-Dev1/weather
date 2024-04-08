import "./Style/App.scss"

const App = () => {
  return (
    <>
      <main>
        <div className="sideBar">
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
                // value={}
              />
              <button>
                <img src="./Assets/Icons/add.svg" alt="Delete" />
              </button>
            </div>
            <div className="searchSuggestion">
              <div className="searchSuggestionItem">
                <button>fjaskdjfalksdjgkajs</button>
              </div>
              <div className="searchSuggestionItem">
                <button>fjaskdjfalksdjgkajs</button>
              </div>
            </div>
          </div>
          <button className="randomizer">Random Location</button>
          <div className="todayWeather">
            <img src="" alt="" />
            <div className="weatherDesc">
              <h2>
                12<span>&deg;C</span>
              </h2>
              <h3>
                Monday, <span>16:00</span>
              </h3>
              <hr />
              <p>
                <span>
                  <img src="" alt="" />
                </span>
                Mostly Cloudy
              </p>
              <p>
                <span>
                  <img src="" alt="" />
                </span>
                Rain - 30%
              </p>
            </div>
            <div className="weatherLocation">
              <img src="" alt="Weather Location" />
              <h2>New York, NYC, USA</h2>
            </div>
          </div>
        </div>
        <div className="mainHighlights">
          <div className="hrNav">
            <div className="degBtn">
              <button>&deg;C </button>
              <button>&deg;F </button>
            </div>
          </div>
          <div className="cardCont">
            <div className="cardItem">
              <p>12:00 AM</p>
              <img src="" alt="" />
              <div className="cardDeg">
                <p>
                  15 <span className="deg">&deg;C</span>/
                </p>
                <p>
                  6 <span className="deg">&deg;F</span>
                </p>
              </div>
            </div>
            <div className="cardItem">
              <p>12:00 AM</p>
              <img src="" alt="" />
              <div className="cardDeg">
                <p>
                  15 <span className="deg">&deg;C</span>/
                </p>
                <p>
                  6 <span className="deg">&deg;F</span>
                </p>
              </div>
            </div>
          </div>
          <div className="highlight">
            <h2 className="highlightTitle">Today Highlight</h2>
            <div className="highlightGrid">
              <div className="gridItem">
                <h3>UV Index</h3>
                <h2>9</h2>
                <div className="circularChart"></div>
              </div>
              <div className="gridItem">
                <h3>Wind Status</h3>
                <div className="cardDesc">
                  <h2>
                    7.70<span>km/h</span>
                  </h2>
                  <p>
                    <img src="" alt="" />
                    WSW
                  </p>
                </div>
              </div>
              <div className="gridItem">
                <h3>Sunrise & Sunset</h3>
                <div className="miniCard">
                  <img src="" alt="" />
                  <p>6:35 AM</p>
                </div>
                <div className="miniCard">
                  <img src="" alt="" />
                  <p>6:35 AM</p>
                </div>
              </div>
              <div className="gridItem">
                <h3>Humidity</h3>
                <div className="cardDesc">
                  <h2>
                    12<span>%</span>
                  </h2>
                  <p>WSW</p>
                </div>
              </div>
              <div className="gridItem">
                <h3>Visibility</h3>
                <div className="cardDesc">
                  <h2>
                    5.2<span>km</span>
                  </h2>
                  <p>WSW</p>
                </div>
              </div>
              <div className="gridItem">
                <h3>Air Quality</h3>
                <div className="cardDesc">
                  <h2>
                    105<span></span>
                  </h2>
                  <p>WSW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
