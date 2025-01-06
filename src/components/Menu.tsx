import {
  Button,
  Table,
  Modal,
  TextInput,
  Label,
  Navbar,
  Dropdown,
  Avatar,
} from "flowbite-react";
import { Pagination } from "flowbite-react";
import { HiOutlineSortDescending, HiOutlineSortAscending } from "react-icons/hi";
import { useEffect, useState } from "react";
import { auth } from "../auth/FirebaseAuthenticate";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Define la interfaz para los datos
interface Item {
  id_cliente?: number; // Incluye id_cliente como opcional
  nombreproducto: string;
  monto: number;
  fecha: string;
}

function Menu() {
  const [datos, setDatos] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Item>({
    nombreproducto: "",
    monto: 0,
    fecha: "",
  });
  const [sortByMonto, setSortByMonto] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Redirigir al login si no hay un usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/"); // Redirige al login si no hay usuario autenticado
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Calcular los datos actuales para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedDatos = sortByMonto !== null
    ? [...datos].sort((a, b) => sortByMonto ? b.monto - a.monto : a.monto - b.monto)
    : datos;
  const currentData = sortedDatos.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, sortedDatos.length)
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

  // Manejar cambio directo de página con dropdown
  const handleDirectPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(e.target.value));
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
        newItem.fecha = newItem.fecha.split("T")[0];

        setDatos((prevDatos) => [...prevDatos, newItem]);

        setFormData({
          nombreproducto: "",
          monto: 0,
          fecha: "",
        });
      })
      .catch((error) => console.error("Error al insertar los datos:", error));
    handleModalClose();
  };

  // Manejar el cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirigir al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Cambiar orden por monto
  const handleSortByMonto = () => {
    setSortByMonto((prevSort) => (prevSort === null ? true : !prevSort));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex list-none w-full justify-between items-center px-6 bg-white shadow-md rounded-md py-4 mb-6">
        <Navbar>
          <Navbar.Link className="text-3xl font-extrabold text-indigo-600">GASTOS</Navbar.Link>
        </Navbar>
        {user && (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User avatar"
                img={
                  user.photoURL ||
                  "https://www.svgrepo.com/show/355037/google.svg"
                }
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-bold text-gray-700">{user.displayName}</span>
              <span className="block truncate text-sm text-gray-500">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleSignOut} className="text-red-500">
              Sign out
            </Dropdown.Item>
          </Dropdown>
        )}
      </div>
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <Table>
          <Table.Head>
            <Table.HeadCell className="text-gray-700 font-bold">Nombre Producto</Table.HeadCell>
            <Table.HeadCell
              onClick={handleSortByMonto}
              className="cursor-pointer text-gray-700 font-bold flex items-center justify-between"
            >
              Monto
              {sortByMonto === null ? null : sortByMonto ? (
                <HiOutlineSortDescending className="ml-2" />
              ) : (
                <HiOutlineSortAscending className="ml-2" />
              )}
            </Table.HeadCell>
            <Table.HeadCell className="text-gray-700 font-bold">Fecha</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {currentData.map((item: Item, index) => (
              <Table.Row key={index} className="hover:bg-gray-100">
                <Table.Cell className="text-gray-600">{item.nombreproducto}</Table.Cell>
                <Table.Cell className="text-gray-600">${item.monto.toFixed(2)}</Table.Cell>
                <Table.Cell className="text-gray-600">{item.fecha}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center my-6 space-y-4 md:space-y-0 md:space-x-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(datos.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
        <div className="flex items-center">
          <label htmlFor="directPage" className="mr-2 text-gray-700">Go to page:</label>
          <select
            id="directPage"
            value={currentPage}
            onChange={handleDirectPageChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            {Array.from(
              { length: Math.ceil(datos.length / itemsPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <Button
          onClick={handleModalOpen}
          className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-md shadow hover:bg-indigo-700"
        >
          ADD ITEMS
        </Button>
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
                className="border-gray-300 rounded-md"
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
                className="border-gray-300 rounded-md"
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
                className="border-gray-300 rounded-md"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleFormSubmit}
            className="bg-green-600 text-white font-bold"
          >
            Save
          </Button>
          <Button
            onClick={handleModalClose}
            className="bg-gray-300 text-gray-700 font-bold"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Menu;
