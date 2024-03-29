import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../AppContext";

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
  Form,
  Col,
  Label,
} from "reactstrap";

export default function Bombo({ open, setClose, eloMax, tourneyId, setRefresh }) {
  const { token, lang } = useAppContext();

  const [formValues, setFormValues] = useState({
    letter: {
      value: "",
      error: false,
      errorMessage: "Titulo de categoría requerido",
    },
    eloMin: {
      value: "",
      error: false,
      errorMessage: "ELO Mínimo requerido",
    },
    eloMax: {
      value: "",
      error: false,
      errorMessage: "ELO Máximo requerido",
    },
  });

  const close = () => {
    setClose();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toLocaleUpperCase();

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        error: false,
        value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormValues({
      ...formValues,
      letter: {
        ...formValues["letter"],
        error: letter.value === "",
      },
      eloMin: {
        ...formValues["eloMin"],
        error: eloMin.value === "",
      },
      eloMax: {
        ...formValues["eloMax"],
        error: eloMax.value === "",
      },
    });

    if (
      !formValues.letter.error &&
      !formValues.eloMin.error &&
      !formValues.eloMax.error
    ) {

      const paramsObj = {
        category_number: formValues.letter.value, 
        elo_min: formValues.eloMin.value, 
        elo_max: formValues.eloMax.value
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/categories/${tourneyId}`;

      try {
          const { data } = await axios.post(url, paramsObj, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "accept-Language": lang,
              "Authorization": `Bearer ${token}`                },
          });
          if (data.success) {
            setFormValues({
              letter: {
                value: "",
                error: false,
                errorMessage: "Título de categoría, requerido",
              },
              eloMin: {
                value: "",
                error: false,
                errorMessage: "ELO Mínimo requerido",
              },
              eloMax: {
                value: "",
                error: false,
                errorMessage: "ELO Máximo requerido",
              }
            });   

            Swal.fire({
              icon: "success",
              title: "Nueva Categoría",
              text: data.detail,
              showConfirmButton: true,
            });
            setRefresh(true);
            setClose();

          }
        } catch ({ code, message, name, request }) {
          console.log(message);
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Nueva Categoría",
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
                title: "Nueva Categoría",
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
    }
  };

  useEffect(() => {
    setFormValues({
        letter: {
          ...formValues["letter"],
          error: false,
          value: ""
        },
        eloMin: {
            ...formValues["eloMin"],
            error: false,
            value: ""
        },
        eloMax: {
            ...formValues["eloMax"],
            error: false,
            value: eloMax
        },
    });  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[eloMax]);

  return (
    <Modal
      isOpen={open}
      backdrop={"static"}
      keyboard={true}
      centered={true}
      size="sm"
    >
      <ModalHeader
        toggle={(e) => {
          close(e);
        }}
      >
        Crear Categoría
      </ModalHeader>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <ModalBody>
          <FormGroup row>
            <Label size="sm" sm={5}>
              Título
            </Label>
            <Col sm={7}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="letter"
                  id="letter"
                  onChange={handleChange}
                  invalid={formValues.letter.error}
                  value={formValues.letter.value}
                  autoComplete="off"
                />
                <FormFeedback>{formValues.letter.errorMessage}</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label size="sm" sm={5}>
              ELO Máximo
            </Label>
            <Col sm={7}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="eloMax"
                  id="eloMax"
                  onChange={handleChange}
                  autoComplete="off"
                  invalid={formValues.eloMax.error}
                  value={formValues.eloMax.value}
                  disabled={eloMax !== ""}
                  onKeyPress={(event) => {
                    if (!/^[0-9.]*$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{formValues.eloMax.errorMessage}</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label size="sm" sm={5}>
              ELO Mínimo
            </Label>
            <Col sm={7}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="eloMin"
                  id="eloMin"
                  onChange={handleChange}
                  invalid={formValues.eloMin.error}
                  value={formValues.eloMin.value}
                  autoComplete="off"
                  onKeyPress={(event) => {
                    if (!/^[0-9.]*$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{formValues.eloMin.errorMessage}</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
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
            type="submit"
            title="Aceptar"
            disabled={parseFloat(formValues.eloMin.value) >= parseFloat(formValues.eloMax.value)}
          >
            <i className="bi-check2-circle" /> Aceptar
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
            <i className="bi bi-x-circle" /> Cancelar
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
