import { useState } from "react";
import { InputGroup, InputGroupText, Input, FormFeedback } from "reactstrap";
import FindForm from "./FindForm";

export default function FinderProfile({ displayField, valueField, formFields, setFormFields, disabled, fieldCaption, tourney_id }) {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  return (
    <InputGroup size="sm">
      <Input
        id="textFind"
        name="textFind"
        type="text"
        placeholder={fieldCaption}
        invalid={formFields[displayField].error}
        value={formFields[displayField].value}
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
                [displayField]: {
                  ...formFields[displayField],
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
      <FormFeedback>{formFields[displayField].errorMessage}</FormFeedback>

      <FindForm 
        isOpen={open} 
        setClose={setOpen} 
        displayField={displayField} 
        valueField={valueField} 
        formFields={formFields} 
        setFormFields={setFormFields} 
        tourney_id={tourney_id}
      />

    </InputGroup>
  );
}
