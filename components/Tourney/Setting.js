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

export default function Setting({ tourneyId, menu, setLottery }) {
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
      value:"SUIZO",
      error:false,
      errorMessage:'Sistema de Juegoes requerido'
    },
    lottery:{
      value:"MANUAL",
      error:false,
      errorMessage:'Tipo de Sorteo es requerido'
    },
    bonus: {
      value:"YES",
      error:false,
      errorMessage:"Seleccione si se usa o no la bonificación"
    },
    limitPenaltyPoints: {
      value:0,
      error:false,
      errorMessage:"Límite de puntos por penalización es requerido"
    }
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
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Configurando Torneo",
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
            title: "Configurando Torneo",
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
        ...formValues["smartTable"],
        error: smartTable.value === ""
      }
    })

    if (!formValues.smartTable.error) {

      const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/${profile.id}?id=${tourneyId}&amount_tables=${formValues.amountTable.value}&amount_smart_tables=${formValues.smartTable.value}&amount_rounds=${formValues.amountRound.value}&number_points_to_win=${formValues.pointRound.value}&time_to_win=${formValues.timeRound.value}&game_system=${formValues.playSystem.value}&lottery=${formValues.lottery.value}&bonus=${formValues.bonus.value}&limitPenaltyPoints=${formValues.limitPenaltyPoints.value}`;

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
          setLottery(formValues.lottery.value);
          Swal.fire({
            icon: "success",
            title: "Configurando Torneo",
            text: data.detail,
            showConfirmButton: true,
          });
        }
      } catch (errors) {
        setLottery("");
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
                  Cantidad de Rondas
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="amountRound" 
                      id="amountRound" 
                      invalid={formValues.amountRound.error}                     
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
                      invalid={formValues.pointRound.error}                     
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
                      invalid={formValues.timeRound.error}                     
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

                    <select name="playSystem" id="playSystem" className="form-select form-select-sm" onChange={handleChange}>
                      <option value="SUIZO">Sistema Suizo</option>
                      <option value="TRADICIONAL">Sistema Tradicional</option>
                    </select>

                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Tipo de Sorteo
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">

                    <select name="lottery" id="lottery" className="form-select form-select-sm" onChange={handleChange}>
                      <option value="MANUAL">Manual</option>
                      <option value="AUTOMATIC">Automático</option>
                    </select>

                  </InputGroup>
                </Col>
              </FormGroup>


              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Usar Bonificación
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">

                    <select name="bonus" id="bonus" className="form-select form-select-sm" onChange={handleChange}>
                      <option value="YES">Sí</option>
                      <option value="NO">No</option>
                    </select>

                  </InputGroup>
                </Col>
              </FormGroup>


              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={3}>
                  Límite de Puntos por Penalización
                </Label>
                <Col sm={3}>
                  <InputGroup size="sm">
                    <Input 
                      type="text" 
                      name="limitPenaltyPoints" 
                      id="limitPenaltyPoints" 
                      invalid={formValues.limitPenaltyPoints.error}                     
                      value={formValues.limitPenaltyPoints.value}
                      onChange={handleChange}
                    />
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
