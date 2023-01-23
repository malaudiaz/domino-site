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
    <footer className="bg-white p-4 text-muted mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-4">
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
          <div className="col-8 pt-2">
            <div className="row justify-content-end">
              <div className="col-4 text-end align-middle">
                <a className="text-dark" href="#">
                  {t.help}
                </a>
              </div>
              <div className="col-4 text-end">
                <a className="text-dark" href="#">
                  {t.privacy}
                </a>
              </div>
              <div className="col-4 text-end">
                <a className="text-dark" href="#">
                  {t.term}
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p className="fs-7">Domino &copy; 2023</p>
        </div>
      </div>
    </footer>
  );
}
