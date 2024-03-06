import Contacto from "./classContacto.js";

const formularioContacto = document.querySelector("form");
const modal = new bootstrap.Modal(document.getElementById("modalContacto"));
const tituloFormulario = document.querySelector('#tituloFormulario')
const nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido"),
  email = document.querySelector("#email"),
  telefono = document.querySelector("#telefono");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

const crearContacto = (e) => {
  e.preventDefault();
  if (
    validarCantidadCaracteres(nombre.value, 3, 25) &&
    validarCantidadCaracteres(apellido.value, 2, 35) &&
    validarEmail(email.value) &&
    validarTelefono(telefono.value)
  ) {
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
    Swal.fire({
      title: "Contacto creado",
      text: `El contacto ${nuevoContacto.nombre}, ${nuevoContacto.apellido} fue creado exitosamente`,
      icon: "success",
    });
  }
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
  Swal.fire({
    title: "Esta seguro de borrar el contacto?",
    text: "Esta accion es irreversible!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro!",
  }).then((result) => {
    if (result.isConfirmed) {
      const posicionContactoBuscado = agenda.findIndex(
        (itemContacto) => itemContacto.id === idContacto
      );
      agenda.splice(posicionContactoBuscado, 1);
      guardarEnLocalstorage();
      const tablaContactos = document.getElementById("tablaContacto");
      tablaContactos.innerHTML = "";
      cargaInicial();
      Swal.fire({
        title: "Borrado!",
        text: "El contacto ha sido eliminado.",
        icon: "success",
      });
    }
  });
};

window.detalleContacto = (idContacto) => {
  console.log(window.location);
  window.location.href =
    window.location.origin + "/pages/detalleContacto.html?id=" + idContacto;
};

window.abrirModal = () => {
  modal.show();
  const btnFormulario = document.getElementById("btnFormulario");
  tituloFormulario.textContent = 'Registrar contacto';
  limpiarFormularioContacto();
  btnFormulario.innerHTML = `<button class="btn btn-primary" type="submit" id="btnAgregar">Agregar</button>`;
};

window.editarContacto = (idContacto) => {
  const btnFormulario = document.getElementById("btnFormulario");
  tituloFormulario.textContent = 'Editar contacto';
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
  if (
    validarCantidadCaracteres(nombre.value, 3, 25) &&
    validarCantidadCaracteres(apellido.value, 2, 35) &&
    validarEmail(email.value) &&
    validarTelefono(telefono.value)
  ) {
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
      Swal.fire({
        title: "Contacto editado",
        text: `El contacto fue editado correctamente`,
        icon: "success",
      });
    }
  }
};

const actualizarListaContactos = () => {
  const tablaContactos = document.getElementById("tablaContacto");
  tablaContactos.innerHTML = "";
  agenda.forEach((contacto, indice) => {
    dibujarFila(contacto, indice + 1);
  });
};

const validarCantidadCaracteres = (texto, min, max) => {
  if (!/^\d+$/.test(texto) && texto.length >= min && texto.length <= max) {
    return true;
  } else {
    alert(
      `Error: El texto no debe contener números y debe contener entre ${min} y ${max} caracteres.`
    );

    return false;
  }
};

const validarEmail = (texto) => {
  const patron =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (patron.test(texto)) {
    return true;
  } else {
    alert("Direccion de correo no valida");
    return false;
  }
};

const validarTelefono = (telefono) => {
  const numero = telefono.replace(/\D/g, "");
  if (numero.length >= 7 && numero.length <= 15) {
    return true;
  } else {
    alert(
      "El telefono solo puede contener numeros. y debe tener de 7 a 15 caracteres"
    );
    return false;
  }
};

formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
