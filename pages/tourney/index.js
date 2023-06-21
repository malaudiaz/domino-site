import React from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";
import TourneyLayout from "../../layouts/TouneyLayout";
import Head from "next/head";

export default function Touneys({ session }) {
  const value = useContext(AppContext);
  const t = value.state.languages.events;
  return (
    <TourneyLayout session={session}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>{t.title}</title>
      </Head>
    </TourneyLayout>
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
