import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import classnames from "classnames";

import {
  Card,
  CardBody,
  Nav, 
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import Settings from "./Setting/Settings";
import Category from "./Setting/Category";
import Criteria from "./Setting/Criteria";
import General from "./Setting/General";

export default function Setting({ tourney }) {
  const { token, lang } = useAppContext();
  const [activeTab, setActiveTab] = useState("1");
  const [reload, setReload] = useState(true);

  const [formValues, setFormValues] = useState({
    absent_point: {
      value: "",
      error: false,
      errorMessage: 'Los puntos a otorgar por ausencia o abandono son requeridos'
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
    amountTable:{
      value: "",
      error: false,
      errorMessage: 'Cantidad de Mesas requerida'
    },
    constant_increase_ELO: {
      value: "",
      error: false,
      errorMessage: 'Constante de crecimiento del ELO es requerida'
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
    event_ordering_dir_one: {
      value: "",
      error: false,
      errorMessage: ""
    },
    event_ordering_dir_two: {
      value: "",
      error: false,
      errorMessage: ""
    },
    event_ordering_dir_three: {
      value: "",
      error: false,
      errorMessage: ""
    },
    event_ordering_one: {
      value: "",
      error: false,
      errorMessage: "Primer críterio de orden de torneo requerido"
    },
    event_ordering_two: {
      value: "",
      error: false,
      errorMessage: "Segundo Críterio de orden de torneo requerido"
    },
    event_ordering_three: {
      value: "",
      error: false,
      errorMessage: "Tercer críterio de orden de torneo requerido"
    },
    playSystem:{
      value: "",
      error:false,
      errorMessage:'Sistema de Juego es requerido'
    },
    lottery:{
      value: "",
      error:false,
      errorMessage:'Tipo de Sorteo es requerido'
    },
    modality: {
      value: "",
      error: false,
      errorMessage: "Modalidad del torneo, requerido"
    },
    name: {
      value: "",
      error: false,
      errorMessage: "Nombre del torneo, requerido"
    },
    round_ordering_dir_one: {
      value: "",
      error: false,
      errorMessage: ""
    },
    round_ordering_dir_two: {
      value: "",
      error: false,
      errorMessage: ""
    },
    round_ordering_dir_three: {
      value: "",
      error: false,
      errorMessage: ""
    },
    round_ordering_one: {
      value: "",
      error: false,
      errorMessage: "Primer críterio de orden de ronda requerido"
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
    scope: {
      value: "",
      error: false,
      errorMessage: "Alcance del torneo, requerido"
    },
    startDate: {
      value: "",
      error: false,
      errorMessage: "Fecha de Inicio del torneo, requerido"
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
    summary: {
      value: "",
      error: false,
      errorMessage: ""
    },
    timeRound:{
      value: "",
      error: false,
      errorMessage: 'Tiempo por Rondas requerida'
    },
    pointRound:{
      value: "",
      error: false,
      errorMessage: 'Puntos por Rondas requerida'
    },
    level: {
      value: "",
      error: false,
      errorMessage: "Nilve del torneo, requerido"
    },


    usesSegmentation: {
      value: true,
      error: false,
      errorMessage: ""
    },

    amountSegmentationRound: {
      value: "",
      error: false,
      errorMessage: "Cantidad de rondas a segmentar, requerido"
    },

    segmentationType: {
      value: "",
      error: false,
      errorMessage: "Seleccione el tipo de Segmentación a utilizar"
    },

    number_rounds: {
      value: "",
      error: false,
      errorMessage: "Cantidad de rondas del torneo requeridas"
    },


    lst_categories: {
      value: "",
      error: false,
      errorMessage: ""
    },
    tourneyId: {
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
          scope: {
            value: data.data.scope,
            error: false,
            errorMessage: "Alcance del torneo, requerido"
          },
          level: {
            value: data.data.level,
            error: false,
            errorMessage: "Nivel del torneo, requerido"
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
          
          number_rounds: {
            value: data.data.number_rounds,
            error: false,
            errorMessage: "Cantidad de rondas del torneo requeridas"
          },
                
          absent_point: {
            value: data.data.absences_point,
            error: false,
            errorMessage: 'Los puntos a otorgar por ausencia o abandono son requeridos'
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
          event_ordering_dir_one: {
            value: data.data.event_ordering_dir_one,
            error: false,
            errorMessage: ""
          },
          event_ordering_dir_two: {
            value: data.data.event_ordering_dir_two,
            error: false,
            errorMessage: ""
          },
          event_ordering_dir_three: {
            value: data.data.event_ordering_dir_three,
            error: false,
            errorMessage: ""
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
          round_ordering_dir_one: {
            value: data.data.round_ordering_dir_one,
            error: false,
            errorMessage: ""
          },
          round_ordering_dir_two: {
            value: data.data.round_ordering_dir_two,
            error: false,
            errorMessage: ""
          },
          round_ordering_dir_three: {
            value: data.data.round_ordering_dir_three,
            error: false,
            errorMessage: ""
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
          
          usesSegmentation: {
            value: data.data.use_segmentation,
            error: false,
            errorMessage: "Cantidad de rondas a segmentar, requerido"
          },

          segmentationType: {
            value: data.data.segmentation_type,
            error: false,
            errorMessage: "Seleccione el tipo de Segmentación a utilizar"
          },
      

          amountSegmentationRound: {
            value: data.data.amount_segmentation_round,
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
    if (tourney.id && reload) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, tourney.id]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const hasError = () => {
    let res = false;
    res = formValues.amountTable.error || formValues.smartTable.error || formValues.pointRound.error || formValues.timeRound.error || formValues.playSystem.error || formValues.lottery.error;

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
        "number_rounds": formValues.number_rounds.value,

        "absences_point": formValues.absent_point.value,
        
        "use_segmentation": formValues.usesSegmentation.value,
        "amount_segmentation_round": formValues.amountSegmentationRound.value,
        "segmentation_type": formValues.segmentationType.value,

        "scope": formValues.scope.value,
        "level": formValues.level.value,

        "event_ordering_one": formValues.event_ordering_one.value,
        "event_ordering_dir_one": formValues.event_ordering_dir_one.value,

        "event_ordering_two": formValues.event_ordering_two.value,
        "event_ordering_dir_two": formValues.event_ordering_dir_two.value,

        "event_ordering_three": formValues.event_ordering_three.value,
        "event_ordering_dir_three": formValues.event_ordering_dir_three.value,

        "round_ordering_one": formValues.round_ordering_one.value,
        "round_ordering_dir_one": formValues.round_ordering_dir_one.value,
        
        "round_ordering_two": formValues.round_ordering_two.value,
        "round_ordering_dir_two": formValues.round_ordering_dir_one.value,
        "round_ordering_three": formValues.round_ordering_three.value,
        "round_ordering_dir_three": formValues.round_ordering_dir_one.value
      }

      try {
        const { data } = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": lang,
            "Authorization": `Bearer ${token}`                
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
                    Categorias
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
                    Críterios para Organizar
                  </NavLink>
                </NavItem>


              </Nav>

              <TabContent activeTab={activeTab}>

                <TabPane tabId="1">

                    <Settings formValues={formValues} setFormValues={setFormValues}/>

                </TabPane>
                <TabPane tabId="2">

                    <Category formValues={formValues} setFormValues={setFormValues} active={activeTab==="3"}/>

                </TabPane>

                <TabPane tabId="3">
                    <Criteria formValues={formValues} setFormValues={setFormValues}/>
                </TabPane>

              </TabContent>

          </CardBody>
        </Card>

      </div>

    </div>

  );
}
