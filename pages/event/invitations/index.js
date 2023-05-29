import EventLayout from "../../../layouts/EventLayout";
import Head from "next/head";
import { getSession } from "next-auth/react";

export default function Invitations({ session }) {
  return (
    <EventLayout session={session}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Asistiré</title>
      </Head>

      <div className="card" style={{border: "1px solid", borderColor: "#c7c7c7"}}>
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Invitaciones
          </h1>
        </div>

        <div className="row pt-4 px-4">

          <div className="wrapper">
            <div style={{textAlign: "center"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                fill="#0d6efd"
                className="bi bi-calendar3"
                viewBox="0 0 16 16"
              >
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <div className="pt-4 fs-5">
                Los torneos a los que has sido invitado aparecerán aquí.
              </div>
            </div>
          </div>
        </div>
      </div>
    </EventLayout>
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
