import { Card, CardBody, Table } from "reactstrap";
import Image from "next/image";
import Link from "next/link";

export default function PlayersTable({players, onDelete, mode}) {

  const PlayerCard = () => {
    return (
      players.map((item, idx)=>(
        <Card key={idx} className="card-info">
          <CardBody>
            <div className="d-flex flex-row gap-4 pt-4">
              <Image
                alt={"Avatar del Jugador"}
                src="/profile/user-vector.jpg"
                width={50}
                height={50}
                quality={50}
                priority
                layout="intrinsic"
                className="rounded-circle"
              />
              <div className="d-flex flex-column gap-2 pt-2">
                <span>{item.name}</span>
                <span>{item.club_name}</span>
                <div className="d-flex flex-row gap-2">
                  <span>{item.city_name}.</span>
                  <span>{item.country}</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row gap-2 justify-content-between align-items-center">
              <div className="d-flex flex-row gap-4">
                <strong>ELO: {item.elo}</strong>
                <strong>Nivel: {item.level}</strong>
              </div>
              <div className="d-flex flex-row gap-4">
                <Link href={`/players/${item.id}/edit`}>
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
    );
  }

  return (
    <>
      <div className="d-md-none">
        <div className="grid">
          <div className="container-events px-4">
            <PlayerCard/>
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
                  Nivel
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
                  className="position-relative py-2 pl-6 pr-3 text-center"
                >
                  <span className="sr-only">Editar | Eliminar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {players.map((item, idx)=>(
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
                  <td scope="row" className="text-center">
                    {item.level}
                  </td>
                  <td scope="row" className="text-left">
                    {item.club_name}
                  </td>
                  <td scope="row" className="text-center">
                    {item.city_name}
                  </td>
                  <td scope="row" className="text-center">
                    {item.country}
                  </td>
                  <td scope="row" className="text-center">
                    <div className="d-flex flex-row gap-3 justify-content-center">
                      <Link href={`/players/${item.profile_id}/edit`}>
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
                          onDelete(item.profile_id);
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
              <PlayerCard/>
            </div>
          </div>
        }


      </div>

    </>
  );
}
