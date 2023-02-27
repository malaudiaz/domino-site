import axios from "axios";
import languagesObject from "../../../languagesObject";

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "accept-Language": "es-ES,es;",
  },
};

const getUsers = async (req, res) => {
  const { page, per_page, criteria_key, criteria_value } = req.query;
  let url = `${process.env.API_URL}users?page=${page}&per_page=${per_page}`;
  if (criteria_key && criteria_value) {
    url =
      url + `&criteria_key=${criteria_key}&criteria_value=${criteria_value}`;
  }
  try {
    const response = await axios.get(url, config);
    if (response.status == 200) {
      return res.status(200).json({
        result: response.data,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  const url = `${process.env.API_URL}register`;
  try {
    const {status, data} = await axios.post(url, user, config);

    if (status === 200) {
      return res.status(status).json(data);
    }
  } catch (errors) {
    const {status, data} = errors.response
    return res
      .status(status)
      .json({ success: false, detail: data.detail });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.query;
  const user = req.body;
  const url = `${process.env.API_URL}users/${id}`;

  try {
    const response = await axios.put(url, user, config);
    if (response.status == 200) {
      return res.status(200).json({
        message: response.statusText,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  const url = `${process.env.API_URL}users/${id}`;
  try {
    const response = await axios.delete(url, config);
    if (response.status == 200) {
      return res.status(200).json({
        message: response.statusText,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

export default async function usermgr(req, res) {
  const locale = req.headers["accept-language"].split(",")[0].split("-")[0];
  const t = languagesObject[locale].services;

  if (req.headers["authorization"] || req.method === "POST") {
    if (req.headers["authorization"]) {
      config.headers["Authorization"] = req.headers["authorization"];
    }

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    switch (req.method) {
      case "GET":
        return getUsers(req, res);
        break;
      case "POST":
        return createUser(req, res);
        break;
      case "PUT":
        return updateUser(req, res);
        break;
      case "DELETE":
        return deleteUser(req, res);
        break;
      default:
        res.status(405).json({
          mensaje: `El método HTTP ${req.method} no esta disponible en esta ruta`,
        });
        break;
    }
  } else {
    res.status(401).json({
      mensaje: t.badScheema,
    });
  }
}
