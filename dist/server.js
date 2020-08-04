"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileUpload = require("express-fileupload");
const app = express_1.default();
const PORT = 5000;
app.use(fileUpload());
// Upload Endpoint
app.post("/upload", (req, res) => {
    if (req.files === null || req.files === undefined) {
        return res.status(400).json({ msg: "No file uploaded" });
    }
    else {
        const file = req.files.file;
        file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            else {
                res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
            }
        });
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
