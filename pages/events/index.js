import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../../layouts/Layout";
import Head from "next/head";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
} from "reactstrap";
import Image from "next/image";
import Pagination from "../../components/Pagination/Pagination";
import NewEvent from "../../components/events/events";

export default function Events({ session }) {
  const value = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [total, setTotal] = useState(50);
  const [openEvent, setOpenEvent] = useState(false);

  useEffect(() => {
    value.setLanguageSelected(session.locale);
  }, [session.locale, value]);

  const t = value.state.languages.events;

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleAddEvents = () => {
    setOpenEvent(true);
  }

  return (
    <Layout session={session} title={t.title}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.title}</title>
      </Head>

      <section className="section dashboard">
        <div className="row" style={{marginLeft: "0px"}}>

          <Pagination
            onChangePage={onChangePage}
            currentPage={page}
            totalPage={totalPages}
            totalCount={total}
            rowsPerPage={5}
            showAddButton={true}
            onAddButton={handleAddEvents}
          />

          <div className="row justify-content-center pt-4" style={{marginLeft: "0px"}}>
            <ul className="folder__links__list">
              <li className="folder__link__item">
                <Card className="folder__card">
                  <Image
                    alt="Events Image"
                    src="/images/jugando-domino.jpg"
                    width={200}
                    height={200}
                  />
                  <CardBody>
                    <CardTitle tag="h5">Campeonato del Mundo</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Torneo Elite por Parejas
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Button>Button</Button>
                  </CardFooter>
                </Card>
              </li>

              <li className="folder__link__item">
                <Card className="folder__card">
                  <Image
                    alt="Events Image"
                    src="/images/127260230.webp"
                    width={200}
                    height={200}
                  />
                  <CardBody>
                    <CardTitle tag="h5">Serie del Caribe</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Torneo Individual y por Parejas
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Button>Button</Button>
                  </CardFooter>
                </Card>
              </li>

              <li className="folder__link__item">
                <Card className="folder__card">
                  <Image
                    alt="Events Image"
                    src="/images/jugando-domino.jpg"
                    width={200}
                    height={200}
                  />
                  <CardBody>
                    <CardTitle tag="h5">Domino del barrio</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Torneo por parejas
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Button>Button</Button>
                  </CardFooter>
                </Card>
              </li>

              <li className="folder__link__item">
                <Card className="folder__card">
                  <Image
                    alt="Events Image"
                    src="/images/127260230.webp"
                    width={200}
                    height={200}
                  />
                  <CardBody>
                    <CardTitle tag="h5">Card title</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Card subtitle
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Button>Button</Button>
                  </CardFooter>
                </Card>
              </li>

              <li className="folder__link__item">
                <Card className="folder__card">
                  <Image
                    alt="Events Image"
                    src="https://picsum.photos/200/200"
                    width={200}
                    height={200}
                  />
                  <CardBody>
                    <CardTitle tag="h5">Card title</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Card subtitle
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Button>Button</Button>
                  </CardFooter>
                </Card>
              </li>

            </ul>
          </div>

          <Pagination
            onChangePage={onChangePage}
            currentPage={page}
            totalPage={totalPages}
            totalCount={total}
            rowsPerPage={5}
            showAddButton={true}
            onAddButton={handleAddEvents}
          />

        </div>

        <NewEvent session={session} openEvent={openEvent} setOpenEvent={setOpenEvent}/>

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
