import { useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";

function ModalUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ruc: "",
    nombre: "",
  });

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("https://arteyvidaserver.onrender.com/sendCliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data sent successfully");
        handleModalClose();
      } else {
        console.error("Error sending data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
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
              <Label htmlFor="ruc" value="RUC" />
              <TextInput
                id="ruc"
                name="ruc"
                value={formData.ruc}
                onChange={handleInputChange}
                placeholder="Enter RUC"
                required
                className="border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="nombre" value="Nombre" />
              <TextInput
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Enter Name"
                required
                className="border-gray-300 rounded-md w-full"
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

export default ModalUser;
