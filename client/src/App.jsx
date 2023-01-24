import { Route, Routes, Link } from "react-router-dom";
import img1 from "./assets/img5.png";
import Home from "./components/Home";
import Form from "./components/Form";
import Info from "./components/Info";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer"
const App = () => {
  return (
    <div className="bg-white ">
      <div className=" flex justify-center items-center flex-co">
        <img className="h-20 " src={img1}></img>
      </div>
      <header className="bg-blue-500 flex justify-center">
        <nav>
          <ul>
            <li className="inline px-4 justify-end">
              <Link to="/">Home</Link>
            </li>
            <li className="inline px-4 text-lg ">
              <Link to="/info">Quien somos?</Link>
            </li>
            <li className="inline">
              <Link to="/form">Registro</Link>
            </li>

            <li></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/info" element={<Info />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     <Footer/>
    </div>
  );
};

export default App;
