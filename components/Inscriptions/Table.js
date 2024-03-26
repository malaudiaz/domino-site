import { Card, CardBody, Table } from "reactstrap";
import Image from "next/image";
import Link from "next/link";

export default function InscriptionsTable({ inscriptions, onDelete, mode }) {
  const InscriptionCard = () => {
    return inscriptions.map((item, idx) => (
      <Card key={idx} className="card-info">
        <CardBody>
          <div className="d-flex flex-row gap-4 pt-4">
              <Image
                alt={"Avatar Jugador"}
                src={item.photo ? item.photo : "/profile/user-vector.jpg"}
                width={50}
                height={50}
                quality={50}
                priority
                layout="intrinsic"
                className="rounded-circle"
              />

              <div className="d-flex flex-column gap-2 pt-2">
                <span>{item.name}</span>
                <strong>{item.was_pay ? "Inscripción Pagada" : "Pendiente de Pago"}</strong>
                <div className="d-flex flex-row justify-content-between">
                  <span>{item.payment_way}.</span>
                  <div className="d-flex flex-row gap-4">
                    <Link href={`/inscriptions/${item.id}/players/edit`}>
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
              </div>
            </div>
        </CardBody>
      </Card>
    ));
  };

  return (
    <>
      <div className="d-md-none">
        <div className="grid">
          <div className="container-events px-4">
            <InscriptionCard/>
          </div>
        </div>
      </div>

      <div className="d-none d-md-table text-gray-900 w-100 px-4">

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
                  ELO
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-weight-bold text-center"
                >
                  Club
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-weight-bold text-center"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-weight-bold text-center"
                >
                  Forma de Pago
                </th>
                <th
                  scope="col"
                  className="position-relative py-2 pl-6 pr-3 text-center"
                >
                  <span className="sr-only">Editar | Eliminar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {inscriptions.map((item, idx)=>(
                  <tr key={idx} className="align-middle">
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
                        {item.name}
                      </div>
                  </td>
                  <td scope="row" className="text-center">
                    {item.elo}
                  </td>
                  <td scope="row" className="text-left">
                    {item.club_name}
                  </td>
                  <td scope="row">
                    {item.was_pay ? "Pagado" : "Pendiente"}
                  </td>
                  <td scope="row" className="text-center">
                    {item.payment_way}
                  </td>
                  <td scope="row" className="text-center">
                    <div className="d-flex flex-row gap-3 justify-content-center">
                      <Link href={`/inscriptions/${item.id}/players/edit`}>
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
            </tbody>
          </Table>
        }

        {mode==="Grid" &&
          <div className="d-grid pt-3">
            <div className="container-events">
              <InscriptionCard/>
            </div>
          </div>
        }


      </div>
    </>
  );
}
