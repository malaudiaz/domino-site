import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import TournamentForm from "../../../components/Tournaments/Form";
import { useState } from "react";

export default function CreateTournament() {
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

    return (
        <Layout title={"Crear Torneo"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Torneos', href: '/tournaments' },
                            {
                                label: 'Crear Torneo',
                                href: '/tournaments/create',
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