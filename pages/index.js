import React, { useState } from "react";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../layouts/Layout";
import Head from "next/head";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";
import axios from "axios";
import Swal from "sweetalert2";

export default function Page({ session }) {

  const value = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": "es-ES,es;",
      "Authorization": `Bearer ${session.token}`,
    },
  };
  
  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}post`;
  
    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setPosts(data.data);
        setRefresh(false);
      }
    } catch ({ response }) {
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Publicaciones",
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
    if (session.photo != null && session.photo != undefined && session.photo != "") {
      value.setAvatar(session.photo);
    }
    fetchData();
  }, [session.locale, value, refresh]);

  const t = value.state.languages.home;

  return (
    <Layout session={session} title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>{t.title}</title>
      </Head>

      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row justify-content-center">
              <Post session={session} posts={posts} setRefresh={setRefresh}/>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="row justify-content-center">
              <div className="col-8">
                <Suggestions />
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
