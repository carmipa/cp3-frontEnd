
function loadUsers() {
    let users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};


function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
};


function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../index.html'; 
};


function redirectToPOS() {
    window.location.href = '../POS.html'; 
}


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


        users.push({ name: name, email: email, password: password });
        saveUsers(users);


        successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para a página POS...';
        successMessage.style.display = 'block';


        setTimeout(redirectToPOS, 2000);
    });
};

// Login de usuários
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');

        let users = loadUsers();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
        
            successMessage.textContent = 'Login efetuado com sucesso!';
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';

            
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            
            setTimeout(function () {
                window.location.href = '../POS.html'; 
            }, 5000);
        } else {
            
            errorMessage.textContent = 'Email ou senha incorretos!';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    });
};


const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        logout();
    });
};


function displayUserInfo() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('email-info').textContent = `Email: ${loggedInUser.email}`;
        document.getElementById('name-info').textContent = `Nome: ${loggedInUser.name}`;
    } else {
        
        window.location.href = '../index.html';
    }
};

if (document.getElementById('user-info')) {
    displayUserInfo();
};