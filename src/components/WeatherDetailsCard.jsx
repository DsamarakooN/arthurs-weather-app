import React from "react";
import sunIcon from "../assets/icons/sun.png";
import cloudIcon from "../assets/icons/cloud.png";
import rainIcon from "../assets/icons/rain.png";
import snowIcon from "../assets/icons/snow.png";
import unknownIcon from "../assets/icons/unknown.png";
import tunderstormIcon from "../assets/icons/thunderstorm.png";
import drezzleIcon from "../assets/icons/drizzle.png";

const WeatherDetailsCard = ({ weatherData }) => {
    const { main, weather } = weatherData;
    const weatherIcon = (icon) => {
        switch (icon) {
            case "Clear":
                return sunIcon;
            case "Clouds":
                return cloudIcon;
            case "Rain":
                return rainIcon;
            case "Snow":
                return snowIcon;
            case "Thunderstorm":
                return tunderstormIcon;
            case "Drizzle":
                return drezzleIcon;
            default:
                return unknownIcon;
        }
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md w-full">
            <div className="flex justify-between">
                <p className="font-bold text-2xl">{weather[0].description}</p>
                <img
                    src={weatherIcon(weather[0].main)}
                    alt={weather[0].description}
                    className="w-12 h-12"
                />
            </div>
            {/* <p className="text-gray-500 text-sm my-2">Date: {weatherData.dt_txt}</p> */}
            {/* 2023-02-27 09:00:00" convert to 27/02/2023 */}
            <p className="text-gray-500 text-sm my-2">
                Date:{" "}
                {weatherData.dt_txt
                    .split(" ")[0]
                    .split("-")
                    .join("/")}
            </p>
            <p className="text-gray-500 text-sm my-2">Feels like {main.feels_like}°C</p>
            <p className="text-gray-500 text-sm my-2">Temperature {main.temp}°C</p>
        </div>
    );
};

export default WeatherDetailsCard;
