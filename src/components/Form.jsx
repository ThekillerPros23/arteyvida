import React, { useState, Redirect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const data = { email, password };

    if (isLogin) {
      console.log("Inicio de sesión:", data);
      axios
        .post("http://localhost:3000/login", data)
        .then((response) => {
          console.log("Respuesta del servidor:", response.data);
          setIsLoggedIn(true); // Redireccionar a Dashboard si el inicio de sesión es exitoso
        })
        .catch((error) => {
          console.error("Error en la solicitud al servidor:", error);
          setErrorMessage("Credenciales inválidas. Inténtalo de nuevo."); // Mostrar mensaje de error si el inicio de sesión falla
        });
    } else {
      console.log("Registro:", data);
      axios
        .post("http://localhost:3000/register", data)
        .then((response) => {
          console.log("Respuesta del servidor:", response.data);
        })
        .catch((error) => {
          console.error("Error en la solicitud al servidor:", error);
          setErrorMessage("Error en el servidor. Inténtalo de nuevo."); // Mostrar mensaje de error si el registro falla
        });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="bg-slate-500 bg-cover h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <ul className="flex justify-center mb-4">
          <li
            className={`px-4 py-2 ${
              isLogin ? "bg-red-500" : "bg-gray-500"
            } rounded-tl-lg text-white font-bold`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </li>
          <li
            className={`px-4 py-2 ${
              !isLogin ? "bg-yellow-400" : "bg-gray-500"
            } rounded-tr-lg text-white font-bold`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </li>
        </ul>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-black font-bold mb-2 text-center">Email</label>
            <input
              name="email"
              className="border-2 border-blue-500 rounded px-4 py-2 focus:outline-none focus:border-blue-700 transition-all duration-300"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black font-bold mb-2 text-center">Password</label>
            <input
              name="password"
              className="border-2 border-blue-500 rounded px-4 py-2 focus:outline-none focus:border-blue-700 transition-all duration-300"
              type="password"
              placeholder="Password"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          {isLogin ? (
            <div className="flex justify-center"> {/* Añadir clase para centrar */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex justify-center"> {/* Añadir clase para centrar */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              >
                Register
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
