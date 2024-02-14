import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Badge,
  Col,
  Input,
  InputGroup,
  FormGroup,
  Label,
  Form,
  FormFeedback
} from "reactstrap";

import { useAppContext } from "../../AppContext";

import axios from "axios";
import Swal from "sweetalert2";

export default function Nulled({ open, setOpen, boletus, record }) {
  const { token, lang } = useAppContext();
  const [frmData, setFrmData] = useState({
    motive: "",
    player: "",
    isOut: false
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;    

    setFrmData({
        ...frmData,
        [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (frmData.motive !== "" && frmData.player !== "") {
        console.log(frmData);

        const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/annulled/${record.boletus_id}`;

        const body = {
          player_id: frmData.player,
          annulled_type: frmData.motive,
          was_expelled: frmData.isOut
        };
    
        try {
          const { data } = await axios.post(url, body, config);
    
          if (data.success) {
    
            setFrmData({
              motive: "",
              player: "",
              isOut: false
            })
    
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


  return (
    <Modal
      id="nulled"
      isOpen={open}
      size="sm"
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader
        toggle={(e) => {
          setOpen(false);
        }}
      >
        <small>Anular Boleta</small>
      </ModalHeader>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <ModalBody>
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
                        invalid={frmData.motive===""}
                        placeholder="Motivo de Anulación de la Boleta"
                        defaultValue={frmData.motive}
                        onChange={handleChange}
                      >
                        <option value="">Selecciones el Motivo</option>
                        <option value="0">Sentarse Incorrectamene</option>
                        <option value="1">Error de Anotación</option>
                        <option value="2">Conducta Antideportiva</option>
                      </Input>
                      <FormFeedback>Seleccione el Motivo.</FormFeedback>
                    </InputGroup>
                  </Col>
            </FormGroup>

            {frmData.motive==2 &&
                <>
                <FormGroup tag="fieldset">

                    <h5>Jugadores:</h5>

                    {boletus.lst_players.map((player, idx) => (
                        <FormGroup check key={idx}>
                            <Input
                                name="player"
                                type="radio"
                                value={player.profile_id}
                                checked={frmData.player === player.profile_id}
                                onChange={handleChange}
                            />
                            {' '}
                            <Label check>
                                <Badge color="info" pill>{player.position_id}</Badge> {player.profile_name}
                            </Label>
                        </FormGroup>
                    ))}

                </FormGroup>

                <Input type="checkbox" name="isOut" checked={frmData.isOut} onChange={handleChange} />
                {' '}
                <Label check>
                    El jugador es Expulsado.
                </Label>
                </>
            }
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" size="sm">
            Aceptar
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
