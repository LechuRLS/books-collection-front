const showUsersBtn = document.getElementById('show-users');
const showBooksBtn = document.getElementById('show-books');
const output = document.getElementById('output');
const loader = document.getElementById('loader');

const backendUrl = 'http://localhost:3000';

async function fetchData(endpoint) {
  output.innerHTML = '';
  loader.style.display = 'block';

  try {
    const res = await fetch(`${backendUrl}/${endpoint}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();

    console.log('Datos recibidos de', endpoint, data);

    if (endpoint === 'users') {
      output.innerHTML = data.map(user => `
        <div class="card">
          <p><strong>Nombre:</strong> ${user.nombre} ${user.apellidos}</p>
          <p><strong>Correo:</strong> ${user.correo}</p>
          <p><strong>Colección:</strong> ${user.coleccion.join(', ')}</p>
          <p><strong>Wishlist:</strong> ${user.wishlist.join(', ')}</p>
        </div>
      `).join('');
    } else {
      output.innerHTML = data.map(book => `
        <div class="card">
          <img src="${book.imagen}" alt="${book.titulo}" width="100" />
          <p><strong>Título:</strong> ${book.titulo}</p>
          <p><strong>Autor:</strong> ${book.autor}</p>
          <p><strong>Publicado:</strong> ${book.fechaPublicacion}</p>
        </div>
      `).join('');
    }

  } catch (err) {
    output.innerHTML = `<p style="color:red;">${err.message}</p>`;
  } finally {
    loader.style.display = 'none';
  }
}


showUsersBtn.addEventListener('click', () => fetchData('users'));
showBooksBtn.addEventListener('click', () => fetchData('books'));
