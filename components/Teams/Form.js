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

  export default function TeamForm({ formFields, setFormFields }) {
  
    const [open, setOpen] = useState(false);
  
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
      })
  
      return formFields.name.error && formFields.countryId.error && formFields.cityId.error;
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
  
      if (isValid()) {
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
                <b>Club</b>
              </Label>
              <InputGroup size="sm">
                {/* <Combobox 
                  name="clubId"
                  cmbText="Seleccione club del jugador..."
                  invalid={formFields.clubId.error}
                  value={formFields.clubId.value}
                  valueDefault={formFields.clubId.value}
                  autoComplete="off"
                  onChange={handleChange}  
                  url=""              
                  displayValue={"name"}
                  valueField={"id"}
                  reload={reload}
                /> */}
                <FormFeedback>{formFields.clubId.errorMessage}</FormFeedback>
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
                <b>Avatar</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    type="text"
                    name="logo"
                    placeholder="Avatar"
                    value={formFields.logo.value}
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
            Crear Equipos
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
  