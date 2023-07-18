import { useState } from "react";
import Image from "next/image";
import {useAppContext} from "../../AppContext";
import CountryComboBox from "../../components/Country/CountryComboBox";
import CityComboBox from "../City/CityComboBox";
import Level from "../Level/Level";

import {
  Form,
  Row,
  FormGroup,
  Label,
  Col,
  InputGroup,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

import Swal from "sweetalert2";

export default function Edit({
  record,
  setRecord,
  handleUpload,
  createObjectURL,
  setCreateObjectURL,
  setImage,
}) {
  const {profile} = useAppContext();

  const [validate, setValidate] = useState({
    alias: "",
    birthdate: "",
    city_id: "",
    email: "",
    first_name: "",
    job: "",
    last_name: "",
    phone: "",
    sex: "",
    username: "",
  });

  const [state, setState] = useState(true);

  const playerLevel = [
    {
        name: "rookie",
        description: "Novato"
    },
    {
        name: "professional",
        description: "Profesional"
    },
    {
        name: "expert",
        description: "Experto"
    }
  ];

  const refereeLevel = [
    {
        name: "regional",
        description: "Regional"
    },
    {
      name: "national",
      description: "Nacional"
    },
    {
        name: "international",
        description: "Internacional"
    }
  ];


  const handleChange = (prop) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setValidate({
      ...validate,
      [prop]: event.target.value != "" ? "success" : "error",
    });

    setRecord({ ...record, [prop]: value });
  };

  return (
    <Form onSubmit={handleUpload} encType="multipart/form-data">
      <Row>
        <Col md={3}>
          <Row>
            <FormGroup row>
              <Col sm={12}>
                {record.photo && (
                  <Image
                    src={createObjectURL ? createObjectURL : record.photo}
                    alt="Pérfil"
                    width="100%"
                    height="100%"
                  />
                )}
                <div style={{ paddingLeft: "15px" }}>
                  <p>
                    <strong>Foto de Pérfil</strong>
                  </p>
                  <Label
                    href="#"
                    className="btn btn-primary btn-sm"
                    title="Cargar nueva foto de pérfil"
                    style={{ color: "white" }}
                  >
                    <i className="bi bi-upload"></i>
                    <Input
                      type="file"
                      hidden
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          const i = event.target.files[0];
                          if (i.type.includes("image/jpeg")) {
                            setImage(i);
                            setCreateObjectURL(URL.createObjectURL(i));
                            record.file = i;
                            setRecord(record);
                          } else {
                            Swal.fire({
                              icon: "error",
                              title: "Cargando Imagen",
                              text: "Ha ocurrido un error al cargar la imagen",
                              showConfirmButton: true,
                            });
                          }
                        }
                      }}
                    />
                  </Label>

                  <Label
                    href="#"
                    className="btn btn-danger btn-sm"
                    title="Eliminar mí foto de perfil"
                    style={{ color: "white" }}
                    onClick={(e) => {

                      Swal.fire({
                        title: "¿ Desea eliminar esta foto de pérfil ?",
                        text: "! Esta opción no podrá ser revertida !",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Sí",
                        cancelButtonText: "No",
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        reverseButtons: true,
                        allowOutsideClick: false,
                      }).then((result) => {
                        if (result.isConfirmed) {

                          setRecord({ ...record, photo: null, file: null });
                          setImage(null);
                          setCreateObjectURL(null);    

                        }
                      });                      

                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Label>
                </div>
              </Col>
            </FormGroup>
          </Row>
        </Col>
        {record.profile_type_name === "USER" ? (
          <Col md={9}>
            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Nombre
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="Nombre"
                      invalid={validate.first_name === "error"}
                      value={record.first_name}
                      onChange={handleChange("first_name")}
                      onKeyDown={(event) => {
                        if (!/^[a-zA-Z.\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormFeedback>Por favor, teclee su nombre.</FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Apellido
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder="Nombre"
                      value={record.last_name}
                      onChange={handleChange("last_name")}
                      onKeyDown={(event) => {
                        if (!/^[a-zA-Z.-\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Alias
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      type="text"
                      name="alias"
                      id="alias"
                      placeholder="Alias"
                      value={record.alias}
                      onChange={handleChange("alias")}
                      onKeyDown={(event) => {
                        if (!/^[a-zA-Z_0-9-.\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Ocupación
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      type="text"
                      name="job"
                      id="job"
                      placeholder="Ocupación"
                      value={record.job}
                      onChange={handleChange("job")}
                      onKeyDown={(event) => {
                        if (!/^[a-zA-Z.-\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Correo
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Correo"
                      value={record.email}
                      onChange={handleChange("email")}
                      onKeyDown={(event) => {
                        if (!/^[a-z_@\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Teléfono
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Teléfono"
                      value={record.phone}
                      onChange={handleChange("phone")}
                      onKeyDown={(event) => {
                        if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Sexo
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      type="select"
                      name="sex"
                      id="sex"
                      placeholder="Sexo"
                      defaultValue={record.sex}
                      onChange={handleChange("sex")}
                    >
                      <option value="M">Mascúlino</option>
                      <option value="F">Femenio</option>
                    </Input>
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Fecha de Nacimiento
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <Input
                      id="birthdate"
                      name="birthdate"
                      placeholder="Fecha de Nacimiento"
                      type="date"
                      defaultValue={record.birthdate}
                      onChange={handleChange("birthdate")}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  País
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <CountryComboBox
                      name={"country_id"}
                      cmbText="Seleccione..."
                      valueDefault={record.country_id}
                      onChange={handleChange("country_id")}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup row>
                <Label size="sm" sm={4}>
                  Ciudad
                </Label>
                <Col sm={8}>
                  <InputGroup size="sm">
                    <CityComboBox
                      country_id={record.country_id}
                      name="city"
                      cmbText="Seleccione..."
                      valueDefault={record.city_id}
                      onChange={handleChange("city_id")}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <Col sm={4}></Col>
              <Col sm={8}>
                <FormGroup switch>
                  <Input
                    id="receive_notifications"
                    name="receive_notifications"
                    type="switch"
                    checked={record.receive_notifications}
                    onChange={handleChange("receive_notifications")}
                  />
                  <Label check>
                    {profile.receive_notifications
                      ? "Recibir Notificaciones"
                      : "No Recibe Notificaciones"}
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        ) : (
            <Col md={9}>
              <Row>
                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Nombre
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nombre"
                        invalid={validate.name === "error"}
                        value={record.name}
                        onChange={handleChange("name")}
                        onKeyDown={(event) => {
                          if (!/^[a-zA-Z.0-9_-\s]*$/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <FormFeedback>Por favor, teclee su nombre.</FormFeedback>
                    </InputGroup>
                  </Col>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Correo
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo"
                        value={record.email}
                        onChange={handleChange("email")}
                        onKeyDown={(event) => {
                          if (!/^[a-z_@\s0-9]*$/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup row>
                  <Label size="sm" sm={2}>
                      Nivel
                    </Label>
                    <Col sm={10}>
                      <InputGroup size="sm">
                        <Level 
                          name={"level"} 
                          cmbText={"Seleccione su Nivel..."} 
                          valueDefault={record.level}
                          records={record.profile_type_name != "REFEREE" ? playerLevel : refereeLevel}
                          onChange={handleChange("level")}
                        />
                      </InputGroup>
                    </Col>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup row>
                  <Label size="sm" sm={2}>
                    País
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <CountryComboBox
                        name={"country_id"}
                        cmbText="Seleccione..."
                        valueDefault={record.country_id}
                        onChange={handleChange("country_id")}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Ciudad
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <CityComboBox
                        country_id={record.country_id}
                        name="city"
                        cmbText="Seleccione..."
                        valueDefault={record.city_id}
                        onChange={handleChange("city_id")}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>
              </Row>

              <Row>
                <Col sm={2}></Col>
                <Col sm={10}>
                  <FormGroup switch>
                    <Input
                      id="receive_notifications"
                      name="receive_notifications"
                      type="switch"
                      checked={record.receive_notifications}
                      onChange={handleChange("receive_notifications")}
                    />
                    <Label check>
                      {profile.receive_notifications
                        ? "Recibir Notificaciones"
                        : "No Recibe Notificaciones"}
                    </Label>
                  </FormGroup>
                </Col>
              </Row>

            </Col>
          )
        }
      </Row>

      <div className="text-center pt-4">
        <Button
          type="submit"
          color="primary"
          data-toggle="tooltip"
          title="Guardar Cambios"
        >
          <i className="bi bi-check2-circle"></i> Guardar Cambios
        </Button>
      </div>
    </Form>
  );
}
