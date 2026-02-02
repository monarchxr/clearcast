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
  return(
    <>
      <h2>weatherbox</h2>
      <div>
        <SearchBox />
        <CurrentWeatherBox />
        <ForecastBox />
      </div>


    </>
  )
}

function SearchBox(){
  return(
    <div>searchbox</div>
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