import { useEffect, useState } from "react";
import { Row, FormGroup, Label, Col, Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function Role({ session, profile, setProfile }) {
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
      }eventroles?page=${0}&per_page=${0}`;

      try {
        const { data } = await axios.get(url, config);

        if (data.success) {
          setRecords(data.data);
        }
      } catch ({ errors }) {
        console.log(errors);

        const { response } = errors;
        Swal.fire({
          title: "Pérfil",
          text: response.detail,
          icon: "info",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            signOut();
          }
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (prop) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const roles = profile.roles.split(",");
    if (value) {
        roles.push(prop);
    } else {
        roles = roles.filter(rol => rol != prop);
    }
    
    let rol = "";
    roles.map((r, i) => {
        rol = i==0 ? rol + r : rol + "," + r;
    });

    setProfile({ ...profile, roles: rol });
  };

  return (
    <Row className="pt-2">
      <Col sm={4}></Col>
        {records.map(({id, name, description})=>{
            return(
                <Col sm={2} key={id}>
                    <FormGroup check>
                        <Input
                            id={name}
                            name={name}
                            type="checkbox"
                            checked={profile.roles.includes(name)}
                            onChange={handleChange(name)}
                        />
                        <Label check for={name}>
                            {description.charAt(0).toUpperCase()+description.slice(1).toLowerCase()}
                        </Label>
                    </FormGroup>
                </Col>
            )
        })}
    </Row>
  );
}
