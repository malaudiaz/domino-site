import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import { Form, FormGroup, Label, Input, Col, InputGroup, FormFeedback, Button } from "reactstrap";

export default function General({ formValues, setFormValues, setReload }) {
  const { token, lang } = useAppContext();

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
        "amount_rounds": formValues.amountRound.value,
        "number_points_to_win": formValues.pointRound.value,
        "time_to_win": formValues.timeRound.value,
        "game_system": formValues.playSystem.value,
        "lottery": formValues.lottery.value,
        "bonus": formValues.bonus.value,
        "limitPenaltyPoints": formValues.limitPenaltyPoints.value        
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
          setReload(true);

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
        <FormGroup row className="ps-4 pe-4">
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
                type="text"
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
            Cantidad de Rondas
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="amountRound"
                id="amountRound"
                invalid={formValues.amountRound.error}
                value={formValues.amountRound.value}
                onChange={handleChange}
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              />
            </InputGroup>
          </Col>

          <Label size="sm" sm={3}>
            Puntos para ganar ronda
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="text"
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
        </FormGroup>

        <FormGroup row className="ps-4 pe-4">
          <Label size="sm" sm={3}>
            Tiempo máximo para ganar (min.)
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="text"
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

          <Label size="sm" sm={3}>
            Sistema de Juego
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="select"
                name="playSystem"
                id="playSystem"
                placeholder="Sistema de Juego"
                defaultValue={formValues.playSystem.value}
                onChange={handleChange}
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              >
                <option value="SUIZO">Sistema Suizo</option>
                <option value="TRADICIONAL">Sistema Tradicional</option>
              </Input>
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
            Usar Bonificación
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="select"
                name="bonus"
                id="bonus"
                placeholder="Bonificación"
                value={formValues.bonus.value}
                onChange={handleChange}
                disabled={
                    formValues.statusName.value === "CONFIGURATED" ||
                    formValues.statusName.value === "INITIADED"
                }
              >
                <option value="YES">Sí</option>
                <option value="NO">No</option>
              </Input>
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
                type="text"
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
            Estado
          </Label>
          <Col sm={3}>
            <InputGroup size="sm">
              <Input
                type="text"
                name="status_description"
                id="status_description"
                value={formValues.statusDescription.value}
                disabled
              />
            </InputGroup>
          </Col>
        </FormGroup>

        <div className="pt-2 pb-4 text-center">
          <Button
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
