
import { useState, useEffect } from "react";
import {useAppContext} from "../../AppContext";
import axios from "axios";
import Swal from 'sweetalert2'
import Image from "next/image";
import Pagination from "../Pagination/Pagination";

import {
    InputGroup,
    InputGroupText,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Col,
    Button
} from "reactstrap";

export default function FindForm({isOpen, setClose, setPlayer, changePlayer, profileType}) {

    const {profile, lang, token} = useAppContext();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [records, setRecords] = useState([]);
    const [record, setRecord] = useState(null);
    const [mark, setMark] = useState(false);
    const [isFind, setIsFind] = useState(false);
    const rowsPerPage = 8;

    const [filter, setFilter] = useState({
        criteria_key: "name",
        criteria_value: "",
    });
    
    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        }
      };
    
      const findPlayer = async () => {
        if (filter.criteria_value != "") {
          const path = profileType !== "EVENTADMON" ? "profile/single/?profile_id=" : "profile/default/?profile_id="  
          const url = process.env.NEXT_PUBLIC_API_URL + path + profile.id + "&page=" + page + "&per_page=" + rowsPerPage + "&criteria_key=" + filter.criteria_key + "&criteria_value=" + filter.criteria_value;
    
          try {
            const { data } = await axios.get(url, config);
            if (data.success) {
              setTotal(data.total);
              setTotalPages(data.total_pages);   
              setRecords(data.data);
              setIsFind(true);
            }
          } catch (errors) {
            console.log(errors);
            const { response } = errors;
            const { detail } = response.data;
            Swal.fire({
              title: "Buscar jugador",
              text: detail,
              icon: "error",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
          }
        }
      };
    
      useEffect(()=>{
        findPlayer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[page, filter.criteria_value]);
    

    const onCloseFinder = () => {
        setFilter({
            ...filter,
            criteria_value: "",
        });
        setIsFind(false);
        setMark(false);
        setRecord(null);
        setRecords([]);
        setTotalPages(0);
        setTotal(0);
        setClose(false);
    };

    const handleChange = (event) => {
        const { target } = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
    
        setFilter({
          ...filter,
          [name]: value,
        });
    };

    const onFind = (e) => {
        e.preventDefault();
        
        if (!isFind) {
          findPlayer();
        } else {
          setFilter({
            ...filter,
            criteria_value: "",
          });
          setIsFind(false);
          setMark(false);
          setRecord(null);
          setRecords([]);
          setTotalPages(0);
          setTotal(0);
        }
    };

    const onSelectPlayer = (e, idx) => {
        e.preventDefault();

        if (!mark) {
            mark = true;
        } else {
            mark = false;
        }

        setMark(mark);

        if (mark) {
            record = records[idx];
        } else {record = null}

        setRecord(record);
    }
    
    const onChangePage = (pageNumber) => {
        setPage(pageNumber);
        fetchData();
    };

    const onAcceptFinder = (e) => {
        e.preventDefault();
        
        if (setPlayer) {
            setPlayer(record.name);
        } 
        changePlayer(record);

        setFilter({
            ...filter,
            criteria_value: "",
        });

        setIsFind(false);
        setMark(false);
        setRecord(null);
        setRecords([]);
        setTotalPages(0);
        setTotal(0);
        setClose(false);
        
    }    
    
    return (
        <Modal 
            id={"findPlayer"} 
            isOpen={isOpen}
            backdrop={'static'}
            keyboard={true}
            centered={true}
            size="lg"
        >
            <ModalHeader toggle={onCloseFinder}>Buscar Jugador</ModalHeader>
            <ModalBody>
                <FormGroup row>
                    <Label size="sm" sm={1}>
                        Buscar
                    </Label>
                    <Col sm={11}>
                    <InputGroup size="sm">
                        <Input
                        id="criteria_value"
                        name="criteria_value"
                        type="text"
                        placeholder="Nombre del jugador"
                        autoComplete="off"
                        value={filter.criteria_value}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        />
                        <InputGroupText>
                            <a
                                style={{ cursor: "pointer" }}
                                onClick={(e) => onFind(e)}
                                data-toggle="tooltip"
                                title={!isFind ? "Buscar" : "Limpiar"}
                            >
                                <i className={!isFind ? "bi bi-search" : "bi bi-x"}></i>
                            </a>
                        </InputGroupText>
                    </InputGroup>
                    </Col>
                </FormGroup>

                {isFind && records.length == 0 && <p className="">No existen jugadores para mostrar</p>}

                {records.length > 0 && <h6>Jugadores</h6>}

                {records.length > 0 && 
                    <div className="row container-players p-2">
            
                    {records.map((item, idx)=>(
                        <div key={idx} className="d-flex align-items-center rounded mb-3 p-2 hover-effect" onClick={(e)=>{onSelectPlayer(e, idx)}}>
                            <div className="d-flex flex-row justify-content-between icons align-items-center" style={{width: "98%"}}>
                                <Image
                                    alt=""
                                    src={item.photo}
                                    width={40}
                                    height={40}
                                    className="rounded-image"
                                />
                                <div className="d-flex flex-column flex-fill ms-2">
                                    <span className="gamer-couple">{item.name}</span>
                                    <small className="comment-text fs-12">{item.city_name}</small>
                                </div>
                                <div className="ps-4">
                                    {(mark && item.profile_id===record.profile_id) && <i className="bi bi-check2-circle"></i>}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                }

                {records.length > 0 && 
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
                }

            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    color="primary"
                    disabled={!mark}
                    data-toggle="tooltip"
                    onClick={(e)=>{onAcceptFinder(e)}}
                    title="Aceptar"
                >
                    <i className="bi bi-check2-circle"></i> Aceptar
                </Button>          
                <Button
                    type="button"
                    onClick={onCloseFinder}
                    color="secondary"
                    data-toggle="tooltip"
                    title="Cerrar"
                >
                    <i className="bi bi-x-circle"></i> Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    );
};
