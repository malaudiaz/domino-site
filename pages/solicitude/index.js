import Layout from "../../layouts/Layout";
import Head from "next/head";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import Empty from "../../components/Empty/Empty";

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

  const [solicitude, setSolicitude] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}requestplayer/one/${profile.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRefresh(false);
        setSolicitude(data.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {solicitude.length > 0 ? (
            <div className="container-events">
              {solicitude.map(
                (
                  {
                    name,
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
                      {profile_type === "PAIR_PLAYER" && <h5>Solicitud para formar Pareja</h5>}
                    </CardHeader>
                    <CardBody>
                      <div className="d-flex flex-row pt-4">
                        <span>Nombre: </span>
                        <strong>{name}</strong>
                      </div>

                      <hr/>

                      <div className="d-flex align-items-center pt-2">
                        <Image
                          alt="Foto del Evento"
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
            <Empty message="Las solicitudes recibidas aparecerán aquí." path1="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z" path2="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
          )}
        </div>
      </div>
    </Layout>
  );
}
