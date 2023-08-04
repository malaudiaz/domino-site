import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import Footer from "../components/Footers/Footer";

import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import BreadcrumbItem from "../components/Breadcrumbs/BreadcrumbItem";

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
          {/* <h1>{title}</h1>
          <Breadcrumb>
            <BreadcrumbItem
              isCurrent={router.pathname === "/"}
              href="/"
              icon="bi bi-house-door-fill"
            >
              Home
            </BreadcrumbItem>
            {breadcrumbs &&             
              breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem
                  key={breadcrumb.href}
                  href={breadcrumb.href}
                  isCurrent={breadcrumb.isCurrent}
                  isDisabled={breadcrumb.isDisabled}
                >
                  {breadcrumb.label}
                </BreadcrumbItem>
              ))}
          </Breadcrumb> */}
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
