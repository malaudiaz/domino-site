import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../layouts/Layout";
import Head from "next/head";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";

export default function Page({ session }) {
  const value = useContext(AppContext);

  useEffect(() => {
    value.setLanguageSelected(session.locale);
    if (session.photo != null && session.photo != undefined && session.photo != "") {
      value.setAvatar(session.photo);
    }
  }, [session.locale, value]);

  const t = value.state.languages.home;

  const posts = [
    {
      id: 1,
      name: "Jeanette Sun",
      avatar: "/UXdKE3o.jpeg",
      elapsed: "20 min",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      amountComment: 12,
      comments: [
        {
          id: 1,
          name: "Daniel Frozer",
          avatar: "/9AZ2QX1.jpg",
          comment: "I like this alot! thanks alot",
          elapsed: "18 min",
        },
        {
          id: 2,
          name: "Elizabeth goodmen",
          avatar: "/1YrCKa1.jpg",
          comment: "Thanks for sharing! bla, bla, bla, bla",
          elapsed: "8 h",
        },
      ],
      photos: [
        { path: "/dance.jpg" },
        { path: "/marc-kleen-H02BVUa2IVY-unsplash.jpg" },
      ],
      amountLike: 35,
    },
    {
      id: 2,
      name: "Pedro Sánchez",
      avatar: "/user-vector.jpg",
      elapsed: "3 d",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet",
      amountComment: 0,
      comments: [],
      photos: [
        { path: "/marc-kleen.jpg" },
        { path: "/dance.jpg" },
      ],
      amountLike: 1500,
    },
  ];

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
              <Post session={session} posts={posts} />
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
