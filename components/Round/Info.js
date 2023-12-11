import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import Image from "next/image";

import { Card, CardHeader, Table, Label, Input, CardFooter, CardBody } from "reactstrap";

export default function Info({round}) {
    const { token, lang } = useAppContext();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [tables, setTables] = useState([]);
    const rowsPerPage = 12;

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": lang,
            "Authorization": `Bearer ${token}`,
        },
    };
    
    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/all/${round}&page=${page}&per_page=${rowsPerPage}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setTables(data.data);
            setTotal(data.total);
            setTotalPages(data.total_pages);
          }
        } catch ({ code, message, name, request }) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Iniciando ronda del Torneo",
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
                title: "Iniciando ronda del Torneo",
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
        if (round) {
          fetchData();
        }
      }, [round]);
    
    return (
        <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
            <div className="container-events">
                {tables.map((item, idx) => (
                    <Card
                        className="card-info"
                        key={idx}
                        className="d-flex flex-column align-items-center rounded"
                        style={{ height: "400px", background: "#ebebeb" }}
                    >
                        <CardHeader className="w-100">Mesa <b>{item.table_number}</b> - {item.table_type}</CardHeader>
                        <CardBody>
                            <div className="d-flex flex-row justify-content-between icons align-items-center pt-4">
                                <div className="d-flex flex-column align-items-center">
                                    <Image
                                        alt="Avatar Player 1"
                                        src={"/profile/user-vector.jpg"}
                                        width={60}
                                        height={60}
                                        className="rounded-image"
                                    />
                                    <span>{item.pair_one.player_one}</span>
                                    <span>{item.pair_one.elo_one}</span>
                                </div>
                                <div className="d-flex flex-column flex-fill ms-2" style={{width: "200px"}}>
                                  <Table                         
                                    bordered
                                    hover
                                    responsive
                                    size="sm"
                                    striped
                                  >
                                    <thead>
                                      <tr className="text-center">
                                        <th colSpan={4}>
                                            {item.name}
                                        </th>
                                      </tr>
                                      <tr>
                                        <th>
                                          Nombre
                                        </th>
                                        <th>
                                          P+
                                        </th>
                                        <th>
                                          P-
                                        </th>
                                        <th>
                                          Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Player 1</td>
                                        <td>50</td>
                                        <td>80</td>
                                        <td>30</td>
                                      </tr>
                                      <tr>
                                        <td>Player 1</td>
                                        <td>90</td>
                                        <td>50</td>
                                        <td>40</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <Image
                                        alt="Avatar Player 1"
                                        src={"/profile/user-vector.jpg"}
                                        width={60}
                                        height={60}
                                        className="rounded-image"
                                    />
                                    <span>{item.pair_one.player_two}</span>
                                    <span>{item.pair_one.elo_two}</span>                                    
                                </div>
                            </div>

                            <div className="row px-4">
                              <hr></hr>
                            </div>


                            <div className="d-flex flex-row justify-content-between icons align-items-center pt-4">
                                <div className="d-flex flex-column align-items-center">
                                    <Image
                                        alt="Avatar Player 1"
                                        src={"/profile/user-vector.jpg"}
                                        width={60}
                                        height={60}
                                        className="rounded-image"
                                    />
                                    <span>{item.pair_one.player_one}</span>
                                    <span>{item.pair_one.elo_one}</span>
                                </div>
                                <div className="d-flex flex-column flex-fill ms-2" style={{width: "200px"}}>
                                  <Table                         
                                    bordered
                                    hover
                                    responsive
                                    size="sm"
                                    striped
                                  >
                                    <thead>
                                      <tr className="text-center">
                                        <th colSpan={4}>
                                            {item.name}
                                        </th>
                                      </tr>
                                      <tr>
                                        <th>
                                          Nombre
                                        </th>
                                        <th>
                                          P+
                                        </th>
                                        <th>
                                          P-
                                        </th>
                                        <th>
                                          Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Player 1</td>
                                        <td>50</td>
                                        <td>80</td>
                                        <td>30</td>
                                      </tr>
                                      <tr>
                                        <td>Player 1</td>
                                        <td>90</td>
                                        <td>50</td>
                                        <td>40</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <Image
                                        alt="Avatar Player 1"
                                        src={"/profile/user-vector.jpg"}
                                        width={60}
                                        height={60}
                                        className="rounded-image"
                                    />
                                    <span>{item.pair_one.player_two}</span>
                                    <span>{item.pair_one.elo_two}</span>                                    
                                </div>
                            </div>



                        </CardBody>
                    </Card>

                ))}

            </div>
        </div>
    );
}

