import { Card, CardBody, Table } from "reactstrap";
import Image from "next/image";
import Link from "next/link";

export default function TournamentTable({tournaments, onDelete, mode}) {

  const TournamentCard = () => {
    return (
      tournaments.map((item, idx)=>(
        <Card key={idx} className="card-info">
          <CardBody>
            <div className="d-flex flex-row gap-4">
              <Image
                alt={"Poster de Publicidad"}
                src={item.image ? item.image : "/profile/user-vector.jpg"}
                width={100}
                height={100}
                quality={50}
                priority
                layout="intrinsic"
                className="rounded-circle"
              />
              <div className="d-flex flex-column gap-2 pt-2">
                <strong>{item.name}</strong>
                <div className="d-flex flex-row gap-2">
                  <span>Modalidad: <strong>{item.modality}</strong></span>
                </div>
                <div className="d-flex flex-row gap-2">
                  <span>{item.main_location}.</span>
                  <span>{item.city_name}</span>
                </div>                      
              </div>
            </div>
            <div className="d-flex flex-row gap-4 justify-content-between pt-2 align-item-center">
              <strong>Precio Inscripción: {Number(Math.round(item.inscription_import + 'e' + 2) + 'e-' + 2).toFixed(2)}</strong>
              <div className="d-flex flex-row gap-2 justify-content-end">
                <Link href={`/tournaments/${item.id}/edit`}>
                  <a className="edit" title="Editar">
                    <i
                      className="bi bi-pencil-square"
                      style={{ fontSize: "18px" }}
                    ></i>
                  </a>
                </Link>
                <a
                  className="delete"
                  title="Eliminar"
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(item.id);
                  }}
                >
                  <i className="bi bi-trash" style={{ fontSize: "18px" }}></i>
                </a>
              </div>
            </div>
          </CardBody>
        </Card>
      ))
    )
  };
  
  return (
    <>
      <div className="d-md-none">
        <div className="grid">

          
          {tournaments.length > 0 ? (<div className="container-events px-4">

            <TournamentCard />

          </div>) : (<div className="container-events px-4">
            <Card  className="card-info">
                <CardBody className="d-flex flex-column justify-content-center">
                  <strong>No existen Torneos definidos</strong>
                </CardBody>
            </Card>
          </div>)}

        </div>
      </div>

      <div className="d-none d-md-table text-gray-900 w-100 px-4 py-2">
        {mode==="Table" && 
          <Table bordered hover responsive size="sm" striped>
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 font-weight-bold pl-sm-6 text-center"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-weight-bold text-center"
              >
                Modalidad
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-weight-bold text-center"
              >
                Fecha
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
                Ubicación
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-weight-bold text-center"
              >
                Rondas
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-weight-bold text-center"
              >
                Precio
              </th>
              <th
                scope="col"
                className="position-relative py-2 pl-6 pr-3 text-center"
              >
                <span className="sr-only">Editar | Eliminar</span>
              </th>
            </tr>
          </thead>
          {tournaments.length > 0 ? (
            <tbody className="bg-white">          
              {tournaments.map((item, idx)=>(
                <tr key={idx} className="align-middle">
                  <td scope="row" className="text-left">
                    {item.name}
                  </td>
                  <td scope="row" className="text-center">
                    {item.modality}
                  </td>
                  <td scope="row" className="text-center">
                    {item.startDate}
                  </td>
                  <td scope="row" className="text-center">
                    {item.city_name}
                  </td>
                  <td scope="row" className="text-center">
                    {item.main_location}
                  </td>
                  <td scope="row" className="text-center">
                    {item.number_rounds}
                  </td>
                  <td scope="row" className="text-center">
                    {Number(Math.round(item.inscription_import + 'e' + 2) + 'e-' + 2).toFixed(2)}
                  </td>
                  <td scope="row" className="text-center">
                    <div className="d-flex flex-row gap-3 justify-content-center">
                      <Link href={`/tournaments/${item.id}/edit`}>
                        <a className="edit" title="Editar">
                          <i
                            className="bi bi-pencil-square"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </a>
                      </Link>

                      <a
                        className="delete"
                        title="Eliminar"
                        onClick={(e) => {
                          e.preventDefault();
                          onDelete(item.id);
                        }}
                      >
                        <i className="bi bi-trash" style={{ fontSize: "18px" }}></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>) : (
            <tbody className="bg-white">
              <tr className="align-middle">
                <td scope="row" colSpan={8} className="text-center">
                  <strong>No existen Torneos definidos</strong>
                </td>
              </tr>
            </tbody>              
          )}
          </Table>
        }
        {mode==="Grid" &&
          <div className="d-grid pt-3">
            <div className="container-events">
              <TournamentCard />
            </div>
          </div>
        }
      </div>
    </>
  );
}
