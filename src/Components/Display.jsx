import React, { useContext, useEffect, useState } from 'react'
import { weatherContext } from '../App'
import { WiWindy, WiThermometer, WiThermometerExterior, WiHumidity } from "weather-icons-react"

const Display = () => {

  const { dataApi, errorMsg } = useContext(weatherContext)


  const [iconName, setIconName] = useState('')
  const [flagSrc, setFlagSrc] = useState('')
  const imageSrc = `https://openweathermap.org/img/wn/${iconName}@2x.png`
  const [showMap, setShowMap] = useState(false)


  useEffect(() => {
    if (dataApi) {
      setIconName(dataApi.weather[0].icon)
      setFlagSrc(`https://flagsapi.com/${dataApi.sys.country}/flat/64.png`)
    }
  }, [dataApi])



  return (
    <div className='bg-gradient-to-b from-black to-purple-900 w-[90%] min-h-[400px] md:w-[60%] p-4 border-8 border-white/10 rounded-xl'>

      {/* error */}
      <div>
        <h1 className='text-xl text-red-900 text-center h-10'>{errorMsg}</h1>
      </div>

      {dataApi &&

        <div className='text-2xl flex flex-col items-center justify-center mx-auto'>
          {/* City & Picture */}
          <h1 className='text-4xl flex items-center gap-4 justify-evenly w-full'>{dataApi.name}, {dataApi.sys.country} <img src={flagSrc} /></h1>
          <img src={imageSrc} alt={iconName} title={`${iconName}, ${dataApi.weather[0].description}`} className='w-72 border border-transparent -m-10' />
          <p className='capitalize text-xl -translate-y-4 text-pink-200'>{dataApi.weather[0].description}</p>

          {/* first 2 rows */}
          <div className='w-full flex bg-red-400/10 p-2 rounded-xl text-4xl md:text-5xl justify-around mb-16'>
            <div className='w-[50%] md:w-[30%] flex flex-col gap-8 md:gap-16 h-auto '>

              <h1 className='flex items-center md:gap-2 text-nowrap' title='Temperature'><WiThermometer />{dataApi.main.temp.toFixed(1)}<span className='text-base'>°C</span></h1>
              <h1 className='flex items-center md:gap-2 text-nowrap' title='Feels Like'><WiThermometerExterior />{dataApi.main.feels_like.toFixed(1)}<span className='text-base'>°C</span></h1>
            </div>
            <div className='w-[50%] md:w-[30%] flex flex-col gap-8 md:gap-16 h-auto'>
              <h1 className='flex items-center md:gap-2 text-nowrap' title='Wind Speed'><WiWindy />{dataApi.wind.speed}<span className='text-base'>km/h</span></h1>
              <h1 className='flex items-center md:gap-2 text-nowrap' title='Humidity'><WiHumidity />{dataApi.main.humidity}  <span className='text-base'>%</span> </h1>
            </div>
          </div>


          {/* map */}
          <button className="border-2 border-purple-500 bg-gradient-to-r from-black to-purple-700 rounded-md font-semibold p-2 hover:border-purple-300 hover:text-purple-300 mb-8" onClick={() => setShowMap((prev) => !prev)}>Show Map</button>

          {showMap &&
            <>
              <iframe width="425" height="350" src={`https://www.openstreetmap.org/export/embed.html?bbox=${dataApi.coord.lon}%2C${dataApi.coord.lat}%2C${dataApi.coord.lon}%2C${dataApi.coord.lat}&amp;layer=mapnik&amp;marker=${dataApi.coord.lat}%2C${dataApi.coord.lon}`} className='rounded-lg border-2 border-black'></iframe>
              <small><a href={`https://www.openstreetmap.org/?mlat=${dataApi.coord.lat}&amp;mlon=${dataApi.coord.lon}#map=18/${dataApi.coord.lat}/${dataApi.coord.lon}`} className='hover:text-pink-300'>View Larger Map</a></small>
            </>
          }
        </div>
      }

    </div >
  )
}

export default Display