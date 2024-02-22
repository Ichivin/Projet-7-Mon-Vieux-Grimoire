const sharp = require("sharp");
const fs = require("fs");

const resizeImage = (req, res, next) => {
    const imageInput = req.file.path;
    const imageOutput = req.file.path.replace(/\.(jpg|jpeg|png|webp)$/, "converted.webp");

    sharp(imageInput)
        .resize({ width: 400, height: 600 })
        .webp({ quality: 100, lossless: true })
        .toFile(imageOutput, (error) => {
            if (error) {
                console.error("Erreur lors de la modification de l'image :", error);
                res.status(500).json({ error });
            } else {
                fs.unlinkSync(req.file.path);
                console.log(req.file.path);
                req.file.path = imageOutput;
                req.file.mimetype = "image/webp";
                req.file.filename = req.file.filename.replace(/\.(jpg|jpeg|png|webp)$/, "converted.webp");
                next();
            }
        });
};

module.exports = resizeImage;
