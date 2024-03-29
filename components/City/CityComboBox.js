import { useState, useEffect } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {useAppContext} from "../../AppContext";

export default function CityComboBox({
  country_id,
  name,
  url,
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

      let service;

      if (url) {
        service = url + country_id;
      } else {
        service = `${
          process.env.NEXT_PUBLIC_API_URL
        }city?page=${0}&per_page=${0}&criteria_key=${"country_id"}&criteria_value=${country_id}`;
      }


      try {
        const { data } = await axios.get(service, config);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps    
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
