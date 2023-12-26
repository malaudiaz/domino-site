import { useState, useEffect } from "react";
import { Form, Table, Button } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import Bombo from "../Bombo";

export default function Category({ formValues }) {
  const { token, lang } = useAppContext();
  const [openNewBombo, setOpenNewBombo] = useState(false);
  const [bombo, setBombo] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [eloMax, setEloMax] = useState("");

  useEffect(() => {
    if (formValues.lst_categories.value !== "") {
        const lst = formValues.lst_categories.value;
        let arr = [];
        for (let i=0; i<lst.length; i++) {
            arr.push({id: i+1, title: lst[i].category_number, min: lst[i].elo_min, max: lst[i].elo_max});
        }
        setBombo(arr);
    }
    setRefresh(false);
}, [refresh, formValues.lst_categories.value]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (bombo.length > 0) {
        setEloMax((parseInt(bombo[bombo.length-1].min) - 1).toString());
    } else {
        setEloMax(formValues.eloMax.value.toString());
    }
    setOpenNewBombo(true);
  };

  const execAction = async () => {

    let paramsObj = [];

    for (let i=0; i<bombo.length; i++) {
        paramsObj.push({category_number: bombo[i].title, elo_min: bombo[i].min, elo_max: bombo[i].max});
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/categories/${formValues.tourneyId.value}`;

    try {
        const { data } = await axios.post(url, paramsObj, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": lang,
            "Authorization": `Bearer ${token}`                },
        });
        if (data.success) {
          // setReload(true);

          Swal.fire({
            icon: "success",
            title: "Configurando Torneo",
            text: data.detail,
            showConfirmButton: true,
          });
        }
      } catch (errors) {
        console.log(errors);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al consultar la API....",
          showConfirmButton: true,
        });
      }
  }

  const handleDelete = (e, item, idx) => {
    e.preventDefault();

    if ( formValues.statusName.value === "CONFIGURATED" || formValues.statusName.value === "INITIADED" ) {
      Swal.fire({
        icon: "info",
        title: "Eliminar Categoría",
        text: "El estado del torneo no permite eliminar una categoría",
        showConfirmButton: true,
      });
    } else {

      if (bombo.length-1 === idx) {

        Swal.fire({
          title: "¿ Eliminar Categoría ?",
          text: "Si continuas, la categoría será eliminada",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Eliminar",
        }).then((result) => {
          if (result.isConfirmed) {
            for (let i = 0; i < bombo.length; i++) {
              if (bombo[i].id === item.id) bombo.splice(i, 1);
            }
            setBombo(bombo);

            execAction();
        
            setRefresh(true);
          }
        });

      } else {
        Swal.fire({
          icon: "info",
          title: "Eliminar Categoría",
          text: "Esta categoría no puede ser eliminada",
          showConfirmButton: true,
        });  
      }

    };

  }

  return (
      <div className="container d-flex flex-column pt-4">
        <Form autoComplete="off">
            <div className="d-flex flex-row pb-2">
                <Button
                    size="sm"
                    color="primary"
                    title="Nueva Categoría"
                    onClick={handleAdd}
                    disabled={
                      formValues.statusName.value === "CONFIGURATED" ||
                      formValues.statusName.value === "INITIADED"
                  }      
                >
                    <i className="bi bi-plus"></i> Nueva Categoría
                </Button>
            </div>

            <Table responsive size="sm" hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>ELO Max.</th>
                        <th>ELO Min.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bombo.map((item, idx) => (
                        <tr key={idx}>
                            <td scope="row">{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.max}</td>
                            <td>{item.min}</td>
                            <td>
                                <a
                                  onClick={(e) => handleDelete(e, item, idx)}
                                  style={{ cursor: "pointer" }}
                                >
                                    <i
                                        className="bi bi-trash text-danger fs-6 cursor-pointer"
                                        title="Eliminar"
                                    />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Form>

        <Bombo 
            open={openNewBombo} 
            setClose={setOpenNewBombo} 
            bombo={bombo} 
            setBombo={setBombo}
            eloMax={eloMax}
            onSave={execAction}
        />

    </div>
  );
}
