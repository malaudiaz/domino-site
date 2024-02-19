import {
  FormGroup,
  Label,
  Input,
  Col,
  InputGroup,
  FormFeedback
} from "reactstrap";

export default function Settings({ formValues, setFormValues }) {
  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;    
    

    setFormValues({
      ...formValues,     
      [name]: {
        ...formValues[name],
        value: value
      },
    });
  };

  return (
    <div className="tab-content pt-2">
      <FormGroup row className="pt-2 ps-4 pe-4">
        <Label size="sm" sm={3}>
          Cantidad de Mesas
        </Label>
        <Col sm={3}>
          <InputGroup size="sm">
            <Input
              type="text"
              name="amountTtable"
              id="amountTable"
              value={formValues.amountTable.value}
              disabled
            />
          </InputGroup>
        </Col>

      </FormGroup>

      <FormGroup row className="ps-4 pe-4">
        <Label size="sm" sm={3}>
            Cantidad de Mesas Inteligentes
        </Label>
        <Col sm={3}>
          <InputGroup size="sm">
            <Input
              type="number"
              name="smartTable"
              id="smartTable"
              invalid={formValues.smartTable.error}
              value={formValues.smartTable.value}
              onChange={handleChange}
            />
            <FormFeedback>
              La cantidad de mesas inteligentes es requerida.
            </FormFeedback>
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row className="ps-4 pe-4">
        <Label size="sm" sm={3}>
          Puntos para ganar ronda
        </Label>
        <Col sm={3}>
          <InputGroup size="sm">
            <Input
              type="number"
              name="pointRound"
              id="pointRound"
              invalid={formValues.pointRound.error}
              value={formValues.pointRound.value}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}              
            />
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row className="ps-4 pe-4">
        <Label size="sm" sm={3}>
          Tiempo máximo para ganar (min.)
        </Label>
        <Col sm={3}>
          <InputGroup size="sm">
            <Input
              type="number"
              name="timeRound"
              id="timeRound"
              invalid={formValues.timeRound.error}
              value={formValues.timeRound.value}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}              
            />
          </InputGroup>
        </Col>
      </FormGroup>      

      <FormGroup row className="ps-4 pe-4">
        <Label size="sm" sm={3}>
          Tipo de Sorteo
        </Label>
        <Col sm={3}>
          <InputGroup size="sm">
            <Input
              type="select"
              name="lottery"
              id="lottery"
              placeholder="Sorteo"
              value={formValues.lottery.value}
              onChange={handleChange}
            >
              <option key={1} value="MANUAL">
                Manual
              </option>
              <option key={2} value="AUTOMATIC">
                Automático
              </option>
            </Input>
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row className="ps-4 pe-4">
        <Label size="sm" sm={3}>
          Factor de Crecimiento del ELO
        </Label>
        <Col sm={3}>
          <InputGroup size="sm">
            <Input
              type="number"
              name="constant_increase_ELO"
              id="constant_increase_ELO"
              invalid={formValues.constant_increase_ELO.error}
              value={formValues.constant_increase_ELO.value}
              onChange={handleChange}
            />
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row className="ps-4 pe-4">
        <Label size="sm" sm={3}>
          Otorgar Puntos por Ausencia o Abandono
        </Label>
        <Col sm={3}>
          <InputGroup size="sm">
            <Input
              type="number"
              name="absent_point"
              id="absent_point"
              invalid={formValues.absent_point.error}
              value={formValues.absent_point.value}
              onChange={handleChange}
            />
          </InputGroup>
        </Col>
      </FormGroup>
     
    </div>
  );
}
