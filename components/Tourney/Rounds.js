import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import OutlineTooltip from "../Tooltip/OutlineTooltip";
import { Button, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import GeneralSetting from "../Round/Setting";

export default function Rounds({ tourney }) {
  const { token, lang } = useAppContext();
  const [rounds, setRounds] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [activeRound, setActiveRound] = useState(null);

  const [settingValues, setSettingValues] = useState({
    applySegmentation: {
      value: "",
      error: false,
      errorMessage: "Indique sí desea utilizar la segmentación en esta ronda"
    },
    applyBonus: {
      value: "",
      error: false,
      errorMessage: "Indique sí desea utilizar la Bonificación en esta ronda"
    },
    amountBonusTable: {
      value: 0,
      error: false,
      errorMessage: "Indique lo cantidad de mesas a bonificar en esta ronda"
    },
    amountBonusPoint: {
      value: 0,
      error: false,
      errorMessage: "Indique lo cantidad de puntos a bonificar en esta ronda"
    }
  });

  const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "accept-Language": lang,
        "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/rounds/?tourney_id=${tourney.id}&page=${0}&per_page=${0}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRounds(data.data); 
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Iniciando ronda del Torneo",
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
            title: "Iniciando ronda del Torneo",
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
  }, [tourney.id]);

  const roundTipInfo = (item) => {
    return (
      <div className="d-flex flex-column flex-fill ms-4">
        <h6><b>{item.summary}</b></h6>
        <small className="comment-text fs-12">
            Fecha Inicio: <b>{item.start_date}</b>
        </small>
        {item.close_date !== "" &&
            <small className="comment-text fs-12">
                Fecha Final: <b>{item.close_date}</b>
            </small>
        }
        <small className="comment-text fs-12">
            Estado: <b>{item.status_description.toUpperCase()}</b>
        </small>
      </div>

    )
  }

  const handleRound = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/actions/aperture/${id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setActiveRound(data.data);
        setSettingValues({
          applySegmentation: {
            ...settingValues["applySegmentation"],
            value: data.data.use_segmentation
          },
          applyBonus: {
            ...settingValues["applyBonus"],
            value: data.data.use_bonus
          },
          amountBonusTable: {
            ...settingValues["amountBonusTable"],
            value: data.data.amount_bonus_tables
          },
          amountBonusPoint: {
            ...settingValues["amountBonusPoint"],
            value: data.data.amount_bonus_points
          }
        });
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Ronda del Torneo",
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
            title: "Ronda del Torneo",
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

  const handleClick = (item) => {
    handleRound(item.id);
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleSubmit = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}rounds/actions`;
    let body = {}

    switch (activeRound.status_name) {
      case "CREATED":
        url = url + `/aperture/${activeRound.id}`;
        body["use_segmentation"] = settingValues.applySegmentation.value;
        body["use_bonus"] = settingValues.applyBonus.value;
        body["amount_bonus_tables"] = settingValues.amountBonusTable.value;
        body["amount_bonus_points"] = settingValues.amountBonusPoint.value;
        break;
      case "CONFIGURATED":
        break;
      case "PUBLICATED":
        break;
      case "REVIEW":
        break;
    }    

    try {
      const { data } = await axios.post(url, body, config);
      if (data.success) {

        Swal.fire({
          icon: "success",
          title: "Configurando Ronda",
          text: data.detail,
          showConfirmButton: true,
        });

      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Configurando Ronda",
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
            title: "Configurando Ronda",
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

  return (
    <div>
      <div className="d-flex flex-column flex-wrap gap-1 ps-4">
        <h1 className="title">Rondas</h1>
        <div className="d-flex flex-row flex-wrap gap-1 justify-content-between align-items-center pe-4">
        {rounds.map((item, idx) => (
          <a key={idx} className="ms-2" style={{cursor: "pointer"}} onClick={(e)=>{e.preventDefault(); handleClick(item);}}>

            <span 
              className={activeRound && item.id!==activeRound.id ? "round badge bg-primary rounded-circle fs-6" : "round badge bg-success rounded-circle fs-6"}
              id={'outlineTooltip'}
            >
              {item.round_number}
            </span>

            <OutlineTooltip
              placement="bottom"
              target="outlineTooltip"
              message={roundTipInfo(item)}
            />    
          </a>                            
        ))}

          { activeRound && activeRound.status_name && 
            <Button size="sm" color="success" onClick={handleSubmit}>              
              {activeRound.status_name==="CREATED" && "Configurar"}
              {activeRound.status_name==="CONFIGURATED" && "Publicar"}
              {activeRound.status_name==="PUBLICATED" && "Iniciar"}
              {activeRound.status_name==="REVIEW" && "Cerrar"}
            </Button> 
          }

        </div>
      </div>

      <div className="tourney-setting">
        {activeRound && <Card className="flex-fill">
          <CardBody className="p-4">

              <div className="d-flex flex-wrap gap-2 justify-content-between px-2 pb-4">
                {activeRound && <span>Ronda No. <b>{activeRound.round_number}</b></span>}
                {activeRound && <span>Estado: <b>{activeRound.status_description}</b></span>}
                {activeRound && <span>Mesas: <b>{activeRound.amount_tables}</b></span>}
                {activeRound && <span>Mesas Jugando: <b>{activeRound.amount_tables_playing}</b></span>}
                {activeRound && <span>Competidores Jugando: <b>{activeRound.amount_players_playing}</b></span>}
                {activeRound && <span>Competidores en Espera: <b>{activeRound.amount_players_waiting}</b></span>}
                {activeRound && <span>Competidores en Pausa: <b>{activeRound.amount_players_pause}</b></span>}
                {activeRound && <span>Competidores Expulsador: <b>{activeRound.amount_players_expelled}</b></span>}
              </div>

              <Nav tabs>
                {(activeRound.can_segment || activeRound.can_bonus) && <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Ajustes Generales
                  </NavLink>
                </NavItem>}
                {activeRound.is_first && <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Sorteo
                  </NavLink>
                </NavItem>}

                {activeRound.modality === "Individual" && <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    Posiciones por Jugador
                  </NavLink>
                </NavItem>}

                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      toggleTab("4");
                    }}
                  >
                    Posiciones por Pareja
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "5" })}
                    onClick={() => {
                      toggleTab("5");
                    }}
                  >
                    Posiciones por Mesa
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "6" })}
                    onClick={() => {
                      toggleTab("6");
                    }}
                  >
                    Entrada de Datos
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "7" })}
                    onClick={() => {
                      toggleTab("7");
                    }}
                  >
                    Resultados
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <GeneralSetting activeRound={activeRound} settingValues={settingValues} setSettingValues={setSettingValues}/>
                </TabPane>
                <TabPane tabId="2">
                </TabPane>
                <TabPane tabId="3">
                </TabPane>
                <TabPane tabId="4">
                </TabPane>
                <TabPane tabId="5">
                </TabPane>
                <TabPane tabId="6">
                </TabPane>
                <TabPane tabId="7">
                </TabPane>
              </TabContent>

          </CardBody>
        </Card>}

      </div>


      {/* <div className="d-grid pt-3 px-4 pb-4" >
        {rounds.length > 0 ? (
          <div className="container-rounds">
            {rounds.map((item, idx) => (
              <div
                key={idx}
                className="lottery-card align-items-center rounded p-2"
                style={{ height: "120px", background: "#ebebeb" }}
              >
                <div
                  className="d-flex flex-row justify-content-between icons align-items-center"
                  style={{ height: "100%", width: "98%", cursor:"pointer"}}
                  onClick={(e) => {e.preventDefault(); handleClick(item);}}
                >

                  <h3 className="ms-2" >
                    <span className={round === item.id ? "badge bg-primary rounded-circle" : "badge bg-danger rounded-circle"}>
                      {item.round_number}
                    </span>           
                  </h3>          

                  <div className="d-flex flex-column flex-fill ms-4">
                    <h6><b>{item.summary}</b></h6>
                    <small className="comment-text fs-12">
                        Fecha Inicio: <b>{item.start_date}</b>
                    </small>
                    {item.close_date !== "" &&
                        <small className="comment-text fs-12">
                            Fecha Final: <b>{item.close_date}</b>
                        </small>
                    }
                    <small className="comment-text fs-12">
                        Estado: <b>{item.status_description.toUpperCase()}</b>
                    </small>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty message="Las rondas del torneo aparecerán aquí." path1="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        )}
        {totalPages > 1 && (
          <div className="row">
            <Pagination
              onChangePage={onChangePage}
              currentPage={page}
              totalPage={totalPages}
              totalCount={total}
              rowsPerPage={rowsPerPage}
              siblingCount={1}
              showInfo={false}
            />
          </div>
        )}
      </div> */}
    </div>
  );
}
