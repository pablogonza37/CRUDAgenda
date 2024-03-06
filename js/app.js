import Contacto from "./classContacto.js";

const formularioContacto = document.querySelector("form");
const modal = new bootstrap.Modal(document.getElementById("modalContacto"));
const nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido"),
  email = document.querySelector("#email"),
  telefono = document.querySelector("#telefono");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

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

const dibujarFila = (contacto, numeroFila) => {
  const tablaContactos = document.getElementById("tablaContacto");
  tablaContactos.innerHTML += `<tr>
    <th scope="row">${numeroFila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.telefono}</td>
    <td>
    <button class="btn btn-primary" onclick="detalleContacto('${contacto.id}')">Ver mas</button>
      <button class="btn btn-warning" onclick="editarContacto('${contacto.id}')">Editar</button>
      <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
    </td>
  </tr>`;
};

const cargaInicial = () => {
  if (agenda.length > 0) {
    agenda.map((itemContacto, posicionContacto) =>
      dibujarFila(itemContacto, posicionContacto + 1)
    );
  }
};

window.borrarContacto = (idContacto) => {
  const posicionContactoBuscado = agenda.findIndex(
    (itemContacto) => itemContacto.id === idContacto
  );
  agenda.splice(posicionContactoBuscado, 1);
  guardarEnLocalstorage();
  const tablaContactos = document.getElementById("tablaContacto");
  tablaContactos.innerHTML = "";
  cargaInicial();
};

window.detalleContacto = (idContacto) => {
  console.log(window.location);
  window.location.href =
    window.location.origin + "/pages/detalleContacto.html?id=" + idContacto;
};

window.abrirModal = () => {
  modal.show();
  const btnFormulario = document.getElementById("btnFormulario");
  limpiarFormularioContacto();
  btnFormulario.innerHTML = `<button class="btn btn-primary" type="submit" id="btnAgregar">Agregar</button>`;
};

window.editarContacto = (idContacto) => {
  const btnFormulario = document.getElementById("btnFormulario");
  btnFormulario.innerHTML = `<button class="btn btn-primary" type="button" id="btnSaveContact" onclick="guardarCambios()">Guardar Cambios</button>`;
  const contacto = agenda.find(
    (itemContacto) => itemContacto.id === idContacto
  );
  if (contacto) {
    nombre.value = contacto.nombre;
    apellido.value = contacto.apellido;
    email.value = contacto.email;
    telefono.value = contacto.telefono;
    document.getElementById("contactId").value = idContacto;
    modal.show();
  }
};

window.guardarCambios = () => {
  const idContacto = document.getElementById("contactId").value;
  const contactoIndex = agenda.findIndex(
    (itemContacto) => itemContacto.id === idContacto
  );
  if (contactoIndex !== -1) {
    agenda[contactoIndex] = new Contacto(
      nombre.value,
      apellido.value,
      email.value,
      telefono.value
    );
    guardarEnLocalstorage();
    modal.hide();
    limpiarFormularioContacto();
    actualizarListaContactos();
  }
};

const actualizarListaContactos = () => {
  const tablaContactos = document.getElementById("tablaContacto");
  tablaContactos.innerHTML = "";
  agenda.forEach((contacto, indice) => {
    dibujarFila(contacto, indice + 1);
  });
};

formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
