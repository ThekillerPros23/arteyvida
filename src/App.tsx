import { BrowserRouter, Routes,Route } from "react-router-dom"
import Menu from "./components/Menu"
import Login from "./components/Login"

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login></Login>}></Route>
    <Route path="/menu" element={<Menu></Menu>}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
