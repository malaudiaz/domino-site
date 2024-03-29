import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import FederationForm from "../../../../components/Federations/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditFederation() {   
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
            errorMessage: 'El Nombre de la Federación es requerido.'                  
        },
        acronym: {
            value: "",
            error: false,
            errorMessage: 'Las siglas que identifican la federación es requerida'                  
        },
        countryId: {
            value: "",
            error: false,
            errorMessage: 'Seleccione el país de la federación'                  
        },
        cityId: {
            value: "",
            error: false,
            errorMessage: 'Seleccione la ciudad donde radica la federación'                  
        },
        logo: {
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}federation/one/${id}`;
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                console.log(data.data.name);

                setFormFields({
                    id: {
                        value: data.data.id,
                        error: false,
                        errorMessage: ''                  
                    },
                    name: {
                        value: data.data.name,
                        error: false,
                        errorMessage: 'El Nombre de la Federación es requerido.'                  
                    },
                    acronym: {
                        value: data.data.siglas,
                        error: false,
                        errorMessage: 'Las siglas que identifican la federación es requerida'                  
                    },
                    countryId: {
                        value: data.data.country_id,
                        error: false,
                        errorMessage: 'Seleccione el país de la federación'                  
                    },
                    cityId: {
                        value: data.data.city_id,
                        error: false,
                        errorMessage: 'Seleccione la ciudad donde radica la federación'                  
                    },
                    logo: {
                        value: data.data.logo,
                        error: false,
                        errorMessage: ''                  
                    }                                
                })
            }
          } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Editar Federación",
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
                    title: "Editar Federación",
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
        <Layout title={"Editar Federación"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Federaciones', href: '/federations' },
                            {
                                label: 'Editar Federación',
                                href: `/federations/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />

                    <FederationForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}