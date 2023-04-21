import axios from "axios";
import languagesObject from "../../../languagesObject";

export default async function eventUpdate(req, res) {

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": "es-ES,es;",
    },
  };

  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    if (req.method === "PUT") {

        const { id } = req.query;
        const params = req.body;

        const url = `${process.env.API_URL}event/${id}`;

        const event = {
            "name": params.name,
            "summary": params.summary,
            "city_id": params.city,
            "main_location": params.campus,
            "start_date": params.startDate,
            "close_date": params.endDate,
            "image": params.image            
        }

        try {
          const {data} = await axios.put(url, event, config);
      
          if (data.success) {
            return res.status(data.status_code).json(data.detail);
          }     
        } catch (errors) {
            console.log(errors);

            if (errors.errno == -111) {
                return res.status(500).json({
                    success: false,
                    detail:
                    "No existe conexión con la API, consulte a su proveedor de servicios.",
                });
            } else {
                const { status, data } = errors.response;
                return res
                    .status(status)
                    .json({ success: false, detail: data.detail });
            }
        }

    } else {
      res.status(405).json({
        mensaje: `El método HTTP ${req.method} no esta disponible en esta ruta`,
      });
    }
  } else {
    res.status(401).json({
      mensaje: "Esquema de Autentificación erróneo",
    });
  }
}
