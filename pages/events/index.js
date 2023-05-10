import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../../layouts/Layout";
import Head from "next/head";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

import Image from "next/image";
import Pagination from "../../components/Pagination/Pagination";
import NewEvent from "../../components/Events/Events";
import DropDownMenu from "../../components/DropDownMenu/Menu";

import axios from "axios";
import Swal from "sweetalert2";

export default function Events({ session }) {
  const value = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [openEvent, setOpenEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [record, setRecord] = useState({});
  const [refresh, setRefresh] = useState(false);

  const rowsPerPage = 8;

  const ctxMenu = [
    { text: "Editar", key: "mnuEdit", icon: "bi bi-pencil-square" },
    { text: "Eliminar", key: "mnuDel", icon: "bi bi-trash" },
  ];

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": "es-ES,es;",
      Authorization: `Bearer ${session.token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}event?page=${page}&per_page=${rowsPerPage}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRefresh(false);
        setEvents(data.data);
        setTotal(data.total);
        setTotalPages(data.total_pages);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Eventos",
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
    value.setLanguageSelected(session.locale);
    fetchData();
  }, [session.locale, value, page, refresh]);

  const t = value.state.languages.events;

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleAddEvents = () => {
    setRecord({});
    setOpenEvent(true);
  };

  const mnuEdit = (index) => {
    setRecord(events[index]);
    setOpenEvent(true);
  };

  const eventDelete = async (index) => {
    const event = events[index];
    const url = `${process.env.NEXT_PUBLIC_API_URL}event/${event.id}`;

    await axios
      .delete(url, config)
      .then((res) => {
        setRefresh(true);

        Swal.fire({
          icon: "success",
          title: "Eliminar",
          text: "Evento eliminado con éxito",
          showConfirmButton: true,
        });
      })
      .catch((errors) => {
        Swal.fire({
          icon: "error",
          title: "Eliminar",
          text: "Ha ocurrido un error al eliminar el evento seleccionado",
          showConfirmButton: true,
        });
      });
  };

  const mnuDelete = (index) => {
    Swal.fire({
      title: "¿ Eliminar Evento ?",
      text: "Si continuas, el evento será eliminado",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eventDelete(index);
      }
    });
  };

  const onMenuSelection = (key, index) => {
    switch (key) {
      case "mnuEdit":
        mnuEdit(index);
        break;
      case "mnuDel":
        mnuDelete(index);
        break;
    }
  };

  return (
    <Layout session={session} title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.title}</title>
      </Head>

      <section className="section events">
        {events.length > 0 ? (
          <div className="row justify-content-center">
            <Pagination
              onChangePage={onChangePage}
              currentPage={page}
              totalPage={totalPages}
              totalCount={total}
              rowsPerPage={rowsPerPage}
              showAddButton={true}
              onAddButton={handleAddEvents}
            />

            <div className="row pt-4">
              <ul className="folder__links__list">
                {events.map(({ name, summary, photo, startDate, city_name, campus }, idx) => (
                  <li key={idx} className="folder__link__item">
                    <Card className="folder__card">
                      <div className="d-flex justify-content-between p-2">
                        <div className="d-flex flex-row align-items-center">
                          <div className="d-flex flex-column ms-2">
                            <span className="fw-bold">{name}</span>
                          </div>
                        </div>
                        <div className="d-flex flex-row ellipsis align-items-center">
                          <DropDownMenu
                            idx={idx}
                            items={ctxMenu}
                            onMenuSelection={onMenuSelection}
                          />
                        </div>
                      </div>
                      <Image
                        alt="Events Image"
                        src={photo}
                        width={400}
                        height={400}
                        quality={50}
                        priority
                        layout="intrinsic"
                      />
                      <CardBody>
                        <div className="col-12 pt-4">
                            <h6 className="mb-2 text-muted">{summary}</h6>
                        </div>
                        <div className="row pt-2">
                          <div className="col-6" style={{textAlign: "left"}}>
                            <span>Inicio: </span><b>{startDate}</b>
                          </div>
                          <div className="col-6" style={{textAlign: "left"}}>
                            <span>Fin: </span><b>{startDate}</b>                          
                          </div>
                        </div>
                        <div className="row pt-2">
                          <div className="col-12" style={{textAlign: "left"}}>
                            <span>Ciudad: </span><b>{city_name}</b>
                          </div>
                        </div>
                        <div className="row pt-2">
                          <div className="col-12" style={{textAlign: "left"}}>
                            <span>Sede: </span><b>{campus}</b>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>

            <Pagination
              onChangePage={onChangePage}
              currentPage={page}
              totalPage={totalPages}
              totalCount={total}
              rowsPerPage={rowsPerPage}
              showAddButton={true}
              onAddButton={handleAddEvents}
            />
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="row pt-4">
              <Card className="folder__card">
                <div
                  className="d-flex flex-wrap align-content-center"
                  style={{ height: "100%" }}
                >
                  <div onClick={handleAddEvents} style={{width: "100%", textAlign: "center", cursor: "pointer"}}>
                    <i
                      className="bi bi-plus-lg"
                      style={{
                        fontSize: "64px",
                        fontWeight: "bold",
                        color: "#7e7c6b",
                      }}
                    ></i>
                    <h6>Nuevo Evento</h6>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        <NewEvent
          session={session}
          openEvent={openEvent}
          setOpenEvent={setOpenEvent}
          record={record}
          setRefresh={setRefresh}
        />
      </section>
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
