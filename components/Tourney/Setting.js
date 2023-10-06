import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import Image from "next/image";

import {
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  InputGroup,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

export default function Setting({ tourneyId, menu }) {
  const { profile, token, lang } = useAppContext();

  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState("");

  const [formValues, setFormValues] = useState({
    amountTable:{
      value:0,
      error:false,
      errorMessage:'Cantidad de Mesas requerida'
    },
    smartTable:{
      value:0,
      error:false,
      errorMessage:'Cantidad de mesas inteligentes requerida'
    },
    amountBonus:{
      value:0,
      error:false,
      errorMessage:'Cantidad de mesas a bonificar requerida'
    },
    roundBonus:{
      value:0,
      error:false,
      errorMessage:'Ronda a bonificar requerida'
    },
    amountRound:{
      value:0,
      error:false,
      errorMessage:'Cantidad de Rondas requerida'
    },
    pointRound:{
      value:0,
      error:false,
      errorMessage:'Puntos por Rondas requerida'
    },
    timeRound:{
      value:0,
      error:false,
      errorMessage:'Tiempo por Rondas requerida'
    },
    playSystem:{
      value:1,
      error:false,
      errorMessage:'Sistema de Juego'
    },
  })    

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };  

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/tables/${tourneyId}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data.success) {
        setFormValues({
          ...formValues,
          amountTable: {
            ...formValues["amountTable"],
            error: false,
            value: data.data
          }
        })      
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Configurando Torneo",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    if (menu === 2) {
      fetchData();
    }
  }, [menu]);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        error: false,
        value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormValues({
      ...formValues,
      smartTable: {
        error: smartTable.value === ""
      }
    })

    if (!formValues.smartTable.error) {

      const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/${profile.id}?id=${tourneyId}&amount_tables=${formValues.amountTable.value}&amount_smart_tables=${formValues.smartTable.value}&amount_bonus_tables=${formValues.amountBonus.value}&amount_bonus_points=${1}&number_bonus_round=${formValues.roundBonus.value}&amount_rounds=${formValues.amountRound.value}&number_points_to_win=${formValues.pointRound.value}&time_to_win=${formValues.timeRound.value}&game_system=${formValues.playSystem.value}`;

      const body = new FormData();
      body.append("image", file);

      try {
        const { data } = await axios.post(url, body, {
          headers: {
            "Accept-Language": lang,
            "Authorization": `Bearer ${token}`,
          },
        });
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Configurando Torneo",
            text: data.detail,
            showConfirmButton: true,
          });
        }
      } catch (errors) {
        console.log(errors);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al consultar la API....",
          showConfirmButton: true,
        });
      }
 
    }      
  }


  return (
    <div>
      <div className="ps-4">
        <h1 className="title">Configurar Torneo</h1>
      </div>
      <Form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
        <div className="tourney-setting">
          <Card className="publicity-card">
            <CardBody style={{width: "100%"}}>
              <Image
                src={createObjectURL ? createObjectURL : "/Logo-V.png"}
                alt="Publicidad"
                width="150"
                height="150"
              />
              <div>
                <p>
                  <strong>Foto de Publicidad</strong>
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
                          setFile(i);
                          setImage(i);
                          setCreateObjectURL(URL.createObjectURL(i));
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
                  title="Eliminar foto de Publicidad"
                  style={{ color: "white" }}
                  onClick={(e) => {
                    Swal.fire({
                      title: "¿ Desea eliminar esta foto de publicidad ?",
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
                        setImage(null);
                        setCreateObjectURL(null);
                      }
                    });
                  }}
                >
                  <i className="bi bi-trash"></i>
                </Label>
              </div>
            </CardBody>
          </Card>
          <Card className="flex-fill">
            <CardBody className="p-4">
              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Cantidad de Mesas
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input
                      type="text"
                      name="amountTtable"
                      id="amountTable"
                      value={formValues.amountTable.value}
                      error={formValues.amountTable.error}                     
                      disabled
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Cantidad de Mesas Inteligentes
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="smartTable" 
                      id="smartTable" 
                      invalid={formValues.smartTable.error}                     
                      value={formValues.smartTable.value}
                      onChange={handleChange}
                    />
                    <FormFeedback>La cantidad de mesas inteligentes es requerida.</FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Cantidad de Mesas a Bonificar
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="amountBonus" 
                      id="amountBonus" 
                      error={formValues.amountBonus.error}                     
                      value={formValues.amountBonus.value}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Bonificar a partir de la Ronda
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="roundBonus" 
                      id="roundBonus" 
                      error={formValues.roundBonus.error}                     
                      value={formValues.roundBonus.value}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Cantidad de Rondas
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="amountRound" 
                      id="amountRound" 
                      error={formValues.amountRound.error}                     
                      value={formValues.amountRound.value}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Puntos para ganar ronda
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="pointRound" 
                      id="pointRound" 
                      error={formValues.pointRound.error}                     
                      value={formValues.pointRound.value}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Tiempo máximo para ganar (min.)
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="timeRound" 
                      id="timeRound" 
                      error={formValues.timeRound.error}                     
                      value={formValues.timeRound.value}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Sistema de Juego
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">

                    <select className="form-select form-select-sm" onChange={handleChange}>
                      <option value="1">Sistema Suizo</option>
                      <option value="2">Sistema Tradicional</option>
                    </select>

                  </InputGroup>
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </div>
        <div className="pt-2 pb-4 text-center">
          <Button 
            size={"sm"}
            type="submit"
            color="primary"
            data-toggle="tooltip"
            title="Guardar Cambios"
          >
            Guardar
          </Button>
        </div>
      </Form>
    </div>

  );
}
