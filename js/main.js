const select = document.getElementById("eleccion");
let opcionSelect = select.value;

select.addEventListener("change", function () {
  opcionSelect = this.value;
  alert("Su categoria es " + opcionSelect);
});

const buscador = document.getElementById("buscador");

function verificarLetras(event) {
  const key = event.key;
  if (
    (event.keyCode >= 65 && event.keyCode <= 90) ||
    key === " " ||
    key === "Backspace"
  ) {
    return;
  }
  event.preventDefault();
}

buscador.addEventListener("keydown", verificarLetras);

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const valorLetras = document.getElementById("buscador").value.trim().toUpperCase();

  let dataJson = [];

  if (opcionSelect === "peliculas") {
    fetch('peliculas.json')
      .then((res) => res.json())
      .then((salida) => {
        dataJson = salida.data || []; 
        mostrarResultados(dataJson, valorLetras);
      });
  } else if (opcionSelect === "series") {
    fetch('series.json')
      .then((res) => res.json())
      .then((salida) => {
        dataJson = salida.data || [];
        mostrarResultados(dataJson, valorLetras);
      });
  }
});

function mostrarResultados(data, query) {
  const ul = document.querySelector("ul");
  ul.innerHTML = ""; 

  if (data.length === 0) {
    const noResultados = document.createElement("li");
    noResultados.textContent = "No se encontraron resultados";
    ul.appendChild(noResultados);
    return; 
  }

  
  const resultados = data.filter(item => item.nombre.toUpperCase().startsWith(query));

  if (resultados.length === 0) {
    const noResultados = document.createElement("li");
    noResultados.textContent = "No se encontraron resultados";
    ul.appendChild(noResultados);
  } else {

    resultados.forEach(item => {
      const li = document.createElement("li");
      const nombre = document.createElement("span");
      nombre.textContent = item.nombre;
      const sinopsis = document.createElement("p");
      sinopsis.textContent = item.sinopsis;


      sinopsis.style.display = "none";


      nombre.addEventListener("mouseover", () => {
        sinopsis.style.display = "block";
      });

      nombre.addEventListener("mouseout", () => {
        sinopsis.style.display = "none";
      });

      li.appendChild(nombre);
      li.appendChild(sinopsis);
      ul.appendChild(li);
    });
  }
}
