import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import EventLayout from "../../../layouts/EventLayout";
import TouneyLayout from "../../../layouts/TouneyLayout";
import Head from "next/head";
import { Card, CardHeader, CardBody } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

export default function View({ session }) {
  const router = useRouter();
  const [tourney, setToutney] = useState([]);
  const [menu, setMenu] = useState(0);

  const monthTourney = (startDate) => {
    const start = new Date(startDate + " 00:00");
    return start.toLocaleString("default", { month: "short" }).toUpperCase();
  };

  const dayTourney = (startDate) => {
    const start = new Date(startDate + " 00:00");
    return start.getDate().toString();
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": "es-ES,es;",
      "Authorization": `Bearer ${session.token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${router.query.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setToutney(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Torneo",
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
  }, []);

  const handleButton = (btn) => {
    setMenu(btn);
  }

  return (
    <TouneyLayout session={session}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Evento</title>
      </Head>

      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="pt-2 px-4" style={{ display: "flex" }}>
          <Card
            className="my-2"
            inverse
            style={{
              width: "80px",
              height: "80px",
              border: "1px solid",
              borderColor: "#c7c7c7",
            }}
          >
            <CardHeader
              style={{ background: "red", height: "20px", textAlign: "center" }}
            >
              <h6
                style={{ fontSize: "14px", fontWeight: "600", color: "white" }}
              >
                {monthTourney(tourney.startDate)}
              </h6>
            </CardHeader>
            <CardBody className="p-2" style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#012970",
                }}
              >
                {dayTourney(tourney.startDate)}
              </h1>
            </CardBody>
          </Card>

          <div>
            <div className="row pt-2 px-4">
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#012970",
                }}
              >
                {tourney.event_name}
              </h1>
            </div>

            <div className="row px-4" style={{ fontSize: "14px" }}>
              <span
                className="mb-2 text-muted"
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                {tourney.name}, {tourney.modality}
              </span>
            </div>

            <div className="row px-4" style={{ fontSize: "14px" }}>
              <span className="mb-2 text-muted">{tourney.summary}</span>
            </div>
          </div>
        </div>

        <div className="row px-4">
          <hr></hr>
        </div>

        <div
          className="px-4 pb-4"
          style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        >
          <button
            type="button"
            style={menu === 0 ? { background: "#e4e6eb", color: "blue", fontWeight: "500" } : { background: "#e4e6eb" }}
            className="btn btn-sm"
            onClick={(e) => {e.preventDefault(); handleButton(0)}}
          >
            <i className="bi bi-envelope-check"></i>{" "}
            Invitaciones Aceptadas
          </button>
          <button
            type="button"
            style={menu === 1 ? { background: "#e4e6eb", color: "blue", fontWeight: "500" } : { background: "#e4e6eb" }}
            className="btn btn-sm"
            onClick={(e) => {e.preventDefault(); handleButton(1)}}
          >
            <i className="bi bi-people"></i>{" "}
            Jugadores
          </button>

          <button
            type="button"
            style={menu === 2 ? { background: "#e4e6eb", color: "blue", fontWeight: "500" } : { background: "#e4e6eb" }}
            className="btn btn-sm"
            onClick={(e) => {e.preventDefault(); handleButton(2)}}
          >
            <i className="bi bi-bounding-box"></i>{" "}
            Mesas
          </button>

        </div>


      </div>
    </TouneyLayout>
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
