import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";

import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalFooter,
    FormGroup,
    InputGroup,
    Input,
    Col,
    Row,
    Label,
    Form
} from "reactstrap";
  
import axios from "axios";
import Swal from "sweetalert2";
import FinderPlayer from "../../Players/Finder";
import CountryComboBox from "../../Country/CountryComboBox";

export default function Invitations({ open, setClose, tourneyId }) {
    const {token, lang} = useAppContext();

    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        }
    };
    
    const [formValues, setFormValues] = useState({
        player: "",
        eloMax: 0,
        eloMin: 0,
        country: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setFormValues({
          ...formValues,
          [name]: value
        })
    };
    
    const close = () => {
        setClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const paramsObj = {
            player: formValues.player,
            country: formValues.country,
            elo_max: formValues.eloMax,
            elo_min: formValues.eloMin
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}invitation?tourney_id=${tourneyId}`;

        try {
            const { data } = await axios.post(url, paramsObj, config);

            if (data.success) {
                setClose();
                Swal.fire({
                    title: "Enviar Invitaciones",
                    text: data.detail,
                    icon: "success",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Enviar Invitaciones",
                text: "Error en su red, consulte a su proveedor de servicio",
                icon: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              });
            } else {
              if (code === "ERR_BAD_REQUEST") {
                const {detail} = JSON.parse(request.response)
                Swal.fire({
                  title: "Enviar Invitaciones",
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


    return (
        <Modal isOpen={open} backdrop={"static"} keyboard={true} centered={true}>
          <ModalHeader
            toggle={(e) => {
              close(e);
            }}
          >
            Enviar Invitaciones
          </ModalHeader>
    
          <Form onSubmit={handleSubmit}>
          
            <ModalBody>
              <div className="col-12">
                <div className="p-2">
                    <Row>
                        <FormGroup row>
                            <Label size="sm" sm={3}>Jugador:</Label>
                            <Col sm={9}>
                                <FinderPlayer id={"player"} changePlayer={setFormValues} />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup row>
                            <Label size="sm" sm={3}>ELO Máximo:</Label>
                            <Col sm={9}>
                                <InputGroup size="sm">
                                    <Input
                                        id="eloMax"
                                        name="eloMax"
                                        type="number"
                                        placeholder="ELO Máximo"
                                        onChange={handleChange}
                                        value={formValues.eloMax}                      
                                    />
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup row>
                            <Label size="sm" sm={3}>ELO Mínimo:</Label>
                            <Col sm={9}>
                                <InputGroup size="sm">
                                    <Input
                                        id="eloMin"
                                        name="eloMin"
                                        type="number"
                                        placeholder="ELO Mínimo"
                                        onChange={handleChange}
                                        value={formValues.eloMin}                      
                                    />
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup row>
                            <Label size="sm" sm={3}>País:</Label>
                            <Col sm={9}>
                                <InputGroup size="sm">
                                    <CountryComboBox 
                                        name="country" 
                                        cmbText="Seleccione..."
                                        valueDefault={formValues.country}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <Button
                  type="submit"
                  className="btn-sm"
                  style={{
                    backgroundColor: "#0095f6",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
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
    );
};
