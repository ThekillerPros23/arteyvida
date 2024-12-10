import { Route, Routes, Link } from "react-router-dom";
import img1 from "./assets/img5.png";
import Home from "./components/Home";
import Form from "./components/Form";
import Info from "./components/Info";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

const App = () => {
  // Datos que deseamos pasar al formulario
  const formData = {
    someData: "Este es un dato importante",
    otherData: 12345,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Encabezado */}
      <div className="flex justify-center items-center py-4">
        <img className="h-20" src={img1} alt="Logo" />
      </div>
      <header className="bg-blue-500 flex justify-center">
        <nav>
          <ul className="flex space-x-4">
            <li className="inline px-2 py-1 border-2 border-transparent rounded-lg hover:border-amber-500 hover:bg-white">
              <Link to="/info">Quien somos?</Link>
            </li>
            <li className="inline px-8 text-xl border-2 border-transparent rounded-lg hover:border-amber-500 hover:bg-white">
              <Link to="/">Inicio</Link>
            </li>
            {/* Pasar los datos al formulario a través de la ruta */}
            <li className="inline px-3 py-1 border-2 border-transparent rounded-lg hover:border-amber-500 hover:bg-white">
              <Link to={`/form/${encodeURIComponent(JSON.stringify(formData))}`}>
                Registro
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Ruta para el formulario con parámetros */}
          <Route path="/form/:formData" element={<Form />} />
          <Route path="/info" element={<Info />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Pie de página */}
      <Footer />

      {/* Imagen del logo */}
      
    </div>
  );
};

export default App;