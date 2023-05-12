import { useState, useEffect } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function CityComboBox({
  session,
  country_id,
  name,
  cmbText,
  invalid,
  valueDefault,
  onChange,
}) {
  const [records, setRecords] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": session.locale,
      Authorization: `Bearer ${session.token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${
        process.env.NEXT_PUBLIC_API_URL
      }city?page=${0}&per_page=${0}&criteria_key=${"country_id"}&criteria_value=${country_id}`;

      try {
        const { data } = await axios.get(url, config);

        if (data.success) {
          setRecords(data.data);
        }
      } catch (errors) {
        console.log(errors);

        const { detail } = errors.response.data;
        Swal.fire({
          icon: "error",
          title: "Cargando Ciudades",
          text: detail,
          showConfirmButton: true,
        });
      }
    };

    if (country_id) {
      fetchData();
    }
  }, [country_id]);

  return (
    <Input
      id={name}
      name={name}
      type="select"
      invalid={invalid}
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
