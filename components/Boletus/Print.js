import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Button,
  Form
} from "reactstrap";

export default function PrintBoletus({ open, setOpen, roundId }) {
  const handleSubmit = () => {};

  return (
    <Modal
      id="prn_boletus"
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
        <small>Imprimir Boletas</small>
      </ModalHeader>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <ModalBody>
          <FormGroup tag="fieldset">
            <FormGroup inline check>
              <Input
                name="interval"
                type="radio"
                //   checked={frmData.motive == "0"}
                //   onChange={handleChange}
                value={"0"}
              />{" "}
              <Label check>Todas las Boletas</Label>
            </FormGroup>
            <FormGroup inline check>
              <Input
                name="interval"
                type="radio"
                //   checked={frmData.motive === "1"}
                //   onChange={handleChange}
                value={"1"}
              />{" "}
              <Label check>Selección</Label>
            </FormGroup>
          </FormGroup>
        </ModalBody>
      </Form>
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
    </Modal>
  );
}
