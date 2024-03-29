import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import ClubForm from "../../../../components/Clubs/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditClub() {
  const { lang, token } = useAppContext();
  const router = useRouter();

  const id = router.query.id;

  const [formFields, setFormFields] = useState({
    id: {
      value: "",
      error: false,
      errorMessage: "",
    },
    name: {
      value: "",
      error: false,
      errorMessage: "El Nombre del Club es requerido.",
    },
    acronym: {
      value: "",
      error: false,
      errorMessage: "Las siglas que identifican el club es requerida",
    },
    logo: {
      value: "",
      error: false,
      errorMessage: "",
    },
    federationId: {
      value: "",
      error: false,
      errorMessage: "Seleccione la federación a que pertenece el Club",
    },
    cityId: {
      value: "",
      error: false,
      errorMessage: "Seleccione la ciudad del Club",
    },
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}club/one/${id}`;
    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        console.log(data.data.name);

        setFormFields({
          id: {
            ...formFields["id"],
            value: data.data.id,
          },
          name: {
            ...formFields["name"],
            value: data.data.name,
          },
          acronym: {
            ...formFields["acronym"],
            value: data.data.siglas,
          },
          federationId: {
            ...formFields["federationId"],
            value: data.data.federation_id,
          },
          cityId: {
            ...formFields["cityId"],
            value: data.data.city_id,
          },
          logo: {
            ...formFields["logo"],
            value: data.data.logo,
          },
        });
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Editar Club",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const { detail } = JSON.parse(request.response);
          Swal.fire({
            title: "Editar Club",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Layout title={"Editar Club"}>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="row pt-3 px-4">
          <Breadcrumbs
            breadcrumbs={[
              { label: "Clubs", href: "/clubs" },
              {
                label: "Editar Club",
                href: `/clubs/${id}/edit`,
                active: true,
              },
            ]}
          />

          <ClubForm formFields={formFields} setFormFields={setFormFields} />
        </div>
      </div>
    </Layout>
  );
}
