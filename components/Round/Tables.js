import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import { Card, CardHeader, Label, Input, CardFooter } from "reactstrap";

export default function Tables({ roundId }) {
  const { token, lang } = useAppContext();

  const [tables, setTables] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const rowsPerPage = 8;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/tables/one/?round_id=${roundId}&page=${page}&per_page=${rowsPerPage}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setTables(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Mesas de la Ronda",
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
    if (roundId) {
      fetchData();
    }
  }, [roundId, page]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    fetchData();
  };

  return (
    <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
      {tables.length > 0 ? (
        <div className="container-events">
          {tables.map((item, idx) => (
            <Card
              key={idx}
              className="d-flex flex-column align-items-center rounded"
              style={{ height: "400px", background: "#ebebeb" }}
            >
              <CardHeader className="w-100">Mesa <b>{item.number}</b> - {item.type}</CardHeader>
              <div className="container-fluid pt-2">
                <div className="row d-flex justify-content-center text-center pb-2">
                  <div className="image_with_badge_container">
                    <Image
                      alt="Avatar Player 1"
                      src={item.playerOne ? item.playerOne.avatar : "/profile/user-vector.jpg"}
                      width={60}
                      height={60}
                      className="rounded-image"
                    />
                    <span className="badge bg-primary rounded badge-on-image-y">
                      {item.playerOne ? item.playerOne.index : "-"}
                    </span>
                  </div>
                  <small>{item.playerOne ? item.playerOne.name : "Vacante"}</small>
                </div>

                <div className="row">

                  <div className="col-3 d-flex flex-column justify-content-center text-center">
                    <div className="image_with_badge_container">
                      <Image
                        alt="Avatar Player 2"
                        src={item.playerTwo ? item.playerTwo.avatar : "/profile/user-vector.jpg"}
                        width={60}
                        height={60}
                        className="rounded-image"
                      />
                      <span className="badge bg-primary rounded badge-on-image-x">
                        {item.playerTwo ? item.playerTwo.index : "-"}
                      </span>
                    </div>
                    <small>{item.playerTwo ? item.playerTwo.name : "Vacante"}</small>
                  </div>

                  <div
                    className="col-6 d-flex flex-column justify-content-center align-items-center border border-primary bg-white"
                    style={{ height: "100px" }}
                  >

                    <Image
                      alt="Photo Profile"
                      src={item.image}
                      width={"100%"}
                      height={"100%"}
                    />

                    <div className="d-flex flex-wrap">
                      <strong>Imagen de Publicidad</strong>
                    </div>

                  </div>

                  <div className="col-3 d-flex flex-column justify-content-center text-center">
                      <div className="image_with_badge_container">
                        <Image
                          alt="Avatar Player 4"
                          src={item.playerFour ? item.playerFour.avatar : "/profile/user-vector.jpg"}
                          width={60}
                          height={60}
                          className="rounded-image"
                        />
                        <span className="badge bg-primary rounded badge-on-image-x">
                          {item.playerFour ? item.playerFour.index : "-"}
                        </span>
                      </div>
                      <small>{item.playerFour ? item.playerFour.name: "Vacante"}</small>
                  </div>

                </div>

                <div className="row pt-2">

                  <div className="col-12 justify-content-center text-center">

                    <Label
                      href="#"
                      className="btn btn-primary btn-sm"
                      title="Cargar nueva foto de pérfil"
                      style={{ color: "white" }}
                    >
                      <i className="bi bi-upload"></i>
                      <Input
                        type="file"
                        hidden
                        onChange={(event) => {
                          if (event.target.files && event.target.files[0]) {
                            const i = event.target.files[0];
                            if (i.type.includes("image/jpeg")) {
                            } else {
                              Swal.fire({
                                icon: "error",
                                title: "Cargando Imagen",
                                text: "Ha ocurrido un error al cargar la imagen",
                                showConfirmButton: true,
                              });
                            }
                          }
                        }}
                      />
                    </Label>

                    <Label
                      href="#"
                      className="btn btn-danger btn-sm"
                      title="Eliminar mí foto de perfil"
                      style={{ color: "white" }}
                      onClick={(e) => {

                        Swal.fire({
                          title: "¿ Desea eliminar esta foto de pérfil ?",
                          text: "! Esta opción no podrá ser revertida !",
                          icon: "question",
                          showCancelButton: true,
                          confirmButtonText: "Sí",
                          cancelButtonText: "No",
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          reverseButtons: true,
                          allowOutsideClick: false,
                        }).then((result) => {
                          if (result.isConfirmed) {

                            setRecord({ ...record, photo: null, file: null });
                            setImage(null);
                            setCreateObjectURL(null);    

                          }
                        });                      

                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Label>

                  </div>                

                </div>

                <div className="row justify-content-center text-center pt-2">
                  <div className="image_with_badge_container">
                    <Image
                      alt="Avatar Player 3"
                      src={item.playerThree ? item.playerThree.avatar : "/profile/user-vector.jpg"}
                      width={60}
                      height={60}
                      className="rounded-image"
                    />
                    <span className="badge bg-primary rounded badge-on-image-y">{item.playerThree ? item.playerThree.index : "-"}</span>
                  </div>
                  <small>{item.playerThree ? item.playerThree.name : "Vacante"}</small>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="wrapper">
          <div style={{ textAlign: "center" }}>
            <svg
              width="56"
              height="56"
              fill="#0d6efd"
              className="bi bi-ui-checks-grid"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2zm2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2.004 2.004 0 0 1 1.437-1.437V3.937A2.004 2.004 0 0 1 12.063 2.5H3.937A2.004 2.004 0 0 1 2.5 3.937zM14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <div className="pt-4 fs-5">
              Las Mesas de la Ronda aparecerán aquí.
            </div>
          </div>
        </div>
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
    </div>
  );
}