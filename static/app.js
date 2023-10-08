const originURL = "http://127.0.0.1:8080/"; // Remplacez par l'URL de votre serveur Node.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const resultDiv = document.getElementById('result');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const urlInput = document.getElementById('url');
      const url = urlInput.value;
  
      try {
        const response = await fetch(`${originURL}api-v2/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la création du lien');
        }
  
        const data = await response.json();
  
        // Affiche le lien raccourci
        resultDiv.innerHTML = `
          <p>Lien raccourci : <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>
          <button id="copy-button">Copier l'URL</button>
        `;
  
        // Gère le clic sur le bouton Copier l'URL
        const copyButton = document.getElementById('copy-button');
        copyButton.addEventListener('click', () => {
          const textArea = document.createElement('textarea');
          textArea.value = data.shortUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('URL copiée dans le presse-papier');
        });
      } catch (error) {
        console.error(error);
        resultDiv.innerHTML = 'Erreur lors de la création du lien';
      }
    });
  });
  