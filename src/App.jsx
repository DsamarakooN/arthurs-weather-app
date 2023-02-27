import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails"
import Login from "./components/Login"

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/weather-details' element={<WeatherDetails />} />
        </Routes>
      </Router>
    </div>
  )
}