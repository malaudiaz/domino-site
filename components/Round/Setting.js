import {
  Card,
  CardBody
} from "reactstrap";

import Lottery from "./Lottery";

export default function GeneralSetting({
  activeRound,
  tourney,
  selected,
  setSelected
}) {

  return (
    <div className="tab-content pt-4">
      <Card>
        <CardBody>
          <Lottery 
            activeRound={activeRound} 
            tourney={tourney} 
            selected={selected}
            setSelected={setSelected}
          />
        </CardBody>
      </Card>
    </div>
  );
}
