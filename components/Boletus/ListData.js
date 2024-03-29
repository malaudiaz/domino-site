import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";

import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import Data from "./Data";

export default function ListData({ record, readOnly, setActiveRound, active }) {
  const { token, lang } = useAppContext();
  const [boletus, setBoletus] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [reload, setReload] = useState(true);
  const [openData, setOpenData] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const [frmData, setFrmData] = useState({
    id: {
      value: "",
      error: false,
      errorMessage: "Id de la data",
    },
    pair: {
      value: "",
      error: false,
      errorMessage: "Debe seleccionar la pareja Ganadora",
    },
    point: {
      value: "",
      error: false,
      errorMessage: "Teclee los puntos obtenidos",
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${record.boletus_id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setBoletus(data.data);
        const gover =
          data.data.number_points_to_win === data.data.pair_one.total_point ||
          data.data.number_points_to_win === data.data.pair_two.total_point;
        setGameOver(gover);
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
    if (reload && active) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [reload, active]);

  const handleNew = (item) => {
    if (item) {
      if (item.pair_one > item.pair_two) {
        setFrmData({
          id: {
            value: item.data_id,
            error: false,
            errorMessage: "Id de la data",
          },
          pair: {
            value: boletus.pair_one.pairs_id,
            error: false,
            errorMessage: "Debe seleccionar la pareja Ganadora",
          },
          point: {
            value: item.pair_one,
            error: false,
            errorMessage: "Teclee los puntos obtenidos",
          },
        });
      } else {
        setFrmData({
          id: {
            value: item.data_id,
            error: false,
            errorMessage: "Id de la data",
          },
          pair: {
            value: boletus.pair_two.pairs_id,
            error: false,
            errorMessage: "Debe seleccionar la pareja Ganadora",
          },
          point: {
            value: item.pair_two,
            error: false,
            errorMessage: "Teclee los puntos obtenidos",
          },
        });
      }
      setIsNew(false);
    } else {

        setFrmData({
          id: {
            value: "",
            error: false,
            errorMessage: "Id de la data",
          },
          pair: {
            value: "",
            error: false,
            errorMessage: "Debe seleccionar la pareja Ganadora",
          },
          point: {
            value: "",
            error: false,
            errorMessage: "Teclee los puntos obtenidos",
          }
        });

        setIsNew(true);
    }
    
    setOpenData(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    frmData.pair.error = frmData.pair.value === "";
    frmData.point.error = frmData.point.value === "";

    if (!frmData.pair.error && !frmData.point.error) {

      const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${
        isNew ? record.boletus_id : frmData.id.value
      }`;

      const body = {
        pair: frmData.pair.value,
        point: frmData.point.value,
      };

      try {
        const { data } = await axios[isNew ? "post" : "put"](url, body, config);

        if (data.success) {
          if (setActiveRound) {
            setActiveRound(data.data);
          }

          setFrmData({
            ...frmData,
            pair: {
              value: frmData.pair.value,
              error: false,
              errorMessage: "Debe seleccionar la pareja Ganadora",
            },
            point: {
              value: "",
              error: false,
              errorMessage: "Teclee los puntos obtenidos",
            },
          });
          setReload(true);

          if (boletus.pair_one.pairs_id === frmData.pair.value) {
            if (
              boletus.pair_one.total_point + parseInt(frmData.point.value) >=
              boletus.number_points_to_win
            ) {
              setGameOver(true);
              setOpenData(false);
            }
          } else {
            if (
              boletus.pair_two.total_point + parseInt(frmData.point.value) >=
              boletus.number_points_to_win
            ) {
              setGameOver(true);
              setOpenData(false);
            }
          }
        }
      } catch ({ code, message, name, request }) {
        if (code === "ERR_NETWORK") {
          Swal.fire({
            title: "Guardando Data",
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
              title: "Guardando Data",
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

  return (
    <div className="py-3 px-4" style={{ height: "500px", overflowY: "auto" }}>
      <div className="d-flex flex-row justify-content-between align-items-center pb-2">
        <div>
          <h6>Resumen de la Partida</h6>
        </div>
        <div>
            <Button
              color="primary"
              size="sm"
              title="Nueva Data"
              disabled={(record.status === "1" && gameOver === true && record.can_update === false) || readOnly === true}
              onClick={(e) => {
                e.preventDefault();
                handleNew(null);
              }}
            >
              <i className="bi bi-plus-circle"></i>
            </Button>
        </div>
      </div>
      <Table hover responsive size="sm" striped borderless bordered>
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">
              {boletus.pair_one && boletus.pair_one.name}
            </th>
            <th className="text-center">
              {boletus.pair_two && boletus.pair_two.name}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {boletus.lst_data &&
            boletus.lst_data.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center">{item.number}</td>
                <td className="text-center">{item.pair_one}</td>
                <td className="text-center">{item.pair_two}</td>
                <td className="text-center">
                {(record.status === "0" && readOnly === false && gameOver === false) || record.can_update ? (
                  <a
                    className="edit"
                    title="Editar"                    
                    onClick={(e) => {
                      e.preventDefault();
                      handleNew(item);
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </a>) : (
                    <a
                      className="edit"
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </a>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="text-center">Total</th>
            <th className="text-center">
              {boletus.pair_one && boletus.pair_one.total_point}
            </th>
            <th className="text-center">
              {boletus.pair_two && boletus.pair_two.total_point}
            </th>
            <th className="text-center">&nbsp;</th>
          </tr>
        </tfoot>
      </Table>

      <Data
        frmData={frmData}
        setFrmData={setFrmData}
        openData={openData}
        setOpenData={setOpenData}
        boletus={boletus}
        isNew={isNew}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
