import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import ClubForm from "../../../components/Clubs/Form";
import { useState } from "react";

export default function CreateClub() {
    const [formFields, setFormFields] = useState({
        id: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        name: {
            value: "",
            error: false,
            errorMessage: 'El Nombre del Club es requerido.'                  
        },
        acronym: {
            value: "",
            error: false,
            errorMessage: 'Las siglas que identifican el club es requerida'                  
        },
        logo: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        federationId: {
            value: "",
            error: false,
            errorMessage: 'Seleccione la federación a que pertenece el Club'                  
        },
        cityId: {
            value: "",
            error: false,
            errorMessage: 'Seleccione la ciudad del Club'                  
        }
    });

    return (
        <Layout title={"Crear Club"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Club', href: '/clubs' },
                            {
                                label: 'Crear Club',
                                href: '/clubs/create',
                                active: true,
                            },
                        ]}
                    />

                    <ClubForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}