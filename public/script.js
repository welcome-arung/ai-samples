document.getElementById('receiptForm').addEventListener('submit', async function(event) {
  console.log('Form submitted');
    event.preventDefault();
  
    const imageInput = document.getElementById('imageInput').files[0];
    const promptInput = document.getElementById('promptInput').value;
  
    if (!imageInput || !promptInput) {
      alert('Please provide both an image and a prompt.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', imageInput);
    formData.append('prompt', promptInput);
    const loader = document.getElementById('loader');
    const resultDiv = document.getElementById('result');
    
    loader.style.display = 'block'; // Show loader
    try {
      const response = await fetch('/process-receipt', {
        method: 'POST',
        body: formData
      });

    const result = await response.json();
    const resultDiv = document.getElementById('result');

    console.log('Tagging:', result.category);
    resultDiv.textContent = 'Tagging: ' + result.category;
    resultDiv.classList.add('alert', 'alert-success'); // Add Bootstrap classes for styling
  } catch (error) {
    console.error('Error processing receipt:', error);
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Error processing receipt';
    resultDiv.classList.add('alert', 'alert-danger'); // Add Bootstrap classes for styling
  } finally {
    loader.style.display = 'none'; // Hide loader
  }
  });