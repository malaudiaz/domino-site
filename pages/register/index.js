import { useState, useContext } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

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

export default function Register(props) {
  const router = useRouter();
  const value = useContext(AppContext);
  const t = value.state.languages.register;

  const [values, setValues] = useState({
    firtsname: "",
    lastname: "",
    email: "",
    phone: "",
    username: "",
    newpassword: "",
    confirmpassword: "",
    showPassword: false,
  });

  const [validate, setValidate] = useState({
    firtsname: "",
    lastname: "",
    email: "",
    phone: "",
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

    setValidate({
      ...validate,
      firtsname: values.firtsname != "" ? "success" : "error",
      lastname: values.lastname != "" ? "success" : "error",
      email: values.email != "" ? "success" : "error",
      phone: values.phone != "" ? "success" : "error",
      username: values.username != "" ? "success" : "error",
      newpassword: values.newpassword != "" ? "success" : "error",
      confirmpassword:
        values.confirmpassword != "" &&
        values.confirmpassword === values.newpassword
          ? "success"
          : "error",
    });

    if (
      validate.firtsname === "success" &&
      validate.lastname === "success" &&
      validate.email === "success" &&
      validate.phone === "success" &&
      validate.username === "success" &&
      validate.newpassword === "success" &&
      validate.confirmpassword === "success"
    ) {
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.pageTitle}</title>
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <div className="container mt-5 pt-5 d-flex flex-column flex-lg-row justify-content-evenly">
          <div className="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
            <h1 className="text-primary fw-bold fs-0">{t.appTitle}</h1>
            <p className="w-75 mx-auto fs-4 mx-lg-0">
              {t.appComment}
            </p>
          </div>

          <div className="mx-auto" style={{ maxWidth: "24rem", width: "100%" }}>
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
                            name="firtsname"
                            id="firtsname"
                            invalid={validate.firtsname === "error"}
                            onChange={handleChange("firtsname")}
                            placeholder={t.firtsName}
                            value={values.firtsname}
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
                            name="lastname"
                            id="lastname"
                            invalid={validate.lastname === "error"}
                            onChange={handleChange("lastname")}
                            placeholder={t.lastName}
                            value={values.lastname}
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
                            invalid={validate.phone === "error"}
                            onChange={handleChange("phone")}
                            placeholder={t.phone}
                            value={values.phone}
                          />
                          <FormFeedback>{t.phoneFeed}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
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

                  <div className="text-center">
                    <Button type="submit" className="my-2" color="success">
                      <b>{t.register}</b>
                    </Button>
                  </div>
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
  if (session) return {
    redirect: {
      destination: "/",
      permanent: false
    }
  }  
  return {
    props: {
      session,
    },
  };
};
