import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import classnames from "classnames";

import {
  Card,
  CardBody,
  FormGroup,
  Nav, 
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Col,
  CardHeader,
  Label,
  InputGroup,
  Input,
  FormFeedback
} from "reactstrap";

import General from "./Setting/General";
import Category from "./Setting/Category";

export default function Setting({ tourney }) {
  const { token, lang } = useAppContext();
  const [activeTab, setActiveTab] = useState("1");
  const [reload, setReload] = useState(false);

  const [formValues, setFormValues] = useState({
    tourneyId: {
      value: "",
      error: false,
      errorMessage: ""
    },
    name: {
      value: "",
      error: false,
      errorMessage: "Nombre del torneo, requerido"
    },
    modality: {
      value: "",
      error: false,
      errorMessage: "Modalidad del torneo, requerido"
    },
    number_rounds: {
      value: "",
      error: false,
      errorMessage: "Rondas del torneo, requerido"
    },
    startDate: {
      value: "",
      error: false,
      errorMessage: "Fecha de Inicio del torneo, requerido"
    },
    summary: {
      value: "",
      error: false,
      errorMessage: ""
    },
    eloMax:{
      value: "",
      error: false,
      errorMessage: "ELO Máximo, requerido"
    },
    eloMin:{
      value: "",
      error: false,
      errorMessage: "ELO Mínimo, requerido"
    },
    amountTable:{
      value: "",
      error: false,
      errorMessage: 'Cantidad de Mesas requerida'
    },
    amountPlayer:{
      value: "",
      error: false,
      errorMessage: 'Cantidad de Jugadores requerida'
    },
    smartTable:{
      value: "",
      error: false,
      errorMessage: 'Cantidad de mesas inteligentes requerida'
    },
    constant_increase_ELO: {
      value: "",
      error: false,
      errorMessage: 'Constante de crecimiento del ELO es requerida'
    },
    pointRound:{
      value: "",
      error: false,
      errorMessage: 'Puntos por Rondas requerida'
    },
    timeRound:{
      value: "",
      error: false,
      errorMessage: 'Tiempo por Rondas requerida'
    },
    lottery:{
      value: "MANUAL",
      error: false,
      errorMessage: 'Tipo de Sorteo es requerido'
    },
    amountBonusPoints: {
      value: 0,
      error:false,
      errorMessage:""
    },
    amountBonusTables: {
      value: 0,
      error:false,
      errorMessage:""
    },
    limitPenaltyPoints: {
      value: 0,
      error: false,
      errorMessage: "Límite de puntos por penalización es requerido"
    },
    points_penalty_yellow: {
      value: 0,
      error: false,
      errorMessage: "Puntos de penalización por tarjetas amarillas requerido"
    },
    points_penalty_red: {
      value: 0,
      error: false,
      errorMessage: "Puntos de penalización por tarjetas rojas requerido"
    },
    event_ordering_one: {
      value: "",
      error: false,
      errorMessage: "Críterio de orden de torneo requerido"
    },
    event_ordering_two: {
      value: "",
      error: false,
      errorMessage: "Críterio de orden de torneo requerido"
    },
    event_ordering_three: {
      value: "",
      error: false,
      errorMessage: "Críterio de orden de torneo requerido"
    },
    round_ordering_one: {
      value: "",
      error: false,
      errorMessage: "Críterio de orden de ronda requerido"
    },
    round_ordering_two: {
      value: "",
      error: false,
      errorMessage: "Críterio de orden de ronda requerido"
    },
    round_ordering_three: {
      value: "",
      error: false,
      errorMessage: "Críterio de orden de ronda requerido"
    },
    statusId: {
      value: "",
      error: false,
      errorMessage: ""
    },
    statusName: {
      value: "",
      error: false,
      errorMessage: ""
    },
    statusDescription: {
      value: "",
      error: false,
      errorMessage: ""
    },
    image: {
      value: "",
      error: false,
      errorMessage: ""
    },
    usesSegmentation: {
      value: true,
      error: false,
      errorMessage: ""
    },
    usePenalty: {
      value: true,
      error: false,
      errorMessage: ""
    },
    useBonus: {
      value: true,
      error: false,
      errorMessage: ""
    },
    lst_categories: {
      value: "",
      error: false,
      errorMessage: ""
    }
  }); 
  
  const criteriaTourney = [
    {
      key: "JG",
      value: "Juegos Ganados"
    },
    {
      key: "BONUS",
      value: "Bonificación"
    },
    {
      key: "ELO",
      value: "ELO"
    }
  ];

  const criteriaRound = [
    {
      key: "JG",
      value: "Juegos Ganados"
    },
    {
      key: "ERA",
      value: "ELO Real Acumulado"
    },
    {
      key: "DP",
      value: "Díferencia de Puntos"
    }
  ];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };  

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/${tourney.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {

        setFormValues({
          tourneyId: {
            value: data.data.tourney_id,
            error: false,
            errorMessage: "ID, Requerido"
          },
          name: {
            value: data.data.name,
            error: false,
            errorMessage: "Nombre del torneo, requerido"
          },
          modality: {
            value: data.data.modality,
            error: false,
            errorMessage: "Modalidad del torneo, requerido"
          },
          number_rounds: {
            value: data.data.number_rounds,
            error: false,
            errorMessage: "Rondas del torneo, requerido"
          },
          startDate: {
            value: data.data.start_date,
            error: false,
            errorMessage: "Fecha de Inicio del torneo, requerido"
          },
          summary: {
            value: data.data.summary,
            error: false,
            errorMessage: ""
          },     
          eloMax:{
            value: data.data.elo_max,
            error: false,
            errorMessage: "ELO Máximo, requerido"
          },
          eloMin:{
            value: data.data.elo_min,
            error: false,
            errorMessage: "ELO Mínimo, requerido"
          },
          constant_increase_ELO: {
            value: data.data.constant_increase_ELO,
            error: false,
            errorMessage: "ELO Mínimo, requerido"
          },         
          amountTable:{
            value: data.data.amount_tables,
            error:false,
            errorMessage:'Cantidad de Mesas requerida'
          },
          amountPlayer:{
            value: data.data.amount_player,
            error: false,
            errorMessage: 'Cantidad de Jugadores requerida'
          },
          smartTable:{
            value: data.data.amount_smart_tables,
            error:false,
            errorMessage:'Cantidad de mesas inteligentes requerida'
          },
          pointRound:{
            value: data.data.number_points_to_win,
            error:false,
            errorMessage:'Puntos por Rondas requerida'
          },
          timeRound:{
            value: data.data.time_to_win,
            error:false,
            errorMessage:'Tiempo por Rondas requerida'
          },
          playSystem:{
            value: data.data.game_system,
            error:false,
            errorMessage:'Sistema de Juegoes requerido'
          },
          lottery:{
            value: data.data.lottery_type,
            error:false,
            errorMessage:'Tipo de Sorteo es requerido'
          },
          amountBonusPoints: {
            value: data.data.amount_bonus_points,
            error: false,
            errorMessage: ""
          },
          amountBonusTables: {
            value: data.data.amount_bonus_tables,
            error: false,
            errorMessage: ""
          },
          limitPenaltyPoints: {
            value: data.data.penalties_limit,
            error: false,
            errorMessage: "Límite de puntos por penalización es requerido"
          },
          points_penalty_yellow: {
            value: data.data.points_penalty_yellow,
            error:false,
            errorMessage: "Puntos de penalización por tarjetas amarillas requerido"
          },
          points_penalty_red: {
            value: data.data.points_penalty_red,
            error:false,
            errorMessage: "Puntos de penalización por tarjetas rojas requerido"
          },
          event_ordering_one: {
            value: data.data.event_ordering_one,
            error: false,
            errorMessage: "Críterio de orden de torneo requerido"
          },
          event_ordering_two: {
            value: data.data.event_ordering_two,
            error: false,
            errorMessage: "Críterio de orden de torneo requerido"
          },
          event_ordering_three: {
            value: data.data.event_ordering_three,
            error: false,
            errorMessage: "Críterio de orden de torneo requerido"
          },
          round_ordering_one: {
            value: data.data.round_ordering_one,
            error: false,
            errorMessage: "Críterio de orden de ronda requerido"
          },
          round_ordering_two: {
            value: data.data.round_ordering_two,
            error: false,
            errorMessage: "Críterio de orden de ronda requerido"
          },
          round_ordering_three: {
            value: data.data.round_ordering_three,
            error: false,
            errorMessage: "Críterio de orden de ronda requerido"
          },     
          statusId: {
            value: data.data.status_id,
            error: false,
            errorMessage: ""
          },
          statusName: {
            value: data.data.status_name,
            error: false,
            errorMessage: ""
          },
          statusDescription: {
            value: data.data.status_description,
            error: false,
            errorMessage: ""
          },
          image: {
            value: data.data.image,
            error: false,
            errorMessage: ""
          },
          usesSegmentation: {
            value: data.data.use_segmentation,
            error: false,
            errorMessage: ""
          },
          usePenalty: {
            value: data.data.use_penalty,
            error: false,
            errorMessage: ""
          },
          useBonus: {
            value: data.data.use_bonus,
            error: false,
            errorMessage: ""
          },
          lst_categories: {
            value: data.data.lst_categories,
            error: false,
            errorMessage: ""
          }
        });

        setReload(false);

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
    if (tourney.id) {
      fetchData();
    }
  }, [reload, tourney.id]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        error: value === "",
        value,
      },
    });
  };

  const hasError = () => {
    let res = false;
    res = formValues.amountTable.error || formValues.smartTable.error || formValues.pointRound.error || formValues.timeRound.error || formValues.playSystem.error || formValues.lottery.error || formValues.limitPenaltyPoints.error;

    return res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !hasError() ) {

      const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/${formValues.tourneyId.value}`;

      const body = {
        "name": formValues.name.value,
        "modality": formValues.modality.value,
        "number_rounds": formValues.number_rounds.value,
        "start_date": formValues.startDate.value,
        "summary": formValues.summary.value,
        "amount_tables": formValues.amountTable.value,
        "amount_smart_tables": formValues.smartTable.value,
        "number_points_to_win": formValues.pointRound.value,
        "time_to_win": formValues.timeRound.value,
        "lottery": formValues.lottery.value,
        "constant_increase_ELO": formValues.constant_increase_ELO.value,
        "use_penalty": formValues.usePenalty.value,       
        "limitPenaltyPoints": formValues.limitPenaltyPoints.value,
        "points_penalty_yellow": formValues.points_penalty_yellow.value,
        "points_penalty_red": formValues.points_penalty_red.value,
        "use_bonus": formValues.useBonus.value,
        "amount_bonus_points": formValues.amountBonusPoints.value,
        "amount_bonus_tables": formValues.amountBonusTables.value,
        "use_segmentation": formValues.usesSegmentation.value,
        "event_ordering_one": formValues.event_ordering_one.value,
        "event_ordering_two": formValues.event_ordering_two.value,
        "event_ordering_three": formValues.event_ordering_three.value,
        "round_ordering_one": formValues.round_ordering_one.value,
        "round_ordering_two": formValues.round_ordering_two.value,
        "round_ordering_three": formValues.round_ordering_three.value
      }

      try {
        const { data } = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": lang,
            "Authorization": `Bearer ${token}`                },
        });
        if (data.success) {
          // setReload(true);

          Swal.fire({
            icon: "success",
            title: "Configurando Torneo",
            text: data.detail,
            showConfirmButton: true,
          });
        }
      } catch ({ code, message, name, request }) {
        if (code === "ERR_NETWORK") {
          Swal.fire({
            title: "Cargando Torneo",
            text: "Error en su red, consulte a su proveedor de servicio",
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        } else {
          if (code === "ERR_BAD_REQUEST") {
            const { detail } = JSON.parse(request.response);
            Swal.fire({
              title: "Cargando Torneo",
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
  }


  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center ps-4 pe-4">
        <h1 className="title">Configurar Torneo</h1>
        <div className="pt-2 pb-4 text-center">
          <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
              title="Guardar Cambios"
            >
              <i className="bi bi-save"></i> Guardar
          </button>
        </div>
      </div>

      <div className="tourney-setting">
        <Card className="flex-fill">
          <CardBody className="p-4">

              <Nav tabs>

                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Generales
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Ajustes
                  </NavLink>
                </NavItem>


                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    Categorias
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      toggleTab("4");
                    }}
                  >
                    Críterios para Organizar
                  </NavLink>
                </NavItem>


              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div className="tab-content pt-2">
                    <FormGroup row className="pt-2 ps-4 pe-4">
                      <Label size="sm" sm={2}>
                        Nombre del Torneo
                      </Label>
                      <Col sm={4}>
                        <InputGroup size="sm">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={"Nombre del Torneo"}
                            invalid={formValues.name.error}
                            value={formValues.name.value}
                            onChange={handleChange}
                            autoComplete="off"
                            onKeyPress={(event) => {
                              if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormFeedback>
                            {formValues.name.errorMessage}
                          </FormFeedback>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="pt-2 ps-4 pe-4">
                      <Label size="sm" sm={2}>Modalidad</Label>
                      <Col sm={4}>
                        <InputGroup size="sm">
                          <Input
                            id="modality"
                            name="modality"
                            type="select"
                            value={formValues.modality.value}
                            invalid={formValues.modality.error}
                            onChange={handleChange}
                          >
                            <option value="">Modalidad</option>
                            <option value="Individual">Individual</option>
                            <option value="Parejas">Parejas</option>
                            <option value="Equipo">Equipo</option>
                          </Input>
                          <FormFeedback>
                            Por favor, seleccione la modalidad del torneo
                          </FormFeedback>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="pt-2 ps-4 pe-4">
                      <Label size="sm" sm={2}>Rondas</Label>
                      <Col sm={4}>
                        <InputGroup size="sm">
                          <Input
                            id="number_rounds"
                            name="number_rounds"
                            type="number"
                            placeholder="Rondas"
                            invalid={formValues.number_rounds.error}
                            value={formValues.number_rounds.value}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <FormFeedback>
                            {formValues.number_rounds.errorMessage}
                          </FormFeedback>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="pt-2 ps-4 pe-4">
                      <Label size="sm" sm={2}>Fecha de Inicio</Label>
                      <Col sm={4}>
                        <InputGroup size="sm">
                          <Input
                            id="startDate"
                            name="startDate"
                            placeholder="Fecha"
                            type="date"
                            invalid={formValues.startDate.error}
                            value={formValues.startDate.value}
                            onChange={handleChange}
                          />
                          <FormFeedback>
                            {formValues.startDate.errorMessage}
                          </FormFeedback>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="pt-2 ps-4 pe-4">
                      <Label size="sm" sm={2}>Comentario</Label>
                      <Col sm={4}>
                        <InputGroup size="sm">
                          <Input
                            type="text"
                            name="summary"
                            id="summary"
                            placeholder={"Comentario"}
                            invalid={formValues.summary.error}
                            value={formValues.summary.value}
                            onChange={handleChange}
                            autoComplete="off"
                            onKeyPress={(event) => {
                              if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </div>
                </TabPane>

                <TabPane tabId="2">

                    <General formValues={formValues} setFormValues={setFormValues} setReload={setReload}/>

                </TabPane>
                <TabPane tabId="3">

                    <Category formValues={formValues} setFormValues={setFormValues} setReload={setReload}/>

                </TabPane>

                <TabPane tabId="4">
                    <div className="tab-content pt-2">

                      <FormGroup row className="pt-2 ps-4 pe-4">
                        <Col sm={6}>
                          <Card>
                            <CardHeader>Críterios de Organización para Torneo</CardHeader>
                            <CardBody className="p-4">
                              <FormGroup row>
                                <Label size="sm" sm={2}>
                                  Críterio # 1:
                                </Label>
                                <Col sm={10}>
                                  <InputGroup size="sm">
                                    <Input
                                      type="select"
                                      name="event_ordering_one"
                                      id="event_ordering_one"
                                      placeholder="Críterio # 1"
                                      value={formValues.event_ordering_one.value}
                                      onChange={handleChange}
                                    >
                                      <option key={0} value="">Seleccione</option>
                                      {criteriaTourney.map(({key, value},i)=>(
                                        (key!==formValues.event_ordering_two.value && key!==formValues.event_ordering_three.value) &&
                                          <option key={i+1} value={key}>{value}</option>                        
                                      ))}
                                    </Input>
                                  </InputGroup>
                                </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label size="sm" sm={2}>
                                  Críterio # 2:
                                </Label>
                                <Col sm={10}>
                                  <InputGroup size="sm">
                                    <Input
                                      type="select"
                                      name="event_ordering_two"
                                      id="event_ordering_two"
                                      placeholder="Críterio # 2"
                                      value={formValues.event_ordering_two.value}
                                      onChange={handleChange}
                                    >
                                      <option key={0} value="">Seleccione</option>
                                      {criteriaTourney.map(({key, value},i)=>(
                                        (key!==formValues.event_ordering_one.value && key!==formValues.event_ordering_three.value) &&
                                          <option key={i+1} value={key}>{value}</option>                        
                                      ))}
                                    </Input>
                                  </InputGroup>
                                </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label size="sm" sm={2}>
                                  Críterio # 3:
                                </Label>
                                <Col sm={10}>
                                  <InputGroup size="sm">
                                    <Input
                                      type="select"
                                      name="event_ordering_three"
                                      id="event_ordering_three"
                                      placeholder="Críterio # 2"
                                      value={formValues.event_ordering_three.value}
                                      onChange={handleChange}
                                    >
                                      <option key={0} value="">Seleccione</option>
                                      {criteriaTourney.map(({key, value},i)=>(
                                        (key!==formValues.event_ordering_one.value && key!==formValues.event_ordering_two.value) &&
                                          <option key={i+1} value={key}>{value}</option>                        
                                    ))}
                                    </Input>
                                  </InputGroup>
                                </Col>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col sm={6}>
                          <Card>
                            <CardHeader>Críterios de Organización para Rondas</CardHeader>
                            <CardBody className="p-4">
                              <FormGroup row>
                                <Label size="sm" sm={2}>
                                  Críterio # 1:
                                </Label>
                                <Col sm={10}>
                                  <InputGroup size="sm">
                                    <Input
                                      type="select"
                                      id="round_ordering_one"
                                      name="round_ordering_one"
                                      placeholder="Críterio # 1"
                                      value={formValues.round_ordering_one.value}
                                      onChange={handleChange}
                                    >
                                      <option key={0} value="">Seleccione</option>
                                      {criteriaRound.map(({key, value},i)=>(
                                        (key!==formValues.round_ordering_two.value && key!==formValues.round_ordering_three.value) &&
                                          <option key={i+1} value={key}>{value}</option>                        
                                      ))}
                                    </Input>
                                  </InputGroup>
                                </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label size="sm" sm={2}>
                                  Críterio # 2:
                                </Label>
                                <Col sm={10}>
                                  <InputGroup size="sm">
                                    <Input
                                      type="select"
                                      id="round_ordering_two"
                                      name="round_ordering_two"
                                      placeholder="Críterio # 2"
                                      value={formValues.round_ordering_two.value}
                                      onChange={handleChange}
                                    >
                                      <option key={0} value="">Seleccione</option>
                                      {criteriaRound.map(({key, value},i)=>(
                                        (key!==formValues.round_ordering_one.value && key!==formValues.round_ordering_three.value) &&
                                          <option key={i+1} value={key}>{value}</option>                        
                                    ))}
                                    </Input>
                                  </InputGroup>
                                </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label size="sm" sm={2}>
                                  Críterio # 3:
                                </Label>
                                <Col sm={10}>
                                  <InputGroup size="sm">
                                    <Input
                                      type="select"
                                      id="round_ordering_three"
                                      name="round_ordering_three"
                                      placeholder="Críterio # 3"
                                      value={formValues.round_ordering_three.value}
                                      onChange={handleChange}
                                    >
                                      <option key={0} value="">Seleccione</option>
                                      {criteriaRound.map(({key, value},i)=>(
                                        (key!==formValues.round_ordering_one.value && key!==formValues.round_ordering_two.value) &&
                                          <option key={i+1} value={key}>{value}</option>                        
                                    ))}
                                    </Input>
                                  </InputGroup>
                                </Col>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </Col>
                      </FormGroup>

                    </div>
                </TabPane>

              </TabContent>

          </CardBody>
        </Card>

      </div>

    </div>

  );
}
