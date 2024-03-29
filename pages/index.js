import React, { useState, useEffect } from "react";
import {useAppContext} from "../AppContext";

import Layout from "../layouts/Layout";
import Head from "next/head";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";
import axios from "axios";
import Swal from "sweetalert2";
import ListProfile from "../components/Profile/List";
import Following from "../components/Following/Following";

export default function Page() {

  const {profile, lang, i18n, token} = useAppContext();

  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };
  
  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}post?profile_id=${profile.id}`;
  
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
    if (Object.entries(profile).length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, refresh]);

  const t = i18n.home;

  return (
    <Layout title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>{t.title}</title>
      </Head>

      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row justify-content-center">
              <Post posts={posts} setRefresh={setRefresh}/>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="row justify-content-center">
              <div className="col-8">
                <ListProfile />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-8">
                <Suggestions refresh={refresh} setRefresh={setRefresh}/>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-8">
                <Following refresh={refresh} setRefresh={setRefresh}/>
              </div>
            </div>


          </div>
        </div>
      </section>
    </Layout>
  );
}
