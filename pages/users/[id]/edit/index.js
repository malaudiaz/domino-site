import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import UserForm from "../../../../components/Users/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditUser() {   
    const {lang, token} = useAppContext();
    const router = useRouter();

    const id = router.query.id;

    const [formFields, setFormFields] = useState({
        id: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        username: {
            value: "",
            error: false,
            errorMessage: 'El Nombre de usuario es requerido.'                  
        },
        first_name: {
            value: "",
            error: false,
            errorMessage: 'El nombre de pila es requerido'                  
        },
        last_name: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        sex: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        birthdate: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        alias: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        job: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        city_id: {
            value: "",
            error: false,
            errorMessage: 'La Ciudad es requerida'                  
        },
        email: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        phone: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        image: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        receive_notifications: {
            value: false,
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}users/${id}`;
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                setFormFields({
                    id: {
                        ...formFields["id"],
                        value: data.data.id,
                    },
                    username: {
                        ...formFields["username"],
                        value: data.data.username,
                    },
                    first_name: {
                        ...formFields["first_name"],
                        value: data.data.first_name,
                    },
                    last_name: {
                        ...formFields["last_name"],
                        value: data.data.last_name,
                    },
                    sex: {
                        ...formFields["sex"],
                        value: data.data.sex,
                    },
                    birthdate: {
                        ...formFields["birthdate"],
                        value: data.data.birthdate,
                    },
                    alias: {
                        ...formFields["alias"],
                        value: data.data.alias,
                    },
                    job: {
                        ...formFields["job"],
                        value: data.data.job,
                    },
                    city_id: {
                        ...formFields["city_id"],
                        value: data.data.city_id,
                    },          
                    email: {
                        ...formFields["email"],
                        value: data.data.email,
                    },
                    phone: {
                        ...formFields["phone"],
                        value: data.data.phone,
                    },
                    image: {
                        ...formFields["image"],
                        value: data.data.image,
                    },
                    receive_notifications: {
                        ...formFields["receive_notifications"],
                        value: data.data.receive_notifications,
                    }
                })
            }
        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Editar Federativo",
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
                    title: "Editar Federativo",
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
        <Layout title={"Editar Federativo"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Usuarios', href: '/users' },
                            {
                                label: 'Editar Usuario',
                                href: `/users/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />

                    <UserForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}