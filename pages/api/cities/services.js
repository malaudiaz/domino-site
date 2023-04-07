import axios from "axios";
import languagesObject from "../../../languagesObject";

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "accept-Language": "es-ES,es;",
  },
};

const getAll = async (req, res) => {
  const { page, per_page, criteria_key, criteria_value } = req.query;
  let url = `${process.env.API_URL}city?page=${page}&per_page=${per_page}`;
  if (criteria_key && criteria_value) {
    url =
      url + `&criteria_key=${criteria_key}&criteria_value=${criteria_value}`;
  }
  try {
    const { data } = await axios.get(url, config);
    if (data.success) {
      return res.status(200).json(data);
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

export default async function cities(req, res) {
  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    switch (req.method) {
      case "GET":
        return getAll(req, res);
        break;
      case "POST":
        break;
      case "PUT":
        break;
      default:
        res.status(405).json({
          mensaje: `El método HTTP ${req.method} no esta disponible en esta ruta`,
        });
        break;
    }
  } else {
    res.status(401).json({
      mensaje: "Esquema de Autentificación erróneo",
    });
  }
}
