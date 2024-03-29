import { useState, useEffect } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function CountryComboBox({
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
      "Accept": "application/json",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}countries?page=${0}&per_page=${0}`;

      try {
        const { data } = await axios.get(url, config);

        if (data.success) {
          setRecords(data.data);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
