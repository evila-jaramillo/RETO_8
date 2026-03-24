let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;

    
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.background = "#e60073";
    btnEliminar.style.color = "white";
    btnEliminar.style.border = "none";
    btnEliminar.style.borderRadius = "5px";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.onclick = () => {
      eliminarDelCarrito(index);
    };

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  totalElemento.textContent = total.toFixed(2);
  contador.textContent = carrito.length;
}

function eliminarDelCarrito(indice) {
  total -= carrito[indice].precio;
  carrito.splice(indice, 1);
  actualizarCarrito();
}

function toggleCarrito() {
  const panel = document.getElementById("carrito-panel");
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
}

function realizarPago() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert(`Gracias por su compra. Total a pagar: $${total.toFixed(2)}`);
  carrito = [];
  total = 0;
  actualizarCarrito();
  toggleCarrito();
}
// CONTADOR DE VISITAS
function contadorVisitas() {
  let visitas = localStorage.getItem("visitas");

  if (visitas === null) {
    visitas = 1;
  } else {
    visitas = parseInt(visitas) + 1;
  }

  localStorage.setItem("visitas", visitas);

  console.log("Número de visitas:", visitas);

  // Si quieres mostrarlo en pantalla, crea un elemento con id="visitas"
  const elemento = document.getElementById("visitas");
  if (elemento) {
    elemento.textContent = visitas;
  }
}

// Ejecutar al cargar la página
contadorVisitas();
// FILTRO POR CATEGORÍAS
// Array productos con imagen, nombre, precio y categoria
const productos = [
  { id: 1, nombre: "Camiseta Hombre", precio: 5000, categoria: "hombres", imagen: "https://static.rfstat.com/mockup-maker/mockups/3966/a8a1ede84d03cebb2c4bc10cc2601242.webp" },
  { id: 2, nombre: "Vestido Mujer", precio: 15000, categoria: "mujer", imagen: "https://www.flashy.com.co/cdn/shop/files/vestido-largo-con-abertura-enfrente-y-drapeado-en-cintura-mujer-flashy-niza15_grande.jpg" },
  { id: 3, nombre: "Chaqueta Niño", precio: 8000, categoria: "niño", imagen: "https://down-co.img.susercontent.com/file/9e0d3d372a4b95798500ceff4578bec8" },
  { id: 4, nombre: "Pantalón Jeans", precio: 5000, categoria: "jeans", imagen: "https://pantalonesdemezclilla.mx/cdn/shop/files/regular-baggy-jeans-desgastados-azul-mujer_2_1_1c773888-bf4a-481e-8b54-bf9fe6b44662.jpg" }
];

// Función para mostrar productos en el contenedor
function mostrarProductos(lista) {
  const contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = ""; // Limpiar antes

  lista.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";
    div.dataset.categoria = producto.categoria;

    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>$${(producto.precio / 100).toFixed(2)}</p>
    `;

    contenedor.appendChild(div);
  });
}

// Función para filtrar productos segun categoria
function filtrarProductos() {
  const filtro = document.getElementById("filtro").value;
  if (filtro === "todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === filtro);
    mostrarProductos(filtrados);
  }
}

// Mostrar todos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});
  
