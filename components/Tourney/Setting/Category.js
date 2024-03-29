import { useState, useEffect } from "react";
import { Form, Table, Button, FormGroup, Label, Col, InputGroup, Input, Card, CardHeader, CardBody, Row } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import Bombo from "../Bombo";
import Empty from "../../Empty/Empty";

export default function Category({ formValues, setFormValues, active }) {
  const { token, lang } = useAppContext();
  const [openNewBombo, setOpenNewBombo] = useState(false);
  const [bombo, setBombo] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [eloMax, setEloMax] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const fechData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/categories/${formValues.tourneyId.value}`;

    try {

      const { data } = await axios.get(url, config);

      if (data.success) {
        setFormValues({
          ...formValues,
          lst_categories: {
            ...formValues["lst_categories"],
            value: data.data
          },
        });

        if (formValues.lst_categories.value !== "") {
            const lst = formValues.lst_categories.value;
            let arr = [];
            for (let i=0; i<lst.length; i++) {
                arr.push(
                  {
                    number: i+1,
                    id: lst[i].id, 
                    title: lst[i].category_number, 
                    min: lst[i].elo_min, 
                    max: lst[i].elo_max, 
                    players: lst[i].amount_players
                  }
                );
            }
            setBombo(arr);
            setRefresh(false);
        }
      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Segmentación",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const {detail} = JSON.parse(request.response)
          Swal.fire({
            title: "Segmentación",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });  
          setRefresh(false);
        }
      }
    }
  }


  useEffect(() => {
    if (formValues.tourneyId.value && active) {
      fechData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [refresh, formValues.tourneyId.value, active]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (bombo.length > 0) {
        setEloMax((parseInt(bombo[bombo.length-1].min) - 1).toString());
    } else {
        setEloMax(formValues.eloMax.value.toString());
    }
    setOpenNewBombo(true);
  };

  const deleteItem = async (item) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/categories/${item.id}`;

    try {
        const { data } = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": lang,
            "Authorization": `Bearer ${token}`                },
        });
        if (data.success) {
          setEloMax("");
          setRefresh(!refresh);
          Swal.fire({
            icon: "success",
            title: "Configurando Torneo",
            text: data.detail,
            showConfirmButton: true,
          });
        }
      } catch ({ code, message, name, request }) {
        if (code === "ERR_NETWORK") {
          Swal.fire({
            title: "Eliminar Categoría",
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
              title: "Eliminar Categoría",
              text: detail,
              icon: "error",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
            setRefresh(!refresh);
          }
        }
      } 
  }

  const handleDelete = (e, item, idx) => {
    e.preventDefault();

    if ( formValues.statusName.value === "FINALIZED" ) {
      Swal.fire({
        icon: "info",
        title: "Eliminar Categoría",
        text: "El estado del torneo no permite eliminar una categoría",
        showConfirmButton: true,
      });
    } else {

      if (bombo.length-1 === idx) {

        Swal.fire({
          title: "¿ Eliminar Categoría ?",
          text: "Si continuas, la categoría será eliminada",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Eliminar",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteItem(item);
          }
        });

      } else {
        Swal.fire({
          icon: "info",
          title: "Eliminar Categoría",
          text: "Esta categoría no puede ser eliminada",
          showConfirmButton: true,
        });  
      }

    };

  }

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;    
    

    setFormValues({
      ...formValues,     
      [name]: {
        ...formValues[name],
        value: value
      },
    });
  };

  return (
    <div className="tab-content pt-2">
        <Form autoComplete="off">

            <FormGroup row className="pt-2 ps-4 pe-4">
              <Col sm={2}>
                <Label size="sm">
                  Cant. Jugadores:
                </Label>
              </Col>
              <Col sm={2}>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="eloMax"
                    id="eloMax"
                    value={formValues.amountPlayer.value}
                    disabled
                  />
                </InputGroup>
              </Col>


              <Col sm={2}>
                <Label size="sm">
                  ELO Máximo:
                </Label>
              </Col>
              <Col sm={2}>
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

              <Col sm={2}>
                <Label size="sm">
                  ELO Mínimo:
                </Label>
              </Col>
              <Col sm={2}>
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

            <FormGroup row className="pt-2 ps-4 pe-4">
              <Col className="pt-2 ps-4 pe-4" sm={4}>
                <FormGroup check inline>
                  <Input 
                    type="checkbox" 
                    id="usesSegmentation" 
                    name="usesSegmentation" 
                    disabled={parseInt(formValues.amountPlayer.value)==0}
                    value={formValues.usesSegmentation.value} 
                    checked={formValues.usesSegmentation.value}
                    onChange={handleChange}
                  />
                  <Label check>
                    Usar Segmentación
                  </Label>
                </FormGroup>
              </Col>

              {formValues.usesSegmentation.value &&
              <>
              <Col sm={2}>
                <Label size="sm">
                    Cant. rondas segmentación:
                </Label>
              </Col>
              <Col sm={2}>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    name="amountSegmentationRound"
                    id="amountSegmentationRound"
                    onChange={handleChange}
                    value={formValues.amountSegmentationRound.value}
                  />
                </InputGroup>
              </Col>
              <Col sm={2}>
                <Label size="sm">
                    Segmentar por:
                </Label>
              </Col>
              <Col sm={2}>
                <InputGroup size="sm">
                  <Input
                    id="segmentationType"
                    name="segmentationType"
                    type="select"
                    value={formValues.segmentationType.value}
                    onChange={handleChange}
                  >
                    <option value="">Tipo de Segmentación</option>
                    <option value="NIVEL">NIVEL</option>
                    <option value="ELO">ELO</option>
                  </Input>
                </InputGroup>
              </Col>
              </>}
            </FormGroup>


            {formValues.segmentationType.value === "ELO" && <Col className="pt-2 ps-4 pe-4" sm={12}>
              <Card>
                <CardHeader className="d-flex flex-row justify-content-between">
                  <h6>Segmentación</h6>

                  <Button
                      size="sm"
                      color="primary"
                      title="Nueva Categoría"
                      onClick={handleAdd}
                  >
                      <i className="bi bi-plus"></i> Nuevo Segmento
                  </Button>


                </CardHeader>
                <CardBody>
                  {bombo.length > 0 ? (
                    <>
                      <Table responsive size="sm" hover>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">ELO Max.</th>
                                <th className="text-center">ELO Min.</th>
                                <th className="text-center">Competidores</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bombo.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="text-center" scope="row">{item.number}</td>
                                    <td className="text-center">{item.title}</td>
                                    <td className="text-center">{item.max}</td>
                                    <td className="text-center">{item.min}</td>
                                    <td className="text-center">{item.players}</td>
                                    <td className="text-center">
                                        <a
                                          onClick={(e) => handleDelete(e, item, idx)}
                                          style={{ cursor: "pointer" }}
                                        >
                                            <i
                                                className="bi bi-trash text-danger fs-6 cursor-pointer"
                                                title="Eliminar"
                                            />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                      </Table>

                    </>

                  ) : (
                    <div
                        className="pt-3 px-4 pb-4"
                        style={{ display: "grid", height: "500px" }}
                    >
                      <Empty
                          path1="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.5.5 0 0 0-.115.118l-.012.025L6.5 4.5v.003l.003.01q.005.015.036.053a.9.9 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.9.9 0 0 0 .271-.194.2.2 0 0 0 .039-.063v-.009l-.012-.025a.5.5 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.5.5 0 0 0 .115-.118l.012-.025.001-.006v-.003a.2.2 0 0 0-.039-.064.9.9 0 0 0-.27-.193C8.91 11.1 8.49 11 8 11s-.912.1-1.19.24a.9.9 0 0 0-.271.194.2.2 0 0 0-.039.063v.003l.001.006.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238zM4.605 3a.5.5 0 0 0-.498.55l.001.007.29 3.4A.5.5 0 0 1 3.9 7.5h-.782c-.696 0-1.182-.497-1.469-.872a.5.5 0 0 0-.118-.115l-.025-.012L1.5 6.5h-.003a.2.2 0 0 0-.064.039.9.9 0 0 0-.193.27C1.1 7.09 1 7.51 1 8s.1.912.24 1.19c.07.14.14.225.194.271a.2.2 0 0 0 .063.039H1.5l.006-.001.025-.012a.5.5 0 0 0 .118-.115c.287-.375.773-.872 1.469-.872H3.9a.5.5 0 0 1 .498.542l-.29 3.408a.5.5 0 0 0 .497.55h1.878c-.048-.166-.195-.352-.463-.557-.274-.21-.52-.528-.52-.943 0-.568.447-.947.862-1.154C6.807 10.123 7.387 10 8 10s1.193.123 1.638.346c.415.207.862.586.862 1.154 0 .415-.246.733-.52.943-.268.205-.415.39-.463.557h1.878a.5.5 0 0 0 .498-.55l-.001-.007-.29-3.4A.5.5 0 0 1 12.1 8.5h.782c.696 0 1.182.497 1.469.872.05.065.091.099.118.115l.025.012.006.001h.003a.2.2 0 0 0 .064-.039.9.9 0 0 0 .193-.27c.14-.28.24-.7.24-1.191s-.1-.912-.24-1.19a.9.9 0 0 0-.194-.271.2.2 0 0 0-.063-.039H14.5l-.006.001-.025.012a.5.5 0 0 0-.118.115c-.287.375-.773.872-1.469.872H12.1a.5.5 0 0 1-.498-.543l.29-3.407a.5.5 0 0 0-.497-.55H9.517c.048.166.195.352.463.557.274.21.52.528.52.943 0 .568-.447.947-.862 1.154C9.193 5.877 8.613 6 8 6s-1.193-.123-1.638-.346C5.947 5.447 5.5 5.068 5.5 4.5c0-.415.246-.733.52-.943.268-.205.415-.39.463-.557z"
                          path2=""
                          message="Los Segmentos definidos apareceran aquí."
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>}


        </Form>

        <Bombo 
            tourneyId={formValues.tourneyId.value}
            open={openNewBombo} 
            setClose={setOpenNewBombo} 
            eloMax={eloMax}
            setRefresh={setRefresh}
        />

    </div>
  );
}
