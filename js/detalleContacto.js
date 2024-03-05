console.log(window.location.search);

const parametroURL = new URLSearchParams(window.location.search);
const idContacto = parametroURL.get("id");

console.log(idContacto);

const contactos = JSON.parse(localStorage.getItem("agendaKey"));

const contacto = contactos.find((contacto) => contacto.id === idContacto);

function dibujarCard(contacto) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.innerHTML = `  
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="img-fluid rounded-start" alt="imagen contacto" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${contacto.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${contacto.apellido}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Teléfono: ${contacto.telefono}</li>
                <li class="list-group-item">Email: ${contacto.email}</li>
            </ul>
            </div>
          </div>
        </div>
    `;
  const contenedorTarjeta = document.getElementById("containerCard");
  contenedorTarjeta.appendChild(cardDiv);
}

dibujarCard(contacto);
