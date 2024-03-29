
import { useState, useEffect } from "react";
import {useAppContext} from "../../AppContext";
import axios from "axios";
import Swal from 'sweetalert2'
import Image from "next/image";
import Pagination from "../Pagination/Pagination";
import Search from "../Search";

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardBody,
    Table,
    Button
} from "reactstrap";

export default function FindForm({isOpen, setClose, field, formFields, setFormFields}) {

    const {profile, lang, token} = useAppContext();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [searchField, setSearchField] = useState("");
    const [reload, setReload] = useState(true);
    const [mode, setMode] = useState("Table");
    const [users, setUsers] = useState([]);
    const [record, setRecord] = useState(null);
    const rowsPerPage = 8;

    const UserCard = ({users}) => {
        return (
            users.map((item, idx)=>(
    
                <Card key={idx} className="row-hover" onClick={(e)=>{onSelectUser(e, idx)}}>
                  <CardBody>
                    <div className="d-flex flex-row gap-4 pt-4">
                      <Image
                        alt={"Avatar"}
                        src={item.photo ? item.photo : "/profile/user-vector.jpg"}
                        width={100}
                        height={100}
                        quality={50}
                        priority
                        layout="intrinsic"
                        className="rounded-circle"
                      />
                      <div className="d-flex flex-column gap-2 pt-2">
                        <span>{item.username}</span>
                        <span>{item.city_name}</span>
                        <span>{item.country_name}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end" style={{fontSize: "18px", color: "green"}}>
                        {record && item.id === record.id && <i className="bi bi-check2-circle"/>}
                    </div>
                  </CardBody>
                </Card>
    
            ))
        )
    }
        

    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        }
    };

    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}users?page=${page}&per_page=${rowsPerPage}`;
    
        if (searchField!=="") {
          url = url + `&search=${searchField}`;
        }
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setTotal(data.total);
            setTotalPages(data.total_pages);
            setUsers(data.data);
            setReload(false);
          }
        } catch ({code, message, name, request}) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Cargando Usuarios",
              text: "Error en su red, consulte a su proveedor de servicio",
              icon: "error",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
          } else {
            if (code === "ERR_BAD_REQUEST") {
              const {detail} = JSON.parse(request.response)
              Swal.fire({
                title: "Cargando Usuarios",
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
        if (reload && profile.id) {
          fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchField, reload, profile.id]);


    const onClose = () => {
        setClose(false);
    };

    const handleSearch = (value) => {
        setSearchField(value);
        setReload(true);
    };
    
    const handleMode = () => {
        setMode(mode==="Table" ? "Grid" : "Table");
    }

    const onChangePage = (pageNumber) => {
        setPage(pageNumber);
        setReload(true);
    };    

    const onSelectUser = (e, idx) => {
        e.preventDefault();
        if (!record) {
            setRecord(users[idx]);
        } else {
            if (record.id === users[idx].id) {
                setRecord(null);
            } else {
                setRecord(users[idx]);
            }
        }
    }

    const onAccept = (e) => {
        e.preventDefault();
        
        setFormFields({
            ...formFields,
            [field]: {
                ...formFields[field],
                value: record.username
            }
        })

        setRecord(null);
        setTotalPages(0);
        setTotal(0);
        setClose(false);       
    }    
    
    return (
        <Modal 
            id={"findUsers"} 
            isOpen={isOpen}
            backdrop={'static'}
            keyboard={true}
            centered={true}
            size="lg"
        >
            <ModalHeader toggle={onClose}>Buscar Usuario</ModalHeader>
            <ModalBody>

                <div
                    className="d-flex flex-column gap-2 justify-content-center align-center pt-2 px-4 pb-4"
                >

                    <div className="d-flex flex-row flex-wrap justify-content-between align-center pb-2">
                        <Search field={searchField} setField={handleSearch} />

                        <div className="d-none d-md-table d-flex flex-row gap-3 mx-4">
                            {mode==="Table" ? 
                                (
                                    <a title="Postal" onClick={handleMode} style={{fontSize: "18px", cursor: "pointer"}}>
                                        <i className="bi bi-grid"></i>
                                    </a>
                                ) : 
                                (
                                    <a title="Tabla" onClick={handleMode} style={{fontSize: "18px", cursor: "pointer"}}>
                                        <i className="bi bi-table"></i>
                                    </a>
                                )
                            }
                        </div>
                    </div>

                    <div className="d-md-none">
                        <div className="grid">
                            <div className="container-user px-4">
                                {users.length > 0 ? <UserCard users={users}/> : <div className="d-flex flex-row justify-content-center py-4">
                                    <strong>No existen usuarios, registrados</strong>    
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="d-none d-md-table text-gray-900 w-100 pb-4">
                        {mode==="Table" ? (
                            users.length > 0 ? 
                            <Table bordered hover responsive size="sm" striped>
                                <thead className="rounded-lg text-left text-sm font-normal">
                                    <tr style={{height: "40px"}}>
                                        <th colSpan={6} className="text-center align-middle">Listado de Usuarios</th>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-2 font-weight-bold pl-sm-6 text-center"
                                        >
                                            Usuario
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-2 font-weight-bold text-center"
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-2 font-weight-bold text-center"
                                        >
                                            Apellidos
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-2 font-weight-bold text-center"
                                        >
                                            Ciudad
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-2 font-weight-bold text-center"
                                        >
                                            País
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-2 font-weight-bold text-center"
                                        >
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {users.map((item, idx)=>(
                                        <tr key={idx} className="align-middle row-hover" onClick={(e)=>{onSelectUser(e, idx)}}>
                                            <td scope="row" className="whitespace-nowrap py-2">
                                                <div className="d-flex align-items-center gap-4">
                                                    <Image
                                                        alt={"Avatar"}
                                                        src={item.photo ? item.photo : "/profile/user-vector.jpg"}
                                                        width={28}
                                                        height={28}
                                                        quality={50}
                                                        priority
                                                        layout="intrinsic"
                                                        className="rounded-circle"
                                                    />
                                                    {item.username}
                                                </div>
                                            </td>
                                            <td scope="row" className="text-center">
                                                {item.first_name}
                                            </td>
                                            <td scope="row" className="text-center">
                                                {item.last_name}
                                            </td>
                                            <td scope="row" className="text-center">
                                                {item.city_name}
                                            </td>
                                            <td scope="row" className="text-center">
                                                {item.country_name}
                                            </td>
                                            <td scope="row" className="text-center" style={{fontSize: "18px", color: "green"}}>
                                                {record && item.id === record.id && <i className="bi bi-check2-circle"/>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> : <div className="d-flex flex-row justify-content-center py-4"><strong>No existen usuarios, registrados {mode}</strong></div>) :
                            (
                                <div className="d-grid pt-3">
                                    <div className="container-user">
                                        {users.length > 0 ? <UserCard users={users}/> : <div className="d-flex flex-row justify-content-center py-4">
                                            <strong>No existen usuarios, registrados</strong>    
                                        </div>}
                                    </div>
                                </div>

                            )}
                    </div>

                    {totalPages > 1 && (
                        <div className="row">
                            <Pagination
                                onChangePage={onChangePage}
                                currentPage={page}
                                totalPage={totalPages}
                                totalCount={total}
                                rowsPerPage={rowsPerPage}
                                siblingCount={1}
                                showInfo={false}
                            />
                        </div>
                    )}
                </div>

            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    color="primary"
                    data-toggle="tooltip"
                    onClick={(e)=>{onAccept(e)}}
                    title="Aceptar"
                >
                    <i className="bi bi-check2-circle"></i> Aceptar
                </Button>          
                <Button
                    type="button"
                    color="secondary"
                    data-toggle="tooltip"
                    onClick={(e)=>{e.preventDefault(); onClose();}}
                    title="Cerrar"
                >
                    <i className="bi bi-x-circle"></i> Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    );
};
