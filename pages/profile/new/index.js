import { getSession } from "next-auth/react";
import Layout from "../../../layouts/Layout";
import Head from "next/head";

export default function CreateProfile({ session }) {
    return (
        <Layout session={session} title={"Profile"}>
          <Head>
            <link rel="shortcut icon" href="/smartdomino.ico" />
            <title>Pérfil</title>
          </Head>
        </Layout>
    );
};

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
