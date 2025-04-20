// Alerta personalizada al agregar al carrito
let total = 0;
const totalElemento = document.getElementById("total");
let carritoItems = []; // lista de comidas seleccionadas

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

// Mostrar en pantalla
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("visitas").textContent = visitas;
});

// Frases con emojis incluidos
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

 // Mostrar mensaje de pago exitoso por transferencia
document.getElementById('pagar-transferencia').addEventListener('click', function() {
    document.getElementById('mensaje-pago').style.display = 'block';
    document.getElementById('mensaje').textContent = 'Pago realizado con éxito mediante Transferencia Bancaria. ¡Gracias por tu compra!';
  });
  
  // Mostrar formulario de pago con tarjeta
  document.getElementById('pagar-tarjeta').addEventListener('click', function() {
    document.getElementById('formulario-tarjeta').style.display = 'block';  // Mostrar el formulario de pago
  });
  
  // Simular el pago con tarjeta y mostrar el mensaje de éxito
  document.getElementById('form-tarjeta').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que se recargue la página al enviar el formulario
    
    // Simulando un pago exitoso
    alert('¡Pago exitoso! Tu pago con tarjeta ha sido procesado.');
    
    // Mostrar el mensaje de pago exitoso
    document.getElementById('mensaje-pago').style.display = 'block';
    document.getElementById('mensaje').textContent = 'Pago realizado con éxito mediante Tarjeta de Crédito. ¡Gracias por tu compra!';
    
    // Ocultar el formulario de pago con tarjeta
    document.getElementById('formulario-tarjeta').style.display = 'none';
  });

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

const comidas = {
  asado: {
    nombre: "Parrillada",
    precio: 15000,
    imagen: "img/asado.jpg"
  },
  tamales: {
    nombre: "Tamales",
    precio: 3800,
    imagen: "img/tamales.jpg"
  },
  milanesas: {
    nombre: "Milanesas",
    precio: 3200,
    imagen: "img/milanesa.jpg"
  },
  pizza: {
    nombre: "Pizza",
    precio: 2900,
    imagen: "img/pizza.jpg"
  },
  choripan: {
    nombre: "Pastas",
    precio: 1500,
    imagen: "img/pastas.jpg"
  },
  provoleta: {
    nombre: "Provoleta",
    precio: 1700,
    imagen: "img/provoleta.jpg"
  },
  matambre: {
    nombre: "Matambre a la pizza",
    precio: 3900,
    imagen: "img/matambre.jpg"
  }
};

document.querySelectorAll(".dropdown-content a").forEach(link => {
  link.addEventListener("click", (e) => {
    const id = e.target.getAttribute("href").substring(1);
    if (comidas[id]) {
      mostrarComida(comidas[id]);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let total = 0;
  let carritoItems = []; // Para guardar los elementos agregados al carrito
  const modalPago = document.getElementById("modal-pago");
  const modalTotal = document.getElementById("modal-total");
  const resumenCarrito = document.getElementById("resumen-carrito");
  const barraCarga = document.getElementById("barra-carga");
  const progreso = document.getElementById("progreso");
  const mensajeExito = document.getElementById("mensaje-exito");

  // Función para mostrar la comida seleccionada
  document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", (e) => {
      const id = e.target.getAttribute("href").substring(1);
      if (comidas[id]) {
        mostrarComida(comidas[id]);
      }
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

    // Reinicia la funcionalidad del carrito para el nuevo botón generado
    const nuevoBoton = contenedor.querySelector(".agregar-carrito");
    nuevoBoton.addEventListener("click", () => {
      carritoItems.push({
        nombre: comida.nombre,
        precio: comida.precio
      });
      total += parseInt(nuevoBoton.getAttribute("data-precio"));
      document.getElementById("total").textContent = total;
      alert("Sabores del Norte te agradece por tu compra 🧡\n¡Esperamos que lo disfrutes!");
    });
  }

  // Ir a métodos de pago al hacer clic en "Finalizar compra"
  document.getElementById("finalizar-compra").addEventListener("click", () => {
    // Mostrar total en el modal
    modalTotal.textContent = total;

    // Mostrar lista de comidas seleccionadas en el resumen del carrito
    resumenCarrito.innerHTML = "<strong>Resumen de tu pedido:</strong><ul style='margin-top: 0.5rem;'>";
    carritoItems.forEach(item => {
      resumenCarrito.innerHTML += `<li>${item.nombre} - $${item.precio}</li>`;
    });
    resumenCarrito.innerHTML += "</ul>";

    // Mostrar el modal de pago
    modalPago.style.display = "block";

    // Hacer scroll hacia el modal
    modalPago.scrollIntoView({ behavior: "smooth" });
  });

  // Función para manejar la transferencia
  document.getElementById("pago-transferencia-modal").addEventListener("click", function () {
    // Mostrar el monto total en el campo de monto para transferencia
    const montoTransferencia = document.getElementById("monto-transferencia");
    montoTransferencia.value = total;

    // Mostrar el formulario de transferencia
    document.getElementById("transferencia-form").style.display = "block";
  });

  // Función de pago por transferencia
  document.getElementById("btn-pagar-transferencia").addEventListener("click", function () {
    const montoIngresado = parseFloat(document.getElementById("monto-transferencia").value);

    if (montoIngresado === total) {
      // Iniciar la barra de progreso
      barraCarga.style.display = 'block';
      let porcentaje = 0;
      const intervalo = setInterval(function () {
        if (porcentaje < 100) {
          porcentaje += 10;
          progreso.style.width = porcentaje + '%';
          progreso.textContent = porcentaje + '%';
        } else {
          clearInterval(intervalo);
          mensajeExito.style.display = 'block'; // Mostrar mensaje de éxito
          setTimeout(function () {
            modalPago.style.display = "none"; // Cerrar el modal
          }, 2000);
        }
      }, 500);
    } else {
      alert('El monto ingresado no coincide con el total del pedido.');
    }
  });

  // Cerrar modal de pago al hacer clic en "Cancelar"
  document.getElementById("cerrar-modal").addEventListener("click", () => {
    modalPago.style.display = "none";
  });
});

// Función para abrir y cerrar el chat
function toggleChat() {
  var chatBox = document.getElementById('chat-box');
  if (chatBox.style.display === "none" || chatBox.style.display === "") {
    chatBox.style.display = "flex";
  } else {
    chatBox.style.display = "none";
  }
}

// Función para enviar mensajes
function sendMessage() {
  var inputField = document.getElementById('chat-input');
  var message = inputField.value;
  if (message) {
    var chatContent = document.querySelector('.chat-content');
    chatContent.innerHTML += "<p><strong>Tú:</strong> " + message + "</p>";
    inputField.value = '';  // Limpiar el campo de entrada

    // Respuesta automática simulada
    setTimeout(function() {
      chatContent.innerHTML += "<p><strong>Sabores del Norte:</strong> Gracias por tu mensaje. ¡En breve nos pondremos en contacto contigo!</p>";
      chatContent.scrollTop = chatContent.scrollHeight;  // Desplazar hacia abajo
    }, 1500);
  }
}

