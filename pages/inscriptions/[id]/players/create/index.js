import Layout from "../../../../../layouts/Layout";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import InscriptionForm from "../../../../../components/Inscriptions/Form";
import { useAppContext } from "../../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateInscription() {
    const router = useRouter();
    const { lang, token } = useAppContext();
    const [tourney, setTourney] = useState();

    const [formFields, setFormFields] = useState({
        id: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        profile_id: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        profile_name: {
            value: "",
            error: false,
            errorMessage: 'Seleccione el Jugador a inscribir'                  
        },
        was_pay: {
            value: false,
            error: false,
            errorMessage: ''                  
        },
        payment_way: {
            value: "",
            error: false,
            errorMessage: 'Seleccione la forma del pago'        
        }
    });

    const id = router.query.id;

    const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "accept-Language": lang,
          Authorization: `Bearer ${token}`,
        },
    };
    
    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${id}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setTourney(data.data);
          }
        } catch ({ code, message, name, request }) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Inscripciones",
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
                title: "Inscripciones",
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
        <Layout title={"Nueva Inscripción"}>
            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row py-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Inscripciones', href: `/inscriptions/${id}/players`},
                            {
                                label: 'Nueva Inscripción',
                                href: `/inscriptions/${id}/players/create`,
                                active: true,
                            },
                        ]}
                    />

                    {tourney && <InscriptionForm formFields={formFields} setFormFields={setFormFields} tourney={tourney} />}


                </div>
            </div>
        </Layout>
    )
}