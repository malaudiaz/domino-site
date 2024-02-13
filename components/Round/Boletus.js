import { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Table,
  ModalFooter,
  FormFeedback,
  Col,
  Input,
  InputGroup,
  FormGroup,
  Label,
  Form,
  Badge
} from "reactstrap";

import { useAppContext } from "../../AppContext";

import axios from "axios";
import Swal from "sweetalert2";

export default function Boletus({ open, close, record, readOnly, setActiveRound}) {
  const { token, lang } = useAppContext();
  const [openData, setOpenData] = useState(false);
  const [boletus, setBoletus] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [reload, setReload] = useState(true)
  const [isNew, setIsNew] = useState(true);
  const [modalOpt, setModalOpt] = useState("");

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
    }
  });

  const [frmNull, setFrmNull] = useState({
    motive: "",
    player: "",
    isOut: false
  });

  const [frmPenalty, setFrmPenalty] = useState({
    motive: "",
    player_0: "",
    player_1: "",
    player_2: "",
    player_3: "",
    point: ""
  });

  const [frmAbsent, setFrmAbsent] = useState({
    motive: "",
    player_0: "",
    player_1: "",
    player_2: "",
    player_3: "",
    point: ""
  });


  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const toggle = () => {
    close();
  }

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${record.boletus_id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setBoletus(data.data);
        const gover = data.data.number_points_to_win === data.data.pair_one.total_point || data.data.number_points_to_win === data.data.pair_two.total_point;
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
    if (record.boletus_id) {
      fetchData();
    }
  }, [record, reload, gameOver]);

  const handleNew = (item, btn) => {
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
          }            
        })
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
          }            
        })
      }
      setIsNew(false);
    } else {
      setIsNew(true);
    }
    setModalOpt(btn);
    setOpenData(true);
  };

  const saveData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${isNew ? record.boletus_id : frmData.id.value}`;

    const body = {
      pair: frmData.pair.value,
      point: frmData.point.value
    };

    try {
      const { data } = await axios[isNew ? "post" : "put"](url, body, config);

      if (data.success) {

        if (setActiveRound) {
          setActiveRound(data.data)
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
        })
        setReload(true);

        if (boletus.pair_one.pairs_id === frmData.pair.value) {
          if ((boletus.pair_one.total_point+parseInt(frmData.point.value)) >= boletus.number_points_to_win) {
            setGameOver(true);
            setOpenData(false);
          }
        } else {
          if ((boletus.pair_two.total_point+parseInt(frmData.point.value)) >= boletus.number_points_to_win) {
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

  const saveNull = async () => {
    console.log(frmNull);

    // const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${isNew ? record.boletus_id : frmData.id.value}`;

    // const body = {
    //   player_id: frmNull.player,
    //   motive: frmNull.motive,
    //   out: frmNull.isOut
    // };

    // try {
    //   const { data } = await axios.post(url, body, config);

    //   if (data.success) {
    //     setFrmNull({
    //       motive: "",
    //       player: "",
    //       isOut: false
    //     });

    //     setGameOver(true);
    //     setOpenData(false);

    //   }
    // } catch ({ code, message, name, request }) {
    //   if (code === "ERR_NETWORK") {
    //     Swal.fire({
    //       title: "Anular Boleta",
    //       text: "Error en su red, consulte a su proveedor de servicio",
    //       icon: "error",
    //       showCancelButton: false,
    //       allowOutsideClick: false,
    //       confirmButtonColor: "#3085d6",
    //       confirmButtonText: "Aceptar",
    //     });
    //   } else {
    //     if (code === "ERR_BAD_REQUEST") {
    //       const { detail } = JSON.parse(request.response);
    //       Swal.fire({
    //         title: "Anular Boleta",
    //         text: detail,
    //         icon: "error",
    //         showCancelButton: false,
    //         allowOutsideClick: false,
    //         confirmButtonColor: "#3085d6",
    //         confirmButtonText: "Aceptar",
    //       });
    //     }
    //   }
    // }
  }

  const savePenalty = async () => {
    console.log(frmPenalty);

    // const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${isNew ? record.boletus_id : frmData.id.value}`;

    // const body = {
    //   player_id: frmNull.player,
    //   motive: frmNull.motive,
    //   out: frmNull.isOut
    // };

    // try {
    //   const { data } = await axios.post(url, body, config);

    //   if (data.success) {
    //     setFrmNull({
    //       motive: "",
    //       player: "",
    //       isOut: false
    //     });

    //     setGameOver(true);
    //     setOpenData(false);

    //   }
    // } catch ({ code, message, name, request }) {
    //   if (code === "ERR_NETWORK") {
    //     Swal.fire({
    //       title: "Anular Boleta",
    //       text: "Error en su red, consulte a su proveedor de servicio",
    //       icon: "error",
    //       showCancelButton: false,
    //       allowOutsideClick: false,
    //       confirmButtonColor: "#3085d6",
    //       confirmButtonText: "Aceptar",
    //     });
    //   } else {
    //     if (code === "ERR_BAD_REQUEST") {
    //       const { detail } = JSON.parse(request.response);
    //       Swal.fire({
    //         title: "Anular Boleta",
    //         text: detail,
    //         icon: "error",
    //         showCancelButton: false,
    //         allowOutsideClick: false,
    //         confirmButtonColor: "#3085d6",
    //         confirmButtonText: "Aceptar",
    //       });
    //     }
    //   }
    // }
  }

  const saveAbsent = async () => {
    console.log(frmAbsent);

    // const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/data/${isNew ? record.boletus_id : frmData.id.value}`;

    // const body = {
    //   player_id: frmNull.player,
    //   motive: frmNull.motive,
    //   out: frmNull.isOut
    // };

    // try {
    //   const { data } = await axios.post(url, body, config);

    //   if (data.success) {
    //     setFrmAbsent({
    //       motive: "",
    //       player_0: "",
    //       player_1: "",
    //       player_2: "",
    //       player_3: "",
    //       point: ""
    //     });

    //     setGameOver(true);
    //     setOpenData(false);

    //   }
    // } catch ({ code, message, name, request }) {
    //   if (code === "ERR_NETWORK") {
    //     Swal.fire({
    //       title: "Anular Boleta",
    //       text: "Error en su red, consulte a su proveedor de servicio",
    //       icon: "error",
    //       showCancelButton: false,
    //       allowOutsideClick: false,
    //       confirmButtonColor: "#3085d6",
    //       confirmButtonText: "Aceptar",
    //     });
    //   } else {
    //     if (code === "ERR_BAD_REQUEST") {
    //       const { detail } = JSON.parse(request.response);
    //       Swal.fire({
    //         title: "Anular Boleta",
    //         text: detail,
    //         icon: "error",
    //         showCancelButton: false,
    //         allowOutsideClick: false,
    //         confirmButtonColor: "#3085d6",
    //         confirmButtonText: "Aceptar",
    //       });
    //     }
    //   }
    // }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (modalOpt) {
      case "DATA":
        saveData();
        break;
      case "PENALTY":
        console.log(frmPenalty);
        savePenalty();
        break;
      case "ABSENT":
        saveAbsent();
        break;
      case "NULL": 
        saveNull()
        break;
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;

    const value = event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;    

    if (modalOpt === "DATA") {
      setFrmData({
        ...frmData,
        [name]: {
          ...frmData[name],
          error: value === "",
          value,
        },
      });
    }

    if (modalOpt === "NULL") {
      setFrmNull({
        ...frmNull,
        [name]: value
      })
    }

    if (modalOpt === "PENALTY") {
      setFrmPenalty({
        ...frmPenalty,
        [name]: value
      })
    }
    
  };

  const closeByTime = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/closedata/${record.boletus_id}`;

    try {
      const { data } = await axios.post(url, {}, config);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Cerrar Boleta por Tiempo",
          text: data.detail,
          showConfirmButton: true,
        });
        setFrmData({
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
        })
        setOpenData(false);
        setReload(true);
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

  return (
    <Modal
      id="boletus"
      isOpen={open}
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader
        toggle={toggle}
      >
        <small>Boleta</small>
      </ModalHeader>
      <ModalBody style={{height: "550px", overflowY: "auto"}}>
        <div className="d-flex flex-row justify-content-between align-items-center px-4 py-2">
          <div className="d-flex flex-row">
            <strong>Ronda: {boletus.round_number}</strong>
            <strong className="ps-4">Mesa: {boletus.table_number}</strong>
          </div>

          {(record.status === "0" && readOnly === false && gameOver === false) && (
            <div>
              <Button
                color="primary"
                size="sm"
                title="Nueva Data"
                onClick={(e) => {
                  e.preventDefault();
                  handleNew(null, 'DATA');
                }}
              >
                <i class="bi bi-plus-circle"></i>
              </Button>&nbsp;

              <Button
                color="secondary"
                size="sm"
                title="Penalizaciones"
                onClick={(e) => {
                  e.preventDefault();
                  handleNew(null, 'PENALTY');
                }}
              >
                <i class="bi bi-hand-thumbs-down"></i>
              </Button>&nbsp;


              <Button
                color="secondary"
                size="sm"
                title="Ausencias"
                onClick={(e) => {
                  e.preventDefault();
                  handleNew(null, 'ABSENT');
                }}
              >
                <i class="bi bi-person-dash"></i>
              </Button>&nbsp;

              <Button
                color="secondary"
                size="sm"
                title="Anular Boleta"
                onClick={(e) => {
                  e.preventDefault();
                  handleNew(null, 'NULL');
                }}
              >
                <i class="bi bi-file-earmark-x"></i>
              </Button>&nbsp;

              <Button 
                color="danger" 
                size="sm" 
                title="Cerrar por Tiempo"
                onClick={(e)=>{
                  handleClose(e);
                }}
              >
                <i class="bi bi-clock-history"></i>
              </Button>
            </div>
          )}
        </div>
        <Table hover responsive size="sm" striped borderless bordered>
          <thead>
            <tr>
              <th className="text-center">Data</th>
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
                    <a 
                      className="edit" 
                      title="Editar" 
                      onClick={
                        (e)=>{
                          e.preventDefault();
                          handleNew(item, 'DATA');
                        }
                      }>
                      <i class="bi bi-pencil-square"></i>
                    </a>
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

        <Modal
          id="new_data"
          isOpen={openData}
          size="sm"
          backdrop={"static"}
          keyboard={true}
          centered={true}
        >
          <ModalHeader
            toggle={(e) => {
              setOpenData(false);
            }}
          >
            {modalOpt === "DATA" && <small>{frmData.id==="" ? "Nueva Data" : "Modificar Data"}</small>}
            {modalOpt === "PENALTY" && <small>Penalizaciones</small>}
            {modalOpt === "ABSENT" && <small>Ausencias</small>}
            {modalOpt === "NULL" && <small>Anular Boleta</small>}
          </ModalHeader>
          <Form onSubmit={handleSubmit} autoComplete="off">
            {modalOpt === "DATA" && <ModalBody>
              <FormGroup row>
                <Label size="sm" sm={3}>
                  Ganador:
                </Label>
                <Col sm={9}>
                  <FormGroup check>
                    <Input
                      id="pair"
                      name="pair"
                      value={boletus.pair_one ? boletus.pair_one.pairs_id : ""}
                      checked={boletus.pair_one ? (boletus.pair_one.pairs_id === frmData.pair.value ? true : false) : false}
                      onChange={handleChange}
                      type="radio"
                    />
                    {' '}
                    <Label check>
                      {boletus.pair_one ? boletus.pair_one.name : ""}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      id="pair"
                      name="pair"
                      value={boletus.pair_two ? boletus.pair_two.pairs_id : ""}
                      checked={boletus.pair_two ? (boletus.pair_two.pairs_id === frmData.pair.value ? true : false) : false}
                      onChange={handleChange}
                      type="radio"
                    />
                    {' '}
                    <Label check>
                      {boletus.pair_two ? boletus.pair_two.name : ""}
                    </Label>
                  </FormGroup>                  
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label size="sm" sm={3}>
                  Puntos:
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      id="point"
                      name="point"
                      size="sm"
                      invalid={frmData.point.error}
                      value={frmData.point.value}
                      placeholder="Puntos"
                      onChange={handleChange}
                    />
                    <FormFeedback>{frmData.point.errorMessage}</FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>

            </ModalBody>}
            {modalOpt === "PENALTY" && <ModalBody>

              <FormGroup row>
                <Label size="sm" sm={3}>
                  Motivo:
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      type="select"
                      name="motive"
                      id="motive"
                      placeholder="Motivo"
                      defaultValue={frmPenalty.motive}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione Motivo</option>
                      <option value="0">Amonestaciones</option>
                      <option value="1">Tarjeta Amarilla</option>
                      <option value="2">Tarjeta Roja</option>
                    </Input>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup tag="fieldset">

                <h5>Jugadores:</h5>

                {boletus.lst_players.map((player, idx) => (
                  <FormGroup check key={idx}>
                    <Input type="radio" name={"player_"+idx} value={player.profile_id} onChange={handleChange} />
                    {' '}
                    <Label check>
                      <Badge color="info" pill>{player.position_id}</Badge> {player.profile_name}
                    </Label>
                  </FormGroup>
                ))}

              </FormGroup>

              <FormGroup row>
                <Label size="sm" sm={3}>
                  Puntos:
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      id="point"
                      name="point"
                      size="sm"
                      value={frmPenalty.point}
                      placeholder="Puntos"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

            </ModalBody>}
            {modalOpt === "ABSENT" && <ModalBody>


              <FormGroup tag="fieldset">
                <FormGroup inline check>
                  <Input
                    name="motive"
                    type="radio"
                    checked={frmAbsent.motive==="0"}
                    value={frmAbsent.motive}
                  />
                  {' '}
                  <Label check>
                    Llegada Tarde
                  </Label>
                </FormGroup>
                <FormGroup inline check>
                  <Input
                    name="motive"
                    type="radio"
                    checked={frmAbsent.motive==="1"}
                    value={frmAbsent.motive}
                  />
                  {' '}
                  <Label check>
                    Abandono
                  </Label>
                </FormGroup>
              </FormGroup>


              <FormGroup tag="fieldset">

                <h5>Jugadores:</h5>

                {boletus.lst_players.map((player, idx) => (

                  <FormGroup check key={idx}>
                    <Input type="radio" name={"player_"+idx} value={player.profile_id} onChange={handleChange} />
                    {' '}
                    <Label check>
                      <Badge color="info" pill>{player.position_id}</Badge> {player.profile_name}
                    </Label>
                  </FormGroup>

                ))}

              </FormGroup>

              </ModalBody>}

              {modalOpt === "NULL" && <ModalBody>
                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Motivo:
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="select"
                        name="motive"
                        id="motive"
                        placeholder="Motivo de Anulación de la Boleta"
                        defaultValue={frmNull.motive}
                        onChange={handleChange}
                      >
                        <option value="">Selecciones el Motivo</option>
                        <option value="0">Sentarse Incorrectamene</option>
                        <option value="1">Error de Anotación</option>
                        <option value="2">Conducta Antideportiva</option>
                      </Input>
                    </InputGroup>
                  </Col>
                </FormGroup>

                {frmNull.motive==2 &&
                  <>
                    <FormGroup tag="fieldset">

                      <h5>Jugadores:</h5>

                      {boletus.lst_players.map((player, idx) => (

                        <FormGroup check key={idx}>
                          <Input
                            name="player"
                            type="radio"
                            value={player.profile_id}
                            checked={frmNull.player === player.profile_id}
                            onChange={handleChange}
                          />
                          {' '}
                          <Label check>
                            <Badge color="info" pill>{player.position_id}</Badge> {player.profile_name}
                          </Label>
                        </FormGroup>

                      ))}

                    </FormGroup>

                    <Input type="checkbox" name="isOut" checked={frmNull.isOut} onChange={handleChange} />
                    {' '}
                    <Label check>
                      El jugador es Expulsado.
                    </Label>
                  </>
                }

            </ModalBody>}

            <ModalFooter>
              <Button type="submit" color="primary" size="sm">
                Aceptar
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenData(false);
                }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </ModalBody>
    </Modal>
  );
}
