import { useState, useEffect } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API o base de datos
    const fetchData = async () => {
      try {
        // Reemplaza 'API_ENDPOINT' con la URL de tu API o backend
        const response = await fetch("API_ENDPOINT");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Renderizar los datos obtenidos */}
      {data.map((item) => (
        <div key={item.id}>
          {/* Mostrar los datos según la estructura de tu API */}
          <p>{item.nombre}</p>
          <p>{item.edad}</p>
          {/* ... Otros campos de datos */}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
