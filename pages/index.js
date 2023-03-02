import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../layouts/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Page({ session }) {
  const value = useContext(AppContext);

  const [like, setLike] = useState(false);

  useEffect(() => {
    value.setLanguageSelected(session.locale);
    sessionStorage.setItem("avatar", session.photo);
  }, [session.locale, value]);

  const t = value.state.languages.home;

  const toggle = () => {
    setLike(!like);
  };

  return (
    <Layout session={session} title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.title}</title>
      </Head>

      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row justify-content-center">
              <div className="col-8">
                <div className="card">
                  <div className="d-flex justify-content-between p-2 px-3">
                    <div className="d-flex flex-row align-items-center">
                      <Image
                        alt=""
                        src={"/UXdKE3o.jpeg"}
                        width={40}
                        height={40}
                        className="rounded-image"
                      />
                      <div className="d-flex flex-column ms-2">
                        <span className="fw-bold">Jeanette Sun</span>
                        <small className="text-primary"> Collegues</small>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-1 ellipsis">
                      <small className="me-2">20 min</small>
                      <i className="bi bi-three-dots"></i>
                    </div>
                  </div>

                  <div
                    id="carouselPostIndicators"
                    className="carousel slide"
                    data-bs-touch="false"
                    data-bs-interval="false"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselPostIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselPostIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <Image
                          alt=""
                          src={"/dance.jpg"}
                          width={1000}
                          height={1000}
                          className="d-block w-100 h-100"
                        />
                      </div>
                      <div className="carousel-item">
                        <Image
                          alt=""
                          src={"/marc-kleen-H02BVUa2IVY-unsplash.jpg"}
                          width={1000}
                          height={1000}
                          className="d-block w-100 h-100"
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselPostIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselPostIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>

                  <div className="p-2">
                    <p className="text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex flex-row icons d-flex align-items-center">
                        <div className="btn-like" onClick={() => toggle()}>
                          <svg
                            aria-label="Me gusta"
                            width="20"
                            height="20"
                            fill={like ? "red" : "rgb(38, 38, 38)"}
                            className="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d={
                                like
                                  ? "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                  : "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                              }
                            />
                          </svg>
                        </div>

                        <div className="btn-comment ms-2">
                          <svg
                            aria-label="Comentar"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-chat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                          </svg>
                        </div>
                      </div>
                      <div className="d-flex flex-row fw-bold muted-color align-items-center">
                        <span style={{ fontSize: "12px" }}>12 comentarios</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="d-flex flex-row icons d-flex align-items-center"
                        style={{ paddingTop: "5px", paddingLeft: "5px" }}
                      >
                        <span className="fw-bold" style={{ fontSize: "12px" }}>
                          35 Me gusta
                        </span>
                      </div>
                    </div>
                    <div className="comments">
                      <div className="d-flex flex-row mt-2 mb-2">
                        <div className="d-flex flex-column">
                          <Image
                            alt=""
                            src={"/9AZ2QX1.jpg"}
                            width={40}
                            height={40}
                            className="rounded-image"
                          />
                        </div>
                        <div className="d-flex flex-column ms-2">
                          <span className="name">Daniel Frozer</span>{" "}
                          <small className="comment-text">
                            I like this alot! thanks alot
                          </small>
                          <div className="d-flex flex-row align-items-center status">
                            {" "}
                            <small
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Me gusta
                            </small>
                            <small
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Responder
                            </small>{" "}
                            <small
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              18 min
                            </small>{" "}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row mt-2 mb-4">
                        <div className="d-flex flex-column">
                          <Image
                            alt=""
                            src={"/1YrCKa1.jpg"}
                            width={40}
                            height={40}
                            className="rounded-image"
                          />
                        </div>
                        <div className="d-flex flex-column ms-2">
                          <div className="d-flex flex-column">
                            <span className="name">Elizabeth goodmen</span>
                            <small className="comment-text">
                              Thanks for sharing! bla, bla, bla, bla
                            </small>
                          </div>
                          <div className="d-flex flex-row align-items-center status">
                            <small
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Me gusta
                            </small>
                            <small
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Responder
                            </small>{" "}
                            <small
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              8 h
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row mt-2 mb-4 ps-2">
                        <Link href={"#"}>
                          <small
                            style={{ fontWeight: "bold", cursor: "pointer" }}
                          >
                            Ver más comentarios
                          </small>
                        </Link>
                      </div>
                      <div className="comment-input">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Agregar comentario..."
                          style={{ fontSize: "0.8rem" }}
                        />
                        <div className="fonts">
                          {" "}
                          <i className="bi bi-emoji-smile"></i>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row justify-content-center">
              <div className="col-8">
                <div className="card">
                  <div className="card-body pb-0">
                    <h5 className="card-title">Sugerencias para tí</h5>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex flex-row icons d-flex align-items-center">
                        <Image
                          alt=""
                          src={"/9AZ2QX1.jpg"}
                          width={40}
                          height={40}
                          className="rounded-image"
                        />
                        <div className="d-flex flex-column ms-2">
                          <span className="name">Daniel Frozer</span>
                          <small
                            className="comment-text muted-color"
                            style={{ fontSize: "10px" }}
                          >
                            Sugerencia para tí
                          </small>
                        </div>
                      </div>
                      <div
                        className="d-flex flex-row muted-color fw-bold"
                        style={{ fontSize: "10px" }}
                      >
                        <Link href={"#"}>Seguir</Link>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex flex-row icons d-flex align-items-center">
                        <Image
                          alt=""
                          src={"/1YrCKa1.jpg"}
                          width={40}
                          height={40}
                          className="rounded-image"
                        />
                        <div className="d-flex flex-column ms-2">
                          <span className="name">Elizabeth goodmen</span>{" "}
                          <small
                            className="comment-text muted-color"
                            style={{ fontSize: "10px" }}
                          >
                            Sugerencia para tí
                          </small>
                        </div>
                      </div>
                      <div
                        className="d-flex flex-row muted-color fw-bold"
                        style={{ fontSize: "10px" }}
                      >
                        <Link href={"#"}>Seguir</Link>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex flex-row icons d-flex align-items-center">
                        <Image
                          alt=""
                          src={"/UXdKE3o.jpeg"}
                          width={40}
                          height={40}
                          className="rounded-image"
                        />
                        <div className="d-flex flex-column ms-2">
                          <span className="name">Jeanette Sun</span>{" "}
                          <small
                            className="comment-text muted-color"
                            style={{ fontSize: "10px" }}
                          >
                            Sugerencia para tí
                          </small>
                        </div>
                      </div>
                      <div
                        className="d-flex flex-row muted-color fw-bold"
                        style={{ fontSize: "10px" }}
                      >
                        <Link href={"#"}>Seguir</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
