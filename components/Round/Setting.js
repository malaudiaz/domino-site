
import { useState } from "react";

import {
  FormGroup,
  Label,
  Col,
  InputGroup,
  Input,
  FormFeedback,
  Card,
  CardBody
} from "reactstrap";

import Lottery from "./Lottery";


export default function GeneralSetting({
  activeRound,
  settingValues,
  setSettingValues,
  tourney,
  selected,
  setSelected
}) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettingValues({
      ...settingValues,
      [name]: {
        ...settingValues[name],
        error: value === "",
        value,
      },
    });
  };

  return (
    <div className="tab-content pt-4">

      {activeRound.can_segment && (

        <Card>
          <CardBody>

            <div className="d-flex flex-wrap ps-4 pt-4">
              <h6 className="title flex-grow-1">Configuración</h6>
            </div>

            <hr></hr>

            <FormGroup row className="p-2">
              <Label size="sm" sm={2}>
                Usar Segmentación:
              </Label>
              <Col sm={4}>
                <InputGroup size="sm">
                  <Input
                    type="select"
                    name="applySegmentation"
                    id="applySegmentation"
                    invalid={settingValues.applySegmentation.error}
                    value={settingValues.applySegmentation.value}
                    placeholder="Segmentación"
                    disabled={activeRound.status_name==="CONFIGURATED"}
                    onChange={handleChange}
                  >
                    <option key={0} value="">
                      Seleccione
                    </option>
                    <option key={1} value="YES">
                      Sí
                    </option>
                    <option key={2} value="NO">
                      No
                    </option>
                  </Input>
                  <FormFeedback>
                    {settingValues.applySegmentation.errorMessage}
                  </FormFeedback>
                </InputGroup>
              </Col>

              {activeRound.can_bonus && (
                <>
                  <Label size="sm" sm={2}>
                      Usar Bonificación:
                  </Label>
                  <Col sm={4}>
                    <InputGroup size="sm">
                        <Input
                          type="select"
                          name="applyBonus"
                          id="applyBonus"
                          invalid={settingValues.applyBonus.error}
                          value={settingValues.applyBonus.value}
                          placeholder="Bonificación"
                          onChange={handleChange}
                        >
                          <option key={0} value="">
                            Seleccione
                          </option>
                          <option key={1} value="YES">
                            Sí
                          </option>
                          <option key={2} value="NO">
                            No
                          </option>
                        </Input>
                        <FormFeedback>
                          {settingValues.applyBonus.errorMessage}
                        </FormFeedback>
                      </InputGroup>
                  </Col>
                </>
              )}
            </FormGroup>
          </CardBody>
        </Card>
      )}

      {activeRound.can_bonus && (
          <FormGroup row className="ps-4 pe-4">
            {settingValues.applyBonus.value === "YES" && (
              <>
                <Label size="sm" sm={2}>
                  Cantidad de Mesa a Bonificar:
                </Label>
                <Col sm={4}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="amountBonusTable"
                      id="amountBonusTable"
                      invalid={settingValues.amountBonusTable.error}
                      value={settingValues.amountBonusTable.value}
                      onChange={handleChange}
                    />
                    <FormFeedback>
                      {settingValues.amountBonusTable.errorMessage}
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </>
            )}
            {settingValues.applyBonus.value === "YES" && (
              <>
                <Label size="sm" sm={2}>
                  Cantidad de Puntos a Bonificar:
                </Label>
                <Col sm={4}>
                  <InputGroup size="sm">
                    <Input
                      type="number"
                      name="amountBonusPoint"
                      id="amountBonusPoint"
                      invalid={settingValues.amountBonusPoint.error}
                      value={settingValues.amountBonusPoint.value}
                      onChange={handleChange}
                    />
                    <FormFeedback>
                      {settingValues.amountBonusPoint.errorMessage}
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </>
            )}
          </FormGroup>
      )}     

      <Card>
        <CardBody>
          <Lottery 
            activeRound={activeRound} 
            tourney={tourney} 
            useSegmentation={settingValues.applySegmentation.value} 
            selected={selected}
            setSelected={setSelected}
        />
        </CardBody>
      </Card>
    </div>
  );
}
