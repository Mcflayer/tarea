const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

// Constantes de configuración
const MAX_LENGTH = 100;

/**
 * Valida y sanea el texto de entrada.
 * @param {string} rawText 
 * @returns {object} { isValid: boolean, text: string, error?: string }
 */
const validateAndSanitizeText = (rawText) => {
  const text = rawText.trim();
  
  if (!text) {
    return { isValid: false, error: 'El campo no puede estar vacío.' };
  }
  
  if (text.length > MAX_LENGTH) {
    return { isValid: false, error: `El texto no puede superar los ${MAX_LENGTH} caracteres.` };
  }
  
  return { isValid: true, text };
};

/**
 * Crea la estructura HTML del elemento de la lista de forma segura.
 * @param {string} text 
 * @returns {HTMLLIElement}
 */
const createListItem = (text) => {
  const li = document.createElement('li');
  li.className = 'list-item';

  // Uso de template literals para una construcción más limpia del DOM
  li.innerHTML = `
    <button class="good-btn" type="button" aria-label="Marcar como completado">
      <ion-icon name="checkmark-outline"></ion-icon>
    </button>
    <span class="item-text"></span>
    <button class="delete-btn" type="button" aria-label="Eliminar elemento">
      <ion-icon name="close-outline"></ion-icon>
    </button>
  `;

  // Asignación segura mediante textContent para prevenir vulnerabilidades XSS
  li.querySelector('.item-text').textContent = text;

  return li;
};

/**
 * Añade un nuevo elemento a la lista principal.
 */
const addItem = () => {
  const validation = validateAndSanitizeText(input.value);
  
  if (!validation.isValid) {
    // Aquí puedes manejar la alerta visual de error si lo deseas
    console.warn(validation.error);
    input.focus();
    return;
  }

  const item = createListItem(validation.text);
  list.appendChild(item);
  
  input.value = '';
  input.focus();
};

// --- OPTIMIZACIÓN ARQUITECTÓNICA: DELEGACIÓN DE EVENTOS ---
// En lugar de añadir un listener a cada botón individualmente (lo que genera overhead),
// manejamos los eventos en el contenedor padre ('list').
list.addEventListener('click', (e) => {
  const goodBtn = e.target.closest('.good-btn');
  const deleteBtn = e.target.closest('.delete-btn');

  if (goodBtn) {
    const li = goodBtn.closest('.list-item');
    const textSpan = li.querySelector('.item-text');
    
    goodBtn.classList.toggle('completed');
    textSpan.classList.toggle('completed');
  }

  if (deleteBtn) {
    const li = deleteBtn.closest('.list-item');
    li.classList.add('removing');
    li.addEventListener('transitionend', () => li.remove(), { once: true });
  }
});

// Event Listeners principales
addBtn.addEventListener('click', addItem);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addItem();
});
