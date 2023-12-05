import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormGroup,
  InputGroup,
  Input,
  FormFeedback,
  Form,
  Col,
  Label,
} from "reactstrap";

export default function SetNumber({ open, setClose, record, selected, setSelected, number, setNumber, lottery, category }) {
    const [position, setPosition] = useState(number);
    const [reload, setReload] = useState(false);
    const [isNotValid, setIsNotValid] = useState(false);

    useEffect(()=>{
        setPosition(number);
        setReload(false);
    },[reload, number])

    const handleChange = (e) => {
        setIsNotValid(e.target.value === "");
        setPosition(e.target.value);
    }

    const close = () => {
        setClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsNotValid(number === "");

        if (!isNotValid) {

            if (selected.length >= 0) {
                const items = selected;
                let item = items.find(element => element.position_number === position);

                if (!item) {

                    item = items.find(element => element.id === record.id);

                    if (!item) {
                        items.push({id: record.id, position_number: position, category: category});
                        setSelected(items);

                        setNumber(selected.length+1);

                        setReload(true);
                        setClose();
                    }
                } else {
                    setReload(true);
                    Swal.fire({
                        title: "Sorteo",
                        text: "Número ya asignado",
                        icon: "info",
                        showCancelButton: false,
                        allowOutsideClick: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Aceptar",
                    });            
                }
            
            // } else {
            //     setSelected([{id: record.id, number: number}]);
            //     setClose();
            }
        }
    };    
   
    return (
        <Modal isOpen={open} backdrop={"static"} keyboard={true} centered={true} size="sm">
            <ModalHeader toggle={(e) => {close(e);}}>
                {lottery==="MANUAL" ? "Número del Sorteo" : "Número de Bombo"}
            </ModalHeader>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <ModalBody>
                    <FormGroup row>
                        <Label size="sm" sm={3}>{lottery==="MANUAL" ? "Número" : "Bombo"}</Label>
                        <Col sm={9}>
                            <InputGroup size="sm">
                                <Input
                                    type="text"
                                    name="position"
                                    id="position"
                                    invalid={isNotValid}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={position}
                                    onKeyPress={(event) => {
                                        if (!/^[0-9]*$/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <FormFeedback>
                                    {lottery==="MANUAL" ? "Número obtenido en Sorteo" : "Número de Bombo para Sorteo"}
                                </FormFeedback>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                </ModalBody>  
                <ModalFooter className="modal-footer">
                    <Button
                        className="btn-sm"
                        style={{
                            backgroundColor: "#0095f6",
                            border: "none",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "700",
                        }}
                        type="submit"
                        title="Aceptar"
                    >
                        <i className="bi-check2-circle" />{" "}
                        Aceptar
                    </Button>

                    <Button
                        className="btn-sm"
                        style={{
                            border: "none",
                            fontSize: "14px",
                            fontWeight: "700",
                        }}
                        title="Cancelar"
                        onClick={close}
                    >
                        <i className="bi bi-x-circle" />{" "}
                        Cancelar
                    </Button>
                </ModalFooter>    
            </Form>
        </Modal>
    )
};
