const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();
const bookCtrl = require("../controllers/book");

router.post("/", auth, multer, bookCtrl.createBook);

router.put("/:id", auth, bookCtrl.modifyBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

router.get("/:id", bookCtrl.getOneBook);

router.get("/", bookCtrl.getAllBook);

module.exports = router;
