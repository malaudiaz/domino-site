import React from "react"
import { useContext, useEffect } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../layouts/Layout";
import AppContext from "../../AppContext";

export default function Test({session}) {
  const value = useContext(AppContext);

  useEffect(() => {
    value.setLanguageSelected(session.locale);

  }, [session.locale, value])

  const t = value.state.languages.private;

  return (
    <Layout title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.title}</title>
      </Head>
      <h1>{t.h1}</h1>
      <p>{JSON.stringify(session)}</p>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) return {
    redirect: {
      destination: "/login",
      permanent: false
    }
  }
  return {
    props: {
      session
    }
  }
}