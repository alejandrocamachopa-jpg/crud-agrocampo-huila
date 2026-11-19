# AgroCampo Huila — Sistema Web CRUD de Inventario Agrícola

Proyecto práctico final desarrollado para el seminario **Gestión de Software Ágil asistido por Inteligencia Artificial** (Fundación Escuela Tecnológica de Neiva - FET).

## Descripción breve
Esta aplicación web permite llevar el control del inventario de una tienda de insumos agrícolas (fertilizantes, semillas, control de plagas y herramientas). Implementa las cuatro funciones básicas de un CRUD:
- **Create (Crear):** Registrar nuevos productos con su categoría, cantidad y precio unitario.
- **Read (Leer):** Visualizar todos los productos guardados en una tabla con el cálculo automático del subtotal y buscar en tiempo real por nombre o categoría.
- **Update (Actualizar):** Cargar cualquier producto en el formulario para modificar sus datos y guardar los cambios.
- **Delete (Eliminar):** Borrar registros del inventario con un mensaje de confirmación para evitar errores.

Todos los datos se guardan directamente en el navegador usando `localStorage`, así que no se pierden al recargar o cerrar la página.

## Tecnologías utilizadas
- **HTML5:** Estructura principal del formulario y la tabla de inventario.
- **CSS3:** Estilos personalizados con tonos verdes agrícolas, diseño en dos columnas y adaptable a pantallas pequeñas.
- **JavaScript:** Toda la lógica del CRUD, validaciones de los campos, filtro de búsqueda y mensajes de alerta.
- **localStorage:** Almacenamiento local en el navegador para mantener los datos sin necesidad de montar un servidor o base de datos externa.

## Instrucciones para ejecutar el proyecto
1. Descarga los archivos de este repositorio (o clónalo en tu computador).
2. Asegúrate de que los archivos `index.html`, `styles.css` y `app.js` estén dentro de la misma carpeta.
3. Haz doble clic sobre el archivo `index.html` para abrirlo directamente en Google Chrome, Edge o cualquier navegador web.
4. Ya puedes empezar a registrar, buscar, editar y eliminar insumos.

## Capturas de pantalla
*(Nota: Una vez subas tus dos capturas de pantalla a una carpeta llamada `capturas` en GitHub, descomenta o actualiza estas líneas)*
- Vista general del sistema y registro de insumos: `capturas/pantalla1.png`
- Edición y listado de inventario funcionando: `capturas/pantalla2.png`

## Lista de prompts utilizados y explicación

Durante el desarrollo fui guiando la creación y mejora del código mediante estos prompts:

1. **Prompt 1 — Base inicial del proyecto CRUD**
   - **Lo que pedí:** *"Necesito hacer una aplicación web CRUD sencilla con HTML, CSS y JavaScript puro para gestionar el inventario de insumos agrícolas (nombre, categoría, cantidad y precio) guardando los datos en localStorage."*
   - **Para qué me sirvió:** Para tener la estructura base del proyecto funcionando desde cero con las cuatro operaciones básicas y conexión a `localStorage`.

2. **Prompt 2 — Mejorar la forma de editar registros (Update)**
   - **Lo que pedí:** *"Modifica el código JavaScript para que cuando le dé clic al botón Editar de un producto, los datos suban al mismo formulario de arriba usando un input oculto para el ID, cambie el botón a Actualizar Cambios y aparezca un botón para cancelar."*
   - **Para qué me sirvió:** En la primera versión la edición era muy básica; con este cambio logré que editar un producto fuera mucho más cómodo y claro para el usuario.

3. **Prompt 3 — Agregar buscador, validaciones y alertas visuales**
   - **Lo que pedí:** *"Agrega una barra de búsqueda en tiempo real por nombre o categoría, mensajes de alerta cuando se guarde, actualice o elimine un insumo, confirmación antes de borrar y validación para que no se guarden campos vacíos o números negativos."*
   - **Para qué me sirvió:** Para evitar errores al ingresar datos y hacer que la aplicación avisara visualmente cada vez que se completa una acción.

4. **Prompt 4 — Diseño visual propio para AgroCampo Huila**
   - **Lo que pedí:** *"Separa todos los estilos en un archivo styles.css con colores verdes agrícolas, tarjetas con sombra suave y dos columnas (formulario a la izquierda y tabla a la derecha) que se adapten bien en celular."*
   - **Para qué me sirvió:** Para dejar el código ordenado en archivos separados (`index.html`, `styles.css` y `app.js`) y darle una apariencia limpia y personalizada.

## Video explicativo
- **Enlace al video:** [Pega aquí el enlace de YouTube o Google Drive donde subas tu video]

## Autor
- **Alejandro Camacho Pastrana** — Estudiante de Ingeniería de Software (FET)