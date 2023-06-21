import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Footer from "../components/Footers/Footer";
import TorneySideBar from "../components/Sidebar/TourneyBar";


export default function TourneyLayout({ children, session }) {
  return (
    <>
      <Header session={session} />

      <TorneySideBar session={session} />

      <main id="main" className="main">
       {children}
      </main>

      <Footer/>
    </>
  );
}

TourneyLayout.proptypes = {
  children: PropTypes.node,
};
