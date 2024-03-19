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

  export default function UserForm({ formFields, setFormFields }) {
  
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
        first_name: {
          ...formFields["first_name"],
          error: formFields.first_name.value === ""
        },
        city_id: {
          ...formFields["city_id"],
          error: formFields.city_id.value === ""
        },
      })
  
      return formFields.username.error && formFields.first_name.error && formFields.city_id.error;
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
              id: {
                ...formFields["id"],
                value: "",
                error: false,
              },
              username: {
                ...formFields["username"],
                value: "",
                error: false,
              },
              first_name: {
                ...formFields["first_name"],
                value: "",
                error: false,
              },
              last_name: {
                ...formFields["last_name"],
                value: "",
                error: false,
              },
              sex: {
                ...formFields["sex"],
                value: "",
                error: false,
              },
              birthdate: {
                ...formFields["birthdate"],
                value: "",
                error: false,
              },
              alias: {
                ...formFields["alias"],
                value: "",
                error: false,
              },
              job: {
                ...formFields["job"],
                value: "",
                error: false,
              },
              email: {
                ...formFields["email"],
                value: "",
                error: false,
              },
              phone: {
                ...formFields["phone"],
                value: "",
                error: false,
              },
              city_id: {
                ...formFields["city_id"],
                value: "",
                error: false,
              },
              image: {
                ...formFields["image"],
                value: "",
                error: false,
              },
              receive_notifications: {
                ...formFields["receive_notifications"],
                value: "",
                error: false,
              }
            });
            Swal.fire({
              title: formFields.id.value==="" ? "Creando Usuario" : "Actualizando Usuario",
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
              title: formFields.id.value==="" ? "Creando Usuario" : "Actualizando Usuario",
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
                  title: formFields.id.value==="" ? "Creando Usuario" : "Actualizando Usuario",
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

      let url = `${process.env.NEXT_PUBLIC_API_URL}users`; 
      let method = "post";
  
      if (!isValid()) {
        if (formFields.id.value !== "") {
          url = url + "/" + formFields.id.value;
          method = "put";
        }
        url = url + "?username=" + formFields.username.value;       

        for (let key in formFields) {
            if (key !== "username" && key !== "id") {
                if (formFields[key].value) {
                    url = url + "&" + key + "=" + formFields[key].value;
                }            
            }
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
                  name="first_name"
                  id="first_name"
                  placeholder={"Nombre de Pila"}
                  value={formFields.first_name.value}
                  invalid={formFields.first_name.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.first_name.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Apellidos</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="last_name"
                  id="last_name"
                  placeholder={"Apellidos"}
                  value={formFields.last_name.value}
                  invalid={formFields.last_name.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.last_name.errorMessage}</FormFeedback>
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
                <FormFeedback>{formFields.email.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Teléfono</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    type="text"
                    autoComplete="off"
                    name="phone"
                    id="phone"
                    maxLength={12}
                    invalid={formFields.phone.error}
                    onChange={handleChange}
                    placeholder={"Teléfono"}
                    value={formFields.phone.value}
                    onKeyDown={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                />
                <FormFeedback>{formFields.phone.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Sexo</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    id="sex"
                    name="sex"
                    type="select"
                    invalid={formFields.sex.error}
                    value={formFields.sex.value}
                    onChange={handleChange}
                >
                    <option value="">Seleccione sexo...</option>
                    <option value="M">Másculino</option>
                    <option value="F">Femenino</option>
                </Input>
                <FormFeedback>{formFields.sex.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Fecha de Nacimiento</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    placeholder={"Fecha de Nacimiento"}
                    value={formFields.birthdate.value}
                    invalid={formFields.birthdate.error}
                    onChange={handleChange}
                />
                <FormFeedback>{formFields.birthdate.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Alias</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    type="text"
                    autoComplete="off"
                    name="alias"
                    id="alias"
                    invalid={formFields.alias.error}
                    onChange={handleChange}
                    placeholder={"Alias"}
                    value={formFields.alias.value}
                />
                <FormFeedback>{formFields.alias.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Ocupación</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    type="text"
                    autoComplete="off"
                    name="job"
                    id="job"
                    invalid={formFields.job.error}
                    onChange={handleChange}
                    placeholder={"Ocupación"}
                    value={formFields.job.value}
                />
                <FormFeedback>{formFields.job.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Ciudad</b>
              </Label>
              <InputGroup size="sm">
                <CityComboBox
                  country_id={profile.id}
                  name="city_id"
                  url={cityUrl}
                  cmbText="Seleccione ciudad..."
                  invalid={formFields.city_id.error}
                  value={formFields.city_id.value}
                  valueDefault={formFields.city_id.value}
                  autoComplete="off"
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.city_id.errorMessage}</FormFeedback>
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
          <Link href="/users" >
              <a className="btn btn-secondary btn-sm">
                Cancelar
              </a>
          </Link>
  
          <Button className="btn btn-sm" color="primary" type="submit">
            {formFields.id.value==="" ? "Crear Usuario" : "Actualizar"}
          </Button>
        </div>
  
        <Upload 
          open={open} 
          fieldId={"id"}
          fieldTitle={"username"}
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
  