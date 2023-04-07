import { useState, useContext } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import AppContext from "../../AppContext";
import Link from "next/link";
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
  InputGroupText,
} from "reactstrap";

import AuthFooter from "../../components/Footers/AuthFooter";

export default function Login(session) {
  const router = useRouter();
  const value = useContext(AppContext);
  const t = value.state.languages.auth;

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [validate, setValidate] = useState({
    username: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValidate({
      ...validate,
      [prop]: event.target.value != "" ? "success" : "error",
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();

    const { languageSelected } = value.state;

    setValidate({
      ...validate,
      username: values.username != "" ? "success" : "error",
      password: values.password != "" ? "success" : "error",
    });

    if (validate.username === "success" && validate.password === "success") {
      const res = await signIn("credentials", {
        redirect: false,
        locale: languageSelected,
        username: values.username,
        password: values.password,
      });

      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: t.logIn,
          text: t.logInFail,
          showConfirmButton: true,
        });
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.pageTitle}</title>
      </Head>
      <div className="d-flex flex-column min-vh-100">
        <div className="container mt-5 pt-5 d-flex flex-column flex-lg-row justify-content-evenly" style={{maxWidth: "960px"}}>
          <div className="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
            <h1 className="text-primary fw-bold fs-0">{t.appTitle}</h1>
            <p className="w-75 mx-auto fs-4 mx-lg-0 d-none d-sm-block">{t.appComment}</p>
          </div>

          <div className="mx-auto" style={{ maxWidth: "24rem", width: "100%" }}>
            <div className="bg-white shadow rounded p-3 input-group-lg">
              <h3>{t.signIn}</h3>
              <hr />
              <Form onSubmit={handleLoginUser}>
                <Col md={12}>
                  <FormGroup>
                    <Label>{t.userLabel}</Label>
                    <InputGroup size="sm">
                      <InputGroupText>
                        <i className="bi bi-person-fill"></i>
                      </InputGroupText>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={t.userLabel}
                        onChange={handleChange("username")}
                        invalid={validate.username === "error"}
                        value={values.username}
                        onKeyPress={(event) => {
                          if (!/^[a-z_.\s]*$/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <FormFeedback>{t.userFeed}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>{t.passwordLabel}</Label>
                    <InputGroup size="sm">
                      <InputGroupText>
                        <i className="bi bi-key-fill"></i>
                      </InputGroupText>
                      <Input
                        type={values.showPassword ? "text" : "password"}
                        name="password"
                        placeholder={t.passwordLabel}
                        autoComplete="off"
                        onChange={handleChange("password")}
                        invalid={validate.password === "error"}
                        value={values.password}
                      />
                      <InputGroupText>
                        <a onClick={handleClickShowPassword}>
                          {!values.showPassword ? (
                            <i className="bi bi-eye-slash"></i>
                          ) : (
                            <i className="bi bi-eye"></i>
                          )}
                        </a>
                      </InputGroupText>

                      <FormFeedback>{t.passwordFeed}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <div className="text-center">
                  <Button type="submit" className="my-2" color="primary">
                    <b>{t.logIn}</b>
                  </Button>
                </div>
              </Form>
              <Row className="mt-2">
                <Col xs="6">
                  <Link href="/">
                    <a className="text-decoration-none">
                      <small>
                        <b>{t.forgotPassword}</b>
                      </small>
                    </a>
                  </Link>
                </Col>
                <Col xs="6" style={{ textAlign: "end" }}>
                  <Link href="/register">
                    <a className="text-decoration-none">
                      <small>
                        <b>{t.createNewAccount}</b>
                      </small>
                    </a>
                  </Link>
                </Col>
              </Row>
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
