import React, { useState, useEffect } from "react";
const api = {
  key: "55d1aa468851b1944ab41742fef52718",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  var pos;
  function getCity(pos) {
    var xhr = new XMLHttpRequest();
    var lat = pos.lat;
    var lng = pos.long;
    // Paste your LocationIQ token below.
    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=10fd7055ec001e&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var city = response.address.city;
        console.log(city);
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            setQuery("");
          });
        return;
      }
    }
  }
  const getDefault = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        getCity(pos);
      });
    }
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          cityErrorHandler(result);
        });
    }
  };
  const clickmee = () => {
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          cityErrorHandler(result);
        });
    }
  };
  const cityErrorHandler = (result) => {
    if (result.cod === "404") {
      setError("Wrong City Name please Re-search");
    } else {
      setError("");
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const onchangeHandler = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 20
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <p className="city-error">{error}</p>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search city name..."
            onChange={onchangeHandler}
            value={query}
            onKeyPress={search}
          />
          <button className="btn" onClick={clickmee}>
            Search
          </button>
          <button
            className="btn"
            onClick={getDefault}
            style={{ marginLeft: "10px" }}
          >
            Mycity
          </button>
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="flexx">
                <div className="">Min temp: {weather.main.temp_min}°c</div>
                <div className="">Max temp: {weather.main.temp_max}°c</div>
                <div className="">Humidity: {weather.main.humidity}</div>
                <div className="" style={{ display: "inline" }}>
                  Wind Speed: {weather.wind.speed} m/s
                </div>
                <div className="">Cloudiness: {weather.clouds.all}%</div>
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
