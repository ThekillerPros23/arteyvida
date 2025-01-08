import { Navbar, Dropdown, Avatar, Accordion, Table, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../auth/FirebaseAuthenticate";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ModalUser from "./modals/ModalUser";
import ModalIngresos from "./modals/ModalIngresos";

interface Ingreso {
  id_clienteingreso: number;
  ruc: string;
  nombre: string;
}

function Ingresos() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch de los ingresos al cargar el componente
  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const response = await fetch(
          "https://arteyvidaserver.onrender.com/getIngresos"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los ingresos");
        }
        const data = await response.json();
        setIngresos(data);
      } catch (error) {
        console.error("Error en la solicitud de ingresos:", error);
      }
    };

    fetchIngresos();
  }, []);

  // Verificar autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ingresos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ingresos.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex flex-col md:flex-row list-none justify-between items-center px-6 bg-white shadow-md rounded-md py-4 mb-6">
        <Navbar>
          <Dropdown
            label={
              <span className="text-4xl font-bold text-indigo-700 hover:text-indigo-900">
                INGRESOS
              </span>
            }
            inline={true}
          >
            <Dropdown.Item onClick={() => navigate("/menu")}>Gastos</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/ingresos")}>Ingresos</Dropdown.Item>
          </Dropdown>
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
              <span className="block text-sm font-bold text-gray-700">
                {user.displayName}
              </span>
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

      {/* Tabla principal */}
      <Table>
        <Table.Head>
          <Table.HeadCell>RUC</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
        </Table.Head>
      </Table>

      {/* Acordeones para cada ingreso */}
      <Accordion collapseAll>
        {currentItems.map((ingreso) => (
          <Accordion.Panel key={ingreso.id_clienteingreso}>
            <Accordion.Title>
              <div className="grid grid-cols-3 items-center">
                <span>{ingreso.ruc}</span>
                <span className="text-center">{ingreso.nombre}</span>
                <Button onClick={() => console.log(`Editando ingreso ${ingreso.id_clienteingreso}`)}>
                  Editar
                </Button>
              </div>
            </Accordion.Title>
            <Accordion.Content>
              <Table>
                <Table.Head>
                  <Table.HeadCell>Monto</Table.HeadCell>
                  <Table.HeadCell>Fecha</Table.HeadCell>
                  <Table.HeadCell>Estado</Table.HeadCell>
                </Table.Head>
              </Table>
              <ModalIngresos></ModalIngresos>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </Button>
      </div>

      <ModalUser></ModalUser>
    </div>
  );
}

export default Ingresos;
