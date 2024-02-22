const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();
const bookCtrl = require("../controllers/book");
const resizeImage = require("../middleware/sharp");

router.post("/", auth, multer, resizeImage, bookCtrl.createBook);

router.put("/:id", auth, multer, resizeImage, bookCtrl.modifyBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

router.get("/bestrating", bookCtrl.getBestrating);

router.get("/:id", bookCtrl.getOneBook);

router.get("/", bookCtrl.getAllBook);

router.post("/:id/rating", auth, bookCtrl.createRating);

module.exports = router;
