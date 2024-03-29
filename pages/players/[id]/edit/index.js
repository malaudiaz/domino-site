import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import PlayerForm from "../../../../components/Players/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditPlayer() {   
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
            errorMessage: 'El Nombre del Pérfil de Jugador es requerido.'                  
        },
        username: {
            value: "",
            error: false,
            errorMessage: ''                  
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
            errorMessage: 'El club del jugador es requerido'                  
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}profile/singleplayer/one/${id}`;
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
                    username: {
                        ...formFields["username"],
                        value: data.data.username,
                    },
                    elo: {
                        ...formFields["elo"],
                        value: data.data.elo,
                    },
                    level: {
                        ...formFields["level"],
                        value: data.data.level,
                    },
                    club_id: {
                        ...formFields["club_id"],
                        value: data.data.club_id,
                    },
                    image: {
                        ...formFields["image"],
                        value: data.data.photo,
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
        <Layout title={"Editar Jugador"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Jugadores', href: '/players' },
                            {
                                label: 'Editar Jugador',
                                href: `/players/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />

                    <PlayerForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}