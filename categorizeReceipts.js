
const axios = require('axios');
const { HfInference } = require('@huggingface/inference');
const Tesseract = require('tesseract.js');

const HF_API_KEY = 'your_hugging_face_api_key';
const inference = new HfInference(HF_API_KEY);

// Function to perform OCR on the image
async function extractTextFromImage(imagePath) {
  const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
    logger: m => console.log(m)
  });
  return text;
}

// Function to categorize extracted text
async function categorizeText(text) {
  const response = await inference.textClassification({
    model: 'facebook/bart-large-mnli',
    inputs: text,
    parameters: { candidate_labels: [] }
  });
  return response[0].label;
}

// Main function to process receipt image
async function processReceiptImage(imagePath) {
  const extractedText = await extractTextFromImage(imagePath);
  console.log('Extracted Text:', extractedText);

  const category = await categorizeText(extractedText);
  console.log('Category:', category);
}

// Path to the receipt image
const receiptImagePath = '/Users/arun-rabo/Desktop/ArunTest.png';
processReceiptImage(receiptImagePath);

/Users/arun-rabo/Desktop/grocery1.jpg