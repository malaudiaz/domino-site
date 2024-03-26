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
            errorMessage: 'El Nombre de la pareja es requerido.'                  
        },
        profile_id_one: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        profile_name_one: {
            value: "",
            error: false,
            errorMessage: 'El nombre de usuario del primer jugador de la pareja es requerido'                  
        },
        profile_id_two: {
            value: "",
            error: false,
            errorMessage: ''                  
        },
        profile_name_two: {
            value: "",
            error: false,
            errorMessage: 'El nombre de usuario del segundo jugador de la pareja es requerido'                  
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
            errorMessage: 'El club al que pertenece la pareja es requerido'                  
        },
        image: {
            value: "",
            error: false,
            errorMessage: ''                  
        }
    });

    return (
        <Layout title={"Crear Pareja de Jugadores"}>

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