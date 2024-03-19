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
  import CityComboBox from "../City/CityComboBox";
  import { useAppContext } from "../../AppContext";
  import axios from "axios";
  import Swal from "sweetalert2";

  export default function FederativeForm({ formFields, setFormFields }) {
  
    const {profile, lang, token} = useAppContext();
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
  
    const cityUrl = `${process.env.NEXT_PUBLIC_API_URL}federation/city/`;

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
        username: {
          ...formFields["username"],
          error: formFields.username.value === ""
        },
        firstName: {
          ...formFields["firstName"],
          error: formFields.firstName.value === ""
        },
        countryId: {
          ...formFields["countryId"],
          error: formFields.countryId.value === ""
        },
        cityId: {
          ...formFields["cityId"],
          error: formFields.cityId.value === ""
        },
      })
  
      return formFields.username.error && formFields.firstName.error && formFields.countryId.error && formFields.cityId.error;
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
              profileId: {
                ...formFields["profileId"],
                value: "",
                error: false,
              },
              username: {
                ...formFields["username"],
                value: "",
                error: false,
              },
              firstName: {
                ...formFields["firstName"],
                value: "",
                error: false,
              },
              lastName: {
                ...formFields["lastName"],
                value: "",
                error: false,
              },
              email: {
                ...formFields["email"],
                value: "",
                error: false,
              },
              countryId: {
                ...formFields["countryId"],
                value: "",
                error: false,
              },
              cityId: {
                ...formFields["cityId"],
                value: "",
                error: false,
              },
              photo: {
                ...formFields["photo"],
                value: "",
                error: false,
              }
            });
            Swal.fire({
              title: formFields.id.value==="" ? "Creando Federación" : "Actualizando Federación",
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
              title: formFields.id.value==="" ? "Creando Federación" : "Actualizando Federación",
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
                  title: formFields.id.value==="" ? "Creando Federación" : "Actualizando Federación",
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

      let url = `${process.env.NEXT_PUBLIC_API_URL}profile/generic/eventadmon/`; 
      let method = "post";
  
      if (!isValid()) {
        if (formFields.profileId.value !== "") {
          url = url + formFields.profileId.value;
          method = "put";
        } else {
          url = url + profile.id;
        }
        url = url + "?username=" + formFields.username.value + "&first_name=" + formFields.firstName.value + "&last_name=" + formFields.lastName.value + "&email=" + formFields.email.value + "&city_id=" + formFields.cityId.value;
  
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
                <b>Nombre de Usuario</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="username"
                  id="username"
                  placeholder={"Nombre de Usuario"}
                  value={formFields.username.value}
                  invalid={formFields.username.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.username.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Nombre de Pila</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="firstName"
                  id="firstName"
                  placeholder={"Nombre de Pila"}
                  value={formFields.firstName.value}
                  invalid={formFields.firstName.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.firstName.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Apellidos</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="lastName"
                  id="lastName"
                  placeholder={"Apellidos"}
                  value={formFields.lastName.value}
                  invalid={formFields.lastName.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.lastName.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>


            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Dirección de Correo</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Dirección de Correo"
                  value={formFields.email.value}
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    if (!/^[a-z_@\s]*$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{formFields.lastName.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Ciudad</b>
              </Label>
              <InputGroup size="sm">
                <CityComboBox
                  country_id={profile.id}
                  name="cityId"
                  url={cityUrl}
                  cmbText="Seleccione ciudad..."
                  invalid={formFields.cityId.error}
                  value={formFields.cityId.value}
                  valueDefault={formFields.cityId.value}
                  autoComplete="off"
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.cityId.errorMessage}</FormFeedback>
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
                    value={formFields.photo.value}
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
          <Link href="/federative" >
              <a className="btn btn-secondary btn-sm">
                Cancelar
              </a>
          </Link>
  
          <Button className="btn btn-sm" color="primary" type="submit">
            {formFields.profileId.value==="" ? "Crear Federativo" : "Actualizar"}
          </Button>
        </div>
  
        <Upload 
          open={open} 
          fieldId={"profileId"}
          fieldTitle={"username"}
          fieldMedia={"photo"}
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
  