import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  Col,
  InputGroup,
} from "reactstrap";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";

export default function PrintBoletus({ open, setOpen, roundId }) {
  const { token, lang } = useAppContext();
  
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const [createLogoURL, setCreateLogoURL] = useState(null);
  const [logo, setLogo] = useState(null);


  const [frmData, setFrmData] = useState({
    interval: "",
    selections: "",
    boletusPage: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;

    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFrmData({
      ...frmData,
      [name]: value,
    });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const print = (data) => {

    let html = '<html><head></head><body>';
    const logo = 'http://127.0.0.1:3000/smartdomino.png'; //data.image;
    
    const image = createObjectURL;

    const round = data.round_number;
    const tables = data.lst_tables;

    for (let j=0; j<tables.length; j++) {
        html = html + '<table border=1 cellpadding=0 cellspacing=0 width="700px" style="font: 12pt sans-serif, monospace; border: 1px solid black; border-collapse: collapse; padding: 1px;">';

        html = html + '<tr height="25px"><td rowspan=2 width="100px" align="center">' + '<img src=' + logo + ' alt="Logo" width="80" height="50"></img>';

        html = html + '</td><td colspan=6 align="center"><b>' + "Boleta de Captación de Datos" + '</b></td><td rowspan=2 width="100px" align="center"></td></tr>';
        
        html = html + '<tr height="25px">';
        html = html + '</td><td colspan=6 align="center"><b>Titulo del Torneo</b></td></tr>';

        html = html + '<tr height="20px"><td width="100px" align="center" colspan=2>';
        html = html + '<b>Ronda</b></td><td colspan=2 align="center"><b>Mesa</b></td><td colspan=2 align="center"><b>Modalidad</b></td><td colspan=2 align="center"><b>Fecha</b></td></tr>';

        html = html + '<tr height="20px"><td width="100px" align="center" colspan=2>';
        html = html + '1</td><td colspan=2 align="center">3</td><td colspan=2 align="center">Individual</td><td colspan=2 align="center">23/02/2024</td></tr>';

        html = html + '</table></br>';

        html = html + '<table border=1 cellpadding=0 cellspacing=0 width="700px" style="font: 12pt sans-serif, monospace; border: 1px solid black; border-collapse: collapse; padding: 1px">';

        //; break-after: page;


        html = html + '<tr height="25px"><td colspan=2 width="400px"></td><td colspan=3 align="center">Puntos</td><td colspan=3 align="center">Marcar</td></tr>';
        html = html + '<tr height="25px"><td width="20px" align="center">Pos</td><td width="300px" align="center">Jugadores</td><td width="100px"align="center">Amon.</td><td width="100px" align="center">Amar.</td><td width="100px" align="center">Roja</td><td width="100px" align="center">Ausen.</td><td width="100px" align="center">Aban.</td><td width="100px" align="center">Expul.</td></tr>';

        const players = tables[j].lst_player;
        for (let i=0; i<players.length; i++) {
            html = html + '<tr height="40px"><td align="center" width="20px">' + (i+1).toString() + '</td><td width="400px">'+players[i]+'</td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td></td></tr>';
        }

        html = html + '</table></br>';


        html = html + '<table border=1 cellpadding=0 cellspacing=0 width="700px" style="font: 12pt sans-serif, monospace; border: 1px solid black; border-collapse: collapse; padding: 1px">';

        html = html + '<tr height="20px"><td align="center" colspan=6>' + 'ANULAR BOLETA' + '</td></tr>'; 

        html = html + '<tr height="35px"><td width="50px" align="center"></td><td align="center">' + 'Sentarse Incorrectamente' + '</td>';
        html = html + '<td width="50px" align="center"></td><td align="center">' + 'Error al Anotar' + '</td>';
        html = html + '<td width="50px" align="center"></td><td align="center">' + 'Conducta Antideportiva' + '</td></tr>';

        html = html + '</table></br>';

        html = html + '<table border=1 cellpadding=0 cellspacing=0 width="700px" style="font: 12pt sans-serif, monospace; border: 1px solid black; border-collapse: collapse; padding: 1px">';

        html = html + '<tr height="30px"><td align="center" width="50px">Data</td>';
    
        const pairs = tables[j].lst_pair;
        for (let i=0; i<pairs.length; i++) {
            html = html + '<td width="400px" align="center">' + pairs[i] + '</td>'
        }

        html = html + '</tr>';    

        for (let i=0; i<10; i++) {
            html = html + '<tr height="35px"><td align="center" width="50px">' + (i+1).toString() + '</td><td width="400px"></td><td width="400px"></td></tr>'
        }

        html = html + '<tr height="35px"><td align="center" width="50px">Total</td><td></td><td></td></tr>'

        html = html + '<tr><td colspan=3 align="center"><img src="' + image + '" alt="logo" width="700" height="200"></img></td></tr>'

        html = html + '</table><br>';        
    }

    html = html + '</body></html>';

    var specs="top=0" + ", left=0" + ", toolbar=no,location=no, status=no,menubar=no,scrollbars=no, resizable=no, width=0,height=0";

    var winprint = window.open('', '', specs);
        
    winprint.document.write(html);

    winprint.print();

    winprint.close();

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/printing/${roundId}`;

    try {
      const { data } = await axios.post(
        url,
        { interval: frmData.interval, interval_value: frmData.selections },
        config
      );

      if (data.success) {
        print(data.data);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Imprimir Boleta",
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
            title: "Imprimir Boleta",
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
      id="prn_boletus"
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
        <small>Imprimir Boletas</small>
      </ModalHeader>
      <Form autoComplete="off" encType="multipart/form-data">
        <ModalBody>
          <FormGroup tag="fieldset">
            <FormGroup inline check>
              <Input
                name="interval"
                type="radio"
                checked={frmData.interval == "0"}
                onChange={handleChange}
                value={"0"}
              />{" "}
              <Label check>Todas las Boletas</Label>
            </FormGroup>
            <FormGroup inline check>
              <Input
                name="interval"
                type="radio"
                checked={frmData.interval == "1"}
                onChange={handleChange}
                value={"1"}
              />{" "}
              <Label check>Selección</Label>
            </FormGroup>
          </FormGroup>

          {frmData.interval === "1" && (
            <FormGroup row>
              <Label size="sm" sm={6}>
                Mesa(s):
              </Label>
              <Col sm={6}>
                <InputGroup size="sm">
                  <Input
                    id="selections"
                    name="selections"
                    size="sm"
                    value={frmData.selections}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          )}

          {/* <FormGroup row>
            <Label size="sm" sm={6}>
              Boletas x Hojas:
            </Label>
            <Col sm={6}>
              <InputGroup size="sm">
                <Input
                  id="boletusPage"
                  name="boletusPage"
                  type="number"
                  min={1}
                  max={2}
                  size="sm"
                  value={frmData.boletusPage}
                  onChange={handleChange}
                />
              </InputGroup>
            </Col>
          </FormGroup> */}

          <div className="row pt-2">
            <strong>Foto de Publicidad para la Boleta</strong>
            <div className="col-12 justify-content-center text-center">
              <Label
                href="#"
                className="btn btn-sm"
                title="Cambiar foto de Publicidad de la Mesa"
                style={{ color: "white" }}
              >
                <Image
                  alt="Foto de Publicidad para la Boleta"
                  title="Foto de Publicidad para la Boleta"
                  src={createObjectURL ? createObjectURL : "/smartdomino.png"}
                  width={350}
                  height={150}
                  quality={50}
                  priority
                  layout="intrinsic"
                />
                <Input
                  type="file"
                  hidden
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      const i = event.target.files[0];
                      if (i.type.includes("image/jpeg")) {
                        setImage(i);
                        setCreateObjectURL(URL.createObjectURL(i));
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Cargando Imagen",
                          text: "Ha ocurrido un error al cargar la imagen",
                          showConfirmButton: true,
                        });
                      }
                    }
                  }}
                />
              </Label>
            </div>
          </div>
        </ModalBody>
      </Form>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={handleSubmit}>
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
    </Modal>
  );
}
