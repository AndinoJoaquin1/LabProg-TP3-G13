// para extraer el monto en USD del producto, osea del nombre
const parseMontoUSD = (nombre) => {
  // extrae el número antes de "USD"
  const m = nombre.match(/(\d+)\s*usd/i);
  return m ? Number(m[1]) : null;
};

// para extraer el nombre del producto sin el monto
const baseKey = (nombre) => nombre.replace(/\s*\d+\s*usd/i, "").trim();

const renderizarItemSeleccionado = async () => {
  //como el id viene  en la url, la extraigo para asi poder hacer la consulta al endpoint
  const url = window.location.pathname;

  const urlPartes = url.split("/");
  //coloco el nombre del item en el titulo del documento
  document.title = decodeURI(urlPartes[3]);

  //se hace la consulta al endpoitn
  const res = await fetch(`http://localhost:3000/api/items/${urlPartes[2]}`);
  const item = await res.json(); //<= por que esto es una promise????

  //traigo todo los items
  const resAll = await fetch(`/api/items/?${urlPartes[3]}`);
  const todos = await resAll.json();
  // Extraigo el nombre del producto sin el monto
  const key = baseKey(item.nombre);
  //Busco todas las variantes del mismo producto, basandonos en el mismo nombre del producto sin el monto
  const variantes = todos
    .filter(
      (it) => baseKey(it.nombre) === key && it.plataforma === item.plataforma
    )
    .map((it) => ({
      ...it,
      precioNum: Number(it.precio),
      montoUSD: parseMontoUSD(it.nombre),
    }))
    //ordeno las variantes obtenidas por monto en USD
    .sort((a, b) => a.montoUSD - b.montoUSD);

  console.log(variantes);
  // Agrego el contenido al html con el item seleccionado, buscando en el DOM por sus clases y poniendo la informacion del item seleccionado
  const imagen = document.querySelector(".item-image img"); // busco en product.html el primer elemento del DOM que coincida
  imagen.src = `/images/${item.image}`;
  imagen.alt = item.nombre;

  document.querySelector(".item-title").textContent = item.nombre;
  document.querySelector(".item-precio-destacado").textContent = `$ ${Number(
    item.precio
  ).toLocaleString("es-AR")}`;
  document.querySelector(".item-caracteristicas").textContent = item.plataforma;
  document.querySelector(".item-descripcion").textContent = key; // o lo que quieras mostrar

  // --- hago todas las cajitas de montos ---
  const grid = document.getElementById("var-cantidad-cajita");
  // limpio el grid por si habia algo
  grid.innerHTML = "";
  //Para cada variante creo un boton, creando el elemento en memoria
  if (variantes.length > 1) {
    variantes.forEach((v) => {
      //esto crea en el documento un <button></button>
      const btn = document.createElement("button");
      btn.type = "button";
      //le asigno el css
      btn.className = "estilo-btn";
      //guardo el id y el monto en usd en atributos data
      btn.dataset.id = v.id;
      btn.dataset.monto = v.montoUSD;
      //le agrego al boton el monto en usd
      btn.innerHTML = `<div>${v.montoUSD} USD</div>`;
      //cada vez que se clickee...
      btn.addEventListener("click", () => {
        //veo todos los botones del grid y los marco como no seleccionados
        grid
          .querySelectorAll(".estilo-btn")
          .forEach((b) => b.setAttribute("aria-selected", "false"));
        //marco este boton como seleccionado
        btn.setAttribute("aria-selected", "true");

        // actualizar precio y textos con esa variante
        document.querySelector(
          ".item-precio-destacado"
        ).textContent = `$ ${v.precioNum.toLocaleString("es-AR")}`;
        document.querySelector(".item-title").textContent = v.nombre;
        imagen.alt = v.nombre;
      });
      //agrego el boton al grid
      grid.appendChild(btn);
    });
  } else {
    //si es un item sin variantes, oculto el texto
    const textoVariante = document.querySelector(".texto-variantes");
    textoVariante.style.display = "none";
  }
  // seleccionar por defecto el monto del item con el que llegaste
  const montoInicial = parseMontoUSD(item.nombre);
  const btnInicial =
    [...grid.querySelectorAll(".estilo-btn")].find(
      (b) => Number(b.dataset.monto) === montoInicial
    ) || grid.querySelector(".estilo-btn");
  //si no lo encuentro, selecciono el primero
  if (btnInicial) btnInicial.click();
};
const agregarItemCarrito = () => {
  //se obtiene el carro del localstorage o se crea uno nuevo si no existe
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  //se obtiene el item del localstorage
  let item = JSON.parse(localStorage.getItem("item"));
  //se busca el item en el carrito
  itemEnCarrito = carrito.find((i) => i._id == item._id);
  //si el item ya existe en el carrito, se aumenta la cantidad
  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    //si el item no existe, se agrega al carrito
    carrito.push({ ...item, cantidad: 1 });
  }
  //se guarda el carrito actualizado en el localstorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  //animacion de carrito
  const iconoCarrito = document.querySelector(".nav-carrito-icon");
  if (iconoCarrito) {
    iconoCarrito.classList.add("animar");
    setTimeout(() => iconoCarrito.classList.remove("animar"), 450);
  }
};
