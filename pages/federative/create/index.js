import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import FederativeForm from "../../../components/Federative/Form";
import { useState } from "react";

export default function CreateFederative() {
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

                    <FederativeForm formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}