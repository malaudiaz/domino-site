import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../layouts/Layout";
import Head from "next/head";

export default function Page({ session }) {
  const value = useContext(AppContext);

  useEffect(() => {
    value.setLanguageSelected(session.locale);
  }, [session.locale, value]);

  const t = value.state.languages.home;

  return (
    <Layout session={session} title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.title}</title>
      </Head>

      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Reports <span>/Today</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body pb-0">
              <h5 className="card-title">Budget Report</h5>
            </div>
          </div>
          <div className="card">
            <div className="card-body pb-0">
              <h5 className="card-title">
                News &amp; Updates
              </h5>
            </div>
          </div>
        </div>
      </div>
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
