const API_BASE = 'http://localhost:3000/api/rooms';

const listEl = document.getElementById('room-list');
const formEl = document.getElementById('create-form');
const nameInput = document.getElementById('name-input');

async function loadRooms() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error(`Failed to load rooms (${res.status})`);
  const rooms = await res.json();
  listEl.innerHTML = '';
  rooms.forEach((room) => listEl.appendChild(renderRoom(room)));
}

function renderRoom(room) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = room.name;

  const renameBtn = document.createElement('button');
  renameBtn.textContent = 'Rename';
  renameBtn.onclick = () => renameRoom(room).catch(reportError);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteRoom(room).catch(reportError);

  li.append(span, renameBtn, deleteBtn);
  return li;
}

async function createRoom(name) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(`Failed to create room (${res.status})`);
  await loadRooms();
}

async function renameRoom(room) {
  const name = prompt('New name:', room.name);
  if (!name) return;
  const res = await fetch(`${API_BASE}/${room._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(`Failed to rename room (${res.status})`);
  await loadRooms();
}

async function deleteRoom(room) {
  const res = await fetch(`${API_BASE}/${room._id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete room (${res.status})`);
  await loadRooms();
}

function reportError(err) {
  console.error(err);
  alert(err.message || 'Something went wrong talking to the server.');
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;
  nameInput.value = '';
  createRoom(name).catch(reportError);
});

loadRooms().catch(reportError);
