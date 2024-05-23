function isLoggedIn() {
  return sessionStorage.getItem('loggedIn') === 'true';
}

// Armazena dados do usuário no localStorage
function storeUser(email, name, password) {
  let users = loadUsers();
  users.push({ email, name, password });
  localStorage.setItem('users', JSON.stringify(users));
}

// Carrega dados do "banco de dados" no localStorage
function loadUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para exibir mensagem de sucesso
function showSuccessMessage(message) {
  let successMessage = document.getElementById('success-message');
  successMessage.textContent = message;
  successMessage.style.display = 'block';
  setTimeout(() => {
      successMessage.style.display = 'none';
  }, 5000); // Exibe por 5 segundos
}

// Função para exibir mensagem de erro
function showErrorMessage(message) {
  let errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  setTimeout(() => {
      errorMessage.style.display = 'none';
  }, 5000); // Exibe por 5 segundos
}

// Validação de login
function validateLogin(email, password) {
  let users = loadUsers();
  for (const user of users) {
      if (user.email === email && user.password === password) {
          return true;
      }
  }
  return false;
}

// Função de logout
function logout() {
  sessionStorage.setItem('loggedIn', 'false');
  window.location.href = 'login.html';
}

// Inicialização do script
if (isLoggedIn()) {
  // Se o usuário está logado, redireciona para a página index
  window.location.href = 'index.html';
} else {
  // Se o usuário não está logado, configura o formulário de login
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (validateLogin(email, password)) {
          // Se a validação for bem-sucedida, exibe mensagem de sucesso, armazena dados no sessionStorage e redireciona para index.html
          sessionStorage.setItem('loggedIn', 'true');
          showSuccessMessage('Login realizado com sucesso!');
          window.location.href = 'index.html';
      } else {
          // Se a validação falhar, exibe mensagem de erro
          showErrorMessage('Email ou senha inválidos!');
      }
  });
}

// Funcionalidade da página index
if (window.location.pathname.includes('index.html')) {
  const userInfo = document.getElementById('user-info');
  const emailInfo = document.getElementById('email-info');
  const nameInfo = document.getElementById('name-info');
  const logoutButton = document.getElementById('logout-button');

  // Exibe dados do usuário na página index
  const user = loadUsers().find(user => user.email === sessionStorage.getItem('email'));
  if (user) {
      emailInfo.textContent = `Email: ${user.email}`;
      nameInfo.textContent = `Nome: ${user.name}`;
  } else {
      userInfo.style.display = 'none';
  }

  // Configuração do botão de logout
  logoutButton.addEventListener('click', logout);
}

// Criar "Banco de Dados" no localStorage
if (!localStorage.getItem('users')) {
  const users = [
      { email: 'teste1@example.com', password: 'teste1', name: 'Teste 1' },
      { email: 'teste2@example.com', password: 'teste2', name: 'Teste 2' }
  ];
  localStorage.setItem('users', JSON.stringify(users));
}
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

  storeUser(email, name, password);
  successMessage.textContent = 'Cadastro realizado com sucesso!';
  successMessage.style.display = 'block';
  setTimeout(() => {
      window.location.href = 'login.html';
  }, 3000); // Redireciona para a página de login após 3 segundos
});
