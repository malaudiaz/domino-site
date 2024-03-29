import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/Layout";
import Head from "next/head";
import { Card, CardBody, CardFooter } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { eventDate } from "../../../_functions";

export default function View({ session }) {

  const router = useRouter();
  const [events, setEvents] = useState({});
  const [records, setRecords] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": "es-ES,es;",
      "Authorization": `Bearer ${session.token}`,
    },
  };

  const fetchData = async () => {

    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }event/one_event/${router.query.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setEvents(data.data);
        setRecords(data.data.tourney);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Evento",
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
  }, []);

  const sendInvitations = async (torneyId) => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }invitation?tourney_id=${torneyId}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data.success) {
        Swal.fire({
          title: "Enviar Invitaciones",
          text: data.detail,
          icon: "success",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
  
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Enviar Invitaciones",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }    
  };

  const handleClick = (id) => {
    router.push(`/tourney/view/${id}`);
  };


  return (
    <Layout session={session}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Evento</title>
      </Head>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
          <div className="row pt-3 px-4">
              <span style={{color: "red"}}><b>{eventDate(events.startDate, events.endDate)}</b></span>
          </div>

          <div className="row pt-2 px-4">
            <h1
              style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}
            >
              {events.name}
            </h1>
          </div>

          <div className="row px-4" style={{fontSize: "14px"}}>
            <span className="mb-2 text-muted">{events.campus}, {events.city_name}</span>
          </div>

          <div className="row px-4">
            <hr></hr>
          </div>

          <div className="pt-4 px-4" style={{display: "grid"}}>
            <div className="container-events">
              {records.map(({id, name, modality, summary, startDate}, idx)=>(
                <Card style={{cursor: "pointer", borderRadius: "10px"}} key={idx}>
                    <div className="d-flex justify-content-between p-2">
                    <div className="d-flex flex-row align-items-center">
                      <div className="d-flex flex-column ms-2">
                        <span className="fw-bold">{name}</span>
                      </div>
                    </div>
                  </div>
                  <Image
                    alt="Tourney Image"
                    // src={events.photo}
                    src={"/Logo-V.png"}
                    width={200}
                    height={200}
                    quality={50}
                    onClick={(e)=>{e.preventDefault(); handleClick(id)}}
                    priority
                    layout="intrinsic"
                  />

                  <CardBody>
                    <div className="col-12 pt-4">
                      <h6 className="mb-2 teviewxt-muted">{summary}</h6>
                    </div>
                    <div className="col-12 pt-2">
                        <span>Modalidad: </span>
                        <b>{modality}</b>
                    </div>
                    <div className="col-12 pt-2">
                        <span>Fecha: </span>
                        <b>{startDate}</b>
                    </div>
                  </CardBody>
                  <CardFooter style={{textAlign: "center"}}>
                    <button className="btn btn-primary btn-sm" onClick={(e)=>{e.preventDefault(); sendInvitations(id)}}>
                      <i className="bi bi-envelope"></i>{" "}
                        Enviar Invitación
                    </button>    
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {
      session,
    },
  };
};
