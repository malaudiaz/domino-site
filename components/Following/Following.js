import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

export default function Following() {
  const { profile, lang, token } = useAppContext();
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(0);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}profile/followers/?profile_id=${profile.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setItems(data.data);
        setPages(data.total_pages);
        setShow(data.data.length > 0);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando seguidos",
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
  }, [profile, reload]);

  const followyou = async (item) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}profile/followers`;

    try {
      const { data } = await axios.post(
        url,
        { profile_id: profile.id, profile_follow_id: item.profile_id },
        config
      );
      if (data.success) {
        setReload(!reload);
        Swal.fire({
          icon: "success",
          title: "Siguiendo",
          text: "Ahora dejas de seguir a: " + item.name,
          showConfirmButton: true,
        });
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Seguir",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      {show ? (  
        <div className="card">
          <div className="card-body pb-0">
            <h5 className="card-title">Siguiendo</h5>

            {items.map((item, idx) => (
              <div
                key={idx}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div className="d-flex flex-row icons align-items-center">
                  <Image
                    alt=""
                    src={item.photo}
                    width={40}
                    height={40}
                    className="rounded-image"
                  />
                  <div className="d-flex flex-column ms-2">
                    <span className="suggestions-players">{item.name}</span>
                    <small className="comment-text muted-color fs-12">
                      Siguiendo
                    </small>
                  </div>
                </div>
                <div className="d-flex flex-row muted-color">
                  <a
                    className="fallow-option"
                    onClick={(e) => {
                      e.preventDefault();
                      followyou(item);
                    }}
                  >
                    Dejar de Seguir
                  </a>
                </div>
              </div>
            ))}
          </div>
          {pages > 1 && 
            <div className="suggestions-players py-2" style={{ textAlign: "center" }}>
              <strong>Ver más</strong>
            </div>
          }
        </div> ) : (
          <></>
        )
      }
    </> 
  );
}
