import { useState, useEffect } from "react";
import Pagination from "../../../Pagination/Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../../../AppContext";
import { Table, Label, FormGroup, Col, InputGroup, Input } from "reactstrap";

export default function RoundPositions({ id, active }) {
    const { token, lang } = useAppContext();

    const [raiting, setRaiting] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState(1);
    const rowsPerPage = 20;
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "accept-Language": lang,
        "Authorization": `Bearer ${token}`,
      },
    };
  
    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/scale/player/current/${id}?page=${page}&per_page=${rowsPerPage}&order=${order}`;
  
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
            setTotal(data.total);
            setTotalPages(data.total_pages);
            setRaiting(data.data);
            }
        } catch ({ code, message, name, request }) {
            if (code === "ERR_NETWORK") {
                Swal.fire({
                    title: "Posiciones por Jugadores en ronda",
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
                        title: "Posiciones por Jugadores en ronda",
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
  
    useEffect(() => {
      if (id && active) {
        fetchData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, page, active, order]);
  
    const onChangePage = (pageNumber) => {
      setPage(pageNumber);
      fetchData();
    };

    const handleChange = (e) => {
        const value = e.target.value;   
        setOrder(value)
    };
    

    return (
        <div className="pt-3 pb-4">

            {raiting.length > 0 ? (
                <div className="container">

                    <div className="flex flex-column gap-4">
                        <FormGroup row>
                            <Label size="sm" sm={2}>
                                Ordenar por:
                            </Label>
                            <Col sm={5}>
                                <InputGroup size="sm">
                                    <Input
                                        type="select"
                                        name="order"
                                        id="order"
                                        defaultValue={order}
                                        onChange={handleChange}
                                    >
                                        <option value="1">Posiciones al Inicio</option>
                                        <option value="2">Posiciones al Final</option>
                                    </Input>
                                </InputGroup>
                            </Col>
                        </FormGroup>

                        <Table
                            bordered
                            hover
                            responsive
                            size="sm"
                            striped
                        >
                            <thead>
                                <tr>
                                    <th className="text-center" rowSpan={2}>Pos</th>
                                    <th className="text-center" rowSpan={2}>Nombre</th>

                                    <th className="text-center" rowSpan={2}>
                                        JJ
                                    </th>
                                    <th className="text-center" rowSpan={2}>
                                        JG
                                    </th>
                                    <th className="text-center" rowSpan={2}>
                                        JP
                                    </th>
                                    <th className="text-center" rowSpan={2}>
                                        P+
                                    </th>
                                    <th className="text-center" rowSpan={2}>
                                        P-
                                    </th>
                                    <th className="text-center" rowSpan={2}>
                                        Pen.
                                    </th>
                                    <th className="text-center" rowSpan={2}>
                                        DIF
                                    </th>

                                    <th className="text-center" colSpan={2}>Puntuación</th>

                                    <th className="text-center" colSpan={4}>ELO</th>


                                </tr>
                                <tr className="text-center">
                                    <th>
                                        Esperada
                                    </th>
                                    <th>
                                        Obtenida
                                    </th>
                                    <th>
                                        Inicio
                                    </th>
                                    <th>
                                        Var.
                                    </th>
                                    <th>
                                        Final
                                    </th>
                                    <th>
                                        R. Ant.
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {raiting.map((item, idx) => (
                                    <tr key={idx} style={{verticalAlign: "middle"}}>
                                        <th scope="row" className="text-center">
                                            {item.position_number}
                                        </th>
                                        <td>
                                            {item.name}
                                        </td>

                                        <td className="text-center">
                                            {item.games_played}
                                        </td>
                                        <td className="text-center">
                                            {item.games_won}
                                        </td>
                                        <td className="text-center">
                                            {item.games_lost}
                                        </td>
                                        <td className="text-end">
                                            {item.points_positive}
                                        </td>
                                        <td className="text-end">
                                            {item.points_negative}
                                        </td>

                                        <td className="text-end">
                                            {item.penalty_points}
                                        </td>

                                        <td className="text-end">
                                            {item.points_difference}
                                        </td>


                                        <td className="text-end">
                                            {item.score_expected}
                                        </td>
                                        <td className="text-end">
                                            {item.score_obtained}
                                        </td>

                                        <td className="text-center">
                                            {item.elo}
                                        </td>
                                        <td className="text-center">
                                            {item.elo_variable}
                                        </td>
                                        <td className="text-center">
                                            {item.elo_at_end}
                                        </td>
                                        <td className="text-center">
                                            {item.elo_ra}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>

                    </div>

                </div>
            ) : (
                <div className="wrapper">
                    <div style={{ textAlign: "center" }}>
                        <svg
                            width="56"
                            height="56"
                            fill="#0d6efd"
                            className="bi bi-ui-checks-grid"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2zm2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2.004 2.004 0 0 1 1.437-1.437V3.937A2.004 2.004 0 0 1 12.063 2.5H3.937A2.004 2.004 0 0 1 2.5 3.937zM14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        <div className="pt-4 fs-5">
                            La clasificación por jugadores de la ronda, aparecerá aquí
                        </div>
                    </div>
                </div>
            )}
            {totalPages > 1 && (
                <div className="row">
                    <Pagination
                        onChangePage={onChangePage}
                        currentPage={page}
                        totalPage={totalPages}
                        totalCount={total}
                        rowsPerPage={rowsPerPage}
                        siblingCount={1}
                        showInfo={true}
                    />
                </div>
            )}
        </div>
    );     
}