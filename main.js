// ✅ URL de tu API MockAPI (ya lista)
const API_URL = 'https://68fa8e16ef8b2e621e804ea4.mockapi.io/posts';

const form = document.getElementById('dataForm');
const enviarBtn = document.getElementById('enviarServidor');
const logList = document.getElementById('logList');

function log(mensaje) {
  const li = document.createElement('li');
  li.textContent = mensaje;
  logList.appendChild(li);
  console.log(mensaje);
}

// Guardar localmente
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();

  const datos = JSON.parse(localStorage.getItem('datosPendientes')) || [];
  datos.push({ nombre, correo, fecha: new Date().toLocaleString() });
  localStorage.setItem('datosPendientes', JSON.stringify(datos));

  log(`✅ Dato guardado localmente: ${nombre} (${correo})`);
  form.reset();
});

// Enviar al servidor
enviarBtn.addEventListener('click', async () => {
  const datos = JSON.parse(localStorage.getItem('datosPendientes')) || [];
  if (datos.length === 0) {
    log('⚠️ No hay datos para enviar.');
    return;
  }

  for (const dato of datos) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dato)
      });
      if (res.ok) {
        log(`📡 Enviado al servidor: ${dato.nombre} (${dato.correo})`);
      } else {
        log(`❌ Error al enviar ${dato.nombre}`);
      }
    } catch (err) {
      log(`🚨 Falló la conexión: ${err.message}`);
    }
  }

  // Limpiar los datos locales después de enviar
  localStorage.removeItem('datosPendientes');
});
