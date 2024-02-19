import {
  FormGroup,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  InputGroup,
  Input,
  InputGroupText
} from "reactstrap";
export default function Criteria({ formValues, setFormValues }) {
  const criteriaTourney = [
    {
      key: "JJ",
      value: "Juegos Jugados",
    },
    {
      key: "JG",
      value: "Juegos Ganados",
    },
    {
      key: "PF",
      value: "Puntos a Favor",
    },
    {
      key: "ELO",
      value: "ELO",
    },
  ];

  const criteriaRound = [
    {
      key: "JJ",
      value: "Juegos Jugados",
    },
    {
      key: "JG",
      value: "Juegos Ganados",
    },
    {
      key: "PF",
      value: "Puntos a Favor",
    },
    {
      key: "ERA",
      value: "ELO Ronda Anterior",
    },
    {
      key: "DP",
      value: "Díferencia de Puntos",
    }
  ];

  const handleChange = (e) => {
    const name = e.target.name;

    const value =
      e.target.type === "checkbox"
        ? e.target.checked ? "DESC" : "ASC"
        : e.target.value;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value: value,
      },
    });
  };

  return (
    <div className="container-criteria pt-4">

<Card>
        <CardHeader>Críterios de Organización para Rondas</CardHeader>
        <CardBody className="d-grid p-4">
          <FormGroup row>
            <Label size="sm" sm={2}>
              Crít.1:
            </Label>
            <Col sm={8}>
              <InputGroup size="sm">
                <Input
                  type="select"
                  id="round_ordering_one"
                  name="round_ordering_one"
                  placeholder="Críterio # 1"
                  value={formValues.round_ordering_one.value}
                  onChange={handleChange}
                >
                  <option key={0} value="">
                    Seleccione
                  </option>
                  {criteriaRound.map(
                    ({ key, value }, i) =>
                      key !== formValues.round_ordering_two.value &&
                      key !== formValues.round_ordering_three.value && (
                        <option key={i + 1} value={key}>
                          {value}
                        </option>
                      )
                  )}
                </Input>
              </InputGroup>
            </Col>
            <Col sm={2} className="d-flex gap-1">
              <i class="bi bi-arrow-up"></i>
              <FormGroup switch>
                <Input 
                  type="switch" 
                  role="switch" 
                  checked={formValues.round_ordering_dir_one.value==="DESC" ? true : false}
                  value={formValues.round_ordering_dir_one.value}
                  name="round_ordering_dir_one" 
                  id="round_ordering_dir_one" 
                  onChange={handleChange}
                />
                <i class="bi bi-sort-down"></i>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label size="sm" sm={2}>
              Crít.2:
            </Label>
            <Col sm={8}>
              <InputGroup size="sm">
                <Input
                  type="select"
                  id="round_ordering_two"
                  name="round_ordering_two"
                  placeholder="Críterio # 2"
                  value={formValues.round_ordering_two.value}
                  onChange={handleChange}
                >
                  <option key={0} value="">
                    Seleccione
                  </option>
                  {criteriaRound.map(
                    ({ key, value }, i) =>
                      key !== formValues.round_ordering_one.value &&
                      key !== formValues.round_ordering_three.value && (
                        <option key={i + 1} value={key}>
                          {value}
                        </option>
                      )
                  )}
                </Input>
              </InputGroup>
            </Col>
            <Col sm={2} className="d-flex gap-1">
              <i class="bi bi-sort-up-alt"></i>
              <FormGroup switch>
                <Input 
                  type="switch" 
                  role="switch" 
                  checked={formValues.round_ordering_dir_two.value==="DESC" ? true : false}
                  value={formValues.round_ordering_dir_two.value}
                  name="round_ordering_dir_two" 
                  id="round_ordering_dir_two" 
                  onChange={handleChange}
                />
                <i class="bi bi-sort-down"></i>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label size="sm" sm={2}>
              Crít.3:
            </Label>
            <Col sm={8}>
              <InputGroup size="sm">
                <Input
                  type="select"
                  id="round_ordering_three"
                  name="round_ordering_three"
                  placeholder="Críterio # 3"
                  value={formValues.round_ordering_three.value}
                  onChange={handleChange}
                >
                  <option key={0} value="">
                    Seleccione
                  </option>
                  {criteriaRound.map(
                    ({ key, value }, i) =>
                      key !== formValues.round_ordering_one.value &&
                      key !== formValues.round_ordering_two.value && (
                        <option key={i + 1} value={key}>
                          {value}
                        </option>
                      )
                  )}
                </Input>
              </InputGroup>
            </Col>
            <Col sm={2} className="d-flex gap-1">
              <i class="bi bi-sort-up-alt"></i>
              <FormGroup switch>
                <Input 
                  type="switch" 
                  role="switch" 
                  checked={formValues.round_ordering_dir_three.value==="DESC" ? true : false}
                  value={formValues.round_ordering_dir_three.value}
                  name="round_ordering_dir_three" 
                  id="round_ordering_dir_three" 
                  onChange={handleChange}
                />
                <i class="bi bi-sort-down"></i>
              </FormGroup>
            </Col>
          </FormGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Críterios de Organización para Torneo</CardHeader>
        <CardBody className="d-grid p-4">
          <FormGroup row className="align-items-center">
            <Label size="sm" sm={2}>
              Crít.1:
            </Label>
            <Col sm={8}>
              <InputGroup size="sm">
                <Input
                  type="select"
                  name="event_ordering_one"
                  id="event_ordering_one"
                  placeholder="Críterio # 1"
                  value={formValues.event_ordering_one.value}
                  onChange={handleChange}
                >
                  <option key={0} value="">
                    Seleccione
                  </option>
                  {criteriaTourney.map(
                    ({ key, value }, i) =>
                      key !== formValues.event_ordering_two.value &&
                      key !== formValues.event_ordering_three.value && (
                        <option key={i + 1} value={key}>
                          {value}
                        </option>
                      )
                  )}
                </Input>
              </InputGroup>
            </Col>
            <Col sm={2} className="d-flex gap-1">
              <i class="bi bi-sort-up-alt"></i>
              <FormGroup switch>
                <Input 
                  type="switch" 
                  role="switch" 
                  checked={formValues.event_ordering_dir_one.value==="DESC" ? true : false}
                  value={formValues.event_ordering_dir_one.value}
                  name="event_ordering_dir_one" 
                  id="event_ordering_dir_one" 
                  onChange={handleChange}
                />
                <i class="bi bi-sort-down"></i>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label size="sm" sm={2}>
              Crít.2:
            </Label>
            <Col sm={8}>
              <InputGroup size="sm">
                <Input
                  type="select"
                  name="event_ordering_two"
                  id="event_ordering_two"
                  placeholder="Críterio # 2"
                  value={formValues.event_ordering_two.value}
                  onChange={handleChange}
                >
                  <option key={0} value="">
                    Seleccione
                  </option>
                  {criteriaTourney.map(
                    ({ key, value }, i) =>
                      key !== formValues.event_ordering_one.value &&
                      key !== formValues.event_ordering_three.value && (
                        <option key={i + 1} value={key}>
                          {value}
                        </option>
                      )
                  )}
                </Input>
              </InputGroup>
            </Col>
            <Col sm={2} className="d-flex gap-1">
              <i class="bi bi-sort-up-alt"></i>
              <FormGroup switch>
                <Input 
                  type="switch" 
                  role="switch" 
                  checked={formValues.event_ordering_dir_two.value==="DESC" ? true : false}
                  value={formValues.event_ordering_dir_two.value}
                  name="event_ordering_dir_two" 
                  id="event_ordering_dir_two" 
                  onChange={handleChange}
                />
                <i class="bi bi-sort-down"></i>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label size="sm" sm={2}>
              Crít. 3:
            </Label>
            <Col sm={8}>
              <InputGroup size="sm">
                <Input
                  type="select"
                  name="event_ordering_three"
                  id="event_ordering_three"
                  placeholder="Críterio # 2"
                  value={formValues.event_ordering_three.value}
                  onChange={handleChange}
                >
                  <option key={0} value="">
                    Seleccione
                  </option>
                  {criteriaTourney.map(
                    ({ key, value }, i) =>
                      key !== formValues.event_ordering_one.value &&
                      key !== formValues.event_ordering_two.value && (
                        <option key={i + 1} value={key}>
                          {value}
                        </option>
                      )
                  )}
                </Input>
              </InputGroup>
            </Col>
            <Col sm={2} className="d-flex gap-1">
              <i class="bi bi-sort-up-alt"></i>
              <FormGroup switch>
              <Input 
                  type="switch" 
                  role="switch" 
                  checked={formValues.event_ordering_dir_three.value==="DESC" ? true : false}
                  value={formValues.event_ordering_dir_three.value}
                  name="event_ordering_dir_three" 
                  id="event_ordering_dir_three" 
                  onChange={handleChange}
                />
                <i class="bi bi-sort-down"></i>
              </FormGroup>
            </Col>
          </FormGroup>
        </CardBody>
      </Card>

    </div>
  );
}
