import { useState, useEffect } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function CountryComboBox({
  name,
  cmbText,
  valueDefault,
  onChange,
}) {
  const [records, setRecords] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/countries/services?page=0&per_page=0`;
      try {
        const { data } = await axios.get(url, config);
        const { result } = data;

        if (result.success) {
          setRecords(result.data);
        }
      } catch ({ response }) {
        const { detail } = response.data;
        Swal.fire({
          icon: "error",
          title: "Cargando Paises",
          text: detail,
          showConfirmButton: true,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <Input
      id={name}
      name={name}
      type="select"
      value={valueDefault}
      onChange={(e) => {
        onChange(e);
      }}
    >
      <option value="">{cmbText}</option>
      {records.map((record, i) => {
        return (
          <option key={i} value={record.id}>
            {record.name}
          </option>
        );
      })}
    </Input>
  );
}
