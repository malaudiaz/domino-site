import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import PlayerForms from "../../../components/Players/Form";
import { useState } from "react";

export default function CreatePlayer() {
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

    return (
        <Layout title={"Crear Jugador"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Jugadores', href: '/players' },
                            {
                                label: 'Crear Jugador',
                                href: '/players/create',
                                active: true,
                            },
                        ]}
                    />

                    <PlayerForms formFields={formFields} setFormFields={setFormFields}/>

                </div>
            </div>

        </Layout>
    )
}