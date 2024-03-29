import Layout from "../../../../../layouts/Layout";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../../../AppContext";
import InscriptionForm from "../../../../../components/Inscriptions/Form";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditInscription() {
    const {lang, token} = useAppContext();
    const [tourney, setTourney] = useState();
    
    const router = useRouter();

    const id = router.query.id;

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
        },
        tourney_id: {
            value: "",
            error: false,
            errorMessage: ''                  
        }
    });

    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        },
    };

    const fetchTourney = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${formFields.tourney_id.value}`;
    
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

    const fetchOne = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}inscriptions/one/${id}`;
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                setFormFields({
                    id: {
                        ...formFields["id"],
                        value: data.data.id,
                    },
                    profile_id: {
                        ...formFields["profile_id"],
                        value: data.data.profile_id,
                    },
                    profile_name: {
                        ...formFields["profile_name"],
                        value: data.data.profile_name,
                    },
                    was_pay: {
                        ...formFields["was_pay"],
                        value: data.data.was_pay,
                    },
                    payment_way: {
                        ...formFields["payment_way"],
                        value: data.data.payment_way,
                    },
                    tourney_id: {
                        ...formFields["tourney_id"],
                        value: data.data.tourney_id
                    }
                })
            }
        } catch ({code, message, name, request}) {
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
                const {detail} = JSON.parse(request.response)
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
        if (formFields.tourney_id.value) {
            fetchTourney();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formFields.tourney_id.value]);

    useEffect(() => {
        if (id) {
            fetchOne();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <Layout title="Modificar Inscripción">
            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row py-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Inscripciones', href: `/inscriptions/${formFields.tourney_id.value}/players`},
                            {
                                label: 'Modificar Inscripción',
                                href: `/inscriptions/${id}/players/edit`,
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