import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  InputGroup,
  Input,
  FormGroup,
  Col,
  FormFeedback,
  ModalFooter,
  Button,
} from "reactstrap";

import CountryComboBox from "../../Country/CountryComboBox";
import CityComboBox from "../../City/CityComboBox";
import { useState } from "react";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";


export default function Register({ tourney, open, close }) {
  const { token, lang } = useAppContext();

  const toggle = () => {
    close();
  };

  const [formValues, setFormValues] = useState({
    username: {
      value: "",
      error: false,
      errorMessage: "El nombre de usuario es requerido"
    },
    first_name: {
      value: "",
      error: false,
      errorMessage: "El nombre es requerido"
    },
    last_name: {
      value: "",
      error: false,
      errorMessage: "El apellido es requerido"
    },
    alias: {
      value: "",
      error: false,
      errorMessage: "El alias es requerido"
    },
    email: {
      value: "",
      error: false,
      errorMessage: "El correo es requerido"
    },
    phone: {
      value: "",
      error: false,
      errorMessage: "El teléfono es requerido"
    },
    level: {
      value: "",
      error: false,
      errorMessage: "El nivel del usuario es requerido"
    },
    elo: {
      value: "",
      error: false,
      errorMessage: "El ELO del usuario es requerido"
    },
    country: {
      value: "",
      error: false,
      errorMessage: "El país del usuario es requerido"
    },
    city: {
      value: "",
      error: false,
      errorMessage: "La ciudad del usuario es requerida"
    }
  });

  const handleChange = (e) => {
    const name = e.target.name;

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value: value,
      },
    });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}player/register/${tourney.id}`;

    const body = {
      "username": formValues.username.value,
      "first_name": formValues.first_name.value,
      "last_name": formValues.last_name.value,
      "alias": formValues.alias.value,
      "email": formValues.email.value,
      "phone": formValues.phone.value,
      "city_id": formValues.city.value,
      "country_id": formValues.country.value,
      "elo": formValues.elo.value,
      "level": formValues.level.value
    };  

    try {
      const { data } = await axios.post(url, body, config);
      if (data.success) {

      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Registrando Jugadores",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const {detail} = JSON.parse(request.response)
          Swal.fire({
            title: "Registrando Jugadores",
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


  return (
    <Modal
      id="register"
      isOpen={open}
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader toggle={toggle}>
        <small>Registro de Jugador</small>
      </ModalHeader>
      <ModalBody>
        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Nombre de usuario
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="username"
                id="username"
                placeholder={"Nombre de Usuario"}
                invalid={formValues.username.error}
                value={formValues.username.value}
                onChange={handleChange}
                autoComplete="off"
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{formValues.username.errorMessage}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Nombre
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder={"Nombre"}
                invalid={formValues.first_name.error}
                value={formValues.first_name.value}
                onChange={handleChange}
                autoComplete="off"
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{formValues.first_name.errorMessage}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Apellidos
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder={"Apellidos"}
                invalid={formValues.last_name.error}
                value={formValues.last_name.value}
                onChange={handleChange}
                autoComplete="off"
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{formValues.last_name.errorMessage}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Alias
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="alias"
                id="alias"
                placeholder={"Alias"}
                invalid={formValues.alias.error}
                value={formValues.alias.value}
                onChange={handleChange}
                autoComplete="off"
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{formValues.alias.errorMessage}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Email
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="email"
                id="email"
                placeholder={"Correo"}
                invalid={formValues.email.error}
                value={formValues.email.value}
                onChange={handleChange}
                autoComplete="off"
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ@\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{formValues.email.errorMessage}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Telefono
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder={"Telefono"}
                invalid={formValues.phone.error}
                value={formValues.phone.value}
                onChange={handleChange}
                autoComplete="off"
                onKeyPress={(event) => {
                  if (!/^[0-9\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{formValues.phone.errorMessage}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Nivel
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
                <Input
                    type="text"
                    name="level"
                    id="level"
                    placeholder={"Nivel"}
                    invalid={formValues.level.error}
                    value={formValues.level.value}
                    onChange={handleChange}
                    autoComplete="off"
                    onKeyPress={(event) => {
                    if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                        event.preventDefault();
                    }
                    }}
                />
                <FormFeedback>{formValues.level.errorMessage}</FormFeedback>
            </InputGroup>

          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            ELO
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
                <Input
                    type="text"
                    name="elo"
                    id="elo"
                    placeholder={"ELO"}
                    invalid={formValues.elo.error}
                    value={formValues.elo.value}
                    onChange={handleChange}
                    autoComplete="off"
                    onKeyPress={(event) => {
                    if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                        event.preventDefault();
                    }
                    }}
                />
                <FormFeedback>{formValues.elo.errorMessage}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            País
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
                <CountryComboBox
                    name="country"
                    id="country"
                    placeholder={"País"}
                    invalid={formValues.country.error}
                    value={formValues.country.value}
                    onChange={handleChange}
                    cmbText="Seleccione el País"
                    valueDefault={formValues.country.value}
                />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Ciudad
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
                <CityComboBox
                    name="city"
                    id="city"
                    placeholder={"Ciudad"}
                    invalid={formValues.city.error}
                    value={formValues.city.value}
                    onChange={handleChange}
                    cmbText="Seleccione la Ciudad"
                    valueDefault={formValues.city.value}
                    country_id={formValues.country.value}
                />
            </InputGroup>
          </Col>
        </FormGroup>

      </ModalBody>
      <ModalFooter className="col-12 justify-content-center text-center">
        <Button
          color="primary"
          size="sm"
          title="Registrar Jugador"
          onClick={(e)=>{handleSubmit(e)}}
        >
          <i class="bi bi-person-check"></i>&nbsp;
          Registrar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
