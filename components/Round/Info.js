import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import Image from "next/image";
import Pagination from "../Pagination/Pagination";

import {
  Card,
  CardHeader,
  Table,
  CardBody,
} from "reactstrap";
import Boletus from "./Boletus";

export default function Info({ round, readOnly, setActiveRound, active }) {
  const { token, lang } = useAppContext();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [tables, setTables] = useState([]);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState([]);
  const rowsPerPage = 12;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/boletus/all/${round.id}?page=${page}&per_page=${rowsPerPage}`;

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
    if (round.id && !open && active) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id, open, record, page, active]);

  const handleClick = (item) => {
    setRecord(item);
    setOpen(true);
  };

  const closeBoletus = () => {
    setOpen(false);
  };

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      {round && <div className="row px-2">
        <hr></hr>
      </div>}

      <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
        <div className="container-events">
          {tables.map((item, idx) => (
            <Card
              className="card-info"
              key={idx}
              style={{ background: "#ebebeb" }}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item);
              }}
            >
              <CardHeader className="w-100">
                Mesa <b>{item.table_number}</b> - {item.table_type}
              </CardHeader>
              <CardBody>
                <div className="d-flex flex-row justify-content-between icons align-items-center pt-4">
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      alt="Avatar Player 1"
                      src={"/profile/user-vector.jpg"}
                      width={60}
                      height={60}
                      title={item.pair_one.player_one + " - " + item.pair_one.elo_one}
                      className="rounded-image"
                    />
                  </div>
                  <div
                    className="d-flex flex-column flex-fill ms-2"
                    style={{ width: "200px" }}
                  >
                    <Table responsive size="sm">
                      <thead>
                        <tr className="text-center">
                          <th colSpan={4}>{item.pair_one.name}</th>
                        </tr>
                        <tr>
                          <th className="text-center">P+</th>
                          <th className="text-center">P-</th>
                          <th className="text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-middle">
                          <th
                            className={
                              item.pair_one.is_winner
                                ? "text-center text-danger"
                                : "text-center"
                            }
                            rowSpan={2}
                          >
                            {item.pair_one.positive_point}
                          </th>
                          <th className="text-center" rowSpan={2}>
                            {item.pair_one.negative_point}
                          </th>
                          <th className="text-center" rowSpan={2}>
                            {item.pair_one.difference_point}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      alt="Avatar Player 2"
                      src={"/profile/user-vector.jpg"}
                      width={60}
                      height={60}
                      className="rounded-image"
                      title={item.pair_one.player_two + " - " + item.pair_one.elo_two}
                    />
                  </div>
                </div>

                <div className="row px-4">
                  {item.status == "1" ? (
                    <span className="text-center bg-danger text-light">
                      <b>{item.status_partida}</b>
                    </span>
                  ) : (
                    <span className="text-center bg-primary text-light">
                      <b>{item.status_partida}</b>
                    </span>
                  )}
                </div>

                <div className="d-flex flex-row justify-content-between icons align-items-center pt-2">
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      alt="Avatar Player 3"
                      src={"/profile/user-vector.jpg"}
                      width={60}
                      height={60}
                      className="rounded-image"
                      title={item.pair_two.player_one + " - " + item.pair_two.elo_one}
                    />
                  </div>
                  <div
                    className="d-flex flex-column flex-fill ms-2"
                    style={{ width: "200px" }}
                  >
                    <Table responsive size="sm">
                      <thead>
                        <tr className="text-center">
                          <th className="text-center" colSpan={4}>
                            {item.pair_two.name}
                          </th>
                        </tr>
                        <tr>
                          <th className="text-center">P+</th>
                          <th className="text-center">P-</th>
                          <th className="text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-middle">
                          <th
                            className={
                              item.pair_two.is_winner
                                ? "text-center text-danger"
                                : "text-center"
                            }
                            rowSpan={2}
                          >
                            {item.pair_two.positive_point}
                          </th>
                          <th className="text-center" rowSpan={2}>
                            {item.pair_two.negative_point}
                          </th>
                          <th className="text-center" rowSpan={2}>
                            {item.pair_two.difference_point}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      alt="Avatar Player 4"
                      src={"/profile/user-vector.jpg"}
                      width={60}
                      height={60}
                      className="rounded-image"
                      title={item.pair_two.player_two + " - " + item.pair_two.elo_two}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="row">
            <Pagination
              onChangePage={onChangePage}
              currentPage={page}
              totalPage={totalPages}
              totalCount={total}
              rowsPerPage={rowsPerPage}
              siblingCount={1}
              showInfo={false}
            />
          </div>
        )}


        <Boletus 
          open={open} 
          close={closeBoletus} 
          record={record} 
          readOnly={readOnly} 
          setActiveRound={setActiveRound} 
        />
      </div>
    </>
  );
}
