import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import FederationForm from "../../../components/Federations/Form";
import { useState } from "react";

export default function CreateFederation() {
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

    return (
        <Layout title={"Crear Federación"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Federaciones', href: '/federations' },
                            {
                                label: 'Crear Federación',
                                href: '/federations/create',
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