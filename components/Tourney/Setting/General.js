import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import { Form, FormGroup, Label, Input, Col, InputGroup, FormFeedback, Button, Card, CardHeader, CardBody } from "reactstrap";

export default function General({ formValues, setFormValues }) {
  const { token, lang } = useAppContext();

  const criteriaTourney = [
    {
      key: "JG",
      value: "Juegos Ganados"
    },
    {
      key: "BONUS",
      value: "Bonificación"
    },
    {
      key: "ELO",
      value: "ELO"
    }
  ];

  const criteriaRound = [
    {
      key: "JG",
      value: "Juegos Ganados"
    },
    {
      key: "ERA",
      value: "ELO Real Acumulado"
    },
    {
      key: "DP",
      value: "Díferencia de Puntos"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        error: value === "",
        value,
      },
    });
  };

  const hasError = () => {
    let res = false;
    res = formValues.amountTable.error || formValues.smartTable.error || formValues.amountRound.error || formValues.pointRound.error || formValues.timeRound.error || formValues.playSystem.error || formValues.lottery.error || formValues.bonus.error || formValues.limitPenaltyPoints.error;

    return res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !hasError() ) {

      const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/${formValues.tourneyId.value}`;

      const body = {
        "amount_tables": formValues.amountTable.value,
        "amount_smart_tables": formValues.smartTable.value,
        "number_points_to_win": formValues.pointRound.value,
        "time_to_win": formValues.timeRound.value,
        "lottery": formValues.lottery.value,
        "constant_increase_ELO": formValues.constant_increase_ELO.value,
        "limitPenaltyPoints": formValues.limitPenaltyPoints.value,
        "points_penalty_yellow": formValues.points_penalty_yellow.value,
        "points_penalty_red": formValues.points_penalty_red.value,
        "points_penalty_red": formValues.points_penalty_red.value,
        "event_ordering_one": formValues.event_ordering_one.value,
        "event_ordering_two": formValues.event_ordering_two.value,
        "event_ordering_three": formValues.event_ordering_three.value,
        "round_ordering_one": formValues.round_ordering_one.value,
        "round_ordering_two": formValues.round_ordering_two.value,
        "round_ordering_three": formValues.round_ordering_three.value
      }

      try {
        const { data } = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": lang,
            "Authorization": `Bearer ${token}`                },
        });
        if (data.success) {
          // setReload(true);

          Swal.fire({
            icon: "success",
            title: "Configurando Torneo",
            text: data.detail,
            showConfirmButton: true,
          });
        }
      } catch (errors) {
        console.log(errors);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al consultar la API....",
          showConfirmButton: true,
        });
      }


    }

  }

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <div className="tab-content pt-2">
        <FormGroup row className="pt-2 ps-4 pe-4">
          <Label size="sm" sm={3}>
            ELO Máximo
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="eloMax"
                id="eloMax"
                value={formValues.eloMax.value}
                disabled
              />
            </InputGroup>
          </Col>

          <Label size="sm" sm={3}>
            ELO Mínimo
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="eloMin"
                id="eloMin"
                value={formValues.eloMin.value}
                disabled
              />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
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
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
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
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              />
            </InputGroup>
          </Col>

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
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
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
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              >
                <option key={1} value="MANUAL">Manual</option>
                <option key={2} value="AUTOMATIC">Automático</option>
              </Input>
            </InputGroup>
          </Col>

          <Label size="sm" sm={3}>
            Constante de Crecimiento del ELO
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
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              />
            </InputGroup>
          </Col>

        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={3}>
            Límite de Puntos por Penalización
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="number"
                name="limitPenaltyPoints"
                id="limitPenaltyPoints"
                invalid={formValues.limitPenaltyPoints.error}
                value={formValues.limitPenaltyPoints.value}
                onChange={handleChange}
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              />
            </InputGroup>
          </Col>

          <Label size="sm" sm={3}>
            Punto de penalización por tarjeta amarilla
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="number"
                name="points_penalty_yellow"
                id="points_penalty_yellow"
                invalid={formValues.points_penalty_yellow.error}
                value={formValues.points_penalty_yellow.value}
                onChange={handleChange}
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              />
            </InputGroup>
          </Col>

        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Col sm={6}></Col>
          <Label size="sm" sm={3}>
            Puntos de penalización por tarjeta rojas
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="number"
                name="points_penalty_red"
                id="points_penalty_red"
                invalid={formValues.points_penalty_red.error}
                value={formValues.points_penalty_red.value}
                onChange={handleChange}
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="pt-2 ps-4 pe-4">
          <Col sm={6}>
            <Card>
              <CardHeader>Críterios de Organización para Torneo</CardHeader>
              <CardBody className="p-4">
                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Críterio # 1:
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="select"
                        name="event_ordering_one"
                        id="event_ordering_one"
                        placeholder="Críterio # 1"
                        value={formValues.event_ordering_one.value}
                        onChange={handleChange}
                      >
                        <option key={0} value="">Seleccione</option>
                        {criteriaTourney.map(({key, value},i)=>(
                          (key!==formValues.event_ordering_two.value && key!==formValues.event_ordering_three.value) &&
                            <option key={i+1} value={key}>{value}</option>                        
                        ))}
                      </Input>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Críterio # 2:
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="select"
                        name="event_ordering_two"
                        id="event_ordering_two"
                        placeholder="Críterio # 2"
                        value={formValues.event_ordering_two.value}
                        onChange={handleChange}
                      >
                        <option key={0} value="">Seleccione</option>
                        {criteriaTourney.map(({key, value},i)=>(
                          (key!==formValues.event_ordering_one.value && key!==formValues.event_ordering_three.value) &&
                            <option key={i+1} value={key}>{value}</option>                        
                        ))}
                      </Input>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Críterio # 3:
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="select"
                        name="event_ordering_three"
                        id="event_ordering_three"
                        placeholder="Críterio # 2"
                        value={formValues.event_ordering_three.value}
                        onChange={handleChange}
                      >
                        <option key={0} value="">Seleccione</option>
                        {criteriaTourney.map(({key, value},i)=>(
                          (key!==formValues.event_ordering_one.value && key!==formValues.event_ordering_two.value) &&
                            <option key={i+1} value={key}>{value}</option>                        
                      ))}
                      </Input>
                    </InputGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <CardHeader>Críterios de Organización para Rondas</CardHeader>
              <CardBody className="p-4">
                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Críterio # 1:
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="select"
                        id="round_ordering_one"
                        name="round_ordering_one"
                        placeholder="Críterio # 1"
                        value={formValues.round_ordering_one.value}
                        onChange={handleChange}
                      >
                        <option key={0} value="">Seleccione</option>
                        {criteriaRound.map(({key, value},i)=>(
                          (key!==formValues.round_ordering_two.value && key!==formValues.round_ordering_three.value) &&
                            <option key={i+1} value={key}>{value}</option>                        
                        ))}
                      </Input>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Críterio # 2:
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="select"
                        id="round_ordering_two"
                        name="round_ordering_two"
                        placeholder="Críterio # 2"
                        value={formValues.round_ordering_two.value}
                        onChange={handleChange}
                      >
                        <option key={0} value="">Seleccione</option>
                        {criteriaRound.map(({key, value},i)=>(
                          (key!==formValues.round_ordering_one.value && key!==formValues.round_ordering_three.value) &&
                            <option key={i+1} value={key}>{value}</option>                        
                      ))}
                      </Input>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label size="sm" sm={2}>
                    Críterio # 3:
                  </Label>
                  <Col sm={10}>
                    <InputGroup size="sm">
                      <Input
                        type="select"
                        id="round_ordering_three"
                        name="round_ordering_three"
                        placeholder="Críterio # 3"
                        value={formValues.round_ordering_three.value}
                        onChange={handleChange}
                      >
                        <option key={0} value="">Seleccione</option>
                        {criteriaRound.map(({key, value},i)=>(
                          (key!==formValues.round_ordering_one.value && key!==formValues.round_ordering_two.value) &&
                            <option key={i+1} value={key}>{value}</option>                        
                      ))}
                      </Input>
                    </InputGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </FormGroup>

        <div className="pt-2 pb-4 text-center">
          <Button
            type="submit"
            size={"sm"}
            color="primary"
            data-toggle="tooltip"
            title="Guardar Cambios"
            disabled={
                formValues.statusName.value === "CONFIGURATED" ||
                formValues.statusName.value === "INITIADED"
            }
          >
            Guardar
          </Button>
        </div>
      </div>
    </Form>
  );
}
