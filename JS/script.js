// Função para carregar os usuários do localStorage
function loadUsers() {
    let users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Função para salvar os usuários no localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para remover o usuário logado do localStorage
function logout() {
    localStorage.removeItem('loggedInUser');
    
    window.location.href = '../index.html'; // Redireciona para a página de login
}

// Cadastro de usuários
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
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
}

// Login de usuários
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');

        let users = loadUsers();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Login bem-sucedido
            successMessage.textContent = 'Login efetuado com sucesso!';
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';

            // Salvar o usuário logado no localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Após 5 segundos, redireciona para a página específica
            setTimeout(function () {
                window.location.href = '../paginas/POS.html'; // Substitua pelo URL da sua página específica
            }, 5000);
        } else {
            // Login falhou
            errorMessage.textContent = 'Email ou senha incorretos!';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    });
}

// Logout do usuário
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        logout();
        
    });
}

// Exibir informações do usuário logado na página específica
function displayUserInfo() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('email-info').textContent = `Email: ${loggedInUser.email}`;
        document.getElementById('name-info').textContent = `Nome: ${loggedInUser.name}`;
    } else {
        // Se não houver usuário logado, redireciona para a página de login
        window.location.href = '../index.html';
    }
}

if (document.getElementById('user-info')) {
    displayUserInfo();
}
