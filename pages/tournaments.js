import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../layouts/Layout";

export default function Tournaments({ session }) {
  const value = useContext(AppContext);

  useEffect(() => {
    value.setLanguageSelected(session.locale);

  }, [session.locale, value])

  const t = value.state.languages.header;

  return <Layout></Layout>;
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
