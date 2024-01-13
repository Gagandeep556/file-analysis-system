const path = require("path");
const fs = require("fs");
const { FileInfo, Result, Task } = require("../model/index");

async function uploadFile(filename) {
  const fileInfo = await FileInfo.create({ fileName: filename });
  return fileInfo;
}

async function saveResult(fileId, operation, option) {
  let analysisResult;
  const numTopWords = option;

  const file = await FileInfo.findOne({ where: { id: fileId } });

  if (!file) {
    throw new Error("File not found");
  }

  const task = await Task.findOne({ where: { task: operation } });
  if (!task) {
    throw new Error("Task not found");
  }
  const uploadsDirectory = "uploads";
  const fileName = file.fileName;

  const filePath = path.join("./", uploadsDirectory, fileName);

  let fileContent = fs.readFileSync(filePath, "utf-8");
  let wordsArray = fileContent.replace(/\s+/g, " ").trim().split(" ");
  switch (operation) {
    case "countWords":
      analysisResult = wordsArray.length;
      break;

    case "countUniqueWords":
      // Create a Set to store unique words
      const uniqueWordsSet = new Set(wordsArray);

      // Count the number of unique words
      analysisResult = uniqueWordsSet.size;
      break;

    case "findTopKWords":
      // Create an object to store word frequencies
      const wordFrequencies = {};

      // Count the frequency of each word
      wordsArray.forEach((word) => {
        const normalizedWord = word.toLowerCase(); // Consider words in a case-insensitive manner
        wordFrequencies[normalizedWord] =
          (wordFrequencies[normalizedWord] || 0) + 1;
      });

      // Sort the word frequencies in descending order
      analysisResult = Object.entries(wordFrequencies)
        .sort((a, b) => b[1] - a[1])
        .slice(0, numTopWords);
      break;

    default:
      break;
  }

  const data = {
    fileId: file.id,
    taskId: task.id,
    result: analysisResult.toString(),
  };
  const result = await Result.create(data);
  return result;
}

async function getResult(taskId) {
  const result = await Result.findOne({
    where: { taskId },
    include: [
      {
        model: Task,
        attributes: ["task"], // Specify the attributes you want to retrieve from the associated User model
      },
    ],
  });

  return result;
}

module.exports = { uploadFile, saveResult, getResult };
