import React from "react"
import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../layouts/Layout";

export default function Page({session}) {

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>Private</title>
      </Head>
      <h1>Private Page</h1>
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