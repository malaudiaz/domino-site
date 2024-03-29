import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";

export default function Combobox({
  name,
  cmbText,
  invalid,
  valueDefault,
  onChange,
  url,
  displayValue,
  valueField,
  reload
}) {
  const { token, lang } = useAppContext([]);
  const [records, setRecords] = useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRecords(data.data);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Jugador",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const { detail } = JSON.parse(request.response);
          Swal.fire({
            title: "Cargando Jugador",
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

  useEffect(() => {
    if (reload) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [reload]);

  return (
    <Input
      id={name}
      name={name}
      type="select"
      invalid={invalid}
      value={valueDefault}
      onChange={onChange}
    >
      <option value="">{cmbText}</option>
      
      {records && records.map((record, i) => {
        return (
          <option key={i} value={record[valueField]}>
            {record[displayValue]}
          </option>
        );
      })}
    </Input>
  );
}
