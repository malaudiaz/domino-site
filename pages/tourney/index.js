import React from "react";
import { useAppContext } from "../../AppContext";
import Layout from "../../layouts/Layout";
import Head from "next/head";

export default function Touneys({ session }) {
  const {i18n} = useAppContext();
  const t = i18n.events;
  return (
    <Layout session={session}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>{t.title}</title>
      </Head>
    </Layout>
  );
}
