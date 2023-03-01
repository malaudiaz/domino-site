import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../layouts/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Page({ session }) {
  const value = useContext(AppContext);

  useEffect(() => {
    value.setLanguageSelected(session.locale);
  }, [session.locale, value]);

  const t = value.state.languages.home;

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
                      <img
                        alt=""
                        src="/UXdKE3o.jpeg"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="d-flex flex-column ms-2">
                        <span className="fw-bold">Jeanette Sun</span>
                        <small className="text-primary"> Collegues</small>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-1 ellipsis">
                      <small className="me-2">20 mins</small>
                      <i className="bi bi-three-dots"></i>
                    </div>
                  </div>
                  <img src="/dance.jpg" className="img-fluid" alt="..."></img>
                  <div className="p-2">
                    <p class="text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex flex-row icons d-flex align-items-center">
                        <button
                          type="button"
                          style={{ border: "none", background: "transparent" }}
                        >
                          <svg
                            aria-label="Me gusta"
                            color="rgb(38, 38, 38)"
                            fill="rgb(38, 38, 38)"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          style={{ border: "none", background: "transparent" }}
                        >
                          <svg
                            aria-label="Comentar"
                            color="rgb(38, 38, 38)"
                            fill="rgb(38, 38, 38)"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path
                              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                              fill="none"
                              stroke="currentColor"
                              stroke-linejoin="round"
                              stroke-width="2"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <div className="d-flex flex-row muted-color">
                        <span>12 comentarios</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="d-flex flex-row icons d-flex align-items-center"
                        style={{ paddingTop: "5px", paddingLeft: "5px" }}
                      >
                        <span className="fw-bold">35 Me gusta</span>
                      </div>
                    </div>
                    <div className="comments">
                      <div className="d-flex flex-row mt-2 mb-2">
                        <img
                          alt=""
                          src="/9AZ2QX1.jpg"
                          width="40"
                          className="rounded-image"
                        />
                        <div className="d-flex flex-column ms-2">
                          <span className="name">Daniel Frozer</span>{" "}
                          <small className="comment-text">
                            I like this alot! thanks alot
                          </small>
                          <div className="d-flex flex-row align-items-center status">
                            {" "}
                            <small style={{fontWeight: "bold", cursor: "pointer"}}>Me gusta</small> 
                            <small style={{fontWeight: "bold", cursor: "pointer"}}>Responder</small>{" "}
                            <small style={{fontWeight: "bold", cursor: "pointer"}}>18 mins</small>{" "}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row mt-2 mb-4">
                        <img
                          alt=""
                          src="/1YrCKa1.jpg"
                          width="40"
                          className="rounded-image"
                        />
                        <div className="d-flex flex-column ms-2">
                          {" "}
                          <span className="name">Elizabeth goodmen</span>{" "}
                          <small className="comment-text">
                            Thanks for sharing!
                          </small>
                          <div className="d-flex flex-row align-items-center status">
                            {" "}
                            <small style={{fontWeight: "bold", cursor: "pointer"}}>Me gusta</small> 
                            <small style={{fontWeight: "bold", cursor: "pointer"}}>Responder</small>{" "}
                            <small style={{fontWeight: "bold", cursor: "pointer"}}>8 h</small>{" "}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row mt-2 mb-4 ps-2">
                        <Link href={"#"}>
                          <small style={{fontWeight: "bold", cursor: "pointer"}}>Ver más comentarios</small> 
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
            <div className="card">
              <div className="card-body pb-0">
                <h5 className="card-title">Sugerencias para tí</h5>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <img
                      alt=""
                      src="/9AZ2QX1.jpg"
                      width="20"
                      className="rounded-image"
                    />
                    <div className="d-flex flex-column ms-2">
                      <span className="name">Daniel Frozer</span>
                      <small className="comment-text">Sugerencia para tí</small>
                    </div>
                  </div>
                  <div className="d-flex flex-row muted-color">
                    <Link href={"#"}>Seguir</Link>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <img
                      alt=""
                      src="/1YrCKa1.jpg"
                      width="20"
                      className="rounded-image"
                    />
                    <div className="d-flex flex-column ms-2">
                      <span className="name">Elizabeth goodmen</span>{" "}
                      <small className="comment-text">Sugerencia para tí</small>
                    </div>
                  </div>
                  <div className="d-flex flex-row muted-color">
                    <Link href={"#"}>Seguir</Link>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <img
                      alt=""
                      src="/UXdKE3o.jpeg"
                      width="20"
                      className="rounded-image"
                    />
                    <div className="d-flex flex-column ms-2">
                      <span className="name">Jeanette Sun</span>{" "}
                      <small className="comment-text">Sugerencia para tí</small>
                    </div>
                  </div>
                  <div className="d-flex flex-row muted-color">
                    <Link href={"#"}>Seguir</Link>
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
