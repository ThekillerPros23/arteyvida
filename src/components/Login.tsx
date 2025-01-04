import { Button, Table, Modal, TextInput, Label } from "flowbite-react";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

// Define la interfaz para los datos
interface Item {
  nombre: string;
  email: string;
  otherField: string;
}

function Login() {
  const [datos, setDatos] = useState<Item[]>([]); // Array de objetos tipo Item
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Item>({
    nombre: "",
    email: "",
    otherField: "",
  });

  // Calculating the current data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = datos.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, datos.length)
  );

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((result: Item[]) => {
        setDatos(result);
      });
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
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setDatos((prev) => [...prev, newItem]); // Agrega el nuevo ítem al array
    setNewItem({ nombre: "", email: "", otherField: "" }); // Reiniciar formulario
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <div>
      <div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Nombre </Table.HeadCell>
            <Table.HeadCell>Monto</Table.HeadCell>
            <Table.HeadCell>Imagenes</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {currentData.map((item: Item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.nombre}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.otherField}</Table.Cell>
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
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                value={newItem.email}
                onChange={handleNewItemChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="otherField" value="Other Field" />
              <TextInput
                id="otherField"
                name="otherField"
                value={newItem.otherField}
                onChange={handleNewItemChange}
                placeholder="Enter other field"
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
