import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import CouplesForm from "../../../../components/Couples/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditCouples() {   
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
            errorMessage: 'El Nombre de la pareja es requerido.'                  
        },
        profile_id_one: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        profile_name_one: {
            value: "",
            error: false,
            errorMessage: 'El nombre de usuario del primer jugador de la pareja es requerido'                  
        },
        profile_id_two: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        profile_name_two: {
            value: "",
            error: false,
            errorMessage: 'El nombre de usuario del segundo jugador de la pareja es requerido'                  
        },
        elo: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        level: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        club_id: {
            value: "",
            error: false,
            errorMessage: 'El club al que pertenece la pareja es requerido'                  
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}profile/pairplayer/one/${id}`;
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                setFormFields({
                    ...formFields,
                    id: {
                        ...formFields['id'],
                        value: data.data.id
                    },
                    name: {
                        ...formFields['id'],
                        value: data.data.name
                    },
                    profile_id_one: {
                        ...formFields['profile_id_one'],
                        value: data.data.profile_id_one
                    },
                    profile_name_one: {
                        ...formFields['profile_name_one'],
                        value: data.data.profile_name_one
                    },
                    profile_id_two: {
                        ...formFields['profile_id_two'],
                        value: data.data.profile_id_two
                    },
                    profile_name_two: {
                        ...formFields['profile_name_two'],
                        value: data.data.profile_name_two
                    },
                    elo: {
                        ...formFields['elo'],
                        value: data.data.elo
                    },
                    level: {
                        ...formFields['level'],
                        value: data.data.level
                    },
                    club_id: {
                        ...formFields['club_id'],
                        value: data.data.club_id
                    },
                    image: {
                        ...formFields['image'],
                        value: data.data.image
                    }
                })
            }
        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Editar Pareja",
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
                    title: "Editar Pareja",
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
        <Layout title={"Editar Pareja"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Parejas', href: '/couples' },
                            {
                                label: 'Editar Pareja',
                                href: `/couples/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />

                    <CouplesForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}