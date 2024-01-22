
import { Label, InputGroup, Input, FormGroup, Col, FormFeedback } from "reactstrap";

export default function Register({ tourney }) {
    return (
        <div className="tab-content pt-2">
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center pt-2 px-4 pb-1">
                <h5 className="flex-fill">Registro de Jugadores</h5>
            </div>

            <FormGroup row className="pt-2 ps-4 pe-4">
                <Label size="sm" sm={2}>
                    Nombre de usuario
                </Label>
                <Col sm={4}>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={"Nombre de Usuario"}
                        // invalid={formValues.name.error}
                        // value={formValues.name.value}
                        // onChange={handleChange}
                        autoComplete="off"
                        onKeyPress={(event) => {
                            if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        {/* <FormFeedback>{formValues.name.errorMessage}</FormFeedback> */}
                    </InputGroup>
                </Col>


                <Label size="sm" sm={2}>
                    Nombre
                </Label>
                <Col sm={4}>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder={"Nombre"}
                        // invalid={formValues.name.error}
                        // value={formValues.name.value}
                        // onChange={handleChange}
                        autoComplete="off"
                        onKeyPress={(event) => {
                            if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        {/* <FormFeedback>{formValues.name.errorMessage}</FormFeedback> */}
                    </InputGroup>
                </Col>
            </FormGroup>


            <FormGroup row className="pt-2 ps-4 pe-4">
                <Label size="sm" sm={2}>
                    Apellidos
                </Label>
                <Col sm={4}>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder={"Apellidos"}
                        // invalid={formValues.name.error}
                        // value={formValues.name.value}
                        // onChange={handleChange}
                        autoComplete="off"
                        onKeyPress={(event) => {
                            if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        {/* <FormFeedback>{formValues.name.errorMessage}</FormFeedback> */}
                    </InputGroup>
                </Col>


                <Label size="sm" sm={2}>
                    Alias
                </Label>
                <Col sm={4}>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="alias"
                        id="alias"
                        placeholder={"Alias"}
                        // invalid={formValues.name.error}
                        // value={formValues.name.value}
                        // onChange={handleChange}
                        autoComplete="off"
                        onKeyPress={(event) => {
                            if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        {/* <FormFeedback>{formValues.name.errorMessage}</FormFeedback> */}
                    </InputGroup>
                </Col>
            </FormGroup>

            <FormGroup row className="pt-2 ps-4 pe-4">
                <Label size="sm" sm={2}>
                    Email
                </Label>
                <Col sm={4}>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="email"
                        id="email"
                        placeholder={"Correo"}
                        // invalid={formValues.name.error}
                        // value={formValues.name.value}
                        // onChange={handleChange}
                        autoComplete="off"
                        onKeyPress={(event) => {
                            if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        {/* <FormFeedback>{formValues.name.errorMessage}</FormFeedback> */}
                    </InputGroup>
                </Col>


                <Label size="sm" sm={2}>
                    Telefono
                </Label>
                <Col sm={4}>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder={"Telefono"}
                        // invalid={formValues.name.error}
                        // value={formValues.name.value}
                        // onChange={handleChange}
                        autoComplete="off"
                        onKeyPress={(event) => {
                            if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        {/* <FormFeedback>{formValues.name.errorMessage}</FormFeedback> */}
                    </InputGroup>
                </Col>
            </FormGroup>


            <FormGroup row className="pt-2 ps-4 pe-4">
                <Label size="sm" sm={2}>
                    País
                </Label>
                <Col sm={4}>
                </Col>

                <Label size="sm" sm={2}>
                    Ciudad
                </Label>
                <Col sm={4}>
                </Col>
            </FormGroup>


            <FormGroup row className="pt-2 ps-4 pe-4">
                <Label size="sm" sm={2}>
                    Nivel
                </Label>
                <Col sm={4}>
                </Col>

                <Label size="sm" sm={2}>
                    ELO
                </Label>
                <Col sm={4}>
                </Col>
            </FormGroup>



        </div>
    )
}
