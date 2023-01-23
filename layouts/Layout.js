import PropTypes from "prop-types";
import Header from "../components/Header/Header";

export default function Layout({ children }) {

  return (
    <>
      <Header />

      {/* <Sidebar /> */}

      <main id="main" className="main">
        {children}
      </main>

      {/* <Footer/> */}

    </>
  );
}

Layout.proptypes = {
  children: PropTypes.node,
};
