import { Route, Routes, Link } from "react-router-dom";
import img1 from "./assets/img5.png";
import Home from "./components/Home";
import Form from "./components/Form";
import Info from "./components/Info";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="bg-white ">
      <div className=" flex justify-center items-center flex-co">
        <img className="h-20 " src={img1}></img>
      </div>
      <header className="bg-blue-500  flex justify-center">
        <nav>
          <ul>
            <li
              className="
              inline px-2 
              justify-end 
              hover:border-solid 
              hover:border-2 
            hover:border-amber-500 
            hover:bg-white 
              hover:rounded-lg 
              hover:px-3
              "
            >
              <Link to="/info">Quien somos?</Link>
            </li>
            <li
              className="
              inline 
              px-3 text-xl 
              hover:border-solid 
              hover:border-2 
            hover:border-amber-500
            hover:bg-white 
              hover:rounded-lg 
              hover:px-8 
              "
            >
              <Link to="/">Inicio</Link>
            </li>
            <li className="inline text px-3  hover:border-solid hover:border-2 hover:border-amber-500 hover:bg-white hover:rounded-lg hover:px-3">
              <Link to="/form">Registro</Link>
            </li>

          
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/info" element={<Info />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
