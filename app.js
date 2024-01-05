const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", obtainData);
  //ciudadInput.addEventListener("input", validarInputs);
});

function obtainData(e) {
  const ciudadInput = document.querySelector("#ciudad").value;
  const paisInput = document.querySelector("#pais").value;
  e.preventDefault();
  console.log("buscando clima");
  //Validar formulario
  if (ciudadInput === "" || paisInput === "") {
    mostrarAlerta("Campo vacio, intenta de nuevo");
    return;
  }
  consultarAPI(ciudadInput, paisInput);

  //Consultar API
  //   let url = "";
  //   fetch();
}

function consultarAPI(ciudad, pais) {
  //Agregar ID
  const APIkey = "f1eaf1dac80df2c9ce8456fa6c624c60";
  //Usar template string para la url y pasar los parametros
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIkey}`;
  console.log(url);
  spinner();
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data;
      if (data.cod === "404") {
        mostrarAlerta("Ciudad no corresponde al país");
      } else {
        showData(data);
      }
    });
  formulario.reset();
}

function showData(datos) {
  limpiarHTML();
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;
  //Guardar en variable el cambio de temperaturas
  //Usando la funcion kelvinACentigrados
  const temperatura = kelvinACentigrados(temp);
  const temperaturaMax = kelvinACentigrados(temp_max);
  const temperaturaMin = kelvinACentigrados(temp_min);

  //Imprimir las temperaturas y el nombre
  const nombre = document.createElement("P");
  nombre.classList.add("font-bold", "text-6xl");
  nombre.innerHTML = `${name}`;

  const tempActual = document.createElement("P");
  tempActual.classList.add("text-6xl");
  tempActual.innerHTML = `Actual: ${temperatura} &#8451`; //EL &#8451 le da el formato de ºC

  const tempMax = document.createElement("P");
  tempMax.classList.add("text-xl");
  tempMax.innerHTML = `Maxima:${temperaturaMax} &#8451`; //EL &#8451 le da el formato de ºC

  const tempMin = document.createElement("P");
  tempMin.classList.add("text-xl");
  tempMin.innerHTML = `Minima: ${temperaturaMin} &#8451`;

  const resultadoDiv = document.createElement("DIV");
  resultadoDiv.classList.add("text-white", "text-center");
  resultadoDiv.appendChild(nombre);
  resultadoDiv.appendChild(tempActual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  resultado.appendChild(resultadoDiv);
}
//Funcion para cambiar los grados kelvin a centrigrados.
//ParseInt para devolver la cantidad entera sin tanto decimal
const kelvinACentigrados = (grados) => parseInt(grados - 273.5);

function mostrarAlerta(mensaje) {
  limpiarHTML();
  eliminarAlerta();
  const error = document.createElement("P");
  error.textContent = mensaje;
  error.classList.add(
    "bg-red-600",
    "border-red-400",
    "text-white",
    "px-4",
    "py-3",
    "text-center",
    "mt-6"
  );
  formulario.appendChild(error);

  setTimeout(() => {
    error.remove();
  }, 2000);
}

function eliminarAlerta() {
  const alerta = document.querySelector(".bg-red-600");
  if (alerta) {
    alerta.remove();
  }
}
function limpiarHTML() {
  resultado.innerHTML = "";
}

function spinner() {
  const spinnerDiv = document.createElement("DIV");
  spinnerDiv.classList.add("sk-fading-circle");
  spinnerDiv.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>`;
}
