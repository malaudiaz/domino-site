import { useState, useContext } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

import {
  Label,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

import AppContext from "../../AppContext";
import AuthFooter from "../../components/Footers/AuthFooter";
import CountryComboBox from "../../components/Country/CountryComboBox";

export default function Register(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const value = useContext(AppContext);
  const t = value.state.languages.register;

  const [values, setValues] = useState({
    firts_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "1",
    username: "",
    newpassword: "",
    confirmpassword: "",
    showPassword: false,
  });

  const [validate, setValidate] = useState({
    firts_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    username: "",
    newpassword: "",
    confirmpassword: "",
  });

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

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    setValidate({
      ...validate,
      firts_name: values.firts_name != "" ? "success" : "error",
      last_name: values.last_name != "" ? "success" : "error",
      email: values.email != "" ? "success" : "error",
      phone: values.phone != "" ? "success" : "error",
      country: values.country != "" ? "success" : "error",
      username: values.username != "" ? "success" : "error",
      newpassword: values.newpassword != "" ? "success" : "error",
      confirmpassword:
        values.confirmpassword != "" &&
        values.confirmpassword === values.newpassword
          ? "success"
          : "error",
    });

    if (
      validate.firts_name === "success" &&
      validate.last_name === "success" &&
      validate.email === "success" &&
      validate.phone === "success" &&
      validate.username === "success" &&
      validate.country === "success" &&
      validate.newpassword === "success" &&
      validate.confirmpassword === "success"
    ) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}register?username=${values.username}&first_name=${values.firts_name}&last_name=${values.last_name}&email=${values.email}&phone=${values.phone}&country_id=${values.country}&password=${values.newpassword}`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        const { data } = await axios.post(
          url,
          config
        );

        if (data.success) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Registro",
            text: data.detail,
            showConfirmButton: true,
          });
          router.push("/login");
        }
      } catch ({ response }) {
        const { detail } = response.data;
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Registro",
          text: detail,
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>{t.pageTitle}</title>
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <div
          className="container mt-5 d-flex flex-column flex-lg-row justify-content-evenly"
          style={{ maxWidth: "960px" }}
        >
          <div className="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
            <h1 className="text-primary fw-bold fs-0">{t.appTitle}</h1>
            <p className="w-75 mx-auto fs-4 mx-lg-0 d-none d-sm-block">
              {t.appComment}
            </p>
          </div>

          <div className="mx-auto" style={{ maxWidth: "34rem", width: "100%" }}>
            <div className="bg-white shadow rounded p-3 input-group-lg">
              <h3>Registrarse</h3>
              <hr />
              <Form onSubmit={handleRegisterUser}>
                <div className="container">
                  <Row>
                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.firtsName}</Label>
                        <InputGroup size="sm">
                          <Input
                            type="text"
                            autoComplete="off"
                            name="firts_name"
                            id="firts_name"
                            invalid={validate.firts_name === "error"}
                            onChange={handleChange("firts_name")}
                            placeholder={t.firtsName}
                            value={values.firts_name}
                            onKeyPress={(event) => {
                              if (!/^[a-zA-ZñÑáéíóú\s]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormFeedback>{t.firtsNameFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.lastName}</Label>
                        <InputGroup size="sm">
                          <Input
                            type="text"
                            autoComplete="off"
                            name="last_name"
                            id="last_name"
                            invalid={validate.last_name === "error"}
                            onChange={handleChange("last_name")}
                            placeholder={t.lastName}
                            value={values.last_name}
                            onKeyPress={(event) => {
                              if (!/^[a-zA-ZñÑáéíóú\s]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormFeedback>{t.lastNameFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.email}</Label>
                        <InputGroup size="sm">
                          <Input
                            type="email"
                            autoComplete="off"
                            name="email"
                            id="email"
                            invalid={validate.email === "error"}
                            onChange={handleChange("email")}
                            placeholder={t.email}
                            value={values.email}
                            onKeyPress={(event) => {
                              if (!/^[a-z@_.\s]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormFeedback>{t.emailFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.phone}</Label>
                        <InputGroup size="sm">
                          <Input
                            type="text"
                            autoComplete="off"
                            name="phone"
                            id="phone"
                            maxLength={12}
                            invalid={validate.phone === "error"}
                            onChange={handleChange("phone")}
                            placeholder={t.phone}
                            value={values.phone}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormFeedback>{t.phoneFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.userName}</Label>
                        <InputGroup size="sm">
                          <Input
                            type="text"
                            autoComplete="off"
                            name="username"
                            id="username"
                            invalid={validate.username === "error"}
                            onChange={handleChange("username")}
                            placeholder={t.userName}
                            value={values.username}
                            onKeyPress={(event) => {
                              if (!/^[a-z_.\s]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormFeedback>{t.userNameFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.country}</Label>
                        <InputGroup size="sm">
                          <CountryComboBox
                            name={"country"}
                            cmbText={t.countrySelect}
                            valueDefault={values.country}
                            invalid={validate.country === "error"}
                            onChange={handleChange("country")}
                          />
                          <FormFeedback>{t.countryFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.password}</Label>
                        <InputGroup size="sm">
                          <Input
                            type={values.showPassword ? "text" : "password"}
                            autoComplete="off"
                            name="newpassword"
                            id="newpassword"
                            invalid={validate.newpassword === "error"}
                            onChange={handleChange("newpassword")}
                            value={values.newpassword}
                            placeholder={t.password}
                          />
                          <FormFeedback>{t.passwordFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col className="col-6">
                      <FormGroup>
                        <Label>{t.confirm}</Label>
                        <InputGroup size="sm">
                          <Input
                            type={values.showPassword ? "text" : "password"}
                            autoComplete="off"
                            name="confirmpassword"
                            id="confirmpassword"
                            invalid={validate.confirmpassword === "error"}
                            onChange={handleChange("confirmpassword")}
                            placeholder={t.confirm}
                            value={values.confirmpassword}
                          />
                          <FormFeedback>{t.confirmFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      id=" showPassword"
                      name=" showPassword"
                      value={values.showPassword}
                      onChange={handleChange("showPassword")}
                    />
                    <Label check>{t.showPassword}</Label>
                  </FormGroup>

                  <Row>
                    <Col className="col-6 pt-3" style={{ textAlign: "center" }}>
                      <Link href="/login">
                        <a className="text-decoration-none">
                          <small>
                            <b>{t.backLogin}</b>
                          </small>
                        </a>
                      </Link>
                    </Col>
                    <Col className="col-6" style={{ textAlign: "center" }}>
                      <Button type="submit" className="my-2" color="success">
                        <b>{t.register}</b>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <AuthFooter />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {
      session,
    },
  };
};
