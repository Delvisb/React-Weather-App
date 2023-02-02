import React, { useEffect, useState } from "react";
import '../static/styles.css';
import SpinnerComponent from "./spinner";
import  { CiLocationOn } from "react-icons/ci"
import  { FaSpinner} from "react-icons/fa"
import { TiWeatherCloudy, TiWeatherSnow, TiWeatherShower, TiWeatherSunny, TiWeatherWindyCloudy } from "react-icons/ti"

const sunnyImg = require('../assets/sunny.gif')
const rainyImg = require('../assets/rainy.gif')
const snowyImg = require('../assets/snowy.gif')
const cloudyImg = require('../assets/cloudy.gif')

export default function WeatherComponent({ coords }){
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [weather, setWeather] = useState([])
    
    useEffect(() => {
        getWeather(coords.lat, coords.lon);
    }, [error])

    const getWeather = async (lat, lon) =>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '414ed3dd91mshcc92bca3c605999p125f24jsnf2650ad70ac3',
                'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
            }
        };
        
        await fetch(`https://aerisweather1.p.rapidapi.com/observations/${lat},%20${lon}`, options)
        .then(async response => await response.json())
        .then(response =>{
            if(response.error){
                setError(response.error)
            }else{
                let data = formatData(response)
                setWeather(data)
            }
        })
        .then(()=>{
           setIsLoading(false) 
        })
        .catch(err => {
            setError(err)
            console.error(err)
        });
    }

    const getBackgroundImg = (forecastType) =>{
        if(forecastType.includes('Sunny')){
            return  sunnyImg
        }
        else if(forecastType.includes('Rainy')){
            return rainyImg
        }
        else if(forecastType.includes('Cloudy')){
            return cloudyImg
        }
        else if(forecastType.includes('Windy')){
            return null
        }
        else if(forecastType.includes('Snow')){
            return snowyImg
        }  
        else{
            return null
        }
    }

    const getIcon = (forecastType ) => {
        if(forecastType.includes('Sun')){
            return <TiWeatherSunny size= "100%" color = "white" />
        }
        else if(forecastType.includes('Rain')){
            return <TiWeatherShower size= "100%" color = "white"/>
        }
        else if(forecastType.includes('Cloud')){
            return <TiWeatherCloudy size= "100%" color = "white"/>
        }
        else if(forecastType.includes('Wind')){
            return <TiWeatherWindyCloudy size= "100%" color = "white" />
        }
        else if(forecastType.includes('Snow')){
            return <TiWeatherSnow size= "100%" color = "white" />
        }
        else{
            return <FaSpinner size= "100%" color = "white"/>
        }
    }

    const formatData = (response) =>{
        var state = response.response.place.state.charAt(0).toUpperCase() + response.response.place.state.slice(1)
        var location = response.response.place.city.charAt(0).toUpperCase() + response.response.place.city.slice(1) + ", " + state
        var temp = response.response.ob.tempF + "° F | " + response.response.ob.tempC + "° C"
        var description = response.response.ob.weather
        var highLow = "Feels Like: " + response.response.ob.feelslikeF + "° F, " + response.response.ob.feelslikeC + "° C"
        let currentWeather = {
            'location': location,
            'temp': temp,
            'description': description,
            'highLow': highLow
        }
        return currentWeather
    } 

    const WeatherData = () =>{
        return(
            <>
            {error ? <h1>There has been an error!</h1> :
            <div className = "weatherComponentContainer" > 
                <h1 className="header">Today's Weather</h1>
                <div className="weatherContainer"> 
                    <div className="weatherContainer2" style = {{ backgroundImage: `url(${getBackgroundImg(weather.description)})`, backgroundRepeat  : 'no-repeat', backgroundSize: 'fit', backgroundPosition: 'inherit'}}> 
                        <p className="weatherHeader"><CiLocationOn size= "25"/> {weather.location}</p> 
                        <p className="weatherText">{weather.temp}</p>
                        <p className="weatherText">{weather.description}</p>
                        <p className="weatherText">{weather.highLow}</p>
                        <div className="weatherIconContainer">
                            {getIcon(weather.description)}
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
        )
    }
  
    return(
        <>
        {isLoading ? <SpinnerComponent/> : <WeatherData/>}
        </>
    )
}
