export default function ViewPlayer({ record, city }) {
  return (
    <div>
      <div className="row">
        <div className="col-lg-2 col-md-3 label">Nombre</div>
        <div className="col-lg-10 col-md-9">{record.name}</div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-3 label">Correo</div>
        <div className="col-lg-10 col-md-9">{record.email}</div>
      </div>

      {record.profile_type_name !== "EVENTADMON" && 

        <div className="row">
          <div className="col-lg-2 col-md-3 label">Nivel</div>
            {record.profile_type_name !== "REFEREE" ? (
              <div className="col-lg-10 col-md-9">
                {record.level === "rookie"
                  ? "Novato"
                  : record.level === "professional"
                  ? "Profesional"
                  : record.level === "expert"
                  ? "Experto"
                  : ""}
              </div>
            ) : (
              <div className="col-lg-10 col-md-9">
                {record.level === "regional"
                  ? "Regional"
                  : record.level === "national"
                  ? "Nacional"
                  : record.level === "international"
                  ? "Internacional"
                  : ""}
              </div>
            )}
        </div>
      }

      {(record.profile_type_name !== "REFEREE" && record.profile_type_name !== "EVENTADMON") && (
        <div className="row">
          <div className="col-lg-2 col-md-3 label">Coeficiente</div>
          <div className="col-lg-10 col-md-9">{record.elo}</div>
        </div>
      )}

      {(record.profile_type_name !== "REFEREE" && record.profile_type_name !== "EVENTADMON") && (
        <div className="row">
          <div className="col-lg-2 col-md-3 label">Ranking</div>
          <div className="col-lg-10 col-md-9">{record.ranking}</div>
        </div>
      )}

      {record.profile_type_name === "PAIR_PLAYER" && 
        <div className="row">
            <div className="col-lg-2 col-md-3 label">Pareja</div>
            <div className="col-lg-10 col-md-9">
              <a className="player-link">{record.lst_users.name}</a>
            </div>
        </div>
      }

      <div className="row">
        <div className="col-lg-2 col-md-3 label">Ciudad</div>
        <div className="col-lg-10 col-md-9">
          {city.map((row, i) => {
            if (row.id == record.city_id) {
              return row.name;
            }
          })}
        </div>
      </div>

      {record.profile_type_name !== "EVENTADMON" && 
        <div className="row">
          <div className="col-lg-2 col-md-3 label">Notificaciones</div>
          <div className="col-lg-10 col-md-9">
            {record.receive_notifications
              ? "Activado, Recibe notificaciones"
              : "Apagado, No recibe notificaciones."}
          </div>
        </div>
      }
    </div>
  );
}
