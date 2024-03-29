import {
    FormGroup,
    InputGroup,
    FormFeedback,
    Label,
    Input,
    InputGroupText,
    Button
  } from "reactstrap";
  
  import Link from "next/link";
  import Upload from "../Upload";
  import { useState } from "react";
  import Combobox from "../Combobox/Combobox";
  import FinderUser from "../Users/Finder";
  import Level from "../Level/Level";
  import { useAppContext } from "../../AppContext";
  import axios from "axios";
  import Swal from "sweetalert2";
  import { useRouter } from "next/router";

  export default function PlayerForms({ formFields, setFormFields }) {
  
    const router = useRouter();
    const {profile, lang, token} = useAppContext();
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);

    const clubUrl = `${process.env.NEXT_PUBLIC_API_URL}club/all/${profile.id}`;
  
    const playerLevel = [
      {
          name: "rookie",
          description: "UNO"
      },
      {
          name: "professional",
          description: "DOS"
      },
      {
          name: "expert",
          description: "TRES"
      }
    ];

    const handleChange = (event) => {
      const name = event.target.name;
  
      const value = event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
  
      setFormFields({
        ...formFields,
        [name]: {
          ...formFields[name],
          value: value,
          error: value===""
        }
      });
    };
  
    const isValid = () => {
      setFormFields({
        ...formFields,
        name: {
          ...formFields["name"],
          error: formFields.name.value === ""
        },
        club_id: {
          ...formFields["club_id"],
          error: formFields.club_id.value === ""
        },
      })
  
      return formFields.name.error && formFields.club_id.error;
    }
  
    const config = {
      headers: {
        "Accept-Language": lang,
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      }
    };

    const save = async (url, method) => {
      const body = new FormData();
      body.append("image", image ? image : '');
  
      try {
          const { data } = await axios[method](url, body, config);
          if (data.success) {
            setFormFields({
              ...formFields,
              profile_id: {
                ...formFields["profile_id"],
                value: "",
                error: false,
              },
              name: {
                ...formFields["name"],
                value: "",
                error: false,
              },
              username: {
                ...formFields["username"],
                value: "",
                error: false,
              },
              elo: {
                ...formFields["elo"],
                value: "",
                error: false,
              },
              level: {
                ...formFields["level"],
                value: "",
                error: false,
              },
              club_id: {
                ...formFields["club_id"],
                value: "",
                error: false,
              },   
              image: {
                ...formFields["image"],
                value: "",
                error: false,
              }
            });

            if (method==="put") {
              router.push(`/players`);              
            }

            Swal.fire({
              title: formFields.id.value==="" ? "Creando Jugador" : "Actualizando Jugador",
              text: data.detail,
              icon: "success",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });  
          }
        } catch ({code, message, name, request}) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: formFields.id.value==="" ? "Creando Jugador" : "Actualizando Jugador",
              text: "Error en su red, consulte a su proveedor de servicio",
              icon: "error",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
          } else {
            if (code === "ERR_BAD_REQUEST") {
              const {detail} = JSON.parse(request.response)
              Swal.fire({
                  title: formFields.id.value==="" ? "Creando Jugador" : "Actualizando Jugador",
                  text: detail,
                  icon: "error",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
              });  
            }
          }
        }
    } 

    const handleSubmit = (event) => {
      event.preventDefault();
  
      let url = `${process.env.NEXT_PUBLIC_API_URL}profile/singleplayer`; 
      let method = "post";
  
      if (!isValid()) {
        if (formFields.profile_id.value !== "") {
          url = url + "/" + formFields.profile_id.value;
          method = "put";
        } else {
          url = url + "/" + profile.id;
        }
        url = url + "?username=" + formFields.username.value + "&name=" + formFields.name.value + "&club_id=" + formFields.club_id.value;

        if (formFields.elo.value) {
          url = url + "&elo=" + formFields.elo.value;
        }

        if (formFields.level.value) {
          url = url + "&level=" + formFields.level.value;
        }
  
        save(url, method);
      }
  
    }
  
    const handleUpload = (event) => {
      event.preventDefault();
      setOpen(true);
    }
  
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="rounded-md bg-light p-4">

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Nombre de Pérfil</b>
            </Label>
            <InputGroup size="sm">
              <Input
                autoComplete="off"
                name="name"
                id="name"
                placeholder={"Nombre de Pérfil"}
                value={formFields.name.value}
                invalid={formFields.name.error}
                onChange={handleChange}
              />
              <FormFeedback>{formFields.name.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Usuario</b>
            </Label>

            <FinderUser 
                field={"username"} 
                formFields={formFields} 
                setFormFields={setFormFields} 
                disabled={formFields.id.value!==""} 
              />
          </FormGroup>

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>ELO</b>
            </Label>
            <InputGroup size="sm">
              <Input
                type="number"
                autoComplete="off"
                name="elo"
                id="elo"
                placeholder={"ELO"}
                value={formFields.elo.value}
                invalid={formFields.elo.error}
                onChange={handleChange}
              />
              <FormFeedback>{formFields.elo.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Nivel</b>
            </Label>
            <InputGroup size="sm">
              <Level 
                name={"level"} 
                cmbText={"Seleccione su Nivel..."} 
                valueDefault={formFields.level.value}
                records={playerLevel}
                onChange={handleChange}
              />
              <FormFeedback>{formFields.level.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Club</b>
            </Label>
            <InputGroup size="sm">
              <Combobox 
                name="club_id"
                cmbText="Seleccione club del jugador..."
                invalid={formFields.club_id.error}
                value={formFields.club_id.value}
                valueDefault={formFields.club_id.value}
                autoComplete="off"
                onChange={handleChange}  
                url={clubUrl}              
                displayValue={"name"}
                valueField={"id"}
                reload={true}
              />
              <FormFeedback>{formFields.club_id.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Avatar</b>
            </Label>
            <InputGroup size="sm">
              <Input
                  type="text"
                  name="logo"
                  placeholder="Avatar"
                  value={formFields.image.value}
                  readOnly
              />
              <InputGroupText>
                  <a
                      style={{ cursor: "pointer" }}
                      onClick={handleUpload}
                      data-toggle="tooltip"
                      title="Cargar Avatar"
                  >
                      <i className="bi bi-upload"></i>
                  </a>
              </InputGroupText>
            </InputGroup>
          </FormGroup>
  
        </div>
        <div className="mt-4 d-flex justify-content-end gap-2 mb-2">
          <Link href="/players" >
              <a className="btn btn-secondary btn-sm">
                Cancelar
              </a>
          </Link>
  
          <Button className="btn btn-sm" color="primary" type="submit">
            Crear Jugador
          </Button>
        </div>
  
        <Upload 
          open={open} 
          fieldId={"id"}
          fieldTitle={"name"}
          fieldMedia={"image"}
          setOpen={setOpen} 
          formFields={formFields} 
          setFormFields={setFormFields}
          title="Subir Avatar"
          image={image}
          setImage={setImage}
        />

      </form>
    );
  }
  