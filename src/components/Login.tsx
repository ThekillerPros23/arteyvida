import {
  Button,
  Table,
  Modal,
  TextInput,
  Label,
  Navbar,
} from "flowbite-react";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

// Define la interfaz para los datos
interface Item {
  id_cliente?: number; // Incluye id_cliente como opcional
  nombreproducto: string;
  monto: number;
  fecha: string;
}

function Login() {
  const [datos, setDatos] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Item>({
    nombreproducto: "",
    monto: 0,
    fecha: "",
  });

  // Calcular los datos actuales para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = datos.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, datos.length)
  );

  // Obtener datos del backend
  useEffect(() => {
    fetch("https://arteyvidaserver.onrender.com/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((result: Item[]) => {
        const parsedResult = result.map((item) => ({
          ...item,
          monto: Number(item.monto), // Asegura que monto sea numérico
          fecha: item.fecha.split("T")[0], // Asegura que solo se obtenga la fecha
        }));
        setDatos(parsedResult);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  // Cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Abrir modal
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "monto" ? parseFloat(value) : value,
    });
  };

  // Enviar datos al backend
  const handleFormSubmit = () => {
    const formattedFormData = {
      ...formData,
      fecha: formData.fecha, // Se asegura de que la fecha esté en formato YYYY-MM-DD
    };

    fetch("https://arteyvidaserver.onrender.com/Datasend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al insertar los datos");
        }
        return response.json();
      })
      .then((newItem: Item) => {
        // Asegura que solo se incluya la fecha en el formato deseado
        newItem.fecha = newItem.fecha.split("T")[0];

        // Actualizar la lista de datos con el nuevo elemento
        setDatos((prevDatos) => [...prevDatos, newItem]);

        // Cerrar el modal y resetear el formulario
        handleModalClose();
        setFormData({
          nombreproducto: "",
          monto: 0,
          fecha: "",
        });
      })
      .catch((error) => console.error("Error al insertar los datos:", error));
  };

  return (
    <div>
      <div className="flex list-none w-full  justify-center ">
        <Navbar>
          <Navbar.Link className="text-3xl font-extrabold" >GASTOS</Navbar.Link>
        
        </Navbar>
      </div>
      <div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Nombre Producto</Table.HeadCell>
            <Table.HeadCell>Monto</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {currentData.map((item: Item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.nombreproducto}</Table.Cell>
                <Table.Cell>${item.monto.toFixed(2)}</Table.Cell>
                <Table.Cell>{item.fecha}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(datos.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="grid grid-cols-1 w-full">
        <Button onClick={handleModalOpen}>ADD ITEMS</Button>
      </div>

      <Modal show={isModalOpen} onClose={handleModalClose}>
        <Modal.Header>Add New Item</Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <Label htmlFor="nombreproducto" value="Nombre Producto" />
              <TextInput
                id="nombreproducto"
                name="nombreproducto"
                value={formData.nombreproducto}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="monto" value="Monto" />
              <TextInput
                id="monto"
                name="monto"
                type="number"
                step="0.01"
                value={formData.monto}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="fecha" value="Fecha" />
              <TextInput
                id="fecha"
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleFormSubmit}>Add</Button>
          <Button color="gray" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
