import { useState } from 'react'
import './App.css'

function HeadBox(){
  return(
    <>
      <img></img>
      <h2>title</h2>
    </>
  )
}

function WeatherBox(){
  
  const [location, setLocation] = useState('')
  const [weatherData, setweatherData] = useState(null)
  const [status, setStatus] = useState('idle')

  function handleSearch(inputLocation){
    if(inputLocation===''){
      return
    }
    
    setLocation(inputLocation)
  }

  console.log(location)
  
  return(
    <>
      <h2>weatherbox</h2>
      <div>
        <SearchBox onSearch={handleSearch}/>
        <CurrentWeatherBox />
        <ForecastBox />
      </div>


    </>
  )
}

function SearchBox({onSearch}){
  const [input, setInput] = useState('')
  
  return(
    <>
      <div>
        <h2>Search here</h2>

        <label for="location">Enter location to search for: </label>
        <input type='text' value={input} onChange={(e)=>setInput(e.target.value)}></input>
        <button onClick={()=>onSearch(input)}>Submit</button>
      </div>
    </>
  )
}

function CurrentWeatherBox(){
  return(
    <div>current weather box</div>
  )
}

function ForecastBox(){
  return(
    <div>forecast box</div>
  )
}

function App() {
  return (
    <>
      <div>
        <HeadBox />
      </div>

      <div>
        <WeatherBox />
      </div>
    </>
  )
}

export default App