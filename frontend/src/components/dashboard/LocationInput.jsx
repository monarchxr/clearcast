import React from "react";

function LocationInput(){
    return(
        <div>
            <h2>Enter location</h2>
            <form>
                <input type="text" placeholder="Type location here"/>
                <input type="submit" value={"Fetch weather"} />
            </form>
        </div>
    )
}

export default LocationInput