import {
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    ModalFooter,
    Button,
} from "reactstrap";

import Image from "next/image";  
import Swal from "sweetalert2";
import { useState } from "react";

export default function Upload({open, field, setOpen, formFields, setFormFields, title, image, setImage}) {
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const toggle = () => {
        setOpen(false);
    };

    const handleSubmit = () => {

        setFormFields({
            ...formFields,
            [field]: {
                ...formFields[field],
                value: image.name,
            }
        })
        setOpen(false);
    }
   
    return (
        <Modal
            id="register"
            isOpen={open}
            size="sm"
            backdrop={"static"}
            keyboard={true}
            centered={true}
        >
            <ModalHeader toggle={toggle}>
                <strong>{title}</strong>
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column gap-4">
                    <h5>{formFields.name.value}</h5>

                    {formFields.id.value==="" || formFields[field].value === "" ? (

                        !createObjectURL ? 
                            <div className="col-auto p-5 text-center rounded" style={{background: "#c7c7c7"}} >
                                <strong>Logotipo</strong>
                            </div> :
                            <Image
                                src={createObjectURL ? createObjectURL : formFields[field].value}
                                alt="Logotipo"
                                width={100}
                                height={200}
                                quality={50}
                                priority
                                layout="intrinsic"
                                className="rounded-circle"
                            />
                    ) : (
                        formFields[field].value ?
                        <Image
                            src={createObjectURL ? createObjectURL : formFields[field].value}
                            alt="Logotipo"
                            width={100}
                            height={200}
                            quality={50}
                            priority
                            layout="intrinsic"
                            className="rounded-circle"
                        /> :
                        <div className="col-auto p-5 text-center rounded" style={{background: "#c7c7c7"}} >
                            <strong>Logotipo</strong>
                        </div>
                    )}

                    <div className="d-flex flex-row gap-2 justify-content-center item-center">
                        <Label
                            href="#"
                            className="btn btn-primary btn-sm"
                            title="Subir"
                            style={{ color: "white" }}
                        >
                            <i className="bi bi-upload"></i>
                            <Input
                                type="file"
                                hidden
                                onChange={(event) => {
                                    if (event.target.files && event.target.files[0]) {
                                        const i = event.target.files[0];
                                        if (i.type.includes("image")) {
                                            setCreateObjectURL(URL.createObjectURL(i));
                                            setImage(i);
                                        } else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Subir Imagen",
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
                            title="Eliminar"
                            style={{ color: "white" }}
                            onClick={(e) => {
                                setCreateObjectURL(null);
                                setImage(null);
                                setFormFields({
                                    ...formFields,
                                    [field]: {
                                        ...formFields[field],
                                        value: "",
                                    }                        
                                })    
                            }}
                        >
                            <i className="bi bi-trash"></i>
                        </Label>

                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="d-flex flex-row gap-2 justify-content-center">
                <Button
                    color="primary"
                    size="sm"
                    title="Aceptar"
                    onClick={handleSubmit}
                >
                    <i className="bi bi-check"></i>&nbsp;
                    Aceptar
                </Button>

                <Button
                    color="secondary"
                    size="sm"
                    title="cancelar"
                    onClick={(e)=>{e.preventDefault(); setOpen(false)}}
                >
                    <i className="bi bi-x"></i>&nbsp;
                    Cancelar
                </Button>

            </ModalFooter>
        </Modal>  
    )
};
