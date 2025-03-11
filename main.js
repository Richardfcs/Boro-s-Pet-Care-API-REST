(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

document.querySelectorAll('.offcanvas a.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const offcanvasEl = document.getElementById('offcanvasNavbar');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (offcanvas) {
      offcanvas.hide();
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const linkPerfilNome = document.getElementById('link-perfil-nome'); // Seleciona o link pelo ID
  const username = localStorage.getItem('username'); // Obtém o nome do usuário do localStorage

  if (linkPerfilNome && username) { // Verifica se o link e o username foram encontrados
      linkPerfilNome.textContent = username; // Define o texto do link para o nome do usuário
  }
});