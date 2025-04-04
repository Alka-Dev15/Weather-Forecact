import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const countriesApiUrl = import.meta.env.VITE_COUNTRIES_API_URL
  const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL
  const weatherApiToken = import.meta.env.VITE_WEATHER_API_TOKEN

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState()
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      try{
        const countriesData = await axios.get(countriesApiUrl)
        setCountries(countriesData.data)

        if (countriesData.data.length > 0) {
          setSelectedCountry("Canada");
        }

      } catch(error){
        console.log("Error is: ", error);
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    if(!selectedCountry) return
    const fetchCountyData = async() => {
      try{
        const weatherDataValue = await axios.get(weatherApiUrl+'/current?access_key='+weatherApiToken+'&query='+selectedCountry)
        setWeatherData(weatherDataValue.data)
      } catch(error){
        console.log("Something went wrong");
      }
    }
    fetchCountyData()
  }, [selectedCountry])

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-200'>
        <div className='flex bg-white rounded-3xl shadow-lg overflow-hidden max-w-4xl w-full'>
          <div className='w-1/2 bg-cover bg-center relative p-6' style={{backgroundImage:"url('src/assets/bg-image.jpg')"}}>
            <div className='absolute inset-0 bg-opacity-30 rounded-3xl'></div>
              <div className='relative z-10'>
                <div className='flex'>
                  <h1 className='text-xl w-1/2 font-semibold mb-4 text-white'>Forecast</h1>
                  <div className='absolute w-1/2 top-1 right-6 bg-blue-900 text-white px-3 py-1 rounded-full text-xs'>
                  📍 Selected Location
                    <p className='ml-3'>{selectedCountry}</p>
                  </div>
                </div>
                <h4 className='text-lg font-bold mt-30 text-center text-white'>Weather Forecast On Your Fingertip</h4>
                <div className='mt-6 flex items-center'>
                  <select 
                    value={selectedCountry}
                    className='border-blue-500 border-3 bg-opacity-25 text-gray-700 rounded-full px-4 py-2 focus:outline-none w-full'
                    onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option disabled value="">Select the Country Name</option>
                    {countries.map((item) => (
                      <option value={item.name.common}>{item.name.common}</option>
                    ))}
                  </select>
                </div>
              </div>
          </div>
          <div className='w-1/2 p-6'>
          {weatherData && weatherData.location && weatherData.location.name !== '' ? ( 
              <div>
                <div>
                  <h3 className='text-xl font-bold'>Today</h3>
                  <div className='mt-3 bg-white shadow-md rounded-lg p-4'>
                    <h2 className='text-3xl font-bold'>{weatherData.current.temperature}°C</h2>
                    <div className='flex'><img className='w-7' src={weatherData.current.weather_icons} /><span className='text-lg text-gray-600 ml-2'>{weatherData.current.weather_descriptions}</span></div>
                    <p className='text-xs text-gray-500'>{weatherData.location.localtime}</p>
                    <div className='mt-3 text-sm text-gray-600'>
                      <p className='font-medium'> RealFeel: {weatherData.current.feelslike}</p>
                      <p className='font-medium'> Humidity: {weatherData.current.humidity}%</p>
                      <p className='font-medium'> UV Index: {weatherData.current.uv_index}</p>
                      <p className='font-medium'> Cloud Cover: {weatherData.current.cloudcover}%</p>
                      <p className='font-medium'> Visibility: {weatherData.current.visibility}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-6'>
                  <h3 className='text-xl font-bold'>Sunrise & Air Quality</h3>
                  <div className='flex space-x-4 mt-3 overflow-x-auto'>
                    <div className='bg-white shadow-md rounded-lg p-3 min-w-[100px]'>
                      <p className='text-sm text-gray-600 font-medium'>Sunrise Time: {weatherData.current.astro.sunrise}</p>
                      <p className='text-gray-600 text-sm font-medium'>Sunset Time: {weatherData.current.astro.sunset}</p>
                      <p className='text-sm text-gray-500 font-medium'>Moonphase: {weatherData.current.astro.moon_phase}</p>
                    </div>
                    <div className='bg-white shadow-md rounded-lg p-3 min-w-[100px]'>
                      <p className='text-sm text-gray-600 font-medium'>Air Quality Index: {weatherData.current.air_quality.pm2_5}</p>
                      <p className='text-gray-600 text-sm font-medium'>Wind Speed: {weatherData.current.wind_speed}</p>
                      <p className='text-sm text-gray-500 font-medium'>Atmospheric Pressure: {weatherData.current.wind_speed}</p>
                    </div>
                  </div>
                </div>
              </div>
          ): (
            <div className='flex items-center justify-center h-64 bg-gray-100 rounded-lg'>
              <p className='text-gray-500'>Please Select Country First</p>
            </div>
          )}
          
          </div>
        </div>
      </div>
    </>
  )

}

export default App
