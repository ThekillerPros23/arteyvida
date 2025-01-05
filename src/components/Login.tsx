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
  nombre: string;
  monto: number; // Cambiado de "email" a "monto" y de string a number
  fecha: string;
}

function Login() {
  const [datos, setDatos] = useState<Item[]>([]); // Array de objetos tipo Item
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Item>({
    nombre: "",
    monto: 0, // Cambiado de "email" a "monto" y de "" a 0
    fecha: "",
  });

  // Calculating the current data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = datos.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, datos.length)
  );

  useEffect(() => {
    fetch("https://arteyvidaserver.onrender.com/data")
      .then((response) => response.json())
      .then((result: Item[]) => {
        setDatos(result);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "monto" ? parseFloat(value) : value, // Convierte "monto" a número
    }));
  };

  const handleAddItem = async () => {
    try {
      // Enviar los datos al servidor mediante POST
      const response = await fetch(
        "https://arteyvidaserver.onrender.com/sendData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );

      if (response.ok) {
        const addedItem = await response.json(); // Recibir el objeto insertado del servidor
        setDatos((prev) => [...prev, addedItem]); // Agregar el nuevo ítem al array de datos
        setNewItem({ nombre: "", monto: 0, fecha: "" }); // Reiniciar formulario
        setIsModalOpen(false); // Cerrar el modal
      } else {
        console.error("Error al enviar los datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div>
      <div className="flex list-none justify-center ">
        <Navbar className="">
          <Navbar.Link className="mx-4">Gastos</Navbar.Link>
          <Navbar.Link className="mx-4">Ingresos</Navbar.Link>
        </Navbar>
      </div>
      <div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Nombre </Table.HeadCell>
            <Table.HeadCell>Monto</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {currentData.map((item: Item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.nombre}</Table.Cell>
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
              <Label htmlFor="nombre" value="Nombre" />
              <TextInput
                id="nombre"
                name="nombre"
                value={newItem.nombre}
                onChange={handleNewItemChange}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="monto" value="Monto" />
              <TextInput
                id="monto"
                name="monto"
                type="number"
                step="0.01" // Permite decimales para cantidades de dinero
                value={newItem.monto.toString()}
                onChange={handleNewItemChange}
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
                value={newItem.fecha}
                onChange={handleNewItemChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddItem}>Add</Button>
          <Button color="gray" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
