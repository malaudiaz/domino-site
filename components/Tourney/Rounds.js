import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import OutlineTooltip from "../Tooltip/OutlineTooltip";
import { Button, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import Raiting from "../Round/Raiting";
import Lottery from "../Round/Lottery";
import Tables from "../../components/Round/Tables";
import Info from "../../components/Round/Info";

export default function Rounds({ tourney }) {
  const { token, lang } = useAppContext();
  const [rounds, setRounds] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [activeRound, setActiveRound] = useState(null);
  const [reload, setReload] = useState(true);
  const [msgTitle, setMsgTitle] = useState("");

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
        setActiveRound(null);
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
    if (tourney.id) {
      fetchData();
    }
  }, [tourney.id, selected, reload]);

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

    if (selected.length === activeRound.amount_players_playing || activeRound.status_name !== "CREATED") {
    
      let url = `${process.env.NEXT_PUBLIC_API_URL}rounds/actions`;
      let body = {}

      switch (activeRound.status_name) {
        case "CREATED":
          setMsgTitle("Configurando Ronda");
          url = url + `/aperture/${activeRound.id}`;
          body["lottery"] = selected;
          break;
        case "CONFIGURATED":
          setMsgTitle("Publicando Ronda");
          url = url + `/publicate/${activeRound.id}`;
          break;
        case "PUBLICATED":
          setMsgTitle("Iniciando Ronda");
          url = url + `/started/${activeRound.id}`;
          break;
        case "INITIADED":
          setMsgTitle("Iniciando Ronda");
          url = url + `/started/${activeRound.id}`;
          break;
        case "REVIEW":
          setMsgTitle("Cerrando Ronda");
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

          { activeRound && activeRound.status_name!=="INITIADED" && 
            <Button  className="btn btn-sm btn-success" onClick={handleSubmit}>              
              {activeRound.status_name==="CREATED" && (
                <><i class="bi bi-gear"></i>&nbsp;Configurar</>
              )}
              {activeRound.status_name==="CONFIGURATED" && (<><i class="bi bi-check-all"></i>&nbsp;Publicar</>)}
              {activeRound.status_name==="PUBLICATED" && (<><i class="bi bi-play-circle"/>&nbsp;Iniciar</>)}
              {activeRound.status_name==="REVIEW" && (<><i class="bi bi-door-closed"/>&nbsp;Cerrar</>)}
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
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Sorteo
                  </NavLink>
                </NavItem>

                {activeRound.modality === "Individual" && <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Posiciones por Jugador
                  </NavLink>
                </NavItem>}

                {activeRound.status_name!=="CREATED" &&
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    Posiciones por Pareja
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
                    Posiciones por Mesa
                  </NavLink>
                </NavItem>}

                {activeRound.status_name==="INITIADED" &&
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "5" })}
                    onClick={() => {
                      toggleTab("5");
                    }}
                  >
                    Entrada de Datos
                  </NavLink>
                </NavItem>}

                {/* <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "6" })}
                    onClick={() => {
                      toggleTab("6");
                    }}
                  >
                    Resultados
                  </NavLink>
                </NavItem> */}
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Lottery 
                    activeRound={activeRound} 
                    tourney={tourney} 
                    selected={selected}
                    setSelected={setSelected}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <Raiting round={activeRound.id} />
                </TabPane>
                <TabPane tabId="3">
                  <Raiting round={activeRound.id} />
                </TabPane>
                <TabPane tabId="4">
                  <Tables round={activeRound.id} edited={false} />
                </TabPane>
                <TabPane tabId="5">
                  <Info round={activeRound.id} edited={true} setRefresh={setReload} />
                </TabPane>
                <TabPane tabId="6">
                </TabPane>
              </TabContent>
          </CardBody>
        </Card>}
      </div>
    </div>
  );
}
