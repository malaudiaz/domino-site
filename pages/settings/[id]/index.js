import Layout from "../../../layouts/Layout"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import Setting from "../../../components/Tourney/Setting";
import SettingForm from "../../../components/Setting/Form";

export default function SettingPage() {
    const router = useRouter();
    const {lang, token} = useAppContext();

    const id = router.query.id;

    const [tourney, setTourney] = useState([]);

    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        },
    };

    const fetchTourney = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${id}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setTourney(data.data);
          }
        } catch ({ code, message, name, request }) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Configuraciones",
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
                title: "Configuraciones",
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
            fetchTourney();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <Layout title={"Configurar Torneo"}>
            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row py-3 px-4">
                    <div className="d-flex flex-row justify-content-between align-items-center pt-2 px-4">
                        <Breadcrumbs
                            breadcrumbs={[
                                { label: "Configuraciones", href: "/settings" },
                                {
                                    label: "Configurar Torneo",
                                    href: `/settings/${id}`,
                                    active: true,
                                }
                            ]}
                        />
                    </div>

                    <div className="d-flex flex-row flex-wrap gap-2 gap-md-4 justify-content-between align-items-center px-4 fs-6">
                        <strong>{tourney.name}</strong>
                        <span className="d-none d-md-table">Modalidad: <strong>{tourney.modality}</strong></span>
                        <div className="d-flex flex-row gap-2 d-none d-md-table">
                            <span>
                                <i className="bi bi-geo-alt text-danger font-weight-bold" /><strong>{tourney.main_location}. {tourney.city_name}</strong>
                            </span>
                        </div>
                    </div>

                    <div className="row px-4">
                        <hr></hr>
                    </div>

                    <SettingForm/>

                </div>
            </div>
        </Layout>
    )
};