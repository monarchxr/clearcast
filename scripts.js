const form = document.getElementById("input-form")
const cityinput = document.getElementById("city")
const unitinput = document.getElementById("units")


const key = "" //insert your openweathermap api key here

const map = L.map('map').setView([0, 0], 2)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map)

async function getCurrentWeather(url, unit){
    try{
        const response = await fetch(url)
        const data = await response.json()

        if(data.cod !== 200){
            throw new Error(data.message)
        }

        setCurrentWeather(data, unit)

    }catch(error){
        displayError(error)
    }
}

function displayError(error){
    document.getElementById("error").hidden = false
    document.getElementById("errormsg").textContent = error.message

    setTimeout(() => {
        document.getElementById("error").hidden = true
    }, 4000);
}

function setCurrentWeather(data, unit){
    document.getElementById("curr-temp").textContent = data.main.temp
    document.getElementById("curr-weather").textContent = data.weather[0].main
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("location").textContent = data.name
    document.getElementById("humid").textContent = `${data.main.humidity}%`

    let unitsuffix = ""

    if(unit==="metric" || unit==="standard"){
        unitsuffix = "m/s"
    }else{
        unitsuffix = "mph"
    }
    document.getElementById("speed").textContent = `${data.wind.speed}${unitsuffix}`

    setDayandTime(data.timezone)
    setMap(data)

}

form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    // console.log(cityinput.value)
    const city = cityinput.value
    let unit = unitinput.value

    if(unit==="K"){
        unit = "standard"
    }else if(unit==="C"){
        unit = "metric"
    }else if(unit==="F"){
        unit = "imperial"
    }
    
    const currlink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=${unit}`
    const forecastlink = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${unit}`
    // console.log(forecastlink)

    cityinput.value = ""


    getCurrentWeather(currlink, unit)
    getForecastWeather(forecastlink)
})

function getCityTime(timezoneOffsetSeconds){
    const utcMs = Date.now() + (new Date().getTimezoneOffset()*60000)
    const cityMs = utcMs + (timezoneOffsetSeconds*1000)
    return new Date(cityMs)
}

function setDayandTime(timezoneOffsetSeconds){

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const cityDate = getCityTime(timezoneOffsetSeconds)
    let day = days[cityDate.getDay()]

    const time = cityDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

    const s = `${day}, ${time}`

    document.getElementById("curr-day-time").textContent = s
}

async function getForecastWeather(url){
    try{
        const response = await fetch(url)
        const data = await response.json()

        if(data.cod !== "200"){
            throw new Error(data.message)
        }

        setForecastWeather(data)
    }catch(error){
        displayError(error)
    }
}

function setForecastWeather(data){

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let buckets = {}
    let date_and_data = {}

    for(let i = 0; i<data.list.length; i++){
        
        let date = (data.list[i].dt_txt.split(" ")[0])

        if(!buckets[date]){
            buckets[date] = []
        }

        if(!date_and_data[date]){
            date_and_data[date] = []
        }
        
        buckets[date].push(data.list[i])
    }


    Object.keys(buckets).forEach(date =>{
        let mintemp = 1e9
        let maxtemp = -1e9
        let icon = buckets[date][0].weather[0].icon

        for(let i = 0; i<buckets[date].length; i++){
            if(mintemp > buckets[date][i].main.temp_min){
                mintemp = buckets[date][i].main.temp_min
            }

            if(maxtemp < buckets[date][i].main.temp_max){
                maxtemp = buckets[date][i].main.temp_max
            }
        }

        let arr = [mintemp, maxtemp, icon]
        date_and_data[date].push(arr)

    })

    const pills = document.querySelectorAll(".day")
    const dates = Object.keys(date_and_data)

    for(let i = 0; i<5; i++){
        const pill = pills[i]
        const date = dates[i]
        const data = date_and_data[date][0]

        const mint = data[0]
        const maxt = data[1]
        const icon = data[2]

        const day = new Date(date).getDay()

        if(i!=0){
            pill.querySelector(".forecast-label").textContent = `${days[day]}`
        }

        pill.querySelector(".forecast-icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        pill.querySelector(".forecast-high").textContent = `${maxt}`
        pill.querySelector(".forecast-low").textContent = `${mint}`
    }

}

function setMap(data){
    map.setView([data.coord.lat, data.coord.lon], 10)
}