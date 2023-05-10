import { useState, useEffect } from "react";
import {
  FormGroup,
  InputGroup,
  Input,
  FormFeedback,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";

import Swal from "sweetalert2";

export default function Tourney({ session, records, startDate, endDate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const [tourney, setTourney] = useState({
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
    if (Object.entries(records).length != 0) {
      setTourney(records[activeIndex]);
    } else {
      setTourney({
        name: "",
        modality: "",
        startDate: "",
        summary: "",
      });
      setAdd(true);
    }
  }, [records, activeIndex]);

  const handleChange = (prop) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setTourney({ ...tourney, [prop]: value });
    setEdit(true);
    if (prop != "startDate") {
      setError({ ...error, [prop]: value === "" });
    } else {
      setError({ ...error, [prop]: !(value >= startDate && value <= endDate) });
    }
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === records.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
    setTourney(records[nextIndex]);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? records.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
    setTourney(records[nextIndex]);
  };

  const addTorney = () => {
    setTourney({
      name: "",
      modality: "",
      startDate: "",
      summary: "",
    });
    setAdd(true);
  };

  const cancel = () => {
    if (Object.entries(records).length != 0) {
      setTourney(records[activeIndex]);
    } else {
      setTourney({
        name: "",
        modality: "",
        startDate: "",
        summary: "",
      });  
    }
    setEdit(false);
    setAdd(false);
  };

  const save = () => {
    if (add) {
      setError({
        ...error,
        name: tourney.name === "",
        modality: tourney.modality === "",
        startDate: tourney.startDate === "",
      });

      if (
        tourney.name != "" &&
        tourney.modality != "" &&
        tourney.startDate >= startDate &&
        tourney.startDate <= endDate
      ) {
        records.push(tourney);
        setAdd(false);
        setEdit(false);
      }
    } else {
      records[activeIndex].name = tourney.name;
      records[activeIndex].startDate = tourney.startDate;
      records[activeIndex].modality = tourney.modality;
      records[activeIndex].summary = tourney.summary;
      setAdd(false);
      setEdit(false);
    }
  };

  const remove = () => {
    Swal.fire({
      title: "¿ Eliminar Torneo ?",
      text: "Si continuas, el torneo será eliminado",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (records.length >= 0) {
          records.splice(activeIndex, 1);
          const nextIndex =
            activeIndex === 0 ? records.length - 1 : activeIndex - 1;
          setActiveIndex(nextIndex);
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between p-2">
          <h6 style={{ paddingTop: "3px" }}>Torneos del Evento</h6>
          <div className="d-flex flex-row" style={{ gap: "5px" }}>
            <Button
              className="btn btn-success btn-circle bi bi-plus"
              disabled={edit}
              style={{
                border: "none",
                color: "white",
                fontSize: "13px",
                fontWeight: "700",
              }}
              onClick={addTorney}
              title="Nuevo Torneo"
            />
            <Button
              className="btn-circle bi bi-trash btn btn-danger"
              disabled={edit}
              style={{
                border: "none",
                color: "white",
                fontSize: "13px",
                fontWeight: "700",
              }}
              onClick={remove}
              title="Eliminar Torneo Actual"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-1"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            className="btn-circle bi bi-chevron-compact-left"
            disabled={add || edit}
            style={{
              backgroundColor: "#adc7ca",
              border: "none",
              color: "white",
              fontSize: "13px",
              fontWeight: "700",
            }}
            onClick={previous}
            title="Anterior"
          />
        </div>
        <div className="col-10 px-4">
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
                <Label for="startDate">Fecha</Label>
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
            {(add || edit) && (
              <Row className="d-flex flex-row">
                <Col md={6} style={{ textAlign: "center" }}>
                  <Button
                    className="bi bi-escape btn-primary"
                    onClick={cancel}
                    style={{
                      border: "none",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    title="Cancelar"
                  >
                    {" "}
                    Cancelar
                  </Button>
                </Col>
                <Col md={6} style={{ textAlign: "center" }}>
                  <Button
                    className="bi bi-check2-circle btn-success"
                    onClick={save}
                    style={{
                      border: "none",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    title="Guardar"
                  >
                    {" "}
                    Guardar
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </div>
        <div
          className="col-1"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            className="btn-circle bi bi-chevron-compact-right"
            disabled={add || edit}
            style={{
              backgroundColor: "#adc7ca",
              border: "none",
              color: "white",
              fontSize: "13px",
              fontWeight: "800",
            }}
            onClick={next}
            title="Siguiente"
          />
        </div>
      </div>
    </div>
  );
}
