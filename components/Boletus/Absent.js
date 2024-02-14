import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Badge,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";

import { useAppContext } from "../../AppContext";

export default function Absent({ open, setOpen, record }) {
  const { token, lang } = useAppContext();
  const [frmData, setFrmData] = useState({
    motive: "",
    player_0: "",
    player_1: "",
    player_2: "",
    player_3: "",
    point: ""
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    const check = e.target.checked;

    setFrmData({
        ...frmData,
        [name]: check ? value : ""
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const players = [];
    for (let i=0; i<4; i++) {
      if (frmData["player_"+i] !== "") {
        players.push(frmData["player_"+i]);
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/absences/${record.boletus_id}`;

    const body = {
      players: players,
    };

    try {
      const { data } = await axios.post(url, body, config);

      if (data.success) {

        setFrmData({
          motive: "",
          player_0: "",
          player_1: "",
          player_2: "",
          player_3: "",
          point: ""
        })

      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Guardando Ausencias",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const { detail } = JSON.parse(request.response);
          Swal.fire({
            title: "Guardando Ausencias",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      }
    }
  };


  return (
    <Modal
      id="absent"
      isOpen={open}
      size="sm"
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader
        toggle={(e) => {
          setOpen(false);
        }}
      >
        <small>Ausencias</small>
      </ModalHeader>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <ModalBody>

            <FormGroup tag="fieldset">
                <FormGroup inline check>
                  <Input
                    name="motive"
                    type="radio"
                    checked={frmData.motive=="0"}
                    onChange={handleChange}
                    value={"0"}
                  />
                  {' '}
                  <Label check>
                    Llegada Tarde
                  </Label>
                </FormGroup>
                <FormGroup inline check>
                  <Input
                    name="motive"
                    type="radio"
                    checked={frmData.motive==="1"}
                    onChange={handleChange}
                    value={"1"}
                  />
                  {' '}
                  <Label check>
                    Abandono
                  </Label>
                </FormGroup>
            </FormGroup>


            <FormGroup tag="fieldset">

                <h5>Jugadores:</h5>

                {boletus.lst_players.map((player, idx) => (

                  <FormGroup check key={idx}>
                    <Input type="checkbox" name={"player_"+idx} value={player.profile_id} onChange={handleChange} />
                    {' '}
                    <Label check>
                      <Badge color="info" pill>{player.position_id}</Badge> {player.profile_name}
                    </Label>
                  </FormGroup>

                ))}

            </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" size="sm">
            Aceptar
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
