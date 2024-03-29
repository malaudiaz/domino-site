import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {useAppContext} from "../../AppContext";
import EventImage from "./EventImage";

import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";

import EventData from "./EventData";

export default function NewEvent({
  openEvent,
  setOpenEvent,
  record,
  setRefresh,
}) {
  const {profile, lang, token} = useAppContext();
  const [reload, setReload] = useState(false);
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
    tourney: [],
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
        tourney: record.tourney,
      });
      setImage(record.photo);
    } else {
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
        tourney: [],
      });
      setImage(null);
    }
    setError({
      ...error,
      name: null,
      startDate: null,
      endDate: null,
      country: null,
      city: null,
      campus: null,
      tourney: null
    });
    setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record, reload]);

  const isValid = () => {
    if (step == 1) {
      setError({
        ...error,
        name: event.name === "",
        startDate: event.startDate === "",
        endDate: event.endDate === "",
        country: event.country === "",
        city: event.city === "",
        campus: event.campus === "",
      });
      return (event.name != "" && event.startDate != "" && event.endDate != "" && event.city != "" && event.campus != "");
    } else if (step == 2) {
      let tourneyValid=false;
      event.tourney.map( (record, i) => (
        tourneyValid = (record.name != "" && record.startDate >= event.startDate && record.startDate <= event.endDate && record.modality != "")
      ));
      return tourneyValid
    }
  };

  const handleChange = (prop) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEvent({ ...event, [prop]: value });
    setMode(true);
    setError({ ...error, [prop]: value === "" });
  };

  const config = {
    headers: {
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const handleCreate = async () => {
    const body = new FormData();
    body.append("image", event.file);

    const url = `${process.env.NEXT_PUBLIC_API_URL}event/${profile.id}?name=${event.name}&summary=${event.summary}&city_id=${event.city}&main_location=${event.campus}&start_date=${event.startDate}&close_date=${event.endDate}`;

    try {
      const { data } = await axios.post(url, body, config);
      if (data.success) {

          setOpenEvent(false);
          setRefresh(true);

          Swal.fire({
            title: "Creando Evento",
            text: data.detail,
            icon: "success",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });

      } else {

        Swal.fire({
          title: "Creando Evento",
          text: data.detail,
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
    const body = new FormData();
    body.append("image", event.file);

    const url = `${process.env.NEXT_PUBLIC_API_URL}event/${event.id}?name=${event.name}&summary=${event.summary}&city_id=${event.city}&main_location=${event.campus}&start_date=${event.startDate}&close_date=${event.endDate}`;

    try {
      const { data } = await axios.put(url, body, config);

      if (data.success) {

        setOpenEvent(false);
        setRefresh(true);

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

      Swal.fire({
        title: "Modificando Evento",
        text: "Error modificando evento",
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });

    }
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
    if (step === 1) {    
      if (isValid()) {
        setStep(step + 1);
      }
    } else {
      setStep(step + 1);
    }
  };

  const back = () => {
    setStep(step - 1);
  };

  const clearImage = () => {
    setEvent({ ...event, image: "", file: "" });
    setImage(null);
    setMode(!mode);
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
          setReload(!reload);
        }
      });
    } else {
      setStep(0);
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
          <EventImage
            event={event}
            image={image}
            handleAddPhoto={handleAddPhoto}
            clearImage={clearImage}
          />
        ) : (
          <EventData
            event={event}
            error={error}
            handleChange={handleChange}
          />
        )}

      </ModalBody>
      <ModalFooter
        className={
          step == 0 ? "modal-footer" : "modal-footer justify-content-between"
        }
      >
        {(step == 1) && (
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
            disabled={event.image != "" ? false : true}
            title="Aceptar"
          >
            Aceptar
          </Button>
        )}

        {(step == 0) && (
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
