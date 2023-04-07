import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../../layouts/Layout";
import Head from "next/head";
import axios from "axios";
import Swal from "sweetalert2";
import classnames from "classnames";
import Image from "next/image";
import { signOut } from "next-auth/react";
import View from "../../components/Profile/View";
import Edit from "../../components/Profile/Edit";
import ChangePassword from "../../components/Profile/ChangePassword";

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

export default function Profile({ session }) {
  const value = useContext(AppContext);
  const avatar = value.state.avatar;

  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  const [reload, setReload] = useState(false);

  const [profile, setProfile] = useState({
    alias: "",
    birthdate: "",
    city_id: "",
    country_id: 1,
    email: "",
    first_name: "",
    id: "",
    job: "",
    last_name: "",
    phone: "",
    photo: "",
    sex: "M",
    username: "",
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };

  useEffect(() => {
    value.setLanguageSelected(session.locale);

    const fetchData = async () => {
      const url = `/api/users/profile?id=${session.id}`;
      setLoading(true);

      try {
        const { data } = await axios.get(url, config);

        if (data.success) {
          const respObj = data.data;

          profile.id = respObj.id;
          profile.username = respObj.username;
          profile.first_name = respObj.first_name;
          profile.last_name = respObj.last_name;
          profile.alias = respObj.alias ? respObj.alias : "";
          profile.birthdate = respObj.birthdate ? respObj.birthdate : "";
          profile.email = respObj.email;
          profile.phone = respObj.phone;
          profile.job = respObj.job;
          profile.sex = respObj.sex ? respObj.sex : "";
          profile.city_id = respObj.city_id ? respObj.city_id : "";
          profile.country_id = respObj.country_id ? respObj.country_id : "";
          profile.photo = !respObj.photo ? "/profile/user-vector.jpg" : respObj.photo;

          setProfile(profile);
          setLoading(false);
          setReload(false);
        }
      } catch ({ response }) {
        const { detail } = response.data;
        Swal.fire({
          title: "Pérfil",
          text: detail,
          icon: "info",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            signOut();
          }
        });
      }
    };

    fetchData();
  }, [reload]);

  const handleChange = (prop) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    // setValidate({
    //   ...validate,
    //   [prop]: event.target.value != "" ? "success" : "error",
    // });

    setProfile({ ...profile, [prop]: value });
  };

  const saveProfile = async () => {
    const url = `/api/users/profile?id=${profile.id}`;

    try {
      const { data } = await axios.put(url, profile, config);
      if (data.success) {
        setLoading(true);
        setReload(true);      
        Swal.fire({
          icon: "success",
          title: "Guardando Pérfil",
          text: data.detail,
          showConfirmButton: true,
        });
      }
    } catch (errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al consultar la API....",
        showConfirmButton: true,
      });
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append("id", session.id);
    body.append("file", image);

    const {status, data} = await axios.post("/api/avatar/upload", body);
    if (status == 200) {
      const photo = image ? `/profile/${session.id}/`+data.files.file.originalFilename : "/user-vector.jpg";
      value.setAvatar(photo);
      profile.photo = photo;
      setProfile(profile);    
      saveProfile();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, su imagen no ha subido al servidor.",
        showConfirmButton: true,
      });
    }
  };


  return (
    <Layout session={session} title={"Profile"}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>Pérfil</title>
      </Head>
      <section className="section profile">
        <Row>
          <Col xl={4}>
            <Card>
              <CardBody className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                {profile.photo && (
                  <Image
                    src={avatar}
                    alt="Pérfil"
                    priority="true"
                    width="100%"
                    height="100%"
                    className="rounded-circle"
                  />
                )}
                <h2>{profile.first_name + " " + profile.last_name}</h2>
                <h3>{profile.job}</h3>
              </CardBody>
            </Card>
          </Col>

          <Col xl={8}>
            <Card>
              <CardBody className="card-body pt-3">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggleTab("1");
                      }}
                    >
                      Vista General
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggleTab("2");
                      }}
                    >
                      Editar Pérfil
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggleTab("3");
                      }}
                    >
                      Cambio de Contraseña
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <div className="tab-content pt-2">
                      <View session={session} profile={profile} />
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="profile-edit pt-3" id="profile-edit">
                      <Edit
                        session={session}
                        profile={profile}
                        setProfile={setProfile}
                        handleChange={handleChange}
                        handleUpload={handleUpload}
                        createObjectURL={createObjectURL}
                        setCreateObjectURL={setCreateObjectURL}
                        setImage={setImage}
                      />
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <div className="tab-pane pt-3" id="profile-change-password">
                      <ChangePassword session={session} />
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
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
