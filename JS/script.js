document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');

  if (password !== confirmPassword) {
    errorMessage.textContent = 'As senhas não coincidem!';
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  let users = loadUsers();
  if (users.some(user => user.email === email)) {
    errorMessage.textContent = 'Email já cadastrado!';
    errorMessage.style.display = 'block';
    return;
  }

  // Adicionar o novo usuário à lista de usuários
  users.push({ name: name, email: email, password: password });
  saveUsers(users);

  // Exibir mensagem de sucesso e redirecionar para a página de login
  successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para a página de login...';
  successMessage.style.display = 'block';

  setTimeout(function() {
    window.location.href = '../paginas/login.html';
  }, 2000);
});

function loadUsers() {
  let users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
