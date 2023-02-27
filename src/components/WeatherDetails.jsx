import React from "react";
import { useState, useEffect } from "react";

const API_TOKEN = "54b2266441c71fa6f3f9efaaada5d258";

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDataList, setWeatherDataList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // default latitude and longitude for Colombo
  const [lat, setLat] = useState(6.9271);
  const [lon, setLon] = useState(79.8612);

  const [viewMore, setViewMore] = useState(false);

  // fetch the weather data for the default location
  const fetchWeatherData = () => {
    setIsLoading(true);
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&appid=" +
        API_TOKEN
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setWeatherDataList(data.list);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-blue-500 mt-10">
        Weather Details
      </h1>

      {/* Search bar to search latitude and longitude */}
      <div className="flex flex-col items-center justify-center">
        {/* Latitude input */}
        <input
          className="border-2 border-black p-2 m-2"
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />

        {/* Longitude input */}
        <input
          className="border-2 border-black p-2 m-2"
          type="text"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white font-bold mt-10  w-60 py-1.5  rounded-md"
          onClick={() => {
            fetchWeatherData();
          }}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </div>

      {weatherData && (
        <div>
          <p>City: {weatherData.city.name}</p>
          <p>Country: {weatherData.city.country}</p>
          <p>Timezone: {weatherData.city.timezone}</p>
          <p>Population: {weatherData.city.population}</p>
        </div>
      )}

      {/* Today's weather details */}
      {weatherDataList && (
        <div className="bg-blue-300 border-2 border-black p-2 m-2">
          <p>Date: {weatherDataList[0].dt_txt}</p>
          <p>Temperature: {weatherDataList[0].main.temp}</p>
          <p>Feels like: {weatherDataList[0].main.feels_like}</p>
          <p>Humidity: {weatherDataList[0].main.humidity}</p>
          <p>Pressure: {weatherDataList[0].main.pressure}</p>
          <p>Wind speed: {weatherDataList[0].wind.speed}</p>
          <p>Wind direction: {weatherDataList[0].wind.deg}</p>
        </div>
      )}

      {/* filter the data to get the weather details for the next 3 days */}
      {weatherDataList &&
        weatherDataList
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(0, 3)
          .map((item) => (
            <div
              key={item.dt}
              D
              className="bg-red-300 border-2 border-black p-2 m-2"
            >
              <p>Date: {item.dt_txt}</p>
              <p>Temperature: {item.main.temp}</p>
              <p>Feels like: {item.main.feels_like}</p>
              <p>Humidity: {item.main.humidity}</p>
              <p>Pressure: {item.main.pressure}</p>
              <p>Wind speed: {item.wind.speed}</p>
              <p>Wind direction: {item.wind.deg}</p>
            </div>
          ))}

      {/* View more button */}
      {!viewMore && (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white font-bold m-5 p-2  rounded-md"
            onClick={() => {
              setViewMore(true);
            }}
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}

      {weatherDataList &&
        viewMore &&
        weatherDataList
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(3)
          .map((item) => (
            <div
              key={item.dt}
              className="bg-green-300 border-2 border-black p-2 m-2"
            >
              <p>Date: {item.dt_txt}</p>
              <p>Temperature: {item.main.temp}</p>
              <p>Feels like: {item.main.feels_like}</p>
              <p>Humidity: {item.main.humidity}</p>
              <p>Pressure: {item.main.pressure}</p>
              <p>Wind speed: {item.wind.speed}</p>
              <p>Wind direction: {item.wind.deg}</p>
            </div>
          ))}
    </div>
  );
};

export default WeatherDetails;
