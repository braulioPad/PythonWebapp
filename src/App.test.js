const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/detect-and-translate', (req, res) => {
  const inputText = req.body.inputText;
  // You can process the inputText as needed
  const transcription = `You entered: ${inputText}`;
  res.json({ transcription });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});