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
import CountryComboBox from "../Country/CountryComboBox";
import CityComboBox from "../City/CityComboBox";
import Upload from "../Upload";
import { useState } from "react";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function FederationForm({ formFields, setFormFields }) {

  const router = useRouter();
  const {lang, token} = useAppContext();
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
      name: {
        ...formFields["name"],
        error: formFields.name.value === ""
      },
      countryId: {
        ...formFields["countryId"],
        error: formFields.countryId.value === ""
      },
      cityId: {
        ...formFields["cityId"],
        error: formFields.cityId.value === ""
      },
      acronym: {
        ...formFields["acronym"],
        error: formFields.acronym.value === ""
      }
    })

    return formFields.name.error && formFields.countryId.error && formFields.cityId.error && formFields.acronym.error;
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
    body.append("logo", image ? image : '');

    try {
        const { data } = await axios[method](url, body, config);
        if (data.success) {
          setFormFields({
            ...formFields,
            id: {
              ...formFields["id"],
              value: "",
              error: false
            },
            name: {
              ...formFields["name"],
              value: "",
              error: false
            },
            countryId: {
              ...formFields["countryId"],
              value: "",
              error: false
            },
            cityId: {
              ...formFields["cityId"],
              value: "",
              error: false
            },
            acronym: {
              ...formFields["acronym"],
              value: "",
              error: false
            },
            logo: {
              ...formFields["logo"],
              value: "",
              error: false
            }      
          });

          if (method==="put") {
            router.push(`/federations`);              
          }

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
    
    let url = `${process.env.NEXT_PUBLIC_API_URL}federation`; 
    let method = "post";

    if (!isValid()) {
      if (formFields.id.value !== "") {
        url = url + "/" + formFields.id.value;
        method = "put";
      }
      url = url + "?name=" + formFields.name.value + "&city=" + formFields.cityId.value + "&country=" + formFields.countryId.value + "&siglas=" + formFields.acronym.value;

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
              <b>País</b>
            </Label>
            <InputGroup size="sm">
              <CountryComboBox
                name="countryId"
                cmbText="Seleccione país..."
                invalid={formFields.countryId.error}
                value={formFields.countryId.value}
                valueDefault={formFields.countryId.value}
                autoComplete="off"
                onChange={handleChange}
              />
              <FormFeedback>{formFields.countryId.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Ciudad</b>
            </Label>
            <InputGroup size="sm">
              <CityComboBox
                country_id={formFields.countryId.value}
                name="cityId"
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
              <b>Nombre</b>
            </Label>
            <InputGroup size="sm">
              <Input
                autoComplete="off"
                name="name"
                id="name"
                placeholder={"Nombre de federación"}
                value={formFields.name.value}
                invalid={formFields.name.error}
                onChange={handleChange}
              />

              <FormFeedback>{formFields.name.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Siglas</b>
            </Label>
            <InputGroup size="sm">
              <Input
                autoComplete="off"
                name="acronym"
                id="acronym"
                placeholder={"Sigla identificativa"}
                value={formFields.acronym.value}
                invalid={formFields.acronym.error}
                onChange={handleChange}
              />
              <FormFeedback>{formFields.acronym.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>


          <FormGroup>
            <Label size="sm" sm={4}>
              <b>Logotipo</b>
            </Label>
            <InputGroup size="sm">
              <Input
                  type="text"
                  name="logo"
                  placeholder="Logo de Federación"
                  value={formFields.logo.value}
                  readOnly
              />
              <InputGroupText>
                  <a
                      style={{ cursor: "pointer" }}
                      onClick={handleUpload}
                      data-toggle="tooltip"
                      title="Cargar Logotipo"
                  >
                      <i className="bi bi-upload"></i>
                  </a>
              </InputGroupText>
            </InputGroup>
          </FormGroup>

      </div>
      <div className="mt-4 d-flex justify-content-end gap-2 mb-2">
        <Link href="/federations" >
            <a className="btn btn-secondary btn-sm">
              Cancelar
            </a>
        </Link>

        <Button className="btn btn-sm" color="primary" type="submit">
          {formFields.id.value === "" ? "Crear" : "Actualizar"}
        </Button>
      </div>


      <Upload 
          open={open} 
          fieldId={"id"}
          fieldTitle={"name"}
          fieldMedia={"logo"}
          setOpen={setOpen} 
          formFields={formFields} 
          setFormFields={setFormFields}
          title="Subir Logotipo"
          image={image}
          setImage={setImage}
      />
    </form>
  );
}
