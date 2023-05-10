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


const mock = [
  {
    id: 1,
    user_id: "c62a5843-2628-48a4-8c1e-639501c79d22",
    name: "Jeanette Sun",
    avatar: "/profile/user-vector.jpg",
    elapsed: "20 min",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    amountLike: 2,
    amountComment: 12,
    allowComment: true,
    showCountLike: true,
    comments: [
      {
        id: 1,
        user_id: "95bfd91e-6f24-4c68-8309-a77f0946ef46",
        name: "Daniel Frozer",
        avatar: "/profile/user-vector.jpg",
        comment: "I like this alot! thanks alot",
        elapsed: "18 min",
      },
      {
        id: 2,
        user_id: "95bfd91e-6f24-4c68-8309-a77f0946ef46",
        name: "Elizabeth goodmen",
        avatar: "/profile/user-vector.jpg",
        comment: "Thanks for sharing! bla, bla, bla, bla",
        elapsed: "8 h",
      },
    ],
    photos: [
      { path: "/10000000_873713417029313_6641622374433675244_n.mp4", type: "video" },
    ],
    like: true
  },
  {
    id: 2,
    user_id: "c62a5843-2628-48a4-8c1e-639501c79d22",
    name: "Pedro Sánchez",
    avatar: "/profile/user-vector.jpg",
    elapsed: "3 d",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet",
    allowComment: true,
    amountLike: 1500,
    amountComment: 0,
    showCountLike: true,
    comments: [],
    photos: [
      { path: "/320999405_878476469880787_1097986021636655536_n.mp4", type: "video" },
    ],
    like: false
  },
];

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
    // const url = `/api/post/read`;
  
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
        <link rel="shortcut icon" href="/domino.ico" />
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
