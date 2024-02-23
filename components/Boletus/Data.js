import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormFeedback,
  Col,
  Input,
  InputGroup,
  FormGroup,
  Label,
  Form,
} from "reactstrap";

import { useAppContext } from "../../AppContext";

export default function Data({ frmData, setFrmData, openData, setOpenData, boletus, handleSubmit }) {
  const { token, lang } = useAppContext();

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
        [name]: {
            ...frmData[name],
            error: value === "",
            value,
        },
    });
  };



  return (
    <Modal
      id="new_data"
      isOpen={openData}
      size="sm"
      centered={false}
      backdrop={"static"}
      keyboard={true}
    >
      <ModalHeader
        toggle={(e) => {
          setOpenData(false);
        }}
      >
        <small>{frmData.id === "" ? "Nueva Data" : "Modificar Data"}</small>
      </ModalHeader>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <ModalBody>
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
                  checked={
                    boletus.pair_one
                      ? boletus.pair_one.pairs_id === frmData.pair.value
                        ? true
                        : false
                      : false
                  }
                  onChange={handleChange}
                  type="radio"
                />{" "}
                <Label check>
                  {boletus.pair_one ? boletus.pair_one.name : ""}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  id="pair"
                  name="pair"
                  value={boletus.pair_two ? boletus.pair_two.pairs_id : ""}
                  checked={
                    boletus.pair_two
                      ? boletus.pair_two.pairs_id === frmData.pair.value
                        ? true
                        : false
                      : false
                  }
                  onChange={handleChange}
                  type="radio"
                />{" "}
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
        </ModalBody>
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
  );
}
