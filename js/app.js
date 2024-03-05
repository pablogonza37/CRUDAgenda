import Contacto from "./classContacto.js";

const formularioContacto = document.querySelector("form");
const nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido"),
  email = document.querySelector("#email"),
  telefono = document.querySelector("#telefono");
const agenda = [];

const crearContacto = (e) => {
  e.preventDefault();
  console.log("desde la funcion que crea los contactos");
  const nuevoContacto = new Contacto(
    nombre.value,
    apellido.value,
    email.value,
    telefono.value
  );
  agenda.push(nuevoContacto);
  console.log(agenda);
  limpiarFormularioContacto();
  guardarEnLocalstorage();
};

const limpiarFormularioContacto = () => {
  formularioContacto.reset();
};

const guardarEnLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

formularioContacto.addEventListener("submit", crearContacto);
