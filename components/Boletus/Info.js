import { useState, useEffect } from "react";
import { FormGroup, Label, Col, Input, InputGroup, Button } from "reactstrap";

import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function InfoBoletus({ record, handleSubmit }) {
    const { token, lang } = useAppContext();

    const [frmData, setFrmData] =useState([]);

    const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "accept-Language": lang,
          Authorization: `Bearer ${token}`,
        }
    };

    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/notupdate/${record.boletus_id}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setFrmData(data.data);
          }
        } catch ({ code, message, name, request }) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Cargando Información de la Boleta",
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
                title: "Cargando Información de la Boleta",
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
        if (record.boletus_id !== "") {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [record]);

    return (
        <div className="py-3 px-4">
            <div className="d-flex flex-row justify-content-between align-items-center pb-2">
                <div>
                    <h6>Información del Cierre de Boleta</h6>
                </div>
                <div>
                    <Button
                        color="primary"
                        size="sm"
                        title="Volver a abrir la Boleta"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <i className="bi bi-arrow-counterclockwise"></i>
                    </Button>
                </div>

            </div>
            <div>
                <FormGroup row>
                    <Label size="sm" sm={2}>
                        Motivo:
                    </Label>
                    <Col sm={10}>
                        <InputGroup size="sm">
                            <Input
                                id="motive_closed_description"
                                name="motive_closed_description"
                                disabled={true}
                                size="sm"
                                value={frmData.motive_closed_description}
                            />
                        </InputGroup>
                    </Col>
                </FormGroup>
                {frmData.motive_not_valid && 
                    <FormGroup row>
                        <Label size="sm" sm={2}>
                            Causa:
                        </Label>
                        <Col sm={10}>
                            <InputGroup size="sm">
                                <Input
                                    id="motive_not_valid_description"
                                    name="motive_not_valid_description"
                                    disabled={true}
                                    size="sm"
                                    value={frmData.motive_not_valid_description}
                                />
                            </InputGroup>
                        </Col>
                    </FormGroup>
                }
                {frmData.lst_player && frmData.lst_player.length > 0 && 
                
                    <FormGroup tag="fieldset">

                        <h5>Jugadores:</h5>

                        {frmData.lst_player.map((player, idx) => (

                            <FormGroup check key={idx}>
                                <Input
                                    name={"player_"+idx}
                                    type="checkbox"
                                    checked={true}
                                    disabled={true}
                                />
                                {' '}
                                <Label check>
                                    {player.player_name}
                                </Label>
                            </FormGroup>

                        ))}

                    </FormGroup>
                

                }
            </div>
        </div>
    )
}
