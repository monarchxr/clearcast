import React from "react";
import LocationInput from "./LocationInput";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import Astronomy from "./Astronomy";

export default function Dashboard(){
    return(
        <div className="dashboard">
            <LocationInput />
            <CurrentWeather />
            <Forecast />
            <Astronomy />
        </div>
    )
}