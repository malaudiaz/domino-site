import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {useAppContext} from "../../AppContext";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import axios from "axios";
import { setCookie } from 'cookies-next';

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

export default function Login() {
  const router = useRouter();
  const {lang, i18n, createProfile} = useAppContext();
  const t = i18n.auth;

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const { languageSelected } = lang;

    setValidate({
      ...validate,
      username: values.username != "" ? "success" : "error",
      password: values.password != "" ? "success" : "error",
    });

    if (validate.username === "success" && validate.password === "success") {

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": languageSelected
        },
      };    
  
      const url = `${process.env.NEXT_PUBLIC_API_URL}login`;

      try {
        const { data } = await axios.post(url, values, config);

        if (data.success) {
          const {user_id, first_name, last_name, photo, profile_type, token} = data.profile;
          setCookie('SmartDomino-Token', token);
          createProfile(user_id, first_name + " " + last_name, photo, profile_type);

          router.push("/");
        }
      } catch (error) {
        console.log(error);
        // const { detail } = response.data;
        Swal.fire({
          title: "Autentificar",
          text: "dfddfsdfsd",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
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
        <div className="container mt-6 pt-6 d-flex flex-column flex-lg-row justify-content-evenly" style={{maxWidth: "960px"}}>
          <div className="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
            <Image alt="SmartDomino" src="/Logo-H.png" width={300} height={60} />
            <p className="w-75 mx-auto fs-4 mx-lg-0 d-none d-sm-block">{t.appComment}</p>
          </div>

          <div className="mx-auto" style={{ maxWidth: "24rem", width: "100%" }}>
            <div className="bg-white shadow rounded p-3 input-group-lg">
              <h3>{t.signIn}</h3>
              <hr />
              <Form onSubmit={handleLogin}>
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
                        autoComplete="off"
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
};
