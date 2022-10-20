import React, { useState } from "react";
import "./layout.css";
import axios from "axios";
import Timestamp from "./timestamp";
import Degrees from "./degrees";
import FiveDay from "./fiveday";

export default function Layout(props) {
  const [city, setCity] = useState("");
  const [results, setResults] = useState("");
  const [display, setDisplay] = useState(false);

  function getCity(event) {
    setCity(event.target.value);
  }

  function showForecast(response) {
    console.log(response.data.weather[0].icon);
    console.log(response.data.coord);
    setDisplay(true);
    setResults({
      temp: response.data.main.temp,
      name: response.data.name,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      describe: response.data.weather[0].main,
      date: new Date(response.data.dt * 1000),
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      coordinates: response.data.coord,
    });
  }

  function getOpenWeather(event) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a43564c91a6c605aeb564c9ed02e3858&units=metric`;

    event.preventDefault();
    axios.get(apiUrl).then(showForecast);
  }

  if (display) {
    return (
      <div className="forecast">
        <div className="card">
          <div className="card-body">
            <div className="container text-center">
              <div className="time">
                <Timestamp date={results.date} />
              </div>

              <br />
              <img src={results.icon} alt="weather" />
              <div className="container">
                <Degrees celsius={results.temp} />
                <div class="container text-center">
                  <div class="row">
                    <div class="col" id="deatils">
                      {" "}
                      Wind: {""}
                      {""}
                      {Math.round(results.wind)}kmH
                    </div>
                    <div class="col" id="deatils">
                      {results.describe}
                    </div>
                    <div class="col" id="deatils">
                      Humidity: {""}
                      {Math.round(results.humidity)}%
                    </div>
                  </div>

                  <div></div>
                  <div> </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div>
              <FiveDay coordinates={results.coordinates} />
            </div>
            {""}
          </div>
          <div className="location">
            <h2>{results.name}</h2>
          </div>
          <br />
          <form onSubmit={getOpenWeather}>
            <input
              type="search"
              placeholder="enter a city"
              onChange={getCity}
            />
            <input className="button" type="submit" value="search" />
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="forecast">
        <div className="card">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col">
                  <br />
                  <div></div>
                  {""}

                  <h3> 🔎 Search city for weather</h3>
                  <br />
                  <form onSubmit={getOpenWeather}>
                    <input
                      type="search"
                      placeholder="enter a city"
                      onChange={getCity}
                    />
                    <input className="button" type="submit" value="search" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
