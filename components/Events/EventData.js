
import {
    FormGroup,
    InputGroup,
    Input,
    FormFeedback,
    Row,
    Col,
    Label,
} from "reactstrap";
  
import CountryComboBox from "../Country/CountryComboBox";
import CityComboBox from "../City/CityComboBox";
  

export default function EventData({event, error, handleChange}) {
    return (
        <>
        <Col md={12}>
          <FormGroup>
            <Label>Nombre del Evento</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder={"Nombre del Evento"}
                invalid={error.name}
                onChange={handleChange("name")}
                autoComplete="off"
                value={event.name}
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>
                Por favor, teclee el nombre del evento
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label>Fecha Inicial</Label>
              <InputGroup size="sm">
                <Input
                  id="startDate"
                  name="startDate"
                  invalid={error.startDate}
                  placeholder="Fecha Inicial"
                  type="date"
                  value={event.startDate}
                  onChange={handleChange("startDate")}
                />
                <FormFeedback>
                  Por favor, teclee la fecha de inicio
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label>Fecha Final</Label>
              <InputGroup size="sm">
                <Input
                  id="endDate"
                  name="endDate"
                  invalid={error.endDate}
                  placeholder="Fecha Final"
                  value={event.endDate}
                  type="date"
                  onChange={handleChange("endDate")}
                />
                <FormFeedback>
                  Por favor, teclee la fecha final
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <FormGroup>
              <Label size="sm" sm={4}>
                País
              </Label>
              <InputGroup size="sm">
                <CountryComboBox
                  name={"country"}
                  cmbText="Seleccione país..."
                  invalid={error.country}
                  value={event.country}
                  valueDefault={event.country}
                  onChange={handleChange("country")}
                />
                <FormFeedback>Por favor, seleccione el país</FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label size="sm" sm={4}>
                Ciudad
              </Label>
              <InputGroup size="sm">
                <CityComboBox
                  country_id={event.country}
                  name="city"
                  cmbText="Seleccione ciudad..."
                  value={event.city}
                  invalid={error.city}
                  valueDefault={event.city}
                  onChange={handleChange("city")}
                />
                <FormFeedback>Por favor, seleccione la ciudad</FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Col md={12}>
          <FormGroup>
            <Label>Sede del Evento</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="campus"
                id="campus"
                placeholder={"Sede del Evento"}
                onChange={handleChange("campus")}
                autoComplete="off"
                invalid={error.campus}
                value={event.campus}
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>
                Por favor, teclee la sede del evento
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup>
            <Label>Resumen</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="summary"
                id="summary"
                placeholder={"Resumen"}
                onChange={handleChange("summary")}
                autoComplete="off"
                value={event.summary}
                onKeyPress={(event) => {
                  if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>
                Por favor, teclee el resumen del evento
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        </>
    );
};
