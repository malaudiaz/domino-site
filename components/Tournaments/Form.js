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
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import CityComboBox from "../City/CityComboBox";

export default function TournamentForm({ formFields, setFormFields }) {
  
    const router = useRouter();
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
        name: {
          ...formFields["name"],
          error: formFields.name.value === ""
        },
        modality: {
          ...formFields["modality"],
          error: formFields.modality.value === ""
        },
        startDate: {
          ...formFields["startDate"],
          error: formFields.startDate.value === ""
        },
        rounds: {
          ...formFields["rounds"],
          error: formFields.rounds.value === ""
        },
        inscriptionImport: {
          ...formFields["inscriptionImport"],
          error: formFields.inscriptionImport.value === ""
        },
        cityId: {
          ...formFields["cityId"],
          error: formFields.cityId.value === ""
        },
        location: {
          ...formFields["location"],
          error: formFields.location.value === ""
        }
      })
  
      return formFields.name.error && formFields.modality.error && formFields.startDate.error && formFields.rounds.error && formFields.inscriptionImport.error && formFields.cityId.error && formFields.location.error;
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
                error: false
              },
              name: {
                ...formFields["name"],
                value: "",
                error: false
              },
              modality: {
                ...formFields["modality"],
                value: "",
                error: false
              },
              summary: {
                ...formFields["summary"],
                value: "",
                error: false
              },
              cityId: {
                ...formFields["cityId"],
                value: "",
                error: false
              },
              startDate: {
                ...formFields["startDate"],
                value: "",
                error: false
              },
              rounds: {
                ...formFields["rounds"],
                value: "",
                error: false
              },
              inscriptionImport: {
                ...formFields["inscriptionImport"],
                value: "",
                error: false
              },
              image: {
                ...formFields["image"],
                value: "",
                error: false
              }
            });

            if (method==="put") {
              router.push(`/tournaments`);              
            }

            Swal.fire({
              title: formFields.id.value==="" ? "Creando el Torneo" : "Actualizando el Torneo",
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
              title: formFields.id.value==="" ? "Creando el Torneo" : "Actualizando el Torneo",
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
                  title: formFields.id.value==="" ? "Creando el Torneo" : "Actualizando el Torneo",
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
  
      let url = `${process.env.NEXT_PUBLIC_API_URL}tourney`; 
      let method = "post";

      if (!isValid()) {
        if (formFields.id.value !== "") {
          url = url + "/" + formFields.id.value;
          method = "put";
        } else {
          url = url + `/${profile.id}`;
        }
        url = url + "?name=" + formFields.name.value + "&modality=" + formFields.modality.value + "&startDate=" + formFields.startDate.value + "&number_rounds=" + formFields.rounds.value + "&inscription_import=" + formFields.inscriptionImport.value + "&city_id=" + formFields.cityId.value + "&main_location=" + formFields.location.value;

        if (formFields.summary.value) {
          url + url + "&summary=" + formFields.summary.value
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
        <div className="rounded-md bg-light py-2 px-4">
            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Nombre del Torneo</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="name"
                  id="name"
                  placeholder={"Nombre del Torneo"}
                  value={formFields.name.value}
                  invalid={formFields.name.error}
                  onChange={handleChange}
                />
  
                <FormFeedback>{formFields.name.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Modalidad</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  id="modality"
                  name="modality"
                  type="select"
                  value={formFields.modality.value}
                  invalid={formFields.modality.error}
                  onChange={handleChange}
                >
                  <option value="">Modalidad</option>
                  <option value="Individual">Individual</option>
                  <option value="Parejas">Parejas</option>
                  <option value="Equipo">Equipo</option>
                </Input>
                <FormFeedback>{formFields.modality.errorMessage}</FormFeedback>
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
                <b>Ubicación</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  name="location"
                  id="location"
                  placeholder={"Ubicación del Torneo"}
                  value={formFields.location.value}
                  invalid={formFields.location.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.location.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
                <Label>Fecha</Label>
                <InputGroup size="sm">
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    placeholder={"Fecha del Torneo"}
                    value={formFields.startDate.value}
                    invalid={formFields.startDate.error}
                    onChange={handleChange}
                  />
                  <FormFeedback>{formFields.startDate.errorMessage}</FormFeedback>
                </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Rondas</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  type="number"
                  name="rounds"
                  id="rounds"
                  placeholder={"Rondas del Torneo"}
                  value={formFields.rounds.value}
                  invalid={formFields.rounds.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.rounds.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Precio de Inscripción</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  name="inscriptionImport"
                  id="inscriptionImport"
                  placeholder={"Precio de Inscripción"}
                  value={formFields.inscriptionImport.value ? Number(Math.round(formFields.inscriptionImport.value + 'e' + 2) + 'e-' + 2).toFixed(2) : ""}
                  invalid={formFields.inscriptionImport.error}
                  onChange={handleChange}
                />
                <FormFeedback>{formFields.inscriptionImport.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Resumen</b>
              </Label>
              <InputGroup size="sm">
                <Input
                  autoComplete="off"
                  name="summary"
                  id="summary"
                  placeholder={"Resumen del Torneo"}
                  value={formFields.summary.value}
                  invalid={formFields.summary.error}
                  onChange={handleChange}
                />
                  <FormFeedback>{formFields.summary.errorMessage}</FormFeedback>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label size="sm" sm={4}>
                <b>Poster</b>
              </Label>
              <InputGroup size="sm">
                <Input
                    type="text"
                    name="image"
                    placeholder="Poster Publicitario"
                    value={formFields.image.value}
                    readOnly
                />
                <InputGroupText>
                    <a
                        style={{ cursor: "pointer" }}
                        onClick={handleUpload}
                        data-toggle="tooltip"
                        title="Cargar Poster"
                    >
                        <i className="bi bi-upload"></i>
                    </a>
                </InputGroupText>
              </InputGroup>
            </FormGroup>
  
        </div>
        <div className="mt-4 d-flex justify-content-end gap-2 mb-2">
          <Link href="/tournaments" >
              <a className="btn btn-secondary btn-sm">
                Cancelar
              </a>
          </Link>
  
          <Button className="btn btn-sm" color="primary" type="submit">
            {formFields.id.value==="" ? "Crear Torneo" : "Actualizar"}
          </Button>
        </div>
  
        <Upload 
          open={open} 
          field="image"
          setOpen={setOpen} 
          formFields={formFields} 
          setFormFields={setFormFields}
          title="Subir Poster"
          image={image}
          setImage={setImage}  
        />
  
      </form>
    );
}
  