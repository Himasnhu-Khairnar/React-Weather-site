import  { useEffect, useState } from "react";

const LocationWeather = () => {
  const [data, setData] = useState(false);
  const [location, setLocation] = useState('');
  const [city, setcity] = useState('');
  const [weather, setWeather] = useState({});
  const API_KEY = import.meta.env.VITE_REACT_PUBLIC_OPEN_WEATHER;
console.log(API_KEY)
  useEffect(() => {
    if (!data) return;

    const fetchIpInfo = async () => {
      try {
        const response = await fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_REACT_PUBLIC_IPCONFIG}`);
        const data = await response.json();
        setLocation(data.loc);
        setcity(data.city);
      } catch (error) {
        console.error("Error fetching the IP information:", error);
      }
    };

    fetchIpInfo();
  }, [data]);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      const [lat, lon] = location.split(",");
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    iconUrl
    fetchWeather();
  }, [location]);

  const iconUrl = weather?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`
    : "";

  return (
    <div className="flex justify-center items-center flex-col w-72 rounded-lg p-5 m-auto  mt-10 h-auto bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 ">
      <button
        className="border-2 rounded-lg p-2 bg-white m-auto border-none "
        onClick={() => {
          setData(true);
        }}
      >
        Get Weather Data of Your Location
      </button>
      {weather.main && (
        <div className="flex flex-col justify-center items-center">
                <div className="text-2xl">
                  <img src={iconUrl} className="w-18" />
                  {/* <p >{weather?.weather?.main}</p> */}
                  <p className="font-extrabold text-3xl">
                    {weather?.main?.temp} °C
                  </p>
                  <span className=" font-bold italic">{city}</span>
                </div>
                <div className=" flex gap-5  ">
                  <p className=" ">
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
  );
};

export default LocationWeather;
