import { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Table,
  ModalFooter,
  FormFeedback,
  Col,
  Input,
  InputGroup,
  FormGroup,
  Label,
  Form,
} from "reactstrap";

import { useAppContext } from "../../AppContext";

import axios from "axios";
import Swal from "sweetalert2";

export default function Boletus({ open, close, record, edited, setRefresh }) {
  const { token, lang } = useAppContext();
  const [openData, setOpenData] = useState(false);
  const [boletus, setBoletus] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [reload, setReload] = useState(true)
  const [data, setData] = useState({
    pair: {
      value: "",
      error: false,
      errorMessage: "Debe seleccionar la pareja Ganadora",
    },
    point: {
      value: "",
      error: false,
      errorMessage: "Teclee los puntos obtenidos",
    },
    duration: {
      value: "",
      error: false,
      errorMessage: "Teclee la duración de la partida",
    },
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const toggle = () => {
    close();
  }

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${record.boletus_id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setBoletus(data.data);
        const gover = data.data.number_points_to_win === data.data.pair_one.total_point || data.data.number_points_to_win === data.data.pair_two.total_point;
        setGameOver(gover);
        setReload(false);
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
  }, [record, reload, gameOver]);

  const handleNew = () => {
    setOpenData(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${record.boletus_id}`;

    const body = {
      pair: data.pair.value,
      point: data.point.value,
      duration: data.duration.value,
    };

    try {
      const { data } = await axios.post(url, body, config);

      if (data.success) {
        if (data.data.closed_round) {
          setRefresh(true);
        }

        Swal.fire({
          icon: "success",
          title: "Guardando Data",
          text: data.detail,
          showConfirmButton: true,
        });
        setData({
          pair: {
            value: "",
            error: false,
            errorMessage: "Debe seleccionar la pareja Ganadora",
          },
          point: {
            value: "",
            error: false,
            errorMessage: "Teclee los puntos obtenidos",
          },
          duration: {
            value: "",
            error: false,
            errorMessage: "Teclee la duración de la partida",
          }      
        })
        setOpenData(false);
        setReload(true);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Guardando Data",
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
            title: "Guardando Data",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: {
        ...data[name],
        error: value === "",
        value,
      },
    });
  };

  return (
    <Modal
      id="boletus"
      isOpen={open}
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader
        toggle={toggle}
      >
        <small>Boleta</small>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-row justify-content-between align-items-center px-4 py-2">
          <div className="d-flex flex-row">
            <strong>Ronda: {boletus.round_number}</strong>
            <strong className="ps-4">Mesa: {boletus.table_number}</strong>
          </div>
          {(record.status === "0" && edited && gameOver === false) && (
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
          )}
        </div>
        <Table hover responsive size="sm" striped borderless bordered>
          <thead>
            <tr>
              <th className="text-center">Data</th>
              <th className="text-center">
                {boletus.pair_one && boletus.pair_one.name}
              </th>
              <th className="text-center">
                {boletus.pair_two && boletus.pair_two.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {boletus.lst_data &&
              boletus.lst_data.map((item, idx) => (
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
              <th className="text-center">
                {boletus.pair_one && boletus.pair_one.total_point}
              </th>
              <th className="text-center">
                {boletus.pair_two && boletus.pair_two.total_point}
              </th>
            </tr>
          </tfoot>
        </Table>

        <Modal
          id="new_data"
          isOpen={openData}
          size="sm"
          backdrop={"static"}
          keyboard={true}
          centered={true}
        >
          <ModalHeader
            toggle={(e) => {
              setOpenData(false);
            }}
          >
            <small>Nueva Data</small>
          </ModalHeader>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <ModalBody>
              <FormGroup row>
                <Label size="sm" sm={3}>
                  Ganador:
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      type="select"
                      id="pair"
                      name="pair"
                      size="sm"
                      invalid={data.pair.error}
                      defaultValue={data.pair.value}
                      onChange={handleChange}
                    >
                      <option value="">Pareja Ganadora</option>
                      <option
                        value={
                          boletus.pair_one ? boletus.pair_one.pairs_id : ""
                        }
                      >
                        {boletus.pair_one ? boletus.pair_one.name : ""}
                      </option>
                      <option
                        value={
                          boletus.pair_two ? boletus.pair_two.pairs_id : ""
                        }
                      >
                        {boletus.pair_two ? boletus.pair_two.name : ""}
                      </option>
                    </Input>
                    <FormFeedback>{data.pair.errorMessage}</FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label size="sm" sm={3}>
                  Puntos:
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      id="point"
                      name="point"
                      size="sm"
                      invalid={data.point.error}
                      value={data.point.value}
                      placeholder="Puntos"
                      onChange={handleChange}
                    />
                    <FormFeedback>{data.point.errorMessage}</FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label size="sm" sm={3}>
                  Duración (min):
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      name="duration"
                      size="sm"
                      placeholder="Duración"
                      invalid={data.duration.error}
                      onChange={handleChange}
                    />
                    <FormFeedback>{data.duration.errorMessage}</FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" size="sm">
                Aceptar
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenData(false);
                }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </ModalBody>
    </Modal>
  );
}
