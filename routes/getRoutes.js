const express = require("express");
const router = express.Router();
const upload = require("../helper/upload");
const uploadController = require("../module/controller");

router.post("/upload", upload.single("filename"), uploadController.uploadFile);
router.post("/task/:fileId", uploadController.saveResult);
router.get("/result/:taskId", uploadController.getResult);

module.exports = router;
