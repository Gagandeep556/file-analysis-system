const uploadService = require("../module/service");

async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileInfo = await uploadService.uploadFile(req.file.filename);

    res.json({
      message: "File uploaded successfully",
      fileInfo,
    });
  } catch (err) {
    res.json({ message: err });
  }
}

async function saveResult(req, res) {
  try {
    const result = await uploadService.saveResult(
      req.params.fileId,
      req.body.operation,
      req.body.option
    );
    res.json({
      message: "Task initiated successfully",
      result,
    });
  } catch (err) {
    res.json({
      message: err.message ? err.message : "Unable to initiate task",
    });
  }
}

async function getResult(req, res) {
  try {
    const operation = req.body.operation;
    if (!operation) {
      return res.status(400).json({ error: "Operation is required" });
    }
    const result = await uploadService.getResult(req.params.taskId);
    if (!result) {
      res.json({
        message: "Result not found",
      });
    }
    res.json({
      message: "Result fetched successfully",
      result,
    });
  } catch (err) {
    res.json({ message: "Unable to fetch result" });
  }
}

module.exports = { uploadFile, saveResult, getResult };
