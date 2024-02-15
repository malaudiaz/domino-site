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

export default function Penalty({ open, setOpen, penaltys, frmData, setFrmData, handleSubmit }) {

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;    

      setFrmData({
        ...frmData,
        [name]: {
            ...frmData[name],
            value: value,
            error: value === "",
        },
    });
  };

  return (
    <Modal
      id="penalty"
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
        <small>Penalizaciones</small>
      </ModalHeader>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <ModalBody>
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
                      invalid={frmData.motive.error}
                      defaultValue={frmData.motive.value}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione Motivo</option>
                      <option value="0">Amonestaciones</option>
                      <option value="1">Tarjeta Amarilla</option>
                      <option value="2">Tarjeta Roja</option>
                    </Input>
                    <FormFeedback>{frmData.motive.errorMessage}</FormFeedback>
                  </InputGroup>
                </Col>
            </FormGroup>

            <FormGroup tag="fieldset">

                <h5>Jugadores:</h5>

                {penaltys.lst_players.map((player, idx) => (

                    <FormGroup check key={idx}>
                        <Input
                          name="player"
                          type="radio"
                          value={player.profile_id}
                          checked={frmData.player.value === player.profile_id}
                          onChange={handleChange}
                        />
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
                    invalid={frmData.point.error}
                    value={frmData.point.value}
                    placeholder="Puntos"
                    onChange={handleChange}
                  />
                  <FormFeedback>{frmData.point.errorMessage}</FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>


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
