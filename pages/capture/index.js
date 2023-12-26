import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../AppContext";
import Layout from "../../layouts/Layout";
import Head from "next/head";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { eventDate } from "../../_functions";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import Empty from "../../components/Empty/Empty";

export default function Capture() {
  const router = useRouter();
  const { profile, lang, token } = useAppContext();
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const rowsPerPage = 12;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}event/data/?profile_id=${profile.id}&page=${page}&per_page=${rowsPerPage}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setRefresh(false);
        setEvents(data.data);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Entrada de Datos",
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
            title: "Entrada de Datos",
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
    if (Object.entries(profile).length > 0) {
      fetchData();
    }
  }, [refresh, profile]);

  const handleTourney = (item) => {
    router.push(`/capture/tourney/${item.id}`)    
  }

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Eventos en Desarrollo</title>
      </Head>

      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Eventos en Desarrollo
          </h1>
        </div>
        {events.length > 0 ? (
          <div className="pt-4 px-4" style={{ display: "grid" }}>
            <div className="container-events">
              {events.map(
                (
                  {
                    id,
                    name,
                    summary,
                    photo,
                    tourney
                  },
                  idx
                ) => (
                  <Card
                    style={{ borderRadius: "10px" }}
                    key={idx}
                  >
                    <div className="d-flex justify-content-between p-2">
                      <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-column ms-2">
                          <span className="fw-bold">{name}</span>
                        </div>
                      </div>
                      <div className="d-flex flex-row ellipsis align-items-center"></div>
                    </div>
                    <Image
                      alt={summary}
                      src={photo}
                      width={250}
                      height={250}
                      quality={50}
                      priority
                      layout="intrinsic"
                    />
                    <CardBody>
                      <div
                        className="col-12 pt-4"
                        style={{ textAlign: "center" }}
                      >
                        <h6 className="mb-2 text-muted">Torneos en Juego</h6>
                      </div>

                      <div className="container d-flex flex-column justify-content-center gap-2 pt-2">
                        {tourney.map((item, i)=>(
                            <Card 
                              className="lottery-card"
                              style={{ borderRadius: "10px", height:"80px"}} 
                              key={i} 
                              onClick={(e)=>{e.preventDefault();handleTourney(item)}}
                            >
                              <div className="d-flex justify-content-between p-2">
                                <div className="d-flex flex-row align-items-center">
                                  <div className="d-flex flex-column ms-2">
                                    <span className="fw-bold">{item.name}</span>
                                  </div>
                                </div>
                                <div className="d-flex flex-row ellipsis align-items-center"></div>
                              </div>
                              <CardBody>
                                  <div>
                                    {item.modality}
                                  </div>
                              </CardBody>
                            </Card>
                        ))}
                      </div>

                    </CardBody>
                  </Card>
                )
              )}
            </div>
          </div>
          ) : (
            <div className="pt-4 px-4" style={{ display: "grid", height: "600px" }}>
              <Empty 
                message="Los eventos en desarrollo aparecerán aquí." 
                path1="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" 
                path2="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
            </div>
          )}
      </div>
    </Layout>
  );
}
