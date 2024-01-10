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
    limitPenaltyPoints: {
      value: "",
      error: false,
      errorMessage: "Límite de puntos por penalización es requerido"
    },
    points_penalty_yellow: {
      value: "",
      error: false,
      errorMessage: "Puntos de penalización por tarjetas amarillas requerido"
    },
    points_penalty_red: {
      value: "",
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
          amountRound:{
            value: data.data.amount_rounds,
            error:false,
            errorMessage:'Cantidad de Rondas requerida'
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
          bonus: {
            value: data.data.use_bonus,
            error:false,
            errorMessage:"Seleccione si se usa o no la bonificación"
          },
          limitPenaltyPoints: {
            value: data.data.penalties_limit,
            error:false,
            errorMessage:"Límite de puntos por penalización es requerido"
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


  return (
    <div>
      <div className="ps-4">
        <h1 className="title">Configurar Torneo</h1>
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
                    className={classnames({ active: activeTab === "1" })}
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
                    className={classnames({ active: activeTab === "2" })}
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
                    className={classnames({ active: activeTab === "2" })}
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
                            // invalid={error.name}
                            // onChange={handleChange("name")}
                            autoComplete="off"
                            // value={tourney.name}
                            onKeyPress={(event) => {
                              if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormFeedback>
                            Por favor, teclee el nombre del torneo
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
                            // value={tourney.modality}
                            // invalid={error.modality}
                            // onChange={handleChange("modality")}
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
                            // invalid={error.number_rounds}
                            type="number"
                            placeholder="Rondas"
                            // value={tourney.number_rounds}
                            // onChange={handleChange("number_rounds")}
                          />
                          <FormFeedback>
                            Por favor, teclee la cantidad de rondas del torneo 
                          </FormFeedback>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="pt-2 ps-4 pe-4">
                      <Label size="sm" sm={2}>Fechas</Label>
                      <Col sm={4}>
                        <InputGroup size="sm">
                          <Input
                            id="startDate"
                            name="startDate"
                            // invalid={error.startDate}
                            placeholder="Fecha"
                            type="date"
                            // value={tourney.startDate}
                            // onChange={handleChange("startDate")}
                          />
                          <FormFeedback>
                            La fecha debe estar dentro del rango del evento
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
                            // onChange={handleChange("summary")}
                            autoComplete="off"
                            // value={tourney.summary}
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
