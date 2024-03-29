import React from "react";
import { useEffect, useState } from "react";
import {useAppContext} from "../../AppContext";
import Layout from "../../layouts/Layout";
import Head from "next/head";
import axios from "axios";
import Swal from "sweetalert2";
import classnames from "classnames";
import Image from "next/image";
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

export default function Profile() {
  const {profile, createProfile, lang, token} = useAppContext();
  const avatar = profile.photo;

  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  const [reload, setReload] = useState(false);
  const [title, setTile] = useState("");

  const [record, setRecord] = useState({
    alias: "",
    birthdate: "",
    city_id: "",
    country_id: 1,
    email: "",
    level: "",
    first_name: "",
    id: "",
    job: "",
    last_name: "",
    phone: "",
    photo: "",
    sex: "M",
    username: "",
    file: "",
    receive_notifications: false,
    profile_type_description: "",
    profile_type_name: "",
    elo: "",
    ranking: "",
    lst_users: null
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
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {     
      let url = `${process.env.NEXT_PUBLIC_API_URL}profile/default/${profile.id}`;
      switch (profile.type) {
        case "SINGLE_PLAYER":
          url = `${process.env.NEXT_PUBLIC_API_URL}profile/single/${profile.id}`;
          setTile("Jugador");
          break;
        case "PAIR_PLAYER":
            url = `${process.env.NEXT_PUBLIC_API_URL}profile/pair/${profile.id}`;
            setTile("Jugador en Pareja");
            break;
        case "TEAM_PLAYER":
          url = `${process.env.NEXT_PUBLIC_API_URL}profile/team/${profile.id}`;
          setTile("Jugador en Equipo");
          break;
        case "REFEREE":
          url = `${process.env.NEXT_PUBLIC_API_URL}profile/referee/${profile.id}`;
          setTile("Arbitro");
          break;
        case "EVENTADMON":
            url = `${process.env.NEXT_PUBLIC_API_URL}profile/eventadmon/${profile.id}`;
            setTile("Administrador de Eventos");
            break;
        default:
          break;
      }
      setLoading(true);

      try {
        const { data } = await axios.get(url, config);

        if (data.success) {
          const respObj = data.data;

          record.id = respObj.id;
          record.username = respObj.username;
          record.name = respObj.name;
          record.first_name = respObj.first_name;
          record.last_name = respObj.last_name;
          record.alias = respObj.alias ? respObj.alias : "";
          record.birthdate = respObj.birthdate ? respObj.birthdate : "";
          record.email = respObj.email;
          record.level = respObj.level;
          record.phone = respObj.phone;
          record.job = respObj.job;
          record.sex = respObj.sex ? respObj.sex : "";
          record.city_id = respObj.city_id ? respObj.city_id : "";
          record.country_id = respObj.country_id ? respObj.country_id : "";
          record.photo = !respObj.photo
            ? "/profile/user-vector.jpg"
            : respObj.photo;
          record.receive_notifications = respObj.receive_notifications;
          record.profile_type_name = respObj.profile_type_name;
          record.profile_type_description = respObj.profile_type_description;
          record.elo = respObj.elo;
          record.ranking = respObj.ranking;
          record.lst_users = respObj.lst_users;

          setRecord(record);
          setLoading(false);
          setReload(false);
        }
      } catch (error) {
        console.log(error);
        const { detail } = error.response.data;
        Swal.fire({
          title: "Pérfil",
          text: "detail",
          icon: "info",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      }
    };
    if (Object.entries(profile).length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, reload]);

  const saveProfile = async () => {

    let params = [];
    let url = `${process.env.NEXT_PUBLIC_API_URL}profile/`;
    let team = "";

    switch (profile.type) {
      case "SINGLE_PLAYER":
        url = url + "single/" + record.id;
        params = ["name", "email", "level", "city_id", "receive_notifications"];
        break;
      case "PAIR_PLAYER":
        url = url + "pair/" + record.id;
        params = ["name", "email", "level", "city_id", "receive_notifications"];
        break;
      case "TEAM_PLAYER":
        for (let i=0; i<record.lst_users.length; i++) {
          if (i===0) {
            team = team + record.lst_users[i].profile_id;
          } else {
            team = team + "," + record.lst_users[i].profile_id;
          }
        }
        url = url + "team/" + record.id;
        params = ["name", "email", "level", "city_id", "receive_notifications"];
        break;
      case "REFEREE":
        url = url + "referee/" + record.id;
        params = ["name", "email", "level", "city_id", "receive_notifications"];
        break;
      case "EVENTADMON":
          for (let i=0; i<record.lst_users.length; i++) {
            if (i===0) {
              team = team + record.lst_users[i].profile_id;
            } else {
              team = team + "," + record.lst_users[i].profile_id;
            }
          }
          url = url + "eventadmon/" + record.id;
          params = ["name", "email", "city_id"];
          break;
      default:
        url = url + "default/" + record.id;
        params = ["first_name", "last_name", "email", "phone", "sex", "birthdate", "alias", "job", "city_id", "receive_notifications"];
        break;
    }

    let signo = "?";
    for (let i=0; i<params.length; i++) {
      if (record[params[i]] !== "") {
        url = url + signo + params[i] + "=" + record[params[i]];
        signo = "&";
      }
    }

    if (profile.type === "PAIR_PLAYER") {
      if (record.lst_users.profile_id !== "") {
        url = url + "&" + "other_profile_id=" + record.lst_users.profile_id;
      }
    } else if (profile.type === "TEAM_PLAYER" || profile.type === "EVENTADMON") {
      if (team !== "") {
        url = url + "&" + "other_profile_id=" + team;
      }
    }

    const body = new FormData();
    body.append("image", record.file);

    try {
      const { data } = await axios.put(url, body, {
        headers: {
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        },
      });
      if (data.success) {
        record.photo = data.data;
        setRecord(record);

        const user = {
          id: record.id,
          name: record.profile_type === "USER" ? record.first_name + " " + record.last_name : record.name,
          photo: record.photo ? record.photo : "/profile/user-vector.jpg",
          type: record.profile_type_name
        };
        
        createProfile(user.id, user.name, user.photo, user.type);

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

  const handleUpload = (event) => {
    event.preventDefault();
    saveProfile();
  };

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>
          Pérfil
        </title>
      </Head>
      <section className="section profile">
        <div className="pagetitle" style={{paddingBottom: "8px"}}>
          <h1>Pérfil de {record.profile_type_description}</h1>
        </div>

        <Row>
          <Col xl={4}>
            <Card>
              <CardBody className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                {record.photo && (
                  <Image
                    src={avatar}
                    alt="Pérfil"
                    priority="true"
                    width="100%"
                    height="100%"
                    className="rounded-circle"
                  />
                )}
                {record.profile_type_name === "USER" ? ( 
                  <>
                    <h2>{record.first_name + " " + record.last_name}</h2>
                    <h3>{record.job}</h3>
                  </>
                ) : (
                  <>
                    <h2>{record.name}</h2>
                    <h3>{title}</h3>
                  </>
                )}
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
                  {record.profile_type_name === "USER" &&
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
                  }
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <div className="tab-content pt-2">
                      <View record={record} />
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="profile-edit pt-3" id="profile-edit">
                      <Edit
                        record={record}
                        setRecord={setRecord}
                        handleUpload={handleUpload}
                        createObjectURL={createObjectURL}
                        setCreateObjectURL={setCreateObjectURL}
                        setImage={setImage}
                      />
                    </div>
                  </TabPane>
                  {record.profile_type_name === "USER" &&
                    <TabPane tabId="3">
                      <div className="tab-pane pt-3" id="profile-change-password">
                        <ChangePassword />
                      </div>
                    </TabPane>
                  }
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

