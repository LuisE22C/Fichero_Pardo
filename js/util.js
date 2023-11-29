function buscarPDF() {
  var nombrePDF = document.getElementById('selectOpcion3').value;
  var rutaPDF = 'Fichero_Pardo/' + nombrePDF + '.pdf'; // Ajusta la ruta según tu estructura de archivos

  // Verifica si el archivo existe
  fetch(rutaPDF)
    .then(response => {
      if (!response.ok) {
        throw new Error('El PDF no fue encontrado.');
      }
      return response.blob();
    })
    .then(blob => {
      // Muestra el PDF
      var pdfViewer = document.getElementById('pdfViewer');
      pdfViewer.innerHTML = '<embed src="' + URL.createObjectURL(blob) + '" type="application/pdf" width="100%" height="100%">';
    })
    .catch(error => {
      // Muestra un mensaje de error si el PDF no se encuentra
      var pdfViewer = document.getElementById('pdfViewer');
      pdfViewer.innerHTML = '<p>' + error.message + '</p>';
    });
}
