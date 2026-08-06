const domicilio = document.getElementById('btn-domicilios');
const mensaje = document.getElementById('mensaje-domicilio');

const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const textArea = document.getElementById('mensaje');
const formulario = document.querySelector('form');
const btnForm = document.getElementById('btn-validacion');
const mensajeFormulario = document.getElementById('mensaje-formulario');

function activarCarga(boton, elementoMensaje, textoExito) {
  if (!boton || !elementoMensaje) return;

  boton.disabled = true;
  boton.classList.add('is-loading');
  boton.innerHTML = '<span class="spinner"></span>Procesando...';
  elementoMensaje.textContent = '';
  elementoMensaje.classList.remove('show');

  setTimeout(() => {
    elementoMensaje.textContent = textoExito;
    elementoMensaje.classList.add('show');
    boton.classList.remove('is-loading');
    boton.innerHTML = boton.dataset.originalText || boton.textContent;
    boton.disabled = false;
  }, 2500);
}

if (domicilio && mensaje) {
  domicilio.dataset.originalText = 'Solicitar domicilio';
  domicilio.addEventListener('click', () => {
    activarCarga(domicilio, mensaje, '¡Pedido recibido! En breve te contactaremos.');
  });
}

if (formulario && btnForm && mensajeFormulario) {
  btnForm.dataset.originalText = 'Enviar mensaje';

  formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreValido = nombre.value.trim() !== '';
    const correoValido = correo.value.trim() !== '' && correo.value.includes('@');
    const mensajeValido = textArea.value.trim() !== '';

    if (!nombreValido || !correoValido || !mensajeValido) {
      mensajeFormulario.textContent = 'Por favor completa todos los campos correctamente.';
      mensajeFormulario.classList.add('show');
      return;
    }

    activarCarga(btnForm, mensajeFormulario, '¡Mensaje enviado! Gracias por contactarnos.');
  });
}