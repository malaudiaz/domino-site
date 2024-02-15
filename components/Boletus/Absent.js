import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Badge,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";


export default function Absent({ open, setOpen, frmData, setFrmData, boletus, handleSubmit }) {
  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    const check = e.target.checked;

    setFrmData({
        ...frmData,
        [name]: check ? value : ""
    })
  };

  return (
    <Modal
      id="absent"
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
        <small>Ausencias</small>
      </ModalHeader>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <ModalBody>

            <FormGroup tag="fieldset">
                <FormGroup inline check>
                  <Input
                    name="motive"
                    type="radio"
                    checked={frmData.motive=="0"}
                    onChange={handleChange}
                    value={"0"}
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
                    checked={frmData.motive==="1"}
                    onChange={handleChange}
                    value={"1"}
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
                    <Input type="checkbox" name={"player_"+idx} value={player.profile_id} onChange={handleChange} />
                    {' '}
                    <Label check>
                      <Badge color="info" pill>{player.position_id}</Badge> {player.profile_name}
                    </Label>
                  </FormGroup>

                ))}

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
