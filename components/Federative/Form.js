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
  import { useAppContext } from "../../AppContext";
  import axios from "axios";
  import Swal from "sweetalert2";
  import FinderUser from "../Users/Finder";
  import { useRouter } from "next/router";

  export default function FederativeForm({ formFields, setFormFields }) {
  
    const router = useRouter();
    const {profile, lang, token} = useAppContext();
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
  
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
        name: {
          ...formFields["name"],
          error: formFields.name.value === ""
        }

      })
  
      return formFields.username.error && formFields.name.error;
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
              image: {
                ...formFields["image"],
                value: "",
                error: false,
              }
            });

            if (method==="put") {
              router.push(`/federative`);              
            }

            Swal.fire({
              title: formFields.id.value==="" ? "Creando Federativo" : "Actualizando Federativo",
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
              title: formFields.id.value==="" ? "Creando Federativo" : "Actualizando Federativo",
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
                  title: formFields.id.value==="" ? "Creando Federativo" : "Actualizando Federativo",
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

      let url = `${process.env.NEXT_PUBLIC_API_URL}profile/federative`; 
      let method = "post";
  
      if (!isValid()) {
        if (formFields.id.value !== "") {
          url = url + "/" + formFields.id.value;
          method = "put";
        } else {
          url = url + "/" + profile.id;
        }
        url = url + "?username=" + formFields.username.value + "&name=" + formFields.name.value;
  
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
                <b>Usuario</b>
              </Label>
              <FinderUser 
                field={"name"} 
                formFields={formFields} 
                setFormFields={setFormFields} 
                disabled={formFields.id.value!==""} 
              />
            </FormGroup>

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
          <Link href="/federative" >
              <a className="btn btn-secondary btn-sm">
                Cancelar
              </a>
          </Link>
  
          <Button className="btn btn-sm" color="primary" type="submit">
            {formFields.id.value==="" ? "Crear Federativo" : "Actualizar"}
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
  