const Highlight = () => {
  return (
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
          <div className="SunSet">
            <div className="miniCard">
              <img src="./Assets/arrow-up.svg" alt="sunset" />
              <p>6:35 AM</p>
            </div>
            <div className="miniCard">
              <img src="./Assets/arrow-down-2.svg" alt="sunrise" />
              <p>6:35 AM</p>
            </div>
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
  )
}

export default Highlight
