import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black py-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-white text-lg font-bold mb-2">Nombre de la Empresa</p>
        <p className="text-gray-300 mb-4">
          Dirección de la Empresa, Ciudad, País
        </p>
        <div className="flex flex-wrap justify-center space-x-4">
          <a
            href="tel:+1234567890"
            className="text-white hover:text-gray-300"
          >
            Teléfono: +123 456 7890
          </a>
          <a
            href="mailto:info@empresa.com"
            className="text-white hover:text-gray-300"
          >
            Correo: info@empresa.com
          </a>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mt-2">
          <a
            href="https://www.facebook.com/empresa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com/empresa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/company/empresa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            LinkedIn
          </a>
          {/* Agrega más enlaces a redes sociales según sea necesario */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
