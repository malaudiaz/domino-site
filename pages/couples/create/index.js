import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import CouplesForm from "../../../components/Couples/Form";
import { useState } from "react";

export default function CreateCouples() {
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
        <Layout title={"Crear Jugador"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Parejas', href: '/couples' },
                            {
                                label: 'Crear Pareja',
                                href: '/couples/create',
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