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

        <div className="d-flex justify-content-between p-2 px-3">
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
          <div className="flex-grow-1"></div>
          <div className="d-flex flex-row mt-1 ellipsis">
            <a className="text-dark ps-3 pe-2" href="#">
                {t.help}
            </a>
          </div>
          <div className="d-flex flex-row mt-1 ellipsis">
            <a className="text-dark ps-2 pe-2" href="#">
                {t.privacy}
            </a>
          </div>
          <div className="d-flex flex-row mt-1 ellipsis">
            <a className="text-dark ps-2 pe-2" href="#">
                {t.term}
            </a>
          </div>
        </div>

        {/* <hr /> */}
        <div className="text-center">
          <p className="fs-7">&copy; 2023, Dominó</p>
        </div>
      </div>
    </footer>
  );
}
