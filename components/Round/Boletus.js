import { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import { useAppContext } from "../../AppContext";

import axios from "axios";
import Swal from "sweetalert2";
import ListData from "../Boletus/ListData";
import classnames from "classnames";
import Absent from "../Boletus/Absent";
import Nulled from "../Boletus/Nulled";
import ListPenalty from "../Boletus/ListPenalty";
import InfoBoletus from "../Boletus/Info";

export default function Boletus({
  open,
  close,
  record,
  readOnly,
  setActiveRound,
}) {
  const { token, lang } = useAppContext();
  const [boletus, setBoletus] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [openAbsent, setOpenAbsent] = useState(false);
  const [openNulled, setOpenNulled] = useState(false);
  const [reload, setReload] = useState(true);

  const [frmAbsentData, setFrmAbsentData] = useState({
    motive: "",
    player_0: "",
    player_1: "",
    player_2: "",
    player_3: "",
    point: ""
  });

  const [frmNullData, setFrmNullData] = useState({
    motive: "",
    player: "",
    isOut: false
  });


  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const toggle = () => {
    close();
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${record.boletus_id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setBoletus(data.data);

        // const gover = data.data.number_points_to_win === data.data.pair_one.total_point || data.data.number_points_to_win === data.data.pair_two.total_point;
        // setGameOver(gover);
        setReload(false);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Jugadores del Torneo",
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
            title: "Cargando Jugadores del Torneo",
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
    if (record.boletus_id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record, reload]);

  const closeByTime = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/closedata/${record.boletus_id}`;

    try {
      const { data } = await axios.post(url, {}, config);

      if (data.success) {
        if (setActiveRound) {
          setActiveRound(data.data);
        }
        close();
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cerrar Boleta por Tiempo",
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
            title: "Cerrar Boleta por Tiempo",
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

  const handleClose = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿ Desea Cerrar la Boleta por Tiempo ?",
      text: "Si continuas, la boleta será cerrada por Tiempo",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        closeByTime();
      }
    });
  };

  const handleSubmitAbsent = async (e) => {
    e.preventDefault();

    const players = "";
    for (let i=0; i<4; i++) {
      if (frmAbsentData["player_"+i] !== "") {
        if (players==="") {
          players = frmAbsentData["player_"+i];
        } else {
          players = players + "," + frmAbsentData["player_"+i];
        }
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/absences/${record.boletus_id}`;

    const body = {
      motive: frmAbsentData.motive,
      players: players,
    };

    try {
      const { data } = await axios.post(url, body, config);

      if (data.success) {

        if (setActiveRound) {
          setActiveRound(data.data);
        }

        setFrmAbsentData({
          motive: "",
          player_0: "",
          player_1: "",
          player_2: "",
          player_3: "",
          point: ""
        });

        setReload(true);
        setOpenAbsent(false);
        close();

      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Guardando Ausencias",
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
            title: "Guardando Ausencias",
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

  const handleSubmitNulled = async (e) => {
    e.preventDefault();

    if (frmNullData.motive !== "") {
        const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/annulled/${record.boletus_id}`;

        const body = {
          player_id: frmNullData.player,
          annulled_type: frmNullData.motive,
          was_expelled: frmNullData.isOut
        };
    
        try {
          const { data } = await axios.post(url, body, config);
    
          if (data.success) {
    
            if (setActiveRound) {
              setActiveRound(data.data);
            }
    
            setFrmNullData({
              motive: "",
              player: "",
              isOut: false
            });

            setReload(true);
            setOpenNulled(false);
            close();
    
    
          }
        } catch ({ code, message, name, request }) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Anulando Boleta",
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
                title: "Anulando Boleta",
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
  };

  const handleOpenBoletus = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/notupdate/${record.boletus_id}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data) {
        if (setActiveRound) {
          setActiveRound(data);
        }
        close();
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Reabrir Boleta",
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
            title: "Reabrir Boleta",
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
    <Modal
      id="boletus"
      isOpen={open}
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader toggle={toggle}>
        <small>Boleta</small>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-row justify-content-between align-items-center px-4 py-2">
          <div className="d-flex flex-row">
            <strong>Ronda: {boletus.round_number}</strong>
            <strong className="ps-4">Mesa: {boletus.table_number}</strong>
          </div>

          <div>
            <Button
              color="secondary"
              size="sm"
              title="Ausencias"
              disabled={record.status === "1" || readOnly}
              onClick={(e) => {
                e.preventDefault();
                setOpenAbsent(true);
              }}
            >
              <i className="bi bi-person-dash"></i>
            </Button>
            &nbsp;
            <Button
              color="secondary"
              size="sm"
              title="Anular Boleta"
              disabled={readOnly}
              onClick={(e) => {
                e.preventDefault();
                setOpenNulled(true);
              }}
            >
              <i className="bi bi-file-earmark-x"></i>
            </Button>
            &nbsp;
            <Button
              color="danger"
              size="sm"
              title="Cerrar por Tiempo"
              disabled={record.status === "1" || readOnly}
              onClick={(e) => {
                handleClose(e);
              }}
            >
              <i className="bi bi-clock-history"></i>
            </Button>
          </div>
        </div>

        {record.can_update ? (
          <>
            <Nav tabs>
              <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    DATAS
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
                  PENALIZACIONES
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <ListData
                  record={record}
                  readOnly={readOnly}
                  setActiveRound={setActiveRound}
                  active={activeTab==="1"}
                />
              </TabPane>
              <TabPane tabId="2">
                <ListPenalty
                  record={record}
                  readOnly={readOnly}
                  setActiveRound={setActiveRound}
                  active={activeTab==="2"}
                />
              </TabPane>
            </TabContent>
          </>
        ) : (
          <InfoBoletus record={record} handleSubmit={handleOpenBoletus} />
        )}
      </ModalBody>

      {Object.entries(boletus).length > 0 && (
        <Absent
          open={openAbsent}
          setOpen={setOpenAbsent}
          frmData={frmAbsentData}
          setFrmData={setFrmAbsentData}
          boletus={boletus}
          handleSubmit={handleSubmitAbsent}
        />
      )}
      {Object.entries(boletus).length > 0 && (
        <Nulled
          open={openNulled}
          setOpen={setOpenNulled}
          frmData={frmNullData}
          setFrmData={setFrmNullData}
          boletus={boletus}
          handleSubmit={handleSubmitNulled}
        />
      )}
    </Modal>
  );
}
