import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/FirebaseAuthenticate";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { Spinner } from "flowbite-react"; // Importamos el spinner de Flowbite

// Carga diferida del componente Menu
 // Lazy load del menú

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true); // Estado para controlar el loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setIsLoading(false); // Deja de mostrar el loading
        navigate("/menu"); // Redirige al menú si el usuario está autenticado
      } else {
        console.log("No user logged in");
        setIsLoading(false); // Detenemos el loading si no hay usuario autenticado
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = async (): Promise<void> => {
    setIsLoading(true); // Iniciamos el loading
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      console.log("Google Login Success:", result.user);
      navigate("/menu");
    } catch (error: any) {
      setIsLoading(false); // Detenemos el loading en caso de error
      console.error("Google Login Error:", error.message);
    }
  };

  // Función para manejar el inicio de sesión con Facebook
  const handleFacebookLogin = async (): Promise<void> => {
    setIsLoading(true); // Iniciamos el loading
    const provider = new FacebookAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      console.log("Facebook Login Success:", result.user);
      navigate("/menu");
    } catch (error: any) {
      setIsLoading(false); // Detenemos el loading en caso de error
      console.error("Facebook Login Error:", error.message);
    }
  };

  // Función para manejar el inicio de sesión con Apple
  const handleAppleLogin = async (): Promise<void> => {
    setIsLoading(true); // Iniciamos el loading
    const provider = new OAuthProvider("apple.com");
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      console.log("Apple Login Success:", result.user);
      navigate("/menu");
    } catch (error: any) {
      setIsLoading(false); // Detenemos el loading en caso de error
      console.error("Apple Login Error:", error.message);
    }
  };

  // Mostrar loading mientras se verifica el estado de autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner size="xl" aria-label="Loading spinner" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Spinner size="xl" aria-label="Loading spinner" />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login / Register</h1>
          <div className="space-y-4">
            {/* Botón de Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-2 px-4 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            {/* Botón de Facebook */}
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/448255/facebook.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Sign in with Facebook
            </button>
            {/* Botón de Apple */}
            <button
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center py-2 px-4 bg-black text-white font-medium rounded-lg shadow hover:bg-gray-900 transition duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/448268/apple.svg"
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
