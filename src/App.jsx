import Nav from "./Components/Nav"
import Map from "./Components/Map"
import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer"
import Sign_in from "./Components/Sign_in"
function App() {
  return (
    <>
      < Nav/>
      <Map/>
      <Footer/>
      <Sign_in/>
    </>
  )
}

export default App
