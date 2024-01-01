import { useState, useEffect } from "react";

import {
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback
} from "reactstrap";
import FindForm from "./FindForm";

export default function FinderPlayer({ id, changePlayer, record }) {

  const [player, setPlayer] = useState("");
  const [openFinderPlayer, setOpenFinderPlayer] = useState(false);

  useEffect(()=>{
    if (record) {
      if (Object.entries(record).length > 0) {
        if (record.lst_users) {
          setPlayer(record.lst_users.name);
        }
      }
    }
  }, [record])

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
          onClick={(e)=>{e.preventDefault(); setPlayer("");}}
          data-toggle="tooltip"
          title="Limpiar"
        >
          <i className="bi bi-x"></i>
        </a>
      </InputGroupText>
      <InputGroupText>
        <a
          style={{ cursor: "pointer" }}
          onClick={onOpenFinder}
          data-toggle="tooltip"
          title="Buscar Jugador"
        >
          <i className="bi bi-search"></i>
        </a>
      </InputGroupText>

      <FindForm 
        isOpen={openFinderPlayer} 
        setClose={setOpenFinderPlayer} 
        setPlayer={setPlayer} 
        changePlayer={changePlayer} 
      />

    </InputGroup>
  );
}
