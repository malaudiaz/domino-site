import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import { Button, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import Lottery from "../Round/Lottery";
import Tables from "../../components/Round/Tables";
import Info from "../../components/Round/Info";
import PlayerRaiting from "../Round/PlayerRaiting";
import PairsRaiting from "../Round/PairsRaiting";
import PrintBoletus from "../Boletus/Print";

export default function Rounds({ tourney, readOnly }) {
  const { token, lang } = useAppContext();
  const [rounds, setRounds] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [activeRound, setActiveRound] = useState(null);
  const [reload, setReload] = useState(true);
  const [openPrn, setOpenPrn] = useState(false);

  const [selected, setSelected] = useState([]);

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
        // setActiveRound(null);
        setReload(false);
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
    if (tourney.id && reload) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourney.id, selected, reload]);

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

  const createRound = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/actions/create/${tourney.id}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data.success) {

        Swal.fire({
          icon: "success",
          title: "Creando Ronda",
          text: data.detail,
          showConfirmButton: true,
        });

        setActiveRound(data.data);
        setReload(true);

      }
    } catch ({code, message, name, request}) {
      console.log(message);
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Creando Ronda",
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
            title: "Creando Ronda",
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

  const closeTourney = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/close/${tourney.id}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data.success) {

        Swal.fire({
          icon: "success",
          title: "Cerrando el Torneo",
          text: data.detail,
          showConfirmButton: true,
        });

        setActiveRound(data.data);
        setReload(true);

      }
    } catch ({code, message, name, request}) {
      console.log(message);
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cerrando el Torneo",
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
            title: "Cerrando el Torneo",
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

  const handleSubmit = async () => {

    if (selected.length === activeRound.amount_players_playing || activeRound.status_name !== "CREATED") {
    
      let url = `${process.env.NEXT_PUBLIC_API_URL}rounds/actions`;
      let body = {};
      let msgTitle = "";

      switch (activeRound.status_name) {
        case "CREATED":
          msgTitle = "Configurando Ronda";
          url = url + `/aperture/${activeRound.id}`;
          body["lottery"] = selected;
          break;
        case "CONFIGURATED":
          msgTitle = "Publicando Ronda";
          url = url + `/publicate/${activeRound.id}`;
          break;
        case "PUBLICATED":
          msgTitle = "Iniciando Ronda";
          url = url + `/started/${activeRound.id}`;
          break;
        case "REVIEW":
          msgTitle = "Cerrando Ronda";
          url = url + `/close/${activeRound.id}`;
          break;
      }    

      try {
        const { data } = await axios.post(url, body, config);
        if (data.success) {

          Swal.fire({
            icon: "success",
            title: msgTitle,
            text: data.detail,
            showConfirmButton: true,
          });

          setActiveRound(data.data);

          if (activeRound.status_name === "REVIEW") {
            if (activeRound.is_last) {

              Swal.fire({
                title: "Cerrar Ronda",
                text: "Se va a cerrar la última ronda del torneo, ¿ Desea crear otra ronda ?",
                icon: "question",
                showCancelButton: true,
                cancelButtonText: "No",
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Sí",
              }).then((result) => {
                if (result.isConfirmed) {
                  createRound();
                } else {
                  // Cerrar el torneo
                  closeTourney();
                }
              });
            
            } else {  
              setActiveRound(null);
              setReload(true);
            }
          }  
        }
      } catch ({code, message, name, request}) {
        console.log(message);
        if (code === "ERR_NETWORK") {
          Swal.fire({
            title: msgTitle,
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
              title: msgTitle,
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

    } else {
      Swal.fire({
        title: "Configurando Ronda",
        text: "Debe asignar el número del sorteo a todos los juagadores",
        icon: "info",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  }

  const printBoletus = () => {
    if (activeRound) {
      setOpenPrn(true);
    } else {
      Swal.fire({
        title: "Imprimir Boletas",
        text: "No ha seleccionado la ronda",
        icon: "info",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  }

  return (
    <div>
      <div className="d-flex flex-column flex-wrap gap-1 ps-4">
        {!readOnly && <h1 className="title">Rondas</h1>}
        <div className="d-flex flex-row flex-wrap gap-1 justify-content-between align-items-center pe-4">
          <div className="d-flex flex-row flex-wrap gap-1 align-items-center">
            {rounds.map((item, idx) => (
              <a key={idx} className="ms-2" style={{cursor: "pointer"}} onClick={(e)=>{e.preventDefault(); handleClick(item);}}>

                <span 
                  className={activeRound && item.id!==activeRound.id ? "round badge bg-success rounded-circle fs-6" : "round badge bg-primary rounded-circle fs-6"}
                  id={`outlineTooltip_${idx}`}
                  title={item.summary+" ("+item.status_description.toUpperCase()+")"}
                >
                  {item.round_number}
                </span>
              </a>                            
            ))}
          </div>

          <div className="d-flex flex-row flex-wrap gap-1 align-items-center">
            {/* { activeRound && activeRound.status_name!=="INITIADED" && */}
            {(activeRound && activeRound.status_name!=="CREATED") &&
            <Button color="primary" className="btn btn-sm" onClick={(e)=>{e.preventDefault(); printBoletus()}}>
              <i className="bi bi-printer"></i>&nbsp;Imprimir Boletas
            </Button>}


            { activeRound && activeRound.status_name!=="INITIADED" && activeRound.status_name !== "FINALIZED" && !readOnly && 
              <Button className="btn btn-sm btn-success" onClick={handleSubmit}>              
                {activeRound.status_name==="CREATED" && (
                  <><i className="bi bi-gear"></i>&nbsp;Configurar</>
                )}
                {activeRound.status_name==="CONFIGURATED" && (<><i className="bi bi-check-all"></i>&nbsp;Publicar</>)}
                {activeRound.status_name==="PUBLICATED" && (<><i className="bi bi-play-circle"/>&nbsp;Iniciar</>)}
                {activeRound.status_name==="REVIEW" && (<><i className="bi bi-door-closed"/>&nbsp;Cerrar</>)}
              </Button> 
            }
          </div>
        </div>
      </div>

      <div className="tourney-setting">
        {activeRound && <Card className="flex-fill">
          <CardBody className="p-4">

              <div className="d-flex flex-wrap gap-1 px-2 pb-4 text-center">
                {activeRound && <span className="rounded p-1 bg-info text-white">Ronda No. <b>{activeRound.round_number}</b></span>}
                {activeRound && <span className="rounded p-1 bg-info text-white">Estado: <b>{activeRound.status_description}</b></span>}
                {activeRound && <span className="rounded p-1 bg-info text-white">Mesas: <b>{activeRound.amount_tables}</b></span>}
                {activeRound && <span className="rounded p-1 bg-info text-white">Mesas Jugando: <b>{activeRound.amount_tables_playing}</b></span>}
                {activeRound && <span className="rounded p-1 bg-info text-white">Competidores Jugando: <b>{activeRound.amount_players_playing}</b></span>}
                {activeRound && <span className="rounded p-1 bg-info text-white">Competidores en Espera: <b>{activeRound.amount_players_waiting}</b></span>}
                {activeRound && <span className="rounded p-1 bg-info text-white">Competidores en Pausa: <b>{activeRound.amount_players_pause}</b></span>}
                {activeRound && <span className="rounded p-1 bg-info text-white">Competidores Expulsador: <b>{activeRound.amount_players_expelled}</b></span>}
              </div>

              <Nav tabs>

                {(activeRound.is_first && !readOnly) && <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Sorteo
                  </NavLink>
                </NavItem>}

                {activeRound.status_name!=="CREATED" &&
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Posiciones por Mesa
                  </NavLink>
                </NavItem>}



                {(activeRound.status_name!=="CREATED" && activeRound.modality === "Individual") && <NavItem>
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

                {activeRound.status_name!=="CREATED" &&
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
                </NavItem>}

                {(activeRound.status_name==="INITIADED" || activeRound.status_name==="FINALIZED" || activeRound.status_name==="REVIEW") &&
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "5" })}
                    onClick={() => {
                      toggleTab("5");
                    }}
                  >
                    {readOnly ? "Puntuaciones" : "Entrada de Datos"}
                  </NavLink>
                </NavItem>}
              </Nav>

              <TabContent activeTab={activeTab}>
              {(activeRound.is_first && !readOnly) && <TabPane tabId="1">
                  <Lottery 
                    activeRound={activeRound} 
                    tourney={tourney} 
                    selected={selected}
                    setSelected={setSelected}
                    active={activeTab==="1"}
                  />
                </TabPane>}

                {activeRound.status_name!=="CREATED" &&
                <TabPane tabId="2">
                  <Tables round={activeRound.id} edited={false} active={activeTab==="2"}/>
                </TabPane>}

                {(activeRound.status_name!=="CREATED" && activeRound.modality === "Individual") &&
                <TabPane tabId="3">
                  <PlayerRaiting tourney={tourney} round={activeRound} active={activeTab==="3"}/>
                </TabPane>}

                {activeRound.status_name!=="CREATED" &&
                <TabPane tabId="4">
                    <PairsRaiting tourney={tourney} round={activeRound} active={activeTab==="4"} />
                </TabPane>}

                {(activeRound.status_name==="INITIADED" || activeRound.status_name==="FINALIZED" || activeRound.status_name==="REVIEW") &&
                <TabPane tabId="5">
                  <Info round={activeRound} readOnly={readOnly} setActiveRound={setActiveRound} active={activeTab==="5"}/>
                </TabPane>}

              </TabContent>
          </CardBody>
        </Card>}
      </div>

      {activeRound && <PrintBoletus open={openPrn} setOpen={setOpenPrn} roundId={activeRound.id}/>}

    </div>
  );
}
