document.addEventListener('DOMContentLoaded', function () {
  var selectTema = document.getElementById('selectTema');
  var selectSubtema = document.getElementById('selectSubtema');
  var selectOpcion3 = document.getElementById('selectOpcion3');

  fetch('https://localhost:7124/api/Ficha')
      .then(response => response.json())
      .then(data => {
          var uniqueThemes = new Set();
          var uniqueSubthemes = new Set();
          var uniqueOpcion3 = new Set();

          data.forEach(item => {
              uniqueThemes.add(item.ind_tema);
              uniqueSubthemes.add(item.ind_subtema);
              uniqueOpcion3.add(item.folder_relativo);
          });

          // Agregar la opción por defecto al primer select
          var defaultOptionTema = document.createElement('option');
          defaultOptionTema.value = '';
          defaultOptionTema.textContent = 'Selecciona un tema';
          selectTema.appendChild(defaultOptionTema);

          // Llenar el primer select con temas únicos
          Array.from(uniqueThemes).forEach(theme => {
              var option = document.createElement('option');
              option.value = theme;
              option.textContent = theme;
              selectTema.appendChild(option);
          });

          // Agregar evento de cambio al primer select
          selectTema.addEventListener('change', function () {
              // Limpiar opciones anteriores
              selectSubtema.innerHTML = '<option value="">Selecciona un subtema</option>';
              selectOpcion3.innerHTML = '<option value="">Selecciona una opción 3</option>';

              // Filtrar subtemas basándonos en la selección del tema
              var selectedTheme = selectTema.value;
              var subtemas = data.filter(item => item.ind_tema === selectedTheme);

              // Obtener subtemas únicos
              var uniqueSubtemas = new Set(subtemas.map(item => item.ind_subtema));

              // Llenar el segundo select con subtemas únicos relacionados al tema seleccionado
              Array.from(uniqueSubtemas).forEach(subtema => {
                  var option = document.createElement('option');
                  option.value = subtema;
                  option.textContent = subtema;
                  selectSubtema.appendChild(option);
              });
          });

          // Agregar evento de cambio al segundo select
          selectSubtema.addEventListener('change', function () {
              // Limpiar opciones anteriores
              selectOpcion3.innerHTML = '<option value="">Selecciona una opción 3</option>';

              // Filtrar opciones 3 basándonos en la selección del tema y subtema
              var selectedTheme = selectTema.value;
              var selectedSubtema = selectSubtema.value;
              var opciones3 = data.filter(item => item.ind_tema === selectedTheme && item.ind_subtema === selectedSubtema);

              // Llenar el tercer select con opciones 3 relacionadas al tema y subtema seleccionados
              opciones3.forEach(opcion3 => {
                  var option = document.createElement('option');
                  option.value = opcion3.folder_relativo;
                  option.textContent = opcion3.folder_relativo;
                  selectOpcion3.appendChild(option);
              });
          });
      })
      .catch(error => console.error('Error al obtener datos:', error));
});
