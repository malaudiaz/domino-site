import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function View({ session, profile }) {
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);

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
      const urlCountries = `${process.env.NEXT_PUBLIC_API_URL}countries?page=${0}&per_page=${0}`;

      try {
        const { data } = await axios.get(urlCountries, config);
        const { result } = data;

        if (result.success) {
          setCountry(result.data);
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

      const urlCities = `${
        process.env.NEXT_PUBLIC_API_URL
      }city?page=${0}&per_page=${0}&criteria_key=${"country_id"}&criteria_value=${profile.country_id}`;


      try {
        const { data } = await axios.get(urlCities, config);

        if (data.success) {
          setCity(data.data);
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
  }, [profile.country_id]);

  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <h5 className="card-title">Detalles del Pérfil</h5>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Nombre</div>
        <div className="col-lg-9 col-md-8">{profile.first_name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Apellido</div>
        <div className="col-lg-9 col-md-8">{profile.last_name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Alias</div>
        <div className="col-lg-9 col-md-8">{profile.alias}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Ocupación</div>
        <div className="col-lg-9 col-md-8">{profile.job}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Correo</div>
        <div className="col-lg-9 col-md-8">{profile.email}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Teléfono</div>
        <div className="col-lg-9 col-md-8">{profile.phone}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Sexo</div>
        <div className="col-lg-9 col-md-8">
          {profile.sex === "" || profile.sex === "F" ? "Femenino" : "Mascúlino"}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Fecha Nacimiento</div>
        <div className="col-lg-9 col-md-8">{profile.birthdate}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">País</div>
        <div className="col-lg-9 col-md-8">
          {country.map((record, i) => {
            if (record.id == profile.country_id) {
              return record.name;
            }
          })}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Ciudad</div>
        <div className="col-lg-9 col-md-8">
          {city.map((record, i) => {
            if (record.id == profile.city_id) {
              return record.name;
            }
          })}
        </div>
      </div>
    </div>
  );
}
