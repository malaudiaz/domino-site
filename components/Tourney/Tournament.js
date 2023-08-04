import { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";

import {} from "reactstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormGroup,
  InputGroup,
  Input,
  FormFeedback,
  Col,
  Label,
} from "reactstrap";

import axios from "axios";
import Swal from "sweetalert2";


export default function Tournament({ open, setClose, record, event }) {
  const {token, lang} = useAppContext();

  const [tourney, setTourney] = useState({
    event_id: "",
    id: "",
    name: "",
    modality: "",
    startDate: "",
    summary: "",
  });

  const [error, setError] = useState({
    name: null,
    modality: null,
    startDate: null,
    summary: null,
  });

  useEffect(() => {
    if (Object.entries(record).length != 0) {
        setTourney({
            ...tourney,
            id: record.id,
            event_id: record.event_id,
            name: record.name,
            modality: record.modality,
            startDate: record.startDate,
            summary: record.summary
        });
    } else {
        setTourney({
            id: null,
            event_id: null,
            name: null,
            modality: null,
            startDate: null,
            summary: null
        });
    }
    setError({
      ...error,
      name: null,
      modality: null,
      startDate: null,
      summary: null
    });
  }, [record]);

  const close = () => {
    setClose();
  };

  const handleChange = (prop) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setTourney({ ...tourney, [prop]: value });
    if (prop != "startDate") {
      setError({ ...error, [prop]: value === "" });
    } else {
      setError({ ...error, [prop]: !(value >= event.startDate && value <= event.endDate) });
    }
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const handleCreate = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney?event_id=${event.id}`;

    try {
        const response = await axios.post(url, tourney, config);

        if (response.data.success) {

            setClose();

            Swal.fire({
              title: "Creando Torneo",
              text: response.data.detail,
              icon: "success",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
          } else {
            Swal.fire({
              title: "Creando Torneo",
              text: response.data.detail,
              icon: "info",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });    
        }

    } catch (errors) {
        console.log(errors);
        const { detail } = errors.response;
        Swal.fire({
          title: "Creando Evento",
          text: detail,
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
    }

  };

  const handleUpdate = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/${tourney.id}`;

    try {
        const { data } = await axios.put(url, tourney, config);
        if (data.success) {
            setClose();

            Swal.fire({
                title: "Modificando Evento",
                text: data.detail,
                icon: "success",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });    
        } else {
            Swal.fire({
                title: "Modificando Evento",
                text: data.detail,
                icon: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });      
        }
    } catch (errors) {
        console.log(errors);
    
        const { detail } = errors.response.data;
        Swal.fire({
            title: "Modificando Evento",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
        });
    } 
  };

  const isValid = () => {
    return tourney.name != "" && tourney.modality != "";
  };

  const handleSubmit = async (e) => {
    if (isValid()) {
      if (Object.entries(record).length === 0) {
        handleCreate();
      } else {
        handleUpdate();
      }
    }
  };

  return (
    <Modal isOpen={open} backdrop={"static"} keyboard={true} centered={true}>
      <ModalHeader
        toggle={(e) => {
          close(e);
        }}
      >
        {Object.entries(record).length === 0 ? "Crear Torneo" : "Editar Torneo"}
      </ModalHeader>
      <ModalBody>
        <div className="col-12">
          <div className="p-2">
            <Col md={12}>
              <FormGroup>
                <Label>Nombre del Torneo</Label>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={"Nombre del Torneo"}
                    invalid={error.name}
                    onChange={handleChange("name")}
                    autoComplete="off"
                    value={tourney.name}
                    onKeyPress={(event) => {
                      if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>
                    Por favor, teclee el nombre del torneo
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label>Modalidad</Label>
                <InputGroup size="sm">
                  <Input
                    id="modality"
                    name="modality"
                    type="select"
                    value={tourney.modality}
                    invalid={error.modality}
                    onChange={handleChange("modality")}
                  >
                    <option value="">Modalidad</option>
                    <option value="Individual">Individual</option>
                    <option value="Parejas">Parejas</option>
                    <option value="Equipo">Equipo</option>
                  </Input>
                  <FormFeedback>
                    Por favor, seleccione la modalidad del torneo
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Fecha</Label>
                <InputGroup size="sm">
                  <Input
                    id="startDate"
                    name="startDate"
                    invalid={error.startDate}
                    placeholder="Fecha"
                    type="date"
                    value={tourney.startDate}
                    onChange={handleChange("startDate")}
                  />
                  <FormFeedback>
                    La fecha debe estar dentro del rango del evento
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label>Comentario</Label>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="summary"
                    id="summary"
                    placeholder={"Comentario"}
                    onChange={handleChange("summary")}
                    autoComplete="off"
                    value={tourney.summary}
                    onKeyPress={(event) => {
                      if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="modal-footer">
          <Button
            className="btn-sm"
            style={{
              backgroundColor: "#0095f6",
              border: "none",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
            }}
            onClick={(e) => {
              handleSubmit(e);
            }}
            title="Aceptar"
          >
            <i className="bi-check2-circle" />{" "}
            Aceptar
        </Button>

        <Button
            className="btn-sm"
            style={{
              border: "none",
              fontSize: "14px",
              fontWeight: "700",
            }}
            title="Cancelar"
            onClick={close}
          >
            <i className="bi bi-x-circle" />{" "}
            Cancelar
        </Button>

      </ModalFooter>
    </Modal>
  );
}
