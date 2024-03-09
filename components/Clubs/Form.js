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
import Combobox from "../Combobox/Combobox";
import Upload from "../Upload";
import { useState } from "react";
import CityComboBox from "../City/CityComboBox";
  
export default function ClubForm({ formFields, setFormFields }) {
  
    const [open, setOpen] = useState(false);

    const federationUrl = `${process.env.NEXT_PUBLIC_API_URL}federation/all/`;

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
        name: {
          ...formFields["name"],
          error: formFields.name.value === ""
        },
        acronym: {
          ...formFields["acronym"],
          error: formFields.acronym.value === ""
        },
        federationId: {
          ...formFields["federationId"],
          error: formFields.federationId.value === ""
        },
        cityId: {
          ...formFields["cityId"],
          error: formFields.cityId.value === ""
        },
      })
  
      return formFields.name.error && formFields.countryId.error && formFields.cityId.error;
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      if (!isValid()) {
        console.log("ok");
      }
    }
  
    const handleUpload = (event) => {
      event.preventDefault();
  
      if (!isValid()) {
        setOpen(true);
      }
    }
  
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="rounded-md bg-light p-4">
            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Nombre del Club</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="name"
                  id="name"
                  placeholder={"Nombre del Club"}
                  value={formFields.name.value}
                  invalid={formFields.name.error}
                  onChange={handleChange}
                />
  
                <FormFeedback>{formFields.name.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>
  
            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Siglas del Club</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="acronym"
                  id="acronym"
                  placeholder={"Sigla del Club"}
                  value={formFields.acronym.value}
                  invalid={formFields.acronym.error}
                  onChange={handleChange}
                />
  
                <FormFeedback>{formFields.acronym.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>
  
            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Federación</b>
              </Label>
              <InputGroup size="sm">
                <Combobox 
                  name="federationId"
                  cmbText="Seleccione la federación..."
                  invalid={formFields.federationId.error}
                  value={formFields.federationId.value}
                  valueDefault={formFields.federationId.value}
                  autoComplete="off"
                  onChange={handleChange}  
                  url={federationUrl}
                  displayValue={"name"}
                  valueField={"id"}
                  reload={true}
                />
                <FormFeedback>{formFields.federationId.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Ciudad</b>
              </Label>

              <InputGroup size="sm">

                <CityComboBox
                  country_id={formFields.federationId.value}
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
                <b>Logotipo</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    type="text"
                    name="logo"
                    placeholder="Logo de Club"
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
          <Link href="/clubs" >
              <a className="btn btn-secondary btn-sm">
                Cancelar
              </a>
          </Link>
  
          <Button className="btn btn-sm" color="primary" type="submit">
            Crear Club
          </Button>
        </div>
  
        <Upload 
          open={open} 
          setOpen={setOpen} 
          formFields={formFields} 
          setFormFields={setFormFields}
          title="Subir Logotipo"
        />
  
      </form>
    );
  }
  