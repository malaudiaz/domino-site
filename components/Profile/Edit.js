// import { useState, useEffect } from "react";
import Image from "next/image";
import CountryComboBox from "../../components/Country/CountryComboBox";
import CityComboBox from "../City/CityComboBox";

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

export default function Edit({ session, profile, setProfile, handleChange, handleUpload, createObjectURL, setCreateObjectURL, setImage }) {
  return (
    <Form onSubmit={handleUpload} encType="multipart/form-data">
      <Row>
        <Col md={3}>
          <Row>
            <FormGroup row>
              <Col sm={12}>
                {profile.photo && (
                  <Image
                    src={createObjectURL ? createObjectURL : profile.photo}
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
                          if (i.type.includes("image/jpeg") && i.size <= 6000) {
                            setImage(i);
                            setCreateObjectURL(URL.createObjectURL(i));
                          } else {
                            Swal.fire({
                              icon: "error",
                              title: "Cargando Imagen",
                              text: "Ha ocurrido un error al cargar la imagen, debe ser un jpg menor de 6 kb",
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
                      setProfile({ ...profile, photo: "/user-vector.jpg" });
                      sessionStorage.setItem('avatar', "/user-vector.jpg");
                      setImage(null);
                      setCreateObjectURL(null);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Label>
                </div>
              </Col>
            </FormGroup>
          </Row>
        </Col>
        <Col md={9}>
          <Row>
            <FormGroup row>
              <Label for="first_name" size="sm" sm={4}>
                Nombre
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Nombre"
                    value={profile.first_name}
                    onChange={handleChange("first_name")}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z.\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>Teclee su nombre.</FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup row>
              <Label for="last_name" size="sm" sm={4}>
                Apellido
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Nombre"
                    value={profile.last_name}
                    onChange={handleChange("last_name")}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z.-\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>Teclee su apellido.</FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup row>
              <Label for="alias" size="sm" sm={4}>
                Alias
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="alias"
                    id="alias"
                    placeholder="Alias"
                    value={profile.alias}
                    onChange={handleChange("alias")}
                    onKeyPress={(event) => {
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
              <Label for="job" size="sm" sm={4}>
                Ocupación
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="job"
                    id="job"
                    placeholder="Ocupación"
                    value={profile.job}
                    onChange={handleChange("job")}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z.-\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>Teclee sus ocupación.</FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup row>
              <Label for="email" size="sm" sm={4}>
                Correo
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Correo"
                    value={profile.email}
                    onChange={handleChange("email")}
                    onKeyPress={(event) => {
                      if (!/^[a-z_@\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>Teclee sus correo.</FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup row>
              <Label for="phone" size="sm" sm={4}>
                Teléfono
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Teléfono"
                    value={profile.phone}
                    onChange={handleChange("phone")}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <FormFeedback>Teclee su teléfono.</FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup row>
              <Label for="sex" size="sm" sm={4}>
                Sexo
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    type="select"
                    name="sex"
                    id="sex"
                    placeholder="Sexo"
                    defaultValue={profile.sex}
                    onChange={handleChange("sex")}
                  >
                    <option value="M">Mascúlino</option>
                    <option value="F">Femenio</option>
                  </Input>
                  <FormFeedback>Seleccione su Sexo.</FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup row>
              <Label for="birthdate" size="sm" sm={4}>
                Fecha de Nacimiento
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <Input
                    id="birthdate"
                    name="birthdate"
                    placeholder="Fecha de Nacimiento"
                    type="date"
                    defaultValue={profile.birthdate}
                    onChange={handleChange("birthdate")}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup row>
              <Label for="country_id" size="sm" sm={4}>
                País
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <CountryComboBox
                    name={"country_id"}
                    cmbText="Seleccione..."
                    valueDefault={profile.country_id}
                    onChange={handleChange("country_id")}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup row>
              <Label for="city_id" size="sm" sm={4}>
                Ciudad
              </Label>
              <Col sm={8}>
                <InputGroup size="sm">
                  <CityComboBox
                    session={session}
                    country_id={profile.country_id}
                    name="city"
                    cmbText="Seleccione..."
                    valueDefault={profile.city_id}
                    onChange={handleChange("city_id")}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>
        </Col>
      </Row>

      <div className="text-center">
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
