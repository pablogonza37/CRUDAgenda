import Contacto from "./classContacto.js";

const formularioContacto = document.querySelector("form");
const nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido"),
  email = document.querySelector("#email"),
  telefono = document.querySelector("#telefono");
  const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [];

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
  
  dibujarFila(nuevoContacto, agenda.length);
  guardarEnLocalstorage();
};

const limpiarFormularioContacto = () => {
  formularioContacto.reset();
};

const guardarEnLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const dibujarFila = (contacto, numeroFila)=>{
    const tablaContactos = document.getElementById('tablaContacto');
    tablaContactos.innerHTML += `<tr>
    <th scope="row">${numeroFila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.telefono}</td>
    <td>
      <a class="btn btn-primary" href="./pages/detalleContacto.html">Ver mas</a>
      <button class="btn btn-warning">Editar</button>
      <button class="btn btn-danger">Borrar</button>
    </td>
  </tr>`
  }

  const cargaInicial = () =>{
    if(agenda.length > 0){
      agenda.map((itemContacto, posicionContacto)=> dibujarFila(itemContacto, posicionContacto + 1))
    }
  }

formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
