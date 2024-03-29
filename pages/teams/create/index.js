import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import TeamForm from "../../../components/Teams/Form";
import { useState } from "react";

export default function CreateTeam() {
    const [formFields, setFormFields] = useState({
        id: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        name: {
            value: "",
            error: false,
            errorMessage: 'El Nombre del Equipo es requerido.'                  
        },
        acronym: {
            value: "",
            error: false,
            errorMessage: 'Las siglas que identifican el equipo es requerida'                  
        },
        logo: {
            value: "",
            error: false,
            errorMessage: ''                  
        }
    });

    return (
        <Layout title={"Crear Equipo"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Equipos', href: '/teams' },
                            {
                                label: 'Crear Equipo',
                                href: '/teams/create',
                                active: true,
                            },
                        ]}
                    />

                    {/* <TeamForm formFields={formFields} setFormFields={setFormFields}/> */}

                </div>
            </div>

        </Layout>
    )
}