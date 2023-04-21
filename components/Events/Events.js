import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import AppContext from "../../AppContext";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  InputGroup,
  Input,
  FormFeedback,
  Button,
  Row,
  Col,
  Label,
  ModalFooter,
} from "reactstrap";

import CountryComboBox from "../Country/CountryComboBox";
import CityComboBox from "../City/CityComboBox";

export default function NewEvent({ session, openEvent, setOpenEvent, record }) {
  const value = useContext(AppContext);
  const avatar = value.state.avatar;
  const [event, setEvent] = useState({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    country: "",
    city: "",
    campus: "",
    summary: "",
    image: "",
    file: "",
  });

  const [error, setError] = useState({
    name: null,
    startDate: null,
    endDate: null,
    country: null,
    city: null,
    campus: null,
  });

  const [step, setStep] = useState(0);
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (Object.entries(record).length != 0) {
      setEvent({
        ...event,
        id: record.id,
        name: record.name,
        startDate: record.startDate,
        endDate: record.endDate,
        summary: record.summary,
        country: record.country,
        city: record.city,
        campus: record.campus,
        image: record.photo,
      });
      setMode(true);
      setImage(record.photo);
    }
  }, [record]);

  const handleChange = (prop) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEvent({ ...event, [prop]: value });
    setMode(true);
    setError({ ...error, [prop]: value === "" });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": session.locale,
      Authorization: `Bearer ${session.token}`,
    },
  };

  const handleCreate = async () => {
    try {
      const { data } = await axios.post("/api/events/create", event, config);

      if (data.success) {
        setEvent({ ...event, id: data.data.id });

        const body = new FormData();
        body.append("user_id", session.id);
        body.append("event_id", data.data.id);
        body.append("file", event.file);

        const { status } = await axios.post("/api/events/file", body);
        if (status == 200) {
          setEvent({
            id: "",
            name: "",
            startDate: "",
            endDate: "",
            country: "",
            city: "",
            campus: "",
            summary: "",
            image: "",
            file: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error, su imagen no ha subido al servidor.",
            showConfirmButton: true,
          });
        }
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
    try {
      const { data } = await axios.put(
          `/api/events/update?id=${event.id}`,
          event,
          config
      );

      if (data.success) {

        const body = new FormData();
        body.append("user_id", session.id);
        body.append("event_id", event.id);
        body.append("file", event.file);

        const { status } = await axios.post("/api/events/file", body);
        if (status == 200) {
          setEvent({
            id: "",
            name: "",
            startDate: "",
            endDate: "",
            country: "",
            city: "",
            campus: "",
            summary: "",
            image: "",
            file: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error, su imagen no ha subido al servidor.",
            showConfirmButton: true,
          });
        }
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

  const handleSubmit = async (e) => {
    setError({
      ...error,
      name: event.name === "",
      startDate: event.startDate === "",
      endDate: event.endDate === "",
      country: event.country === "",
      city: event.city === "",
      campus: event.campus === "",
    });

    if (
      !error.name &&
      !error.startDate &&
      !error.endDate &&
      !error.country &&
      !error.city &&
      !error.campus
    ) {
      if (Object.entries(record).length === 0) {
        handleCreate();
      } else {
        handleUpdate();
      }
    }
  };

  const handleAddPhoto = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      const i = evt.target.files[0];

      if (i.type.includes("image")) {
        const url = URL.createObjectURL(i);
        setEvent({ ...event, image: i.name, file: i });
        setImage(url);
        setMode(true);
      } else {
        Swal.fire({
          icon: "info",
          title: "Imagen del Evento",
          text: "El archivo seleccionado no es de tipo imagen",
          showConfirmButton: true,
        });
      }
    }
  };

  const next = () => {
    setStep(step + 1);
  };

  const back = () => {
    setStep(step - 1);
  };

  const clearImage = () => {
    setEvent({ ...event, image: "", file: "" });
    setMode(false);
    setImage(null);
  };

  const close = () => {
    if (mode) {
      Swal.fire({
        title: "¿ Descartar evento ?",
        text: "Si continuas, no se guardán los cambios",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Descartar",
      }).then((result) => {
        if (result.isConfirmed) {
          setImage(null);
          setEvent({
            name: "",
            startDate: "",
            endDate: "",
            country: "",
            city: "",
            campus: "",
            summary: "",
            image: "",
          });
          setError({
            name: null,
            startDate: null,
            endDate: null,
            country: null,
            city: null,
            campus: null,
          });
          setStep(0);
          setOpenEvent(false);
          setMode(false);
        }
      });
    } else {
      setOpenEvent(false);
    }
  };

  return (
    <Modal
      id={"createEvent"}
      isOpen={openEvent}
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader
        toggle={(e) => {
          close(e);
        }}
      >
        {Object.entries(record).length === 0 ? "Crear Evento" : "Editar Evento"}
      </ModalHeader>
      <ModalBody>
        {step == 0 ? (
          <div
            className="img-event-container"
            style={{
              backgroundImage: `url(${image})`,
              height: "50vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="img-container">
              {event.image != "" && (
                <div className="img-clear">
                  <Button
                    className="btn btn-danger btn-circle bi bi-trash"
                    onClick={(e) => {
                      clearImage(e);
                    }}
                    style={{
                      border: "none",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                    title="Aceptar"
                  />
                </div>
              )}

              {event.image == "" && (
                <>
                  <div className="img-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      fill="#e2e5ec"
                      className="bi bi-image"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <h6 className="pt-4" style={{ fontWeight: 600 }}>
                      Imagen del Evento
                    </h6>
                  </div>
                  <div className="img-button">
                    <div
                      className="file-input-wrapper"
                      style={{ height: "60px" }}
                    >
                      <button className="success" title="Añadir foto al Evento">
                        Añadir foto al Evento
                      </button>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        value=""
                        onChange={(e) => handleAddPhoto(e)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <Form>
            <Col md={12}>
              <FormGroup>
                <Label>Nombre del Evento</Label>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={"Nombre del Evento"}
                    invalid={error.name}
                    onChange={handleChange("name")}
                    autoComplete="off"
                    value={event.name}
                    onKeyPress={(event) => {
                      if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>
                    Por favor, teclee el nombre del evento
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
            </Col>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="startDate">Fecha Inicial</Label>
                  <InputGroup size="sm">
                    <Input
                      id="startDate"
                      name="startDate"
                      invalid={error.startDate}
                      placeholder="Fecha Inicial"
                      type="date"
                      value={event.startDate}
                      onChange={handleChange("startDate")}
                    />
                    <FormFeedback>
                      Por favor, teclee la fecha de inicio
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="endDate">Fecha Final</Label>
                  <InputGroup size="sm">
                    <Input
                      id="endDate"
                      name="endDate"
                      invalid={error.endDate}
                      placeholder="Fecha Final"
                      value={event.endDate}
                      type="date"
                      onChange={handleChange("endDate")}
                    />
                    <FormFeedback>
                      Por favor, teclee la fecha final
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="country" size="sm" sm={4}>
                    País
                  </Label>
                  <InputGroup size="sm">
                    <CountryComboBox
                      name={"country"}
                      cmbText="Seleccione país..."
                      invalid={error.country}
                      value={event.country}
                      valueDefault={event.country}
                      onChange={handleChange("country")}
                    />
                    <FormFeedback>Por favor, seleccione el país</FormFeedback>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="city" size="sm" sm={4}>
                    Ciudad
                  </Label>
                  <InputGroup size="sm">
                    <CityComboBox
                      session={session}
                      country_id={event.country}
                      name="city"
                      cmbText="Seleccione ciudad..."
                      value={event.city}
                      invalid={error.city}
                      valueDefault={event.city}
                      onChange={handleChange("city")}
                    />
                    <FormFeedback>Por favor, seleccione la ciudad</FormFeedback>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Col md={12}>
              <FormGroup>
                <Label>Sede del Evento</Label>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="campus"
                    id="campus"
                    placeholder={"Sede del Evento"}
                    onChange={handleChange("campus")}
                    autoComplete="off"
                    invalid={error.campus}
                    value={event.campus}
                    onKeyPress={(event) => {
                      if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>
                    Por favor, teclee la sede del evento
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
            </Col>

            <Col md={12}>
              <FormGroup>
                <Label>Resumen</Label>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="summary"
                    id="summary"
                    placeholder={"Resumen"}
                    onChange={handleChange("summary")}
                    autoComplete="off"
                    value={event.summary}
                    onKeyPress={(event) => {
                      if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>
                    Por favor, teclee el resumen del evento
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
            </Col>
          </Form>
        )}
      </ModalBody>
      <ModalFooter
        className={
          step == 0 ? "modal-footer" : "modal-footer justify-content-between"
        }
      >
        {step == 1 && (
          <Button
            className="btn-circle bi bi-arrow-left mr-auto"
            style={{
              backgroundColor: "#0095f6",
              border: "none",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
            }}
            disabled={event.image == "" ? true : false}
            title="Anterior"
            onClick={back}
          />
        )}

        {step == 1 && (
          <Button
            className="bi-check2-circle"
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
            // disabled={event.image != "" ? false : true}
            title="Aceptar"
          >
            Aceptar
          </Button>
        )}

        {step == 0 && (
          <Button
            className="btn-circle bi bi-arrow-right"
            style={{
              backgroundColor: "#0095f6",
              border: "none",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
            }}
            disabled={event.image == "" ? true : false}
            title="Siguiente"
            onClick={next}
          />
        )}
      </ModalFooter>
    </Modal>
  );
}
