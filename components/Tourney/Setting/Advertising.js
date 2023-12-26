import { useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../AppContext";

import {
    Form,
    Label,
    Input
  } from "reactstrap";

export default function Advertising({ formValues, reload, setReload }) {
    const { token, lang } = useAppContext();

    // useEffect(() => {
    //     setReload(false);
    // }, [reload]);

    const saveImage = async (img) => {
        const body = new FormData();
        body.append("image", img);

        const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/images/${formValues.tourneyId.value}`
  
        try {
          const { data } = await axios.post(url, body, {
            headers: {
              "Accept-Language": lang,
              "Authorization": `Bearer ${token}`,
            },
          });
          if (data.success) {

            setReload(true);

            Swal.fire({
              icon: "success",
              title: "Configurando Torneo",
              text: data.detail,
              showConfirmButton: true
            });
          }
        } catch (errors) {
          console.log(errors);
  
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al consultar la API....",
            showConfirmButton: true
          });
        }  
    }

    return (
        <Form encType="multipart/form-data" autoComplete="off">
            <Image
                src={formValues.image.value}
                alt="Publicidad"
                width="150"
                height="150"
            />
            <div>
                <p>
                    <strong>Foto de Publicidad</strong>
                </p>
                <Label
                    href="#"
                    className="btn btn-primary btn-sm"
                    title="Cargar foto de publicidad por defecto"
                    style={{ color: "white" }}
                    disabled={
                        formValues.statusName.value === "CONFIGURATED" ||
                        formValues.statusName.value === "INITIADED"
                    }        
                >
                    <i className="bi bi-upload"></i>
                    <Input
                        type="file"
                        hidden
                        onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                                const i = event.target.files[0];
                                if (i.type.includes("image/jpeg")) {
                                    saveImage(i);
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Cargando Imagen",
                                        text: "Ha ocurrido un error al cargar la imagen",
                                        showConfirmButton: true,
                                    });
                                }
                            }
                        }}
                    />
                </Label>

                <Label
                    href="#"
                    className="btn btn-danger btn-sm"
                    title="Eliminar foto de Publicidad"
                    style={{ color: "white" }}
                    disabled={
                        formValues.statusName.value === "CONFIGURATED" ||
                        formValues.statusName.value === "INITIADED"
                    }        
                    onClick={(e) => {
                        Swal.fire({
                            title: "¿ Desea eliminar esta foto de publicidad ?",
                            text: "! Esta opción no podrá ser revertida !",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Sí",
                            cancelButtonText: "No",
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            reverseButtons: true,
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                saveImage("");
                            }
                        });
                    }}
                >
                    <i className="bi bi-trash"/>
                </Label>
            </div>
        </Form>  
    )
}