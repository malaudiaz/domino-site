import { useState, useEffect } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {useAppContext} from "../../AppContext";

export default function ClubComboBox({
  federation_id,
  name,
  cmbText,
  invalid,
  valueDefault,
  onChange,
}) {
  const {token, lang} = useAppContext();
  const [records, setRecords] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}club/federation/${federation_id}`;

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
          title: "Cargando Clubes",
          text: detail,
          showConfirmButton: true,
        });
      }
    };

    if (federation_id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [federation_id]);

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
