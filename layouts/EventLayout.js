import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Footer from "../components/Footers/Footer";
import EventSideBar from "../components/Sidebar/EventBar";


export default function EventLayout({ children }) {
  return (
    <>
      <Header />

      <EventSideBar />

      <main id="main" className="main">
       {children}
      </main>

      <Footer/>
    </>
  );
}

EventLayout.proptypes = {
  children: PropTypes.node,
};
