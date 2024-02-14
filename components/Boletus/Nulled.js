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

export default function Nulled({ open, setOpen, boletus }) {
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
