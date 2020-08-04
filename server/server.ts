import express, { Express, Response, Request } from "express";
import { UploadedFile } from "express-fileupload";
const fileUpload = require("express-fileupload");

const app: Express = express();
const PORT: number = 5000;

app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req: Request, res: Response) => {
  if (req.files === null || req.files === undefined) {
    return res.status(400).json({ msg: "No file uploaded" });
  } else {
    const file = req.files.file as UploadedFile;
    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else {
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      }
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
