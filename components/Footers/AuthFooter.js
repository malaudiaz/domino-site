import { useContext } from "react";
import AppContext from "../../AppContext";

import { Input, InputGroup } from "reactstrap";

export default function AuthFooter() {
  const value = useContext(AppContext);
  let { languageSelected } = value.state;
  const t = value.state.languages.footer;

  const handleChange = (event) => {
    value.setLanguageSelected(event.target.value);
  };

  return (
    <footer className="bg-white p-3 text-muted mt-auto">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-row align-items-center">
            <InputGroup size="sm">
              <Input
                id="languaje"
                name="select"
                type="select"
                defaultValue={languageSelected}
                onClick={handleChange}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </Input>
            </InputGroup>
          </div>

          <p className="fs-7 ps-4 pt-3">&copy; 2023, Dominó</p>
        </div>
      </div>
    </footer>
  );
}
