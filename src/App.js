import './App.css';
import React, { useEffect, useState } from 'react'
import WeatherComponent from './components/weather.js'
import SpinnerComponent from './components/spinner';
import ForecastComponent from './components/forecast.js'
import {AiOutlineReload}  from "react-icons/ai"

function App() {
  const [declinedPermisson, setDeclinedPermisson] = useState(false)
  const [userCoords, setUserCoords] = useState()

  useEffect(() => {
    getCoordinates();
  }, [declinedPermisson])

  const getCoordinates = () => {

    navigator.geolocation.getCurrentPosition(function(position) {
      let coordinates = {
        'lat' : position.coords.latitude,
        'lon' : position.coords.longitude
      }
      setUserCoords(coordinates)
    },
    function(error) {
      if (error.code === error.PERMISSION_DENIED)
      setDeclinedPermisson(true)
    })
  }

  function RefreshPage(){
    window.location.reload();
  }

  const ReloadComponent = () =>{
    return(
      <button className = 'reloadBtn' onClick = {() => RefreshPage()}><AiOutlineReload size= "100%" color = "white" /></button>
    )
  }
    
  const PermissionComponent = () =>{
    return(
      <p className="weatherHeader">Please enable geolocation permission.</p> 
    )   
  }

  return (
    <div className="App" >
      <ReloadComponent/>
      { declinedPermisson ? <PermissionComponent/> : userCoords ? <> <WeatherComponent coords = {userCoords}/> <ForecastComponent coords = {userCoords}/> </> : <SpinnerComponent/> }
    </div>
  )
}

export default App;

