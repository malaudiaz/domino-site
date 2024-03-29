import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import TournamentForm from "../../../../components/Tournaments/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditTournament() {   
    const {lang, token} = useAppContext();
    const router = useRouter();

    const id = router.query.id;

    const [formFields, setFormFields] = useState({
        id: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        name: {
            value: "",
            error: false,
            errorMessage: 'El Nombre del Torneo es requerido.'                  
        },
        modality: {
            value: "",
            error: false,
            errorMessage: 'Seleccione la Modalidad del Torneo'                  
        },
        summary: {
            value: "",
            error: false,
            errorMessage: 'Resumen del Torneo'                  
        },
        startDate: {
            value: "",
            error: false,
            errorMessage: 'Fecha de inicio requerida'                  
        },
        rounds: {
            value: "",
            error: false,
            errorMessage: 'Rondas del Torneo requerida'                  
        },
        inscriptionImport: {
            value: "",
            error: false,
            errorMessage: 'Precio de Inscripción requerido'                  
        },
        cityId: {
            value: "",
            error: false,
            errorMessage: 'Seleccione la ciudad sede del torneo'
        },
        location: {
            value: "",
            error: false,
            errorMessage: 'La ubicación donde se desarrollara el torneo es requerida'
        },
        image: {
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
    
    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${id}`;
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                setFormFields({
                    id: {
                        ...formFields["id"],
                        value: data.data.id,
                    },
                    name: {
                        ...formFields["name"],
                        value: data.data.name,
                    },
                    modality: {
                        ...formFields["modality"],
                        value: data.data.modality,
                    },
                    summary: {
                        ...formFields["summary"],
                        value: data.data.summary,
                    },
                    startDate: {
                        ...formFields["startDate"],
                        value: data.data.startDate,
                    },
                    rounds: {
                        ...formFields["rounds"],
                        value: data.data.number_rounds,
                    },
                    cityId: {
                        ...formFields["cityId"],
                        value: data.data.city_id,
                    },
                    location: {
                        ...formFields["location"],
                        value: data.data.main_location,
                    },            
                    inscriptionImport: {
                        ...formFields["inscriptionImport"],
                        value: data.data.inscription_import,
                    },
                    image: {
                        ...formFields["image"],
                        value: data.data.image,
                    }            
                })
            }
        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Editar Jugador",
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
                    title: "Editar Jugador",
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
        <Layout title={"Editar Torneo"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Torneos', href: '/tournaments' },
                            {
                                label: 'Editar Torneo',
                                href: `/tournaments/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />

                    <TournamentForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}