import Layout from "../../../layouts/Layout"
import Breadcrumbs from "../../../components/Breadcrumbs";
import UserForm from "../../../components/Users/Form";
import { useState } from "react";

export default function CreateUser() {
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

    return (
        <Layout title={"Crear Usuario"}>

            <div
                className="card"
                style={{ border: "1px solid", borderColor: "#c7c7c7" }}
            >
                <div className="row pt-3 px-4">

                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Usuarios', href: '/users' },
                            {
                                label: 'Crear Usuario',
                                href: '/users/create',
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