import { IncomingForm } from "formidable";

var mv = require("mv");
var fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {   
      if (err) return reject(err);

      const folder = `./public/profile/${fields.id}`;

      fs.existsSync(folder) || fs.mkdirSync(folder);   

      if ( JSON.stringify(files) !== "{}" ) {
        const oldPath = files.file.filepath;
        const file = files.file.originalFilename;

        const newPath = `./public/profile/${fields.id}/${file}`;

        mv(oldPath, newPath, function (err) {});
      } else {
        fs.rmSync(folder, { recursive: true });        
      }
      res.status(200).json({ fields, files });
    });
  });
}
