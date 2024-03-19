import { Card, CardBody, Table } from "reactstrap";
import Image from "next/image";
import Link from "next/link";

function UserCard({users}) {
    return (
        users.map((item, idx)=>(

            <Card key={idx} className="card-info">
              <CardBody>
                <div className="d-flex flex-row gap-2">
                  <Image
                    alt={"Avatar"}
                    src={item.photo ? item.photo : "/profile/user-vector.jpg"}
                    width={50}
                    height={50}
                    quality={50}
                    priority
                    layout="intrinsic"
                    className="rounded-circle"
                  />
                  <div className="d-flex flex-column gap-2 pt-2">
                    <span>{item.first_name + " " + item.last_name}</span>
                    <div className="d-flex flex-row gap-2">
                      <span>{item.username} |</span>
                      <span>{item.city_name} |</span>
                      <span>{item.country_name}</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row gap-2 justify-content-end">
                  <Link href={`/users/${item.id}/edit`}>
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
              </CardBody>
            </Card>

        ))
    )
}
  

export default function UsersTable({users, onDelete, mode}) {
  return (
    <>
      <div className="d-md-none">
        <div className="grid">
          <div className="container-events px-4">
            <UserCard users={users}/>
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
                className="position-relative py-2 pl-6 pr-3 text-center"
              >
                <span className="sr-only">Editar | Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((item, idx)=>(
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
                <td scope="row" className="text-center">
                  <div className="d-flex flex-row gap-3 justify-content-center">
                    <Link href={`/users/${item.id}/edit`}>
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
              <UserCard users={users}/>
            </div>
          </div>
       }
      </div>

    </>
  );
}
