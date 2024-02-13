import {
  FormGroup,
  Label,
  Input,
  Col,
  InputGroup,
  FormFeedback,
  Card,
  CardHeader,
  CardBody,
  Row,
} from "reactstrap";

export default function Settings({ formValues, setFormValues }) {
  const handleChange = (e) => {
    const name = e.target.name;

    const value = event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;    
    

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
              // disabled={true}
              invalid={formValues.constant_increase_ELO.error}
              value={formValues.constant_increase_ELO.value}
              onChange={handleChange}
            />
          </InputGroup>
        </Col>
      </FormGroup>

      {/* <div className="container-setting ps-4 pe-4">
        <div className="row ps-2 pe-2">
          <FormGroup check inline>
            <Input
              type="checkbox"
              id="usePenalty"
              name="usePenalty"
              value={formValues.usePenalty.value}
              checked={formValues.usePenalty.value}
              onChange={handleChange}
            />
            <Label check>Usar Penalización</Label>
          </FormGroup>

          <Card>
            <CardHeader>Penalizaciones</CardHeader>
            <CardBody className="d-grid p-4">
              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={6}>
                  Límite de Puntos por Penalización
                </Label>
                <Col sm={6}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="limitPenaltyPoints"
                      id="limitPenaltyPoints"
                      invalid={formValues.limitPenaltyPoints.error}
                      value={formValues.limitPenaltyPoints.value}
                      disabled={formValues.usePenalty.value===false}
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
                <Label size="sm" sm={6}>
                  Punto de penalización por tarjeta amarilla
                </Label>
                <Col sm={6}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="points_penalty_yellow"
                      id="points_penalty_yellow"
                      invalid={formValues.points_penalty_yellow.error}
                      value={formValues.points_penalty_yellow.value}
                      disabled={formValues.usePenalty.value===false}
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
                <Label size="sm" sm={6}>
                  Puntos de penalización por tarjeta rojas
                </Label>
                <Col sm={6}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="points_penalty_red"
                      id="points_penalty_red"
                      invalid={formValues.points_penalty_red.error}
                      value={formValues.points_penalty_red.value}
                      disabled={formValues.usePenalty.value===false}
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
            </CardBody>
          </Card>

        </div>

        <div className="row ps-2 pe-2">
          <FormGroup check inline>
            <Input
              type="checkbox"
              id="useBonus"
              name="useBonus"
              value={formValues.useBonus.value}
              checked={formValues.useBonus.value}
              onChange={handleChange}
            />
            <Label check>Usar Bonificación</Label>
          </FormGroup>
          <Card>
            <CardHeader>Bonificaciones</CardHeader>
            <CardBody className="p-4">
              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={6}>
                  Cant. Mesa a Bonificar:
                </Label>
                <Col sm={6}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="amountBonusTables"
                      id="amountBonusTables"
                      invalid={formValues.amountBonusTables.error}
                      value={formValues.amountBonusTables.value}
                      disabled={formValues.useBonus.value===false}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}              
                    />
                    <FormFeedback>
                      {formValues.amountBonusTables.errorMessage}
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={6}>
                  Cant. Puntos a Bonificar:
                </Label>
                <Col sm={6}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="amountBonusPoints"
                      id="amountBonusPoints"
                      invalid={formValues.amountBonusPoints.error}
                      value={formValues.amountBonusPoints.value}
                      disabled={formValues.useBonus.value===false}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}              
                    />
                    <FormFeedback>
                      {formValues.amountBonusPoints.errorMessage}
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="ps-4 pe-4">
                <Label size="sm" sm={6}>
                  Incremento de Puntos por Ronda:
                </Label>
                <Col sm={6}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="amountBonusPointsRounds"
                      id="amountBonusPointsRounds"
                      invalid={formValues.amountBonusPointsRounds.error}
                      value={formValues.amountBonusPointsRounds.value}
                      disabled={formValues.useBonus.value===false}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}              
                    />
                    <FormFeedback>
                      {formValues.amountBonusPointsRounds.errorMessage}
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>

            </CardBody>
          </Card>
        </div>

      </div> */}
      
    </div>
  );
}
