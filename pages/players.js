import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../layouts/Layout";
import Head from "next/head";

export default function Players({ session }) {
  const value = useContext(AppContext);

  useEffect(() => {
    value.setLanguageSelected(session.locale);
  }, [session.locale, value]);

  const t = value.state.languages.players;

  return (
    <Layout session={session} title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.title}</title>
      </Head>
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
