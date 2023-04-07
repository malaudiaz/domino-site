import axios from "axios";
import languagesObject from "../../../languagesObject";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "accept-Language": "es-ES,es;",
  },
};

const getProfile = async (req, res) => {
  const { id } = req.query;
  let url = `${process.env.API_URL}profile/${id}`;

  try {
    const { data } = await axios.get(url, config);

    if (data.success) {
      return res.status(200).json(data);
    }
  } catch (errors) {
    if (errors.errno == -111) {
      return res
        .status(500)
        .json({
          success: false,
          detail:
            "No existe conexión con la API, consulte a su proveedor de servicios.",
        });
    } else {
      const { status, data } = errors.response;
      return res.status(status).json({ success: false, detail: data.detail });
    }
  }
};

const changePassword = async (req, res) => {
  const { id, currentpassword, newpassword, renewpassword } = req.body;
  const url = `${process.env.API_URL}users/password`;

  try {
    const { data } = await axios.post(
      url,
      {
        id: id,
        current_password: currentpassword,
        new_password: newpassword,
        renew_password: renewpassword,
      },
      config
    );

    if (data.success) {
      return res.status(200).json(data);
    }
  } catch (errors) {
    const { status, data } = errors.response;
    return res.status(status).json({ success: false, detail: data.detail });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.query;
  const user = req.body;
  const url = `${process.env.API_URL}users/${id}`;

  try {
    const { data } = await axios.put(url, user, config);

    if (data.success) {
      return res.status(200).json(data);
    }
  } catch (errors) {
    console.log(errors);
    const { status, data } = errors.response;
    return res.status(status).json({ success: false, detail: data.detail });
  }
};

export default async function profile(req, res) {
  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    switch (req.method) {
      case "GET":
        return getProfile(req, res);
        break;
      case "POST":
        return changePassword(req, res);
        break;
      case "PUT":
        return updateProfile(req, res);
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
