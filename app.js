const listaP = document.querySelector(".agregados");
const formulario = document.querySelector(".formulario");
//eventos
eventListeners();

function eventListeners() {
  formulario.addEventListener("submit", agregarPensamiento);

  listaP.addEventListener("click", borrarPensamiento);

  document.addEventListener("DOMContentLoaded", cargarLocalStorage);
}

function agregarPensamiento(e) {
  e.preventDefault();

  const pensamiento = document.querySelector("#pensamiento");
  if (pensamiento.value) {
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar";
    botonBorrar.innerText = "X";

    const li = document.createElement("li");
    li.innerText = pensamiento.value;
    li.appendChild(botonBorrar);
    listaP.appendChild(li);
    agregarLocalStorage(pensamiento.value);
    pensamiento.value = "";
  } else {
    alert("Por favor escribe algo");
  }
}

function borrarPensamiento(e) {
  e.preventDefault();
  if (e.target.className === "borrar") {
    listaP.removeChild(e.target.parentElement);
    eliminarLocalStorage(e.target.parentElement.innerText);
  } else {
    console.log("click en otra parte");
  }
}

function agregarLocalStorage(pensamiento) {
  let pensamientos;
  pensamientos = obtenerPensamientos();
  console.log(pensamientos);
  pensamientos.push(pensamiento);

  localStorage.setItem("pensamientos", JSON.stringify(pensamientos));
}

function validarEspacios(str) {
  if (str.trim() === "") {
    return false;
  } else {
    return true;
  }
}

function obtenerPensamientos() {
  let pensamientos;

  if (localStorage.getItem("pensamientos") === null) {
    pensamientos = [];
  } else {
    pensamientos = JSON.parse(localStorage.getItem("pensamientos"));
  }
  return pensamientos;
}

function cargarLocalStorage() {
  let pensamientos;

  pensamientos = obtenerPensamientos();

  pensamientos.forEach((pensamiento) => {
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar";
    botonBorrar.innerText = "X";

    const li = document.createElement("li");
    li.innerText = pensamiento;
    li.appendChild(botonBorrar);
    listaP.appendChild(li);
  });
}

function eliminarLocalStorage(pensamiento) {
  let pensamientos, borrado;

  borrado = pensamiento.substring(0, pensamiento.length - 1);
  pensamientos = obtenerPensamientos();

  pensamientos.forEach(function (pensamiento, index) {
    if (borrado === pensamiento) {
      pensamientos.splice(index, 1);
    }
  });

  localStorage.setItem("pensamientos", JSON.stringify(pensamientos));
}
