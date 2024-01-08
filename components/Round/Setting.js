
import { FormGroup, Label, Col, InputGroup, Input, FormFeedback } from "reactstrap"

export default function GeneralSetting({activeRound, settingValues, setSettingValues}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setSettingValues({
          ...settingValues,
          [name]: {
            ...settingValues[name],
            error: value === "",
            value
          }
        });
    };   
    
    return (
        <div className="tab-content pt-4">
            {activeRound.can_segment && <FormGroup row className="ps-4 pe-4">
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
                            onChange={handleChange}
                        >
                            <option key={0} value="">Seleccione</option>
                            <option key={1} value="YES">Sí</option>
                            <option key={2} value="NO">No</option>
                        </Input>
                        <FormFeedback>{settingValues.applySegmentation.errorMessage}</FormFeedback>
                    </InputGroup>
                </Col>
            </FormGroup>}

            {activeRound.can_bonus && <>
            
                <FormGroup row className="ps-4 pe-4">
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
                            <option key={0} value="">Seleccione</option>
                            <option key={1} value="YES">Sí</option>
                            <option key={2} value="NO">No</option>
                        </Input>
                        <FormFeedback>{settingValues.applyBonus.errorMessage}</FormFeedback>
                    </InputGroup>
                </Col>
            </FormGroup>
            {settingValues.applyBonus.value==="YES" && <FormGroup row className="ps-4 pe-4">
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
                        <FormFeedback>{settingValues.amountBonusTable.errorMessage}</FormFeedback>
                    </InputGroup>
                </Col>
            </FormGroup>}
            
            {settingValues.applyBonus.value==="YES" && <FormGroup row className="ps-4 pe-4">
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
                        <FormFeedback>{settingValues.amountBonusPoint.errorMessage}</FormFeedback>
                    </InputGroup>
                </Col>
            </FormGroup>}

            </>}

        </div>
    )
}