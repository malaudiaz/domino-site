import Layout from "../../layouts/Layout";
import Head from "next/head";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useAppContext} from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function Invitations() {
  const {profile, lang, token} = useAppContext();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const [invitations, setInvitations] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }requestplayer/one/${profile.id}`;

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

  useEffect(()=>{
    fetchData();
  },[refresh]);

  const handleRequest = async (e, id, status) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}requestplayer/${profile.id}`;
    const body = {"single_profile_id": id, "accept": status};

    try {
      const { data } = await axios.put(url, body, config);
      if (data.success) {
        setRefresh(false);
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
        <title>Invitaciones</title>
      </Head>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Mis Invitaciones
          </h1>
          <hr/>
        </div>

        <div className="pt-4 px-4" style={{ display: "grid" }}>
          {invitations.length > 0 ? (
                <div className="container-events">
                    {invitations.map(({owner_name, photo, owner_elo, owner_ranking, profile_type, profile_id}, idx)=>(
                        <Card style={{borderRadius: "10px"}} key={idx}>
                            <CardHeader>Invitación para formar {profile_type==="PAIR_PLAYER" ? "Pareja" : "Equipo"}</CardHeader>
                            <CardBody className="d-flex align-items-center pt-2">
                                <Image alt="Foto de Pérfil" src={photo} width={60} height={60} priority layout="intrinsic" />
                                <div className="d-flex flex-column" style={{paddingLeft: "10px", paddingRight: "10px", width: "100%"}}>
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
                                <button className="btn btn-primary btn-sm" onClick={(e)=>handleRequest(e, profile_id, true)}>
                                  <i className="bi bi-check2-circle"/>{" "}
                                  Aceptar
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={(e)=>handleRequest(e, profile_id, false)}>
                                  <i className="bi bi-x-circle" />{" "}
                                  Rechazar
                                </button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
            <div className="wrapper">
              <div style={{ textAlign: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="56"
                  height="56"
                  fill="#0d6efd"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>

                <div className="pt-4 fs-5">
                  Las invitaciones recibidas aparecerán aquí.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
