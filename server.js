const express = require('express');
const multer = require('multer');
const path = require('path');
const { processReceiptImage } = require('./processReceipt');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/process-receipt', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const prompt = req.body.prompt;
    const category = await processReceiptImage(imagePath, prompt);
    res.json({ category });
  } catch (error) {
    console.error('Error processing receipt:', error);
    res.status(500).json({ error: 'Error processing receipt' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});