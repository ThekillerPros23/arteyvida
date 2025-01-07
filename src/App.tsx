import { BrowserRouter, Routes,Route } from "react-router-dom"
import Menu from "./components/Menu"
import Login from "./components/Login"
import Ingresos from "./components/Ingresos"

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login></Login>}></Route>
    <Route path="/menu" element={<Menu></Menu>}></Route>
    <Route path="/ingresos" element={<Ingresos></Ingresos>}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
