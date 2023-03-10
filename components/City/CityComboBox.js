import { useState, useEffect } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function CityComboBox({
  session,
  country_id,
  name,
  cmbText,
  valueDefault,
  onChange,
}) {
  const [records, setRecords] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/cities/services?page=0&per_page=0&criteria_key=country_id&criteria_value=${country_id}`;
      try {
        const { data } = await axios.get(url, config);

        if (data.success) {
          setRecords(data.data);
        }
      } catch ({ response }) {
        const { detail } = response.data;
        Swal.fire({
          icon: "error",
          title: "Cargando Ciudades",
          text: detail,
          showConfirmButton: true,
        });
      }
    };

    fetchData();
  }, [country_id]);

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
