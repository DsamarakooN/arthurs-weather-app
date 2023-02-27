import React from "react";
import { useState, useEffect } from "react";
import WeatherDetailsCard from "./WeatherDetailsCard";
import Navebar from "./Navebar";

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
      <Navebar />
    <div>
      <h1 className="text-2xl font-bold text-center text-blue-500 mt-10">
        Weather Details
      </h1>

      

      {/* ----------------------------------------------------*/}

      {/*two column grid tailwind css*/}
      <div className="grid grid-cols-2 p-10 gap-4">
        <div className="bg-blue-100 text-black font-bold text-xl p-2 rounded-md">
          {/* Search bar to search latitude and longitude */}
          <div className="flex flex-col items-center justify-center">
            {/* Latitude input */}
            <input
              className="border-2 border-black p-2 m-2 rounded-md"
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />

            {/* Longitude input */}
            <input
              className="border-2 border-black p-2 m-2 rounded-md"
              type="text"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />

            <button
              className="bg-blue-500 text-white font-bold w-20 py-2  rounded-md"
              onClick={() => {
                fetchWeatherData();
              }}
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>

        </div>
        <div className="bg-blue-100 text-white font-bold text-xl p-2 rounded-md">

          {weatherData && (
            <div className="p-2 m-10 text-gray-500 font-bold text-xl">



              
              <p>City: {weatherData.city.name}</p>
              <p>Country: {weatherData.city.country}</p>
            </div>
          )}

        </div>
      </div>

      {/* ----------------------------------------------------*/}

      {/* Today's weather details */}
      <h2 className="text-xl font-bold text-center text-blue-500 mt-10">
        Today's weather details
      </h2>
      {weatherDataList && (
        <div
          className="p-2 m-10"
        >
          {/* <p>Date: {weatherDataList[0].dt_txt}</p>
          <p>Temperature: {weatherDataList[0].main.temp}</p>
          <p>Feels like: {weatherDataList[0].main.feels_like}</p>
          <p>Humidity: {weatherDataList[0].main.humidity}</p>
          <p>Pressure: {weatherDataList[0].main.pressure}</p>
          <p>Wind speed: {weatherDataList[0].wind.speed}</p>
          <p>Wind direction: {weatherDataList[0].wind.deg}</p> */}
          <WeatherDetailsCard weatherData={weatherDataList[0]} />
        </div>
      )}

      <h2 className="text-xl font-bold text-center text-blue-500 mt-10">
        {viewMore ? "Next 4 days weather details" : "Next 3 days weather details"}
      </h2>
      {/* filter the data to get the weather details for the next 3 days */}
      {weatherDataList &&
        weatherDataList
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(1, 4)
          .map((item) => (
            <div
              key={item.dt}
              className="p-2 m-10"
            >
              <WeatherDetailsCard weatherData={item} />
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
          .slice(4)
          .map((item) => (
            <div
              key={item.dt}
              className="p-2 m-10"
            >
              {/* <p>Date: {item.dt_txt}</p>
              <p>Temperature: {item.main.temp}</p>
              <p>Feels like: {item.main.feels_like}</p>
              <p>Humidity: {item.main.humidity}</p>
              <p>Pressure: {item.main.pressure}</p>
              <p>Wind speed: {item.wind.speed}</p>
              <p>Wind direction: {item.wind.deg}</p> */}
              <WeatherDetailsCard weatherData={item} />
            </div>
          ))}
    </div>
    </div>
  );
};

export default WeatherDetails;
