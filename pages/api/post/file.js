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
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      fs.existsSync("./public/post") || fs.mkdirSync("./public/post");
      const folder = `./public/post/${fields.id}`;
      fs.existsSync(folder) || fs.mkdirSync(folder);

      if (JSON.stringify(files) !== "{}") {
        Object.entries(files).forEach(([key, value]) => {
          const oldPath = value.filepath;
          const originalFileName = value.originalFilename;
          const newPath = `./public/post/${fields.id}/${originalFileName}`;
          mv(oldPath, newPath, function (err) {});
        });
      } else {
        fs.rmSync(folder, { recursive: true });
      }
      res.status(200).json({ fields, files });
    });
  });
}
