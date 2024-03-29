import {
  FormGroup,
  Col,
  Label,
  InputGroup,
  Input,
  FormFeedback,
} from "reactstrap";

export default function General({ formValues, setFormValues }) {
  const handleChange = (event) => {
    const name = event.target.name;

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value: value,
      },
    });
  };

  return (
    <div className="tab-content pt-2">
      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={2}>
          Nombre del Torneo
        </Label>
        <Col sm={4}>
          <InputGroup size="sm">
            <Input
              type="text"
              name="name"
              id="name"
              placeholder={"Nombre del Torneo"}
              invalid={formValues.name.error}
              value={formValues.name.value}
              onChange={handleChange}
              autoComplete="off"
              onKeyPress={(event) => {
                if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <FormFeedback>{formValues.name.errorMessage}</FormFeedback>
          </InputGroup>
        </Col>
      </FormGroup>
      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={2}>
          Modalidad
        </Label>
        <Col sm={4}>
          <InputGroup size="sm">
            <Input
              id="modality"
              name="modality"
              type="select"
              value={formValues.modality.value}
              invalid={formValues.modality.error}
              onChange={handleChange}
            >
              <option value="">Modalidad</option>
              <option value="Individual">Individual</option>
              <option value="Parejas">Parejas</option>
              <option value="Equipo">Equipo</option>
            </Input>
            <FormFeedback>
              Por favor, seleccione la modalidad del torneo
            </FormFeedback>
          </InputGroup>
        </Col>
      </FormGroup>
      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={2}>
          Rondas
        </Label>
        <Col sm={4}>
          <InputGroup size="sm">
            <Input
              id="number_rounds"
              name="number_rounds"
              type="number"
              placeholder="Rondas"
              invalid={formValues.number_rounds.error}
              value={formValues.number_rounds.value}
              onChange={handleChange}
              autoComplete="off"
            />
            <FormFeedback>{formValues.number_rounds.errorMessage}</FormFeedback>
          </InputGroup>
        </Col>
      </FormGroup>
      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={2}>
          Fecha de Inicio
        </Label>
        <Col sm={4}>
          <InputGroup size="sm">
            <Input
              id="startDate"
              name="startDate"
              placeholder="Fecha"
              type="date"
              invalid={formValues.startDate.error}
              value={formValues.startDate.value}
              onChange={handleChange}
            />
            <FormFeedback>{formValues.startDate.errorMessage}</FormFeedback>
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={2}>
          Alcance
        </Label>
        <Col sm={4}>
          <InputGroup size="sm">
            <Input
              id="scope"
              name="scope"
              type="select"
              value={formValues.scope.value}
              invalid={formValues.scope.error}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="1">Local</option>
              <option value="2">Nacional</option>
              <option value="3">Internacional</option>
            </Input>
            <FormFeedback>
              Por favor, seleccione el alcance del torneo
            </FormFeedback>
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={2}>
          Nivel:
        </Label>
        <Col sm={4}>
          <FormGroup check inline>
            <Input
              id="level"
              name="level"
              value={1}
              checked={formValues.level.value==1 ? true : false}
              onChange={handleChange}
              type="radio"
            />{" "}
            <Label check>1</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              id="level"
              name="level"
              value={2}
              checked={formValues.level.value==2 ? true : false}
              onChange={handleChange}
              type="radio"
            />{" "}
            <Label check>2</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              id="level"
              name="level"
              value={3}
              checked={formValues.level.value==3 ? true : false}
              onChange={handleChange}
              type="radio"
            />{" "}
            <Label check>3</Label>
          </FormGroup>
        </Col>
      </FormGroup>

      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={2}>
          Comentario
        </Label>
        <Col sm={4}>
          <InputGroup size="sm">
            <Input
              type="text"
              name="summary"
              id="summary"
              placeholder={"Comentario"}
              invalid={formValues.summary.error}
              value={formValues.summary.value}
              onChange={handleChange}
              autoComplete="off"
              onKeyPress={(event) => {
                if (!/^[A-Za-z_0-9.áéíóúÑñ\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </InputGroup>
        </Col>
      </FormGroup>
    </div>
  );
}
