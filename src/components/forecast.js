import React, { useEffect, useState} from "react";
import '../static/styles.css';
import { FaSpinner }from "react-icons/fa"
import SpinnerComponent from "./spinner";
import { TiWeatherCloudy, TiWeatherSnow, TiWeatherShower, TiWeatherSunny } from "react-icons/ti"
import {RiWindyFill} from "react-icons/ri"

const sunnyImg = require('../assets/sunny.gif')
const rainyImg = require('../assets/rainy.gif')
const snowyImg = require('../assets/snowy.gif')
const cloudyImg = require('../assets/cloudy.gif')
const windyImg = require('../assets/windy.gif')
const loadingImg = require('../assets/loading.gif')

export default function ForecastComponent({ coords }){
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [forecast, setForecast] = useState([])

    useEffect(()=>{
        getForecast(coords.lat, coords.lon);	
    }, [error])

    const getForecast =  async (lat, lon) =>{
        var from = new Date().toISOString().slice(0, 10);
        const toDate = new Date();
        toDate.setDate(toDate.getDate() + 5);
        const to = toDate.toISOString().slice(0, 10)

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '414ed3dd91mshcc92bca3c605999p125f24jsnf2650ad70ac3',
                'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
            }
        };

        await fetch(`https://aerisweather1.p.rapidapi.com/forecasts/${lat},%20${lon}?from=${from}&to=${to}`, options)
        .then(async response => await response.json())
        .then(response =>{
            if(response.error){
                setError(response.error)
            }else{
                setForecast(response.response[0].periods)
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
            return sunnyImg
        }
        else if(forecastType.includes('Rainy')){
            return rainyImg
        }
        else if(forecastType.includes('Cloudy')){
            return cloudyImg
        }
        else if(forecastType.includes('Windy')){
            return windyImg
        }
        else if(forecastType.includes('Snow')){
            return snowyImg
        }  
        else{
            return loadingImg
        }
    }

    const getIcon = (forecastType) => {
        if(forecastType.includes('Sunny')){
            return <TiWeatherSunny size= "100%" color = "white" />
        }
        else if(forecastType.includes('Rainy')){
            return <TiWeatherShower size= "100%" color = "white"/>
        }
        else if(forecastType.includes('Cloudy')){
            return <TiWeatherCloudy size= "100%" color = "white"/>
        }
        else if(forecastType.includes('Windy')){
            return <RiWindyFill size= "100%" color = "white" />
        }
        else if(forecastType.includes('Snow')){
            return <TiWeatherSnow size= "100%" color = "white" />
        }
        else{
            return <FaSpinner size= "100%" color = "white"/>
        }
    }
    
    const ForecastData = () =>{
        return(
            <>
            {error ? <h1>There has been an error!</h1> : 
                <div className="forecastComponentContainer"> 
                    <h1 className="header">Weekly Forecast</h1>
                    <div className="forecastContainer">
                        {forecast.map( (fore, id) =>
                            <div key = {id} className="forecast" style = {{ backgroundImage: `url(${getBackgroundImg(fore.weather)})`,  backgroundRepeat  : 'no-repeat', backgroundSize: 'cover'}}>
                                <div className="leftContainer">
                                    <p className="forecastText">{fore.dateTimeISO.slice(0, 10)}</p>
                                    <p className="forecastText">{fore.avgTempF + "° F | " + fore.avgTempC + "° C"}</p>
                                    <p className="forecastText">{fore.weather}</p>
                                </div>
                                <div className="rightContainer">
                                    {getIcon(fore.weather)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
            </>
        )
    }
    return( 
        <>
        {isLoading ? <SpinnerComponent/> : <ForecastData/>}
        </>
    )
}
