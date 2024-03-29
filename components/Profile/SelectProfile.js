import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useAppContext} from "../../AppContext";

export default function SelectProfile({ setProfileType }) {
  const {lang, token} = useAppContext();
  const [records, setRecords] = useState([]);
  const [choice, setChoice] = useState({});

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    }
  };

  const fetchData = async () => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }profiletype`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRecords(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Tipos de Perfiles",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choice]);

  const handleChange = (item) => {
    setChoice(item);
  }

  const handleAccept = () => {
    setProfileType(choice.name);
  }

  return (
    <div className="pt-4 px-4" style={{ display: "grid" }}>
      <div className="wrapper">
        <div className="mx-auto" style={{ maxWidth: "24rem", width: "100%" }}>
          <div className="bg-white shadow rounded p-3 input-group-lg">
            <h5 className="card-sm-title">Crear pérfil como:</h5>
            <hr />

            {records.map(({ id, name, description }) => (
              <div className="form-check" key={id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={name}
                  id={name}
                  value={choice.id}
                  checked={choice.id === id ? true : false}
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange({ id, name, description });
                  }}
                />
                <label className="form-check-label">{description}</label>
              </div>
            ))}
            <div
              className="card-footer"
              style={{ textAlign: "center", paddingBottom: "0px" }}
            >
              <button className="btn btn-sm btn-primary" onClick={handleAccept}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
