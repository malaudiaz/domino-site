import { IncomingForm } from "formidable";

var mv = require("mv");
var fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadFile(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, file) => {
      if (err) return reject(err);

      fs.existsSync("./public/events") || fs.mkdirSync("./public/events");
      let folder = `./public/events/${fields.user_id}`;
      fs.existsSync(folder) || fs.mkdirSync(folder);
      folder = `./public/events/${fields.user_id}/${fields.event_id}`;
      fs.existsSync(folder) || fs.mkdirSync(folder);

      if (JSON.stringify(file) !== "{}") {
        const oldPath = file.file.filepath;
        const originalFileName = file.file.originalFilename;
        const newPath = folder + `/${originalFileName}`;
        mv(oldPath, newPath, function (err) {});
      } else {
        fs.rmSync(folder, { recursive: true });
      }
      res.status(200).json({ fields, file });
    });
  });
}
