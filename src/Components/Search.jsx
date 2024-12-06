import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import { weatherContext } from '../App';



const Search = () => {

  const { setDataApi, setErrorMsg, setLoading } = useContext(weatherContext)

  const callApi = async () => {
    const keyApi = 'd6fdd3bdd2d8955e56f1534eb988e1dc'
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${keyApi}&units=metric`
      );
      setDataApi(response.data);
      console.log(response)
      setLoading(false);
      setErrorMsg('')
    } catch (error) {
      console.log(error)
      setLoading(false);
      if (error.status == 404) {
        setErrorMsg("We couldn't find that place")
      } else {
        setErrorMsg("There's been a mistake")
      }
    }
  };
  useEffect(() => {
    callApi();
  }, [])


  const [input, setInput] = useState('Buenos Aires')

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      callApi()
    }
  }

  return (
    // Search
    <div className='mb-8 rounded-md bg-white'>
      <input type="text" placeholder="Type City's Name" value={input} onChange={(e) => setInput(e.target.value)} className="text-black bg-transparent outline-none px-4" onKeyDown={handleKeyPress} />
      <button onClick={() => callApi()} className="border-2 border-purple-500 bg-gradient-to-r from-black to-purple-700 rounded-md font-semibold p-2 hover:border-purple-300 hover:text-purple-300">Search</button>
    </div>
  )
}

export default Search