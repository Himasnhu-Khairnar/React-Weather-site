import { useState, useEffect } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import LocationWeather from "./LocationWeather";

const LocationFinder = () => {
  const [City, setCity] = useState("Mumbai");
  const [CityName, setCityName] = useState("");
  const [data, getData] = useState(false);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const API_key = import.meta.env.VITE_REACT_PUBLIC_OPEN_WEATHER;

  useEffect(() => {
    if (!City) return;
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_key}&units=metric`
        );
        setWeather(response.data);
        setCityName(City);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      iconUrl;
    };

    data && fetchWeather();
  }, [City, data]);

  const iconUrl = weather?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`
    : "";

  return (
    <>
      <LocationWeather />

      <div className="h-auto   text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  text-center w-72 flex-column    justify-center items-center p-4 mt-16 m-auto">
        <div className="flex justify-center items-center">
          <input
            onChange={(e) => {
              setCity(e.target.value);
              getData(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getData(true);
              }
            }}
            value={City}
            placeholder="Enter the City name"
            className="p-2.5 border-0 rounded-full bg-white text-black outline-none text-base"
          />
          <button
            type="submit"
            onClick={() => getData(true)}
            className=" ml-2 border-solid text-center border-2 w-10  flex justify-center items-center rounded-full p-2.5 border-black-500 bg-white text-black font-bold"
          >
            <CiSearch className="text-base font-bolder" />
          </button>
        </div>
        <div className="p-4 m-12 ">
          <div>
            {loading ? (
              <p></p>
            ) : error ? (
              <p className="error">Error: {error}</p>
            ) : (
              <div className="weather-details">
                <div className="text-2xl">
                  <img src={iconUrl} className="w-44" />
                  {/* <p >{weather?.weather?.main}</p> */}
                  <p className="font-extrabold text-3xl">
                    {weather?.main?.temp} °C
                  </p>
                  <span className=" font-bold italic ">{CityName}</span>
                </div>
                <div className="flex gap-5  ">
                  <p className="grow ">
                    {/* <img className="h-8" src={windy_img}/> */}
                    <p>{weather?.wind?.speed} m/s</p>
                    <span>Wind Speed</span>
                  </p>
                  <p className="">
                    {/* <img className="w-9" src={weather_img }/> */}
                    {weather?.main?.humidity}% <span>Humidity</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationFinder;
