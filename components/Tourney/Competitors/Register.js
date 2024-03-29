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
import { useEffect, useState } from "react";
import { useAppContext } from "../../../AppContext";
import Level from "../../Level/Level";
import axios from "axios";
import Swal from "sweetalert2";
import FederationComboBox from "../../FederationComboBox/FederationComboBox";
import ClubComboBox from "../../ClubComboBox/ClubComboBox";


export default function Register({ tourney, open, close, playerId }) {
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
    },
    federation_id: {
      value: "",
      error: false,
      errorMessage: "La federación del usuario es requerida"
    },
    club_id: {
      value: "",
      error: false,
      errorMessage: "El club del usuario es requerido"
    }
  });

  const playerLevel = [
    {
        name: "rookie",
        description: "UNO"
    },
    {
        name: "professional",
        description: "DOS"
    },
    {
        name: "expert",
        description: "TRES"
    }
  ];

  const handleChange = (e) => {
    const name = e.target.name;

    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

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
  
  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}player/register/${playerId}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {

        setFormValues({
          ...formValues,
          username: {
            ...formValues["username"],
            value: data.data.username,
          },
          first_name: {
            ...formValues["first_name"],
            value: data.data.first_name,
          },
          last_name: {
            ...formValues["last_name"],
            value: data.data.last_name,
          },
          alias: {
            ...formValues["alias"],
            value: data.data.alias,
          },
          phone: {
            ...formValues["phone"],
            value: data.data.phone,
          },
          email: {
            ...formValues["email"],
            value: data.data.email,
          },
          level: {
            ...formValues["level"],
            value: data.data.level,
          },
          elo: {
            ...formValues["elo"],
            value: data.data.elo,
          },
          country: {
            ...formValues["country"],
            value: data.data.country_id,
          },
          city: {
            ...formValues["city"],
            value: data.data.city_id,
          },
          federation_id: {
            ...formValues["federation_id"],
            value: data.data.federation_id,
          },
          club_id: {
            ...formValues["club_id"],
            value: data.data.club_id,
          }

        });
      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Jugador",
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
            title: "Cargando Jugador",
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

  useEffect(()=>{
    if (playerId) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[playerId])

  const validateFields = () => {
    let valid = true;
    for (var key in formValues) {
      if (formValues[key].value === "") {
        formValues[key].error = true;
        valid = false;
      }
    }
    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateFields();

    if (isValid) {

      let url = `${process.env.NEXT_PUBLIC_API_URL}player/register/${tourney.id}`;

      if (playerId) {
        url = `${process.env.NEXT_PUBLIC_API_URL}player/register/${playerId}`;
      }

      const body = {
        "username": formValues.username.value,
        "first_name": formValues.first_name.value,
        "last_name": formValues.last_name.value,
        "alias": formValues.alias.value,
        "email": formValues.email.value,
        "phone": formValues.phone.value,
        "federation_id": formValues.federation_id.value,
        "club_id": formValues.club_id.value,
        "city_id": formValues.city.value,
        "country_id": formValues.country.value,
        "elo": formValues.elo.value,
        "level": formValues.level.value
      };  

      try {
        const { data } = await axios[playerId ? "put" : "post"](url, body, config);
        if (data.success) {
          setFormValues({
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
            },
            federation_id: {
              value: "",
              error: false,
              errorMessage: "La federación del usuario es requerida"
            },
            club_id: {
              value: "",
              error: false,
              errorMessage: "El club del usuario es requerido"
            }
          })
          close();
        }
      } catch ({code, message, name, request}) {
        if (code === "ERR_NETWORK") {
          Swal.fire({
            title: playerId==="" ? "Registrando Jugador" : "Actualizando Jugador",
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
              title: playerId==="" ? "Registrando Jugador" : "Actualizando Jugador",
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

    } else {
      Swal.fire({
        title: playerId==="" ? "Registrando Jugador" : "Actualizando Jugador",
        text: "Complete los campos obligatorios",
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
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
        <small>{(playerId==="" || !playerId) ? "Registro de Jugador" : "Editar Jugador"}</small>
      </ModalHeader>
      <ModalBody>
        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Nombre de usuario:
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
            Nombre:
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
            Apellidos:
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
            Alias:
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
            Email:
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
            Teléfono:
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
            Nivel:
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <Level 
                name={"level"} 
                cmbText={"Seleccione Nivel..."} 
                valueDefault={formValues.level.value}
                records={playerLevel}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            ELO:
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
            Federación:
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <FederationComboBox 
                  name="federation_id"
                  placeholder={"Federación"}
                  invalid={formValues.federation_id.error}
                  value={formValues.federation_id.value}
                  onChange={handleChange}
                  cmbText="Seleccione la Federación"
                  valueDefault={formValues.federation_id.value}
              />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            Club:
          </Label>
          <Col sm={8}>
            <InputGroup size="sm">
              <ClubComboBox 
                  name="club_id"
                  placeholder={"Club"}
                  invalid={formValues.club_id.error}
                  value={formValues.club_id.value}
                  onChange={handleChange}
                  cmbText="Seleccione el Club"
                  valueDefault={formValues.club_id.value}
                  federation_id={formValues.federation_id.value}
              />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={4}>
            País:
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
            Ciudad:
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
          title={playerId==="" ? "Registrar Jugador" : "Actualizar Jugador"}
          onClick={(e)=>{handleSubmit(e)}}
        >
          <i className="bi bi-person-check"></i>&nbsp;
          {(playerId==="" || !playerId) ? "Registrar" : "Actualizar"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
