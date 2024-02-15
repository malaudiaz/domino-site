import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";

import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import Penalty from "./Penalty";

export default function ListPenalty({ record, readOnly }) {
  const { token, lang } = useAppContext();
  const [penaltys, setPenaltys] = useState([]);

  const [reload, setReload] = useState(true);
  const [open, setOpen] = useState(false);

  const [isNew, setIsNew] = useState(true);

  const [frmData, setFrmData] = useState({
    id: {
      value: "",
      error: false,
      errorMessage: ""
    },
    motive: {
      value: "",
      error: false,
      errorMessage: "Debe especificar el motivo",
    },
    player: {
      value: "",
      error: false,
      errorMessage: "Debe seleccionar un jugador",
    },
    point: {
      value: "",
      error: false,
      errorMessage: "Teclee los puntos de la penalización",
    },
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/penalty/${record.boletus_id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setPenaltys(data.data);

        // const gover =
        //   data.data.number_points_to_win === data.data.pair_one.total_point ||
        //   data.data.number_points_to_win === data.data.pair_two.total_point;
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
    if (reload) {
      fetchData();
    }
  }, [reload]);

  const parseMotive = (type) => {
    switch (type) {
      case "Amonestacion":
        return "0";
      case "Tarjeta Amatilla":
        return "1";
      case "Tarjeta Roja":
        return "2"
    }
  }

  const handleNew = (item) => {

    if (item) {
      setFrmData({
        id: {
          value: record.boletus_id,
          error: false,
          errorMessage: "",
        },
        motive: {
          value: parseMotive(item.penalty_type),
          error: false,
          errorMessage: "Debe seleccionar la pareja Ganadora",
        },
        point: {
          value: item.penalty_value,
          error: false,
          errorMessage: "Teclee puntos a penalizar",
        },
      });
      setIsNew(false);
    } else {
      setFrmData({
        id: {
          value: "",
          error: false,
          errorMessage: ""
        },
        motive: {
          value: "",
          error: false,
          errorMessage: "Debe especificar el motivo",
        },
        player: {
          value: "",
          error: false,
          errorMessage: "Debe seleccionar un jugador",
        },
        point: {
          value: "",
          error: false,
          errorMessage: "Teclee los puntos de la penalización",
        }    
      })
      setIsNew(true);
    }
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/penalty/${
      isNew ? record.boletus_id : frmData.id.value
    }`;

    const body = {
      player_id: frmData.player.value,
      penalty_type: frmData.motive.value,
      penalty_value: frmData.point.value
    };

    try {
      const { data } = await axios[isNew ? "post" : "put"](url, body, config);

      if (data.success) {

        setFrmData({
          id: {
            value: "",
            error: false,
            errorMessage: ""
          },
          motive: {
            value: "",
            error: false,
            errorMessage: "Debe especificar el motivo",
          },
          player: {
            value: "",
            error: false,
            errorMessage: "Debe seleccionar un jugador",
          },
          point: {
            value: "",
            error: false,
            errorMessage: "Teclee los puntos de la penalización",
          }    
        })

        setReload(true);

      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Guardando Penalizaciones",
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
            title: "Guardando Penalizaciones",
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

  return (
    <div className="py-3 px-4" style={{ height: "500px", overflowY: "auto" }}>
      <div className="d-flex flex-row justify-content-between align-items-center pb-2">
        <div>
          <h6>Penalizaciones por Jugador</h6>
        </div>
          <div>
            <Button
              color="danger"
              size="sm"
              title="Nueva Penalización"
              disabled={record.status === "0" && record.can_update === false && readOnly === false}
              onClick={(e) => {
                e.preventDefault();
                handleNew(null);
              }}
            >
              <i class="bi bi-hand-thumbs-down"></i>
            </Button>
          </div>
      </div>
      <Table hover responsive size="sm" striped borderless bordered>
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">
              Tipo
            </th>
            <th className="text-center">
              Puntos
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {penaltys.lst_data &&
            penaltys.lst_data.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center">{item.player_name}</td>
                <td className="text-center">{item.penalty_type}</td>
                <td className="text-center">{item.penalty_value}</td>
                <td className="text-center">
                  <a
                    className="edit"
                    title="Editar"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNew(item);
                    }}
                  >
                    <i class="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {Object.entries(penaltys).length > 0 && <Penalty open={open} setOpen={setOpen} penaltys={penaltys} frmData={frmData} setFrmData={setFrmData} handleSubmit={handleSubmit} />}

    </div>
  );
}
