import { FormGroup, Label, Input, InputGroup, FormFeedback, Button } from "reactstrap";
import FinderProfile from "../Profile/Finder";
import { useAppContext } from "../../AppContext";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

export default function InscriptionForm({ formFields, setFormFields, tourney }) {

  const { lang, token } = useAppContext();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

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
      profile_name: {
        ...formFields["profile_name"],
        error: formFields.profile_name.value === ""
      },
      payment_way: {
        ...formFields["payment_way"],
        error: formFields.payment_way.value === "" && formFields.was_pay.value
      },
    })

    return formFields.profile_name.error && formFields.payment_way.error;
  }

  const save = async (url, body, method) => {
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
          profile_id: {
            ...formFields["profile_id"],
            value: "",
            error: false,
          },
          profile_name: {
            ...formFields["profile_name"],
            value: "",
            error: false,
          },
          was_pay: {
            ...formFields["was_pay"],
            value: false,
            error: false,
          },
          payment_way: {
            ...formFields["payment_way"],
            value: "",
            error: false,
          }
        });
        Swal.fire({
          title: formFields.id.value==="" ? "Creando Inscripción" : "Actualizando Inscripción",
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
          title: formFields.id.value==="" ? "Creando Inscripción" : "Actualizando Inscripción",
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
              title: formFields.id.value==="" ? "Creando Inscripción" : "Actualizando Inscripción",
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let url = `${process.env.NEXT_PUBLIC_API_URL}inscriptions/`; 
    let method = "post";
    let body = {};

    if (!isValid()) {

      if (formFields.id.value !== "") {
        url = url + "/" + formFields.id.value;
        method = "put";
        body['was_pay'] = formFields.was_pay.value;
        body['payment_way'] = formFields.was_pay.value ? formFields.payment_way.value : "";
      } else {
        body['tourney_id'] = tourney.id;
        body['profile_id'] = formFields.profile_id.value;
        body['was_pay'] = formFields.was_pay.value;
        body['payment_way'] = formFields.was_pay.value ? formFields.payment_way.value : "";
      }

      save(url, body, method);
    }
  };

  const profileCaption = () => {
    let caption = "Jugador";
    switch (tourney.modality) {
      case "Parejas":
        caption = "Pareja";
        break;
      case "Equipos":
        caption = "Equipo";
        break;
      default:
        caption = "Jugador";
        break;
    }
    return caption;
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="rounded-md bg-light py-2 px-4">
        <FormGroup>
          <Label size="sm" sm={4}>
            {profileCaption()}
          </Label>
          <FinderProfile 
              displayField={"profile_name"} 
              valueField={"profile_id"}
              formFields={formFields} 
              setFormFields={setFormFields} 
              disabled={formFields.id.value!==""} 
              fieldCaption={profileCaption()}
              tourney_id={tourney.id}
          />
          <FormFeedback>{formFields.profile_name.errorMessage}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
              name="was_pay"
              type="checkbox"
              checked={formFields.was_pay.value}
              onChange={handleChange}
          />
          {' '}
          <Label check>
              Pago la Inscripción.
          </Label>
        </FormGroup>

        {formFields.was_pay.value && 
        <FormGroup>
          <Label size="sm" sm={4}>
            Forma de Pago
          </Label>

          <InputGroup size="sm">
            <Input
              type="select"
              name="payment_way"
              id="payment_way"
              placeholder="Forma de Pago"
              invalid={formFields.payment_way.error}
              defaultValue={formFields.payment_way.value}
              onChange={handleChange}
            >
              <option value="">Seleccione forma de pago</option>
              <option value="CASH">Efectivo</option>
              <option value="SELLER">Seller</option>
              <option value="PAYPAL">Pay Pal</option>
            </Input>
            <FormFeedback>{formFields.payment_way.errorMessage}</FormFeedback>
          </InputGroup>
        </FormGroup>}

      </div>

      <div className="mt-4 d-flex justify-content-end gap-2 mb-2">
          <Link href={`/inscriptions/${tourney.id}/players`} >
              <a className="btn btn-secondary btn-sm">
                Cancelar
              </a>
          </Link>
  
          <Button className="btn btn-sm" color="primary" type="submit">
            Inscribir
          </Button>
      </div>


    </form>
  );
}
