import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import Footer from "../components/Footers/Footer";
import Head from "next/head";

export default function Layout({ children, title }) {

  return (
    <>
       <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="author" content="SmartDomino"/>
        <meta name="description" content="Plataforma para el control de eventos de domino"/>
        <meta name="keywords" content="Domino, Smart, Juegos"/>
      </Head>
 
      <Header />

      <SideBar />

      <main id="main" className="main">
        {children}
      </main>

      <Footer/>
    </>
  );
}

Layout.proptypes = {
  children: PropTypes.node,
};
