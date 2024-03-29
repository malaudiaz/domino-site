import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function ChangeProfile({open, setOpen}) {
    const { profile, createProfile, lang, token } = useAppContext();
    const [items, setItems] = useState([]);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": lang,
            "Authorization": `Bearer ${token}`,
        }
    };
    
    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}profile/commun/${profile.id}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setItems(data.data);
          }
        } catch ({ code, message, name, request }) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Cambio de Pérfil",
                text: "Error en su red, consulte a su proveedor de servicio",
                icon: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              });
            } else {
              if (code === "ERR_BAD_REQUEST") {
                const { detail } = JSON.parse(request.response);
                Swal.fire({
                  title: "Cambio de Pérfil",
                  text: detail,
                  icon: "error",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                });
              }
            }
          }
        };
    
    useEffect(() => {
        if (Object.entries(profile).length > 0) {
          fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);
    
    const changeProfile = ({ profile_id, profile_name, name, photo }) => {
        createProfile(profile_id, name, photo, profile_name);
        setOpen(false);
    };

    return (
        <Modal
            id="change_profile"
            isOpen={open}
            size="sm"
            backdrop={"static"}
            keyboard={true}
            centered={true}
        >
            <ModalHeader
                toggle={(e) => {
                    setOpen(false);
                }}
            >
                <small>Cambiar de Pérfil</small>
            </ModalHeader>
            <ModalBody>

                {items.map((item) => (

                    <div 
                        className="card-info d-flex justify-content-between align-items-center mb-3 p-2" 
                        key={item.profile_id}
                        onClick={(e) => {
                            e.preventDefault();
                            changeProfile(item);
                        }}
                    >
                        <div className="d-flex flex-row icons align-items-center">
                            <Image
                                alt="Profile Avatar"
                                src={item.photo}
                                width={40}
                                height={40}
                                className="rounded-image"
                            />
                            <div
                                className="d-flex flex-column ms-2"
                            >
                                <span
                                    className="suggestions-players"
                                >
                                    {item.name}
                                </span>
                                <small className="comment-text muted-color fs-12">
                                    {item.profile_description}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
                
            </ModalBody>
        </Modal>
    )
}