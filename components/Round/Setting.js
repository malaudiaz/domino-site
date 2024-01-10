
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
