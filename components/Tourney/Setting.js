import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import classnames from "classnames";

import {
  Card,
  CardBody,
  Button,
  Nav, 
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import Advertising from "./Setting/Advertising";
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
    lst_categories: {
      value: "",
      error: false,
      errorMessage: ""
    }
  });    

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
                    Ajustes Generales
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
                    Categorias
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">

                    <General formValues={formValues} setFormValues={setFormValues} setReload={setReload}/>

                </TabPane>
                <TabPane tabId="2">

                    <Category formValues={formValues}/>

                </TabPane>
              </TabContent>

          </CardBody>
        </Card>

      </div>

    </div>

  );
}
