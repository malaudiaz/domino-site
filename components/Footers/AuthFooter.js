import {useAppContext} from "../../AppContext";
import { Input, InputGroup } from "reactstrap";

export default function AuthFooter() {
  const {lang, setLang, i18n} = useAppContext();
  const t = i18n.auth;

  const handleChange = (event) => {
    setLang(event.target.value);
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
                defaultValue={lang}
                onClick={handleChange}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </Input>
            </InputGroup>
          </div>

          <p className="fs-7 ps-4 pt-3">&copy; 2023, SmartDomino</p>
        </div>
      </div>
    </footer>
  );
}
