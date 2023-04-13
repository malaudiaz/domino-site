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
  InputGroupText,
  Row,
  Col,
  Label,
  ModalFooter,
} from "reactstrap";

import CountryComboBox from "../Country/CountryComboBox";
import CityComboBox from "../City/CityComboBox";

export default function NewEvent({ session, openEvent, setOpenEvent }) {
  const value = useContext(AppContext);
  const avatar = value.state.avatar;
  const [event, setEvent] = useState({
    name: "",
    startDate: "",
    endDate: "",
    country: "",
    city: "",
    campus: "",
    summary: "",
  });
  const [step, setStep] = useState(0);
  const [image, setImage] = useState(null); //"/images/jugando-domino.jpg"

  const handleChange = (prop) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setEvent({ ...event, [prop]: value });
  };

  const handleSubmit = () => {};

  const handleAddPhoto = () => {
    setImage("/images/jugando-domino.jpg");
  };

  const next = () => {
    setStep(step+1);
  }

  const back = () => {
    setStep(step-1);
  }

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
          setImage(null);
          setStep(0);
          setOpenEvent(false);
        }}
      >
        Crear Evento
      </ModalHeader>
      <ModalBody>
        {step == 0 ? (
          <div
            className="img-event-container"
            style={{
              backgroundImage: `url(${image})`,
              height: "60vh",
              width: "80vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {!image && (
              <div className="img-container">
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
                  <button
                    onClick={handleAddPhoto}
                    className="success"
                    title="Añadir foto al Evento"
                  >
                    Añadir foto al Evento
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Col md={12}>
              <FormGroup>
                <Label>Nombre del Evento</Label>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={"Nombre del Evento"}
                    onChange={handleChange("name")}
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
                      placeholder="Fecha Inicial"
                      type="date"
                      onChange={handleChange("startDate")}
                    />
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
                      placeholder="Fecha Final"
                      type="date"
                      onChange={handleChange("endDate")}
                    />
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
                      valueDefault={event.country}
                      onChange={handleChange("country")}
                    />
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
                      valueDefault={event.city}
                      onChange={handleChange("city")}
                    />
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
      <ModalFooter className={step == 0 ? "modal-footer" : "modal-footer justify-content-between"}>
          {step == 1 && <Button
            className="btn-circle bi bi-arrow-left mr-auto"
            style={{ backgroundColor: "#0095f6", border: "none", color: "white", fontSize: "14px", fontWeight: "700" }}
            disabled={!image ? true : false}
            title="Anterior"
            onClick={back}
          />}

          {step == 1 && <Button
            className="bi-check2-circle"
            style={{ backgroundColor: "#0095f6", border: "none", color: "white", fontSize: "14px", fontWeight: "700" }}
            disabled={!image ? true : false}
            title="Aceptar"
            onClick={back}
          >Aceptar</Button>}

          {step == 0 && <Button
            className="btn-circle bi bi-arrow-right"
            style={{ backgroundColor: "#0095f6", border: "none", color: "white", fontSize: "14px", fontWeight: "700" }}
            disabled={!image ? true : false}
            title="Siguiente"
            onClick={next}
          />}
      </ModalFooter>
    </Modal>
  );
}
