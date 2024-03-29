import Layout from "../../layouts/Layout";
import { useAppContext } from "../../AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search";
import Image from "next/image";
import { Card, CardBody, CardHeader } from "reactstrap";
import Link from "next/link";

export default function TourneyPage() {
  const { profile, lang, token } = useAppContext();
  const [tournaments, setTournaments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [reload, setReload] = useState(true);
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/${profile.id}?page=${page}&per_page=${rowsPerPage}`;

    if (searchField !== "") {
      url = url + `&search=${searchField}`;
    }

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setTournaments(data.data);
        setReload(false);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Inscripciones",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          console.log(message);
          const { detail } = JSON.parse(request.response);
          Swal.fire({
            title: "Inscripciones",
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
    if (reload && profile.id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, reload, profile.id]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    setReload(true);
  };

  const handleSearch = (value) => {
    setSearchField(value);
    setReload(true);
  };

  const getIntegerPart = (value) => {
    return Math.floor(value);
  }

  const getDecimalPart = (value) => {
    const num = (value - Math.floor(value)).toFixed(2);
    return num.split(".")[1];
  }

  return (
    <Layout title={"Configurar Torneo"}>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="d-flex flex-row justify-content-between align-items-center px-4 pt-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Configurar Torneo
          </h1>
        </div>

        <div className="d-flex flex-row flex-wrap gap-2 justify-content-between align-center pt-3 px-4 pb-2">
          <Search field={searchField} setField={handleSearch} />
        </div>

        <div className="d-none d-md-table text-gray-900 w-100 px-4 pb-2">
          <div className="d-grid pt-3">
            <div className="container-events">
              {tournaments.map((item, idx) => (
                <Link key={idx} href={`/settings/${item.id}`}>
                  <Card className="card-info">
                    <div className="d-flex justify-content-between p-2">
                      <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-column ms-2">
                          <span className="fw-bold">{item.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-100 px-3">
                      <Image
                        alt={"Poster de Publicidad"}
                        src={
                          item.image ? item.image : "/profile/user-vector.jpg"
                        }
                        width={350}
                        height={200}
                        quality={50}
                        priority
                        layout="intrinsic"
                        className="rounded"
                      />
                      <CardBody>
                        <div className="d-flex flex-row gap-4 pt-2 justify-content-between">
                          <div className="d-flex flex-column gap-2 pt-2">
                            <div className="d-flex flex-row gap-2">
                              <span>
                                Modalidad: <strong>{item.modality}</strong>
                              </span>
                            </div>
                            <div className="d-flex flex-row gap-2">
                              <span
                                style={{ fontSize: "14px", color: "green" }}
                              >
                                <i className="bi bi-geo-alt" />
                              </span>
                              <a>
                                {item.main_location}. {item.city_name}
                              </a>
                            </div>
                          </div>
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <span className="badge bg-primary text-wrap rounded" aria-hidden="true">
                              <span className="a-price-symbol">$</span>
                              <span className="a-price">
                                {getIntegerPart(item.inscription_import)}<span className="a-price-decimal">.</span>
                              </span>
                              <span className="a-price-fraction">{getDecimalPart(item.inscription_import)}</span>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="row pb-3">
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
    </Layout>
  );
}
