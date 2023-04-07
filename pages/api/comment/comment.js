import axios from "axios";
import languagesObject from "../../../languagesObject";

export default async function commentAnswer(req, res) {

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

    if (req.method === "POST") {
        const post = req.body;
        const url = `${process.env.API_URL}commentcomment`;
        try {
          const {status, data} = await axios.post(url, post, config);
      
          if (status === 200) {           
            return res.status(status).json(data);
          }     
        } catch (errors) {
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
