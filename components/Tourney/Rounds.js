import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import OutlineTooltip from "../Tooltip/OutlineTooltip";
import { Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

export default function Rounds({ tourney, tourneyId, title, showPlay, newPage, round, setRound, refresh, setRefresh }) {
  const { token, lang } = useAppContext();
  const [rounds, setRounds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("1");
  const [activeRound, setActiveRound] = useState(null);
  const rowsPerPage = 12;

  const router = useRouter();

  const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "accept-Language": lang,
        "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/rounds/?tourney_id=${tourney.id}&page=${page}&per_page=${rowsPerPage}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setRounds(data.data);
        setRefresh(false);
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
    if (tourney.id) {
      fetchData();
    }
  }, [refresh, page, tourney.id, activeRound]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const roundPlay = async() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/${tourneyId}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data.success) {
        setRefresh(true);

        Swal.fire({
          title: "Rondas",
          text: "La ronda ha sido iniciada",
          icon: "info",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Error en la Red",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const {detail} = JSON.parse(request.response)
          Swal.fire({
            title: "Autentificar",
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

  // const handleClick = (item) => {
  //   if (!showPlay) {
  //     if (newPage) {
  //       router.push(`${uri}/${item.id}`);
  //     } else {
  //       if (setRound) {
  //         setRound(item.id);
  //       }
  //     }
  //   } else {

  //     if (item.status_name === "CREATED") {
  //       Swal.fire({
  //         title: "Inicial Ronda",
  //         text: "Estas seguro que deseas iniciar esta ronda",
  //         icon: "question",
  //         showCancelButton: true,
  //         cancelButtonText: "Cancelar",
  //         allowOutsideClick: false,
  //         confirmButtonColor: "#3085d6",
  //         confirmButtonText: "Inicial",
  //       }).then((result) => {
  //         if (result.isConfirmed) {

  //           roundPlay();

  //         }
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "info",
  //         title: "Iniciar Ronda",
  //         text: "La ronda seleccionada, ya esta iniciada",
  //         showConfirmButton: true,
  //       });
  //     }
  //   }
  // };

  const setClose = () => {
    setOpen(false);
  };

  const roundTipInfo = (item) => {
    return (
      <div className="d-flex flex-column flex-fill ms-4">
        <h6><b>{item.summary}</b></h6>
        <small className="comment-text fs-12">
            Fecha Inicio: <b>{item.start_date}</b>
        </small>
        {item.close_date !== "" &&
            <small className="comment-text fs-12">
                Fecha Final: <b>{item.close_date}</b>
            </small>
        }
        <small className="comment-text fs-12">
            Estado: <b>{item.status_description.toUpperCase()}</b>
        </small>
      </div>

    )
  }

  const handleClick = (item) => {
    setActiveRound(item);
  }

  return (
    <div>
      <div className="d-flex flex-column flex-wrap gap-1 ps-4">
        <h1 className="title">Rondas</h1>
        {rounds.map((item, idx) => (
          <a key={idx} className="ms-2" style={{cursor: "pointer"}} onClick={(e)=>{e.preventDefault(); handleClick(item);}}>
            <span 
              className="round badge bg-primary rounded-circle fs-6" 
              id={'outlineTooltip'}
            >
              {item.round_number}
            </span>

            <OutlineTooltip
              placement="bottom"
              target="outlineTooltip"
              message={roundTipInfo(item)}
            />
    
          </a>          
                  
        ))}
      </div>

      <div className="tourney-setting">
        <Card className="flex-fill">
          <CardBody className="p-4">

              <div className="d-flex flex-wrap gap-2 justify-content-between p-2">
                {activeRound && <span>Ronda No. <b>{activeRound.round_number}</b></span>}
                {activeRound && <span>Resumen <b>{activeRound.summary}</b></span>}
                {activeRound && <span>Fecha de Inicio <b>{activeRound.start_date}</b></span>}
                {activeRound && <span>Fecha de Cierre <b>{activeRound.close_date}</b></span>}
              </div>

              <Nav tabs>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Ajustes Generales
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Categorias
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">


                </TabPane>
                <TabPane tabId="2">


                </TabPane>
              </TabContent>

          </CardBody>
        </Card>

      </div>


      {/* <div className="d-grid pt-3 px-4 pb-4" >
        {rounds.length > 0 ? (
          <div className="container-rounds">
            {rounds.map((item, idx) => (
              <div
                key={idx}
                className="lottery-card align-items-center rounded p-2"
                style={{ height: "120px", background: "#ebebeb" }}
              >
                <div
                  className="d-flex flex-row justify-content-between icons align-items-center"
                  style={{ height: "100%", width: "98%", cursor:"pointer"}}
                  onClick={(e) => {e.preventDefault(); handleClick(item);}}
                >

                  <h3 className="ms-2" >
                    <span className={round === item.id ? "badge bg-primary rounded-circle" : "badge bg-danger rounded-circle"}>
                      {item.round_number}
                    </span>           
                  </h3>          

                  <div className="d-flex flex-column flex-fill ms-4">
                    <h6><b>{item.summary}</b></h6>
                    <small className="comment-text fs-12">
                        Fecha Inicio: <b>{item.start_date}</b>
                    </small>
                    {item.close_date !== "" &&
                        <small className="comment-text fs-12">
                            Fecha Final: <b>{item.close_date}</b>
                        </small>
                    }
                    <small className="comment-text fs-12">
                        Estado: <b>{item.status_description.toUpperCase()}</b>
                    </small>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty message="Las rondas del torneo aparecerán aquí." path1="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
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
              showInfo={false}
            />
          </div>
        )}
      </div> */}
    </div>
  );
}
