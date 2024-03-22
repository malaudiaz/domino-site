import { useState } from "react";
import { InputGroup, InputGroupText, Input, FormFeedback } from "reactstrap";
import FindForm from "./FindForm";

export default function FinderUser({ field, formFields, setFormFields, disabled }) {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };


  return (
    <InputGroup size="sm">
      <Input
        id="textFindUser"
        name="textFindUser"
        type="text"
        placeholder="Usuario"
        invalid={formFields[field].error}
        value={formFields[field].value}
        readOnly
      />
      <InputGroupText>
        <a
          style={{ cursor: "pointer", color: disabled ? "#c7c7c7" : "black" }}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) {
              setFormFields({
                ...formFields,
                [field]: {
                  ...formFields[field],
                  value: ""
                }
              });
            }
          }}
          data-toggle="tooltip"
          title="Limpiar"
        >
          <i className="bi bi-x"></i>
        </a>
      </InputGroupText>
      <InputGroupText>
        <a
          style={{ cursor: "pointer", color: disabled ? "#c7c7c7" : "black"  }}
          data-toggle="tooltip"
          title="Buscar Usuario"
          onClick={onOpen}
        >
          <i className="bi bi-search"></i>
        </a>
      </InputGroupText>
      <FormFeedback>{formFields[field].errorMessage}</FormFeedback>

      <FindForm isOpen={open} setClose={setOpen} field={field} formFields={formFields} setFormFields={setFormFields}/>

    </InputGroup>
  );
}
