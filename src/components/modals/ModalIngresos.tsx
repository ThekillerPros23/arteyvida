import { useState, useEffect } from "react";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

// Define los tipos para los estados y clientes
type Estado = {
  id_estadoingreso: number;
  estados: string;
};

type Cliente = {
  id_clienteingreso: number;
  ruc: string;
  nombre: string;
};

function ModalIngresos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    monto: "",
    fecha: "",
    id_estado: "",
    id_cliente: "",
  });
  const [estados, setEstados] = useState<Estado[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  // Fetch estados desde el servidor
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch("https://arteyvidaserver.onrender.com/getEstado");
        const data: Estado[] = await response.json();
        setEstados(data);
      } catch (error) {
        console.error("Error fetching estados:", error);
      }
    };

    fetchEstados();
  }, []);

  // Fetch clientes desde el servidor
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("https://arteyvidaserver.onrender.com/getIngresos");
        const data: Cliente[] = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  // Manejo del cambio en los inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo de abrir/cerrar el modal
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ monto: "", fecha: "", id_estado: "", id_cliente: "" });
  };

  // Manejo del envío del formulario
  const handleFormSubmit = async () => {
    try {
      const response = await fetch("https://arteyvidaserver.onrender.com/sendIngresos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monto: parseFloat(formData.monto),
          fecha: formData.fecha,
          id_estado: parseInt(formData.id_estado),
          id_cliente: parseInt(formData.id_cliente),
        }),
      });

      if (response.ok) {
        console.log("Datos enviados correctamente");
        handleModalClose();
      } else {
        const errorData = await response.json();
        console.error("Error al enviar los datos:", errorData.message);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button
          onClick={handleModalOpen}
          className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-md shadow hover:bg-indigo-700"
        >
          ADD ITEMS
        </Button>
      </div>

      <Modal show={isModalOpen} onClose={handleModalClose} size="lg">
        <Modal.Header>Add New Item</Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <Label htmlFor="monto" value="Monto" />
              <TextInput
                id="monto"
                name="monto"
                value={formData.monto}
                onChange={handleInputChange}
                placeholder="Enter Monto"
                type="number"
                required
                className="border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="fecha" value="Fecha" />
              <TextInput
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                placeholder="Enter Fecha"
                type="date"
                required
                className="border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="id_estado" value="Estado" />
              <Select
                id="id_estado"
                name="id_estado"
                value={formData.id_estado}
                onChange={handleInputChange}
                required
                className="border-gray-300 rounded-md w-full"
              >
                <option value="">Select Estado</option>
                {estados.map((estado) => (
                  <option
                    key={estado.id_estadoingreso}
                    value={estado.id_estadoingreso}
                  >
                    {estado.estados}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="id_cliente" value="Cliente" />
              <Select
                id="id_cliente"
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleInputChange}
                required
                className="border-gray-300 rounded-md w-full"
              >
                <option value="">Select Cliente</option>
                {clientes.map((cliente) => (
                  <option
                    key={cliente.id_clienteingreso}
                    value={cliente.id_clienteingreso}
                  >
                    {cliente.nombre} - {cliente.ruc}
                  </option>
                ))}
              </Select>
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

export default ModalIngresos;
