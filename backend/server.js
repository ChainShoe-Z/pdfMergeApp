const express = require('express');
const fileUpload = require('express-fileupload');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(fileUpload());
app.use(cors());

app.post('/api/merge', (req, res) => {
  console.log(req.files)
  if (!req.files || req.files.files.length < 2) {
    return res.status(400).json({ message: 'Please choose at least 2 pdf files' });
  }

  const mergedFilePath = 'merged.pdf';
  const files = req.files.files;
  // console.log('hi this is files')
  //console.log(files)

  // call python script to merge the pdf
  console.log("stop here")
  const pythonProcess = spawn('python', [
    'merge_pdfs.py',
    'merge_pdfs',
    mergedFilePath,
    ...files.map((file) => file.tempFilePath),
  ]);

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      console.log("success!")
      return res.json({ message: 'PDF merged successful！' });
    } else {
      console.log("fail!")
      return res.status(500).json({ message: 'Error happens when merging.' });
    }
  });
});

app.get("/myapi", (req, res) => {
  res.setHeader("Content-Type", "application/json")
  console.log("here is the data")
  res.json({"users": ["user1", "user2", "user3","user4"]})
})

app.listen(port, () => {
  console.log(`server runs on http://localhost:${port}`);
});
