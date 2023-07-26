import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

export default function ListProfile() {
  const { profile, createProfile, lang, token } = useAppContext();

  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}profile/commun/${profile.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setItems(data.data);
        setShow(data.data.length > 0);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Pérfiles",
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
    if (Object.entries(profile).length > 0) {
      fetchData();
    }
  }, [profile]);

  const changeProfile = ({ profile_id, profile_name, name, photo }) => {
    createProfile(profile_id, name, photo, profile_name);
  };

  const closeProfile = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Cerrar Pérfil",
      text: "¿ Desea cerrar este pérfil ? Esta opción no se puede deshacer",
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  };

  return (
    <>
      {show ? (
        <div className="card">
          <div className="card-body pb-0">
            <h5 className="card-title">Tus Pérfiles</h5>
              {items.map((item) => (

              <div className="d-flex justify-content-between align-items-center mb-3" key={item.profile_id}>
                  <div className="d-flex flex-row icons align-items-center">
                    <Image
                      alt="Profile Avatar"
                      src={item.photo}
                      width={40}
                      height={40}
                      className="rounded-image"
                    />
                    <div
                      className="d-flex flex-column ms-2"
                    >
                      <span
                        className="suggestions-players"
                        onClick={(e) => {
                          e.preventDefault();
                          changeProfile(item);
                        }}
                      >
                        {item.name}
                      </span>
                      <small className="comment-text muted-color fs-12">
                        {item.profile_description}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex flex-row muted-color">
                      <a className="trash-effect" title="Cerrar pérfil" onClick={(e)=>closeProfile(e)}>
                        <i class="bi bi-x-circle"></i>
                      </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
