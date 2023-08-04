import Layout from "../../layouts/Layout";
import Head from "next/head";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function Solicitude() {
  const { profile, lang, token } = useAppContext();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const [invitations, setInvitations] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}requestplayer/one/${profile.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRefresh(false);
        setInvitations(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Invitaciones",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleRequest = async (e, id, status) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}requestplayer/${profile.id}`;
    const body = { profile_id: id, accept: status };

    try {
      const { data } = await axios.put(url, body, config);
      if (data.success) {
        Swal.fire({
          title: status ? "Solicitud Aceptada" : "Solicitud Rechazada",
          text: status ? data.data : "La solicitud ha sido rechazada",
          icon: "success",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
        setRefresh(true);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Respondiendo Invitaciones",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Solcitudes</title>
      </Head>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Solicitudes Recibidas
          </h1>
          <hr />
        </div>

        <div className="pt-4 px-4" style={{ display: "grid" }}>
          {invitations.length > 0 ? (
            <div className="container-events">
              {invitations.map(
                (
                  {
                    owner_name,
                    photo,
                    owner_elo,
                    owner_ranking,
                    profile_type,
                    profile_id,
                  },
                  idx
                ) => (
                  <Card style={{ borderRadius: "10px" }} key={idx}>
                    <CardHeader>
                      <h5>
                        Invitación para formar{" "}
                        {profile_type === "PAIR_PLAYER" ? "Pareja" : "Equipo"}
                      </h5>
                    </CardHeader>
                    <CardBody className="d-flex align-items-center pt-2">
                      <Image
                        alt="Foto de Pérfil"
                        src={photo}
                        width={60}
                        height={60}
                        priority
                        layout="intrinsic"
                      />
                      <div
                        className="d-flex flex-column"
                        style={{
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          width: "100%",
                        }}
                      >
                        <div className="d-flex flex-row">
                          <span>Nombre: </span>
                          <strong>{owner_name}</strong>
                        </div>
                        <div className="d-flex flex-row">
                          <span>ELO: </span>
                          <strong>{owner_elo}</strong>
                        </div>
                        <div className="d-flex flex-row">
                          <span>Ranking: </span>
                          <strong>{owner_ranking}</strong>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => handleRequest(e, profile_id, true)}
                      >
                        <i className="bi bi-check2-circle" /> Aceptar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) => handleRequest(e, profile_id, false)}
                      >
                        <i className="bi bi-x-circle" /> Rechazar
                      </button>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          ) : (
            <div className="wrapper">
              <div style={{ textAlign: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="56"
                  height="46"
                  fill="#0d6efd"
                  class="bi bi-link-45deg"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>

                <div className="pt-4 fs-5">
                  Las solicitudes recibidas aparecerán aquí.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
