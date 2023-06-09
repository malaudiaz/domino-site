import { useState } from "react";

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

import axios from "axios";
import Swal from "sweetalert2";

export default function ChangePassword({ session }) {

  const [values, setValues] = useState({
    currentpassword: "",
    newpassword: "",
    renewpassword: "",
    showPassword: false,
  });

  const [validate, setValidate] = useState({
    currentpassword: "",
    newpassword: "",
    renewpassword: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };

  const handleChange = (prop) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setValidate({
      ...validate,
      [prop]: event.target.value != "" ? "success" : "error",
    });
    setValues({ ...values, [prop]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      currentpassword: values.currentpassword != "" ? "success" : "error",
      newpassword: values.newpassword != "" ? "success" : "error",
      renewpassword:
      values.newpassword === values.renewpassword ? "success" : "error",
    });

    if (
      validate.currentpassword === "success" &&
      validate.renewpassword === "success"
    ) {
      const url = "/api/users/profile";

      try {

        const {data} = await axios.post(
          url,
          {
            id: session.id,
            currentpassword: values.currentpassword,
            newpassword: values.newpassword,
            renewpassword: values.renewpassword
          },
          config
        );

        if (data.success) {
          setValues({
            currentpassword: "",
            newpassword: "",
            renewpassword: "",
            showPassword: false
          });

          Swal.fire({
            icon: "success",
            title: "Cambiar contraseña",
            text: "Su contraseña ha sido cambiada.",
            showConfirmButton: true,
          });
        }
      } catch (errors) {
        const { detail } = errors.response.data;
        Swal.fire({
          icon: "error",
          title: "Cambiar Contraseña",
          text: detail,
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <FormGroup row>
          <Label for="currentPassword" size="sm" sm={3}>
            Contraseña Actual:
          </Label>
          <Col sm={9}>
            <InputGroup size="sm">
              <Input
                type={values.showPassword ? "text" : "password"}
                id="currentpassword"
                name="currentpassword"
                autoComplete="off"
                placeholder="Contraseña Actual"
                invalid={validate.currentpassword === "error"}
                value={values.currentpassword}
                onChange={handleChange("currentpassword")}
              />
              <FormFeedback>Teclee la contraseña actual.</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>
      </Row>

      <Row>
        <FormGroup row>
          <Label for="newpassword" size="sm" sm={3}>
            Nueva Contraseña:
          </Label>
          <Col sm={9}>
            <InputGroup size="sm">
              <Input
                type={values.showPassword ? "text" : "password"}
                id="newpassword"
                name="newpassword"
                placeholder="Nueva Contraseña"
                autoComplete="off"
                invalid={validate.newpassword === "error"}
                value={values.newpassword}
                onChange={handleChange("newpassword")}
              />
              <FormFeedback>Teclee la nueva contraseña.</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>
      </Row>

      <Row>
        <FormGroup row>
          <Label for="renewpassword" size="sm" sm={3}>
            Confirmar Contraseña:
          </Label>
          <Col sm={9}>
            <InputGroup size="sm">
              <Input
                type={values.showPassword ? "text" : "password"}
                id="renewpassword"
                name="renewpassword"
                autoComplete="off"
                placeholder="Confirmar Contraseña"
                invalid={
                  validate.renewpassword === "error" ||
                  values.newpassword != values.renewpassword
                }
                value={values.renewpassword}
                onChange={handleChange("renewpassword")}
              />
              <FormFeedback>Confirme la nueva contraseña.</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>
      </Row>

      <Row>
        <FormGroup row>
          <Col sm={3}></Col>
          <Col sm={9}>
              <Input
                type="checkbox"
                id=" showPassword"
                name=" showPassword"
                value={values.showPassword}
                onChange={handleChange("showPassword")}
              />{" "}
            <Label check>Mostrar Contraseñas</Label>
          </Col>
        </FormGroup>
      </Row>

      <div className="text-center">
        <Button
          type="submit"
          color="primary"
          data-toggle="tooltip"
          title="Guardar"
        >
          <i className="bi bi-check2-circle"></i> Guardar
        </Button>
      </div>
    </Form>
  );
}
