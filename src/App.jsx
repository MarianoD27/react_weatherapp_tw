import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import Search from "./Components/Search"
import Display from "./Components/Display"

export const weatherContext = createContext(null);

function App() {

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [dataApi, setDataApi] = useState()

  return (
    <weatherContext.Provider value={{ setDataApi, setErrorMsg, setLoading, dataApi, errorMsg }
    }>
      <div className="w-full min-h-screen bg-slate-900 text-white">
        {/* navbar */}
        <div className="bg-pink-900 w-full sticky">
          <div className="max-w-[1000px] p-2 flex justify-center items-center mx-auto">Weather App</div>
        </div>

        {/* app */}
        <div className="p-8 flex flex-col items-center justify-center gap-4">

          <Search />

          <Display />

        </div>
        {/* footer */}
        <div className="bg-pink-900">
          <div className="max-w-[1000px] flex justify-between items-center p-2 mx-auto">
            <h1>React.Js</h1>
            <h1>Made by MarianoD27</h1>
          </div>
        </div>
      </div>
    </weatherContext.Provider>
  )
}

export default App
