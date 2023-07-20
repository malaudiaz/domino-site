import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {useAppContext} from "../../AppContext";
import classnames from "classnames";

import {
  Label,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Input,
  FormFeedback,
  Button,
  Nav, 
  NavItem, 
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import CityComboBox from "../City/CityComboBox";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import Level from "../Level/Level";
import FinderPlayer from "../Players/Finder";
import FindForm from "../Players/FindForm";

export default function NewProfile({ profileType, setProfileType}) {
  const {lang, token} = useAppContext();
  const router = useRouter();
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isOpenFindPlayer, setIsOpenFindPlayer] = useState(false);
  const [players, setPlayers] = useState([]);
  const [reload, setReload] = useState(false);

  const playerLevel = [
    {
        name: "rookie",
        description: "Novato"
    },
    {
        name: "professional",
        description: "Profesional"
    },
    {
        name: "expert",
        description: "Experto"
    }
  ];

  const refereeLevel = [
    {
        name: "regional",
        description: "Regional"
    },
    {
      name: "national",
      description: "Nacional"
    },
    {
        name: "international",
        description: "Internacional"
    }
  ];

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    level: "",
    city_id: "",
    receive_notifications: false,
    photo: "/profile/user-vector.jpg",
    file: "",
    player: null,
    players: []
  });

  const [validate, setValidate] = useState({
    username: ""
  });

  useEffect(()=>{
  },[players]);

  const saveProfile = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}profile/single?name=${profile.username}&email=${profile.email}&city_id=${profile.city_id}&receive_notifications=${profile.receive_notifications}`;

    switch (profileType) {
      case "PAIR_PLAYER":
        url = `${process.env.NEXT_PUBLIC_API_URL}profile/pair?name=${profile.username}&email=${profile.email}&level=${profile.level}&city_id=${profile.city_id}&receive_notifications=${profile.receive_notifications}&other_profile_id=${profile.player.profile_id}`;
        break;
      case "TEAM_PLAYER":
        url = `${process.env.NEXT_PUBLIC_API_URL}profile/team?name=${profile.username}&email=${profile.email}&level=${profile.level}&city_id=${profile.city_id}&receive_notifications=${profile.receive_notifications}`;
        break;
      case "REFEREE": 
        url = `${process.env.NEXT_PUBLIC_API_URL}profile/referee?name=${profile.username}&email=${profile.email}&level=${profile.level}&city_id=${profile.city_id}&receive_notifications=${profile.receive_notifications}`;
        break;
    }

    const body = new FormData();
    body.append("avatar", profile.file);
    if (profileType === "TEAM_PLAYER") {
      let team = "";
      for (let i=0; i<profile.players.length; i++) {
        if (i===0) {
          team = team + profile.players[i].profile_id;
        } else {
          team = team + "," + profile.players[i].profile_id;
        }
      }
      body.append("other_profile_id", team);
    }

    try {
      const { data } = await axios.post(url, body, {
        headers: {
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        },
      });
      if (data.success) {
        router.push("/");
        Swal.fire({
          icon: "success",
          title: "Guardando Pérfil",
          text: data.detail,
          showConfirmButton: true,
        });
      }
    } catch (errors) {
      setProfileType(null);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.response.data.detail,
        showConfirmButton: true,
      });
    }
  };

  const handleChange = (prop) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setValidate({
      ...validate,
      [prop]: event.target.value != "" ? "success" : "error",
    });

    setProfile({ ...profile, [prop]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    saveProfile();
  };

  const selectPlayer = (record) => {
    if (profileType === "PAIR_PLAYER") {
      setProfile({
        ...profile,
        player: record
      });
    } else {
      const isExist = false;
      profile.players.forEach(o => {
        if (o.profile_id === record.profile_id) {
            isExist = true;
        }
      });      
      if (!isExist) {
        profile.players.push(record);
      }
      setProfile(profile);
      setReload(!reload);
    }
  };  

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleAddPlayer = () => {
    setIsOpenFindPlayer(true);
  }

  const handleRemove = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Eliminar Jugador",
      text: "Desea eliminar este jugador de su equipo",
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i=0; i<profile.players.length; i++) {
          if (profile.players[i].profile_id === id) {
            profile.players.splice(i,1);
          }
        }
        setReload(!reload)
      }
    });
  }

  return (
    <div className="pt-4 px-4" style={{ display: "grid" }}>
      <div className="wrapper">
        <div className="mx-auto" style={{ maxWidth: "40rem", width: "100%" }}>
          <div className="bg-white shadow rounded p-3 input-group-lg">
            {profileType === "SINGLE_PLAYER" && <h5 className="card-sm-title">Jugador Individual</h5>}
            {profileType === "PAIR_PLAYER" && <h5 className="card-sm-title">Jugador en Parejas</h5>}
            {profileType === "TEAM_PLAYER" && <h5 className="card-sm-title">Jugador de Equipo</h5>}
            {profileType === "REFEREE" && <h5 className="card-sm-title">Arbitro</h5>}
            <hr />
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="container">
                <div className="container-profile">
             
                  <div className="row">
                    <Col sm={12}>
                      <Image
                        src={createObjectURL ? createObjectURL : profile.photo}
                        alt="Pérfil"
                        width="100%"
                        height="100%"
                      />
                      <div style={{ paddingLeft: "15px" }}>
                        <p>
                          <strong style={{color: "#012970"}}>Foto de Pérfil</strong>
                        </p>
                        <Label
                          href="#"
                          className="btn btn-primary btn-sm"
                          title="Cargar nueva foto de pérfil"
                          style={{ color: "white" }}
                        >
                          <i className="bi bi-upload"></i>
                          <Input
                            type="file"
                            hidden
                            onChange={(event) => {
                              if (event.target.files && event.target.files[0]) {
                                const i = event.target.files[0];
                                if (i.type.includes("image/jpeg")) {
                                  setImage(i);
                                  setCreateObjectURL(URL.createObjectURL(i));
                                  setProfile({ ...profile, file: i });
                                } else {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Cargando Imagen",
                                    text: "Ha ocurrido un error al cargar la imagen",
                                    showConfirmButton: true,
                                  });
                                }
                              }
                            }}
                          />
                        </Label>
                        {" "}
                        <Label
                          href="#"
                          className="btn btn-danger btn-sm"
                          title="Eliminar mí foto de perfil"
                          style={{ color: "white" }}
                          onClick={(e) => {
                            setProfile({ ...profile, file: "" });
                            setImage(null);
                            setCreateObjectURL(null);
                          }}      
                        >
                          <i className="bi bi-trash"></i>
                        </Label>
                      </div>
                    </Col>
                  </div>

                  <div>

                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          href="#"
                          className={classnames({ active: activeTab === "1" })}
                          onClick={() => {
                            toggleTab("1");
                          }}
                        >
                          General
                        </NavLink>
                      </NavItem>
                      {profileType === "TEAM_PLAYER" &&
                        <NavItem>
                          <NavLink
                            href="#"
                            className={classnames({ active: activeTab === "2" })}
                            onClick={() => {
                              toggleTab("2");
                            }}
                          >
                            Equipo
                          </NavLink>
                        </NavItem>
                      }
                    </Nav>

                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">

                        <div className="px-4 py-4">

                          <Col className="col-12">
                            <FormGroup>
                              <Label>Nombre</Label>
                              <InputGroup size="sm">
                                <Input
                                  type="text"
                                  autoComplete="off"
                                  name="username"
                                  id="username"
                                  invalid={validate.username === "error"}
                                  onChange={handleChange("username")}
                                  placeholder={"Nombre de Pérfil"}
                                  value={profile.username}
                                  onKeyDown={(event) => {
                                    if (!/^[a-zA-Z_.0-9\s]*$/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  }}
                                />
                                <FormFeedback>
                                  El nombre del pérfil es requerido
                                </FormFeedback>
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col className="col-12">
                            <FormGroup>
                              <Label>Correo</Label>
                              <InputGroup size="sm">
                                <Input
                                  type="email"
                                  autoComplete="off"
                                  name="email"
                                  id="email"
                                  onChange={handleChange("email")}
                                  placeholder={"Correo"}
                                  value={profile.email}
                                  onKeyDown={(event) => {
                                    if (!/^[a-zA-Z@_.\s]*$/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  }}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col className="col-12">
                            <FormGroup>
                              <Label>Nivel</Label>
                              <InputGroup size="sm">
                                <Level 
                                  name={"level"} 
                                  cmbText={"Seleccione su Nivel..."} 
                                  valueDefault={profile.level}
                                  records={profileType != "REFEREE" ? playerLevel : refereeLevel}
                                  onChange={handleChange("level")}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          {profileType=="PAIR_PLAYER" && 
                            <Col className="col-12">
                              <FormGroup>
                                <Label>Pareja</Label>
                                  <InputGroup size="sm">
                                    <FinderPlayer id={"twoPlayer"} changePlayer={selectPlayer}/>
                                  </InputGroup>
                              </FormGroup>
                            </Col>
                          }

                          <Col className="col-12">
                            <FormGroup>
                              <Label>Ciudad</Label>
                              <InputGroup size="sm">
                                <CityComboBox
                                  country_id={1}
                                  name="city"
                                  cmbText="Seleccione su ciudad..."
                                  valueDefault={profile.city_id}
                                  onChange={handleChange("city_id")}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col sm={12}>
                            <FormGroup switch>
                              <Input
                                id="receive_notifications"
                                name="receive_notifications"
                                type="switch"
                                checked={profile.receive_notifications}
                                onChange={handleChange("receive_notifications")}
                              />
                              <Label check>
                                {profile.receive_notifications
                                  ? "Recibir Notificaciones"
                                  : "No Recibe Notificaciones"}
                              </Label>
                            </FormGroup>
                          </Col>

                        </div>

                      </TabPane>
                      <TabPane tabId="2">
                        <div className="row container-team p-4">

                          {profile.players.map((item, idx)=>(

                            <div 
                              key={idx} 
                              className="d-flex align-items-center rounded p-2" 
                              style={{height: "70px", background: "#ebebeb"}}>
                              <div className="d-flex flex-row justify-content-between icons align-items-center" style={{width: "98%"}}>
                                <Image
                                  alt=""
                                  src={item.photo}
                                  width={40}
                                  height={40}
                                  className="rounded-image"
                                />
                                <div className="d-flex flex-column flex-fill ms-2">
                                  <span className="gamer-couple">{item.name}</span>
                                  <small className="comment-text fs-12">{item.city_name}</small>
                                </div>
                                <div className="ps-4">
                                    <div className="rounded p-2 trash-effect" onClick={(e)=>{handleRemove(e, item.profile_id)}}>
                                      <i className="bi bi-trash" style={{fontSize: "16px"}}></i>
                                    </div>
                                </div>
                              </div>
                            </div>

                          ))}

                          <div className="d-flex justify-content-center rounded mb-3 hover-effect" onClick={handleAddPlayer} style={{height: "70px"}}>
                              <div className="d-flex justify-content-center icons align-items-center">
                                <i className="bi bi-person-plus" style={{fontSize: "32px"}}></i>
                              </div>
                          </div>


                        </div>
                      </TabPane>
                    </TabContent>


                    <Col className="col-12" style={{ textAlign: "center" }}>
                      <Button type="submit" className="my-2" color="success">
                        <b>Crear Pérfil</b>
                      </Button>
                    </Col>

                  </div>

                </div>


              </div>
            </Form>
          </div>

          <FindForm 
            isOpen={isOpenFindPlayer} 
            setClose={setIsOpenFindPlayer} 
            changePlayer={selectPlayer} 
          />

        </div>
      </div>
    </div>
  );
};

