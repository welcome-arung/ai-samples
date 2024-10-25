const Tesseract = require('tesseract.js');
const { Ollama } = require('ollama');
const fs = require('fs').promises;

// Initialize the Ollama client
const ollamaClient = new Ollama({ host: 'http://127.0.0.1:11434' });

// Function to perform OCR on the image
async function extractTextFromImage(imagePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
      logger: m => console.log(m)
    });
    return text;
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
}

// Function to categorize extracted text using LLaVA 7B
async function categorizeText(prompt, text) {
  try {
    const message = {
      role: 'user',
      content: `${prompt}.\n\nText: ${text}`
    };
    const response = await ollamaClient.chat({
      model: 'llava:13b',
      messages: [message]
    });
    console.log('Response:', response);
      return response.message.content;

  } catch (error) {
    console.error('Error categorizing text:', error);
    throw error;
  }
}

// Main function to process receipt image
async function processReceiptImage(imagePath,prompt) {
    console.log('Processing receipt image:', imagePath);
  try {
    const extractedText = await extractTextFromImage(imagePath);
    console.log('Extracted Text:', extractedText);

    const category = await categorizeText(prompt,extractedText);
    console.log('Category:', category);
    return category;
  } catch (error) {
    console.error('Error processing receipt image:', error);
  }
}
module.exports = { processReceiptImage };
// Path to the receipt image
// const receiptImagePath = '/Users/arun-rabo/Desktop/grocery2.jpg';
// processReceiptImage(receiptImagePath);
