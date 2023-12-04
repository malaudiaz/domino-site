import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import Footer from "../components/Footers/Footer";

export default function Layout({ children }) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
        isDisabled: index === 0 && pathArray.length > 1
      };
    });
    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <>
      <Header />

      <SideBar />

      <main id="main" className="main">
        <div className="pagetitle">
        </div>
        {children}
      </main>

      <Footer/>
    </>
  );
}

Layout.proptypes = {
  children: PropTypes.node,
};
