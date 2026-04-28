import { useState, useEffect } from 'react'
import Weather from "./components/Weather"
import Alerts from "./components/Alerts"
import Traffic from "./components/Traffic"
import Food from "./components/Food"
import "./style.css"

const [foodPage, setFoodPage] = useState(false)
const [trafficPage,setTrafficPage] = useState(false)
const [alertPage,setAlertPage] = useState(false)
const [weatherPage, setWeatherPage] = useState(false)

function Navbar() {

}

export default function App() {
  // const [foodPage, setFoodPage] = useState(false)
  // const [trafficPage,setTrafficPage] = useState(false)
  // const [alertPage,setAlertPage] = useState(false)
  // const [weatherPage, setWeatherPage] = useState(false)

  if (foodPage){
    return(
      <>
        <Navbar />
        <Food/>
      </>
    )
  } else if (trafficPage) {
    return (
      <>
        <Navbar />
        <Traffic/>
      </>
    )
  } else if (alertPage) {
    return (
      <>
        <Navbar />
        <Alerts/>
      </>
    )
  } else if (weatherPage) {
    return (
      <>
        <Navbar />
        <Weather/>
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <div>home</div>
      </>
    )
  }
}