import { useState } from "react";

import {
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback
} from "reactstrap";
import FindForm from "./FindForm";

export default function FinderPlayer({ id, changePlayer }) {
  const [player, setPlayer] = useState("");
  const [openFinderPlayer, setOpenFinderPlayer] = useState(false);

  const onOpenFinder = () => {
    setOpenFinderPlayer(true);
  };

  return (
    <InputGroup size="sm">
      <Input
        id={id}
        type="text"
        name={id}
        placeholder="Jugador"
        value={player}
        readOnly
      />
      <InputGroupText>
        <a
          style={{ cursor: "pointer" }}
          onClick={onOpenFinder}
          data-toggle="tooltip"
          title="Buscar pareja"
        >
          <i className="bi bi-search"></i>
        </a>
      </InputGroupText>
      <FormFeedback>Por favor seleccione el cliente</FormFeedback>

      <FindForm isOpen={openFinderPlayer} setClose={setOpenFinderPlayer} setPlayer={setPlayer} changePlayer={changePlayer} />

    </InputGroup>
  );
}