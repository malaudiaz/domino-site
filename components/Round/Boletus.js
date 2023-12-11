import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button, Table, ModalFooter } from "reactstrap";

import { useAppContext } from "../../AppContext";

import axios from "axios";
import Swal from "sweetalert2";

export default function Boletus({ open, close, record }) {
  const { token, lang } = useAppContext();
  const [openData, setOpenData] = useState(false);
  const [boletus, setBoletus] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${record.boletus_id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setBoletus(data.data);        
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Jugadores del Torneo",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const { detail } = JSON.parse(request.response);
          Swal.fire({
            title: "Cargando Jugadores del Torneo",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      }
    }
  };

  useEffect(() => {
    if (record.boletus_id) {
      fetchData();
    }
  }, [record]);

  const handleNew = () => {
    setOpenData(true);
  }

  return (
    <Modal
      id="boletus"
      isOpen={open}
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader
        toggle={(e) => {
          close(e);
        }}
      >
        <small>Boleta</small>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-row justify-content-between align-items-center px-4 py-2">
          <div className="d-flex flex-row">
            <strong>Ronda: {boletus.round_number}</strong>
            <strong className="ps-4">Mesa: {boletus.table_number}</strong>
          </div>
          <Button
            color="primary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              handleNew();
            }}
          >
            Nueva
          </Button>
        </div>
        <Table hover responsive size="sm" striped borderless bordered>
          <thead>
            <tr>
              <th className="text-center">Data</th>
              <th className="text-center">{boletus.pair_one}</th>
              <th className="text-center">{boletus.pair_two}</th>
            </tr>
          </thead>
          <tbody>
            {boletus.data.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center">{item.number}</td>
                <td className="text-center">{item.pair_one}</td>
                <td className="text-center">{item.pair_two}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="text-center">Total</th>
              <th className="text-center">{boletus.total_pair_one}</th>
              <th className="text-center">{boletus.total_pair_two}</th>
            </tr>
          </tfoot>
        </Table>

        
        <Modal
            id="new_data"
            isOpen={openData}
            backdrop={"static"}
            keyboard={true}
            centered={true}
        >
            <ModalHeader toggle={(e) => {
                setOpenData(false);
            }}>
                <small>Nueva Data</small>
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>

      </ModalBody>
    </Modal>
  );
}
