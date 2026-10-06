const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

function createListItem(text) {
  const li = document.createElement('li');
  li.className = 'list-item';

  const goodBtn = document.createElement('button');
  goodBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';

  goodBtn.className = 'good-btn';
  goodBtn.addEventListener('click', () => {
    goodBtn.classList.toggle('completed');
    textSpan.classList.toggle('completed');
  });

  const textSpan = document.createElement('span');
  textSpan.className = 'item-text';
  textSpan.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';

  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    li.classList.add('removing');
    li.addEventListener('transitionend', () => li.remove(), { once: true });
  });

  li.appendChild(goodBtn);
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  return li;
}

function addItem() {
  const text = input.value.trim();
  if (!text) return;

  const item = createListItem(text);
  list.appendChild(item);
  input.value = '';
  input.focus();
}


addBtn.addEventListener('click', addItem);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addItem();
});

