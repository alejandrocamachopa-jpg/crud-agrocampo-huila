// Clave única para guardar los datos en el almacenamiento local del navegador
const STORAGE_KEY = 'agrocampo_inventario_crud';

// Referencias a elementos del DOM
const productForm = document.getElementById('product-form');
const formTitle = document.getElementById('form-title');
const productIdInput = document.getElementById('product-id');
const nombreInput = document.getElementById('nombre');
const categoriaInput = document.getElementById('categoria');
const cantidadInput = document.getElementById('cantidad');
const precioInput = document.getElementById('precio');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const tableBody = document.getElementById('product-table-body');
const emptyMessage = document.getElementById('empty-message');
const totalItemsSpan = document.getElementById('total-items');
const searchInput = document.getElementById('search-input');
const alertBox = document.getElementById('alert-box');

// Estado inicial de la aplicación cargado desde localStorage
let inventario = obtenerInventarioLocal();

// Inicializar vista al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderizarTabla(inventario);
});

// Evento principal para CREATE (Crear) y UPDATE (Actualizar)
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const idActual = productIdInput.value;
  const nombre = nombreInput.value.trim();
  const categoria = categoriaInput.value;
  const cantidad = parseInt(cantidadInput.value, 10);
  const precio = parseFloat(precioInput.value);

  // Validación defensiva de datos
  if (!nombre || !categoria || isNaN(cantidad) || cantidad <= 0 || isNaN(precio) || precio <= 0) {
    mostrarAlerta('Por favor completa todos los campos con valores válidos.', 'warning');
    return;
  }

  if (idActual) {
    // MODO UPDATE: Actualizar un registro existente
    inventario = inventario.map((item) =>
      item.id === idActual
        ? { ...item, nombre, categoria, cantidad, precio }
        : item
    );
    mostrarAlerta('Insumo actualizado correctamente.', 'success');
  } else {
    // MODO CREATE: Crear un nuevo registro con ID único basado en marca de tiempo
    const nuevoInsumo = {
      id: Date.now().toString(),
      nombre,
      categoria,
      cantidad,
      precio
    };
    inventario.push(nuevoInsumo);
    mostrarAlerta('Insumo registrado exitosamente.', 'success');
  }

  guardarInventarioLocal(inventario);
  resetearFormulario();
  renderizarTabla(inventario);
});

// Botón para cancelar la edición y volver al modo creación
btnCancel.addEventListener('click', () => {
  resetearFormulario();
});

// Filtro de búsqueda en tiempo real (parte de READ)
searchInput.addEventListener('input', (e) => {
  const termino = e.target.value.toLowerCase().trim();
  const filtrados = inventario.filter(
    (item) =>
      item.nombre.toLowerCase().includes(termino) ||
      item.categoria.toLowerCase().includes(termino)
  );
  renderizarTabla(filtrados);
});

// Función READ: Renderiza la lista de registros en la tabla HTML
function renderizarTabla(lista) {
  tableBody.innerHTML = '';
  totalItemsSpan.textContent = lista.length;

  if (lista.length === 0) {
    emptyMessage.classList.remove('hidden');
    return;
  }

  emptyMessage.classList.add('hidden');

  lista.forEach((item) => {
    const subtotal = item.cantidad * item.precio;
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td><strong>${escaparHTML(item.nombre)}</strong></td>
      <td><span class="badge">${escaparHTML(item.categoria)}</span></td>
      <td>${item.cantidad}</td>
      <td>$${formatearMoneda(item.precio)}</td>
      <td><strong>$${formatearMoneda(subtotal)}</strong></td>
      <td class="actions-cell">
        <button class="btn btn-edit" onclick="prepararEdicion('${item.id}')">Editar</button>
        <button class="btn btn-delete" onclick="eliminarInsumo('${item.id}')">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(fila);
  });
}

// Carga los datos de un registro en el formulario para editarlo (preparación UPDATE)
function prepararEdicion(id) {
  const insumo = inventario.find((item) => item.id === id);
  if (!insumo) return;

  productIdInput.value = insumo.id;
  nombreInput.value = insumo.nombre;
  categoriaInput.value = insumo.categoria;
  cantidadInput.value = insumo.cantidad;
  precioInput.value = insumo.precio;

  formTitle.textContent = 'Editar Insumo';
  btnSubmit.textContent = 'Actualizar Cambios';
  btnCancel.classList.remove('hidden');
  nombreInput.focus();
}

// Función DELETE: Elimina un registro previa confirmación del usuario
function eliminarInsumo(id) {
  const confirmar = confirm('¿Estás seguro de eliminar este insumo del inventario?');
  if (!confirmar) return;

  inventario = inventario.filter((item) => item.id !== id);
  guardarInventarioLocal(inventario);

  // Si se estaba editando el mismo registro eliminado, limpiar formulario
  if (productIdInput.value === id) {
    resetearFormulario();
  }

  renderizarTabla(inventario);
  mostrarAlerta('Insumo eliminado del registro.', 'warning');
}

// Restaura el formulario a su estado inicial
function resetearFormulario() {
  productForm.reset();
  productIdInput.value = '';
  formTitle.textContent = 'Registrar Nuevo Insumo';
  btnSubmit.textContent = 'Guardar Insumo';
  btnCancel.classList.add('hidden');
}

// Persistencia en localStorage
function obtenerInventarioLocal() {
  const datos = localStorage.getItem(STORAGE_KEY);
  return datos ? JSON.parse(datos) : [];
}

function guardarInventarioLocal(datos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
}

// Utilidades de formato y seguridad básica contra inyección HTML (XSS)
function formatearMoneda(valor) {
  return valor.toLocaleString('es-CO');
}

function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function mostrarAlerta(mensaje, tipo) {
  alertBox.textContent = mensaje;
  alertBox.className = `alert alert-${tipo}`;
  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}