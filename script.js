// Alerta personalizada al agregar al carrito
let total = 0;
const totalElemento = document.getElementById("total");
let carritoItems = [];

const botones = document.querySelectorAll(".agregar-carrito");
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const precio = parseInt(boton.getAttribute("data-precio"));
    const nombre = boton.parentElement.querySelector("h3").textContent;

    total += precio;
    totalElemento.textContent = total;

    carritoItems.push({ nombre, precio });

    alert("Sabores del Norte te agradece por tu compra 🧡\n¡Esperamos que lo disfrutes!");
  });
});

// CONTADOR DE VISITAS LOCAL
let visitas = localStorage.getItem("contadorVisitas");

if (!visitas) {
  visitas = 1;
} else {
  visitas = parseInt(visitas) + 1;
}

localStorage.setItem("contadorVisitas", visitas);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("visitas").textContent = visitas;
});

// Frases dinámicas
const frases = [
  "Delicias argentinas directo a tu mesa 🍲",
  "Sabores auténticos del norte 🌄",
  "Hecho con amor y tradición ❤️",
  "¡Pedí tu plato favorito! 🛒",
  "Sabores que despiertan recuerdos 🍴"
];

let fraseActual = 0;
const fraseElemento = document.getElementById("frase-dinamica");

function mostrarFrase() {
  fraseElemento.style.opacity = 0;

  setTimeout(() => {
    fraseElemento.textContent = frases[fraseActual];
    fraseElemento.style.opacity = 1;
    fraseActual = (fraseActual + 1) % frases.length;
  }, 1000);
}

mostrarFrase();
setInterval(mostrarFrase, 4000);

// Mostrar el apartado de contacto
function mostrarContacto() {
  const contacto = document.getElementById("info-contacto");
  if (contacto.style.display === "none") {
    contacto.style.display = "block";
    contacto.scrollIntoView({ behavior: "smooth" });
  } else {
    contacto.style.display = "none";
  }
}

// Dropdown especialidades
const comidas = {
  
  asado: { nombre: "Parrillada", precio: 15000, imagen: "img/asado.jpg" },
  empanadas:{nombre:"Empanadas", precio: 8000, imagen:"img/empanadas.jpg"},
  locro:{nombre:"Locro", precio: 3500,imagen:"img/locro.jpg"},
  humitas:{nombre:"Humitas", precio: 8000, imagen:"img/humitas.jpg"},
  tamales: { nombre: "Tamales", precio: 3800, imagen: "img/tamales.jpg" },
  milanesas: { nombre: "Milanesas", precio: 3200, imagen: "img/milanesa.jpg" },
  pizza: { nombre: "Pizza", precio: 2900, imagen: "img/pizza.jpg" },
  choripan: { nombre: "Pastas", precio: 1500, imagen: "img/pastas.jpg" },
  provoleta: { nombre: "Provoleta", precio: 1700, imagen: "img/provoletarellena.jpg" },
  matambre: { nombre: "Matambre a la pizza", precio: 3900, imagen: "img/matambrealapizza.jpg" }
};

document.querySelectorAll(".dropdown-content a").forEach(link => {
  link.addEventListener("click", (e) => {
    const id = e.target.getAttribute("href").substring(1);
    if (comidas[id]) mostrarComida(comidas[id]);
  });
});

function mostrarComida(comida) {
  const contenedor = document.getElementById("detalle-comida");
  contenedor.innerHTML = `
    <div class="item">
      <img src="${comida.imagen}" alt="${comida.nombre}">
      <div class="item-content">
        <h3>${comida.nombre}</h3>
        <p>$${comida.precio}</p>
        <button class="agregar-carrito" data-precio="${comida.precio}" data-nombre="${comida.nombre}">Agregar al carrito</button>
      </div>
    </div>
  `;
  contenedor.style.display = "grid";
  contenedor.scrollIntoView({ behavior: "smooth" });

  contenedor.querySelector(".agregar-carrito").addEventListener("click", () => {
    carritoItems.push({ nombre: comida.nombre, precio: comida.precio });
    total += comida.precio;
    totalElemento.textContent = total;
    alert("Sabores del Norte te agradece por tu compra 🧡\n¡Esperamos que lo disfrutes!");
  });
}

// MODAL de pago simplificado solo con transferencia
const modalPago = document.getElementById("modal-pago");
const modalTotal = document.getElementById("modal-total");
const resumenCarrito = document.getElementById("resumen-carrito");

const transferenciaForm = document.getElementById("transferencia-form");
const mensajeExito = document.getElementById("mensaje-exito");

document.getElementById("finalizar-compra").addEventListener("click", () => {
  modalTotal.textContent = total;
  resumenCarrito.innerHTML = "<strong>Resumen de tu pedido:</strong><ul style='margin-top: 0.5rem;'>";
  carritoItems.forEach(item => {
    resumenCarrito.innerHTML += `<li>${item.nombre} - $${item.precio}</li>`;
  });
  resumenCarrito.innerHTML += "</ul>";
  modalPago.style.display = "block";
});

document.getElementById("pago-transferencia-modal").addEventListener("click", () => {
  document.getElementById("monto-transferencia").value = total;
  transferenciaForm.style.display = "block";
});

document.getElementById("btn-pagar-transferencia").addEventListener("click", () => {
  const montoIngresado = parseFloat(document.getElementById("monto-transferencia").value);
  if (montoIngresado === total) {
    mensajeExito.style.display = "block";
    setTimeout(() => {
      modalPago.style.display = "none";
      mensajeExito.style.display = "none";
      document.getElementById("monto-transferencia").value = "";
    }, 2000);
  } else {
    alert("El monto ingresado no coincide con el total del pedido.");
  }
});

document.getElementById("cerrar-modal").addEventListener("click", () => {
  modalPago.style.display = "none";
});

// Chat flotante
function toggleChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.style.display = (chatBox.style.display === "none" || chatBox.style.display === "") ? "flex" : "none";
}

function sendMessage() {
  const inputField = document.getElementById("chat-input");
  const message = inputField.value;
  if (message) {
    const chatContent = document.querySelector(".chat-content");
    chatContent.innerHTML += `<p><strong>Tú:</strong> ${message}</p>`;
    inputField.value = '';

    setTimeout(() => {
      chatContent.innerHTML += `<p><strong>Sabores del Norte:</strong> Gracias por tu mensaje. ¡En breve nos pondremos en contacto contigo!</p>`;
      chatContent.scrollTop = chatContent.scrollHeight;
    }, 1500);
  }
}
  document.getElementById("pagar-tarjeta").addEventListener("click", function () {
  document.getElementById("formulario-tarjeta").style.display = "block";
  document.getElementById("formulario-tarjeta").scrollIntoView({ behavior: "smooth" });
});

  document.getElementById("form-tarjeta").addEventListener("submit", function (event) {
  event.preventDefault();
  const mensaje = document.getElementById("mensaje-aprobado");
  mensaje.style.display = "block";
  mensaje.scrollIntoView({ behavior: "smooth" });
});
//botones de "sobre nosotros" ,"politica de privacidad..."

function toggleContent(id) {
  const content = document.getElementById(id);
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    // Ocultar los otros contenidos
    document.querySelectorAll('.accordion-content').forEach(el => el.style.display = 'none');
    content.style.display = 'block';
  }
}
//Mensaje en el boton de transferencias
document.getElementById("pagar-transferencia").addEventListener("click", function () {
  alert("📦 El método de transferencia lo encontrás al finalizar la compra con el carrito.");
});
