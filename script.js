// Function to register a user
function registerUser() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('role').value;

    const usernamePattern = /^[a-zA-Z]+[0-9]+_[0-9]{1,2}[a-zA-Z]$/;

    console.log("Registering user with:", { username, password, role });

    if (!usernamePattern.test(username)) {
        alert("Невалидно потребителско име. Трябва да бъде във формат: ivan18_10a.");
        return false;
    }

    if (password.length < 8) {
        alert("Паролата трябва да е поне 8 символа.");
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === username)) {
        alert("Това потребителско име вече е заето.");
        return false;
    }

    users.push({ username, password, role, logs: [] });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Успешна регистрация!");
    return true;
}

// Function to log in a user
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    console.log("Logging in with:", { username, password });

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        user.logs.push(`Влязъл в системата: ${new Date().toLocaleString()}`);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'home.html';
    } else {
        alert("Грешно потребителско име или парола.");
    }
}

// Function to log out a user
function logout() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        console.log("Logging out user:", currentUser.username);

        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.username === currentUser.username);
        user.logs.push(`Излязъл от системата: ${new Date().toLocaleString()}`);
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Function to display the dashboard
function displayDashboard() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    console.log("Displaying dashboard for:", currentUser.username);

    const userDetails = document.getElementById('userDetails');
    userDetails.innerHTML = `<p>Добре дошъл, ${currentUser.username}!</p>`;

    if (currentUser.role === 'teacher') {
        const users = JSON.parse(localStorage.getItem('users'));
        userDetails.innerHTML += `<h3>Потребители:</h3><ul>`;
        users.forEach(u => {
            userDetails.innerHTML += `<li>${u.username} - Действия: ${u.logs.join(', ')}</li>`;
        });
        userDetails.innerHTML += `</ul>`;
    }
}

// Auto-login check function
(function autoLogin() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log("Auto-login check:", { currentUser, currentPath: window.location.pathname });

    if (currentUser && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'home.html';
    }
})();

// Chat functionality

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('chat-hidden');
}

function minimizeChatWindow() {
    const chatWindow = document.getElementById('chat-window');
    const chatContent = document.getElementById('chat-content');
    const isMinimized = chatWindow.style.height === '50px';

    if (isMinimized) {
        chatWindow.style.height = '400px';
        chatContent.style.display = 'block';
        document.getElementById('chat-input-container').style.display = 'flex';
        document.getElementById('minimize-button').textContent = '_';
    } else {
        chatWindow.style.height = '50px';
        chatContent.style.display = 'none';
        document.getElementById('chat-input-container').style.display = 'none';
        document.getElementById('minimize-button').textContent = '+';
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (message) {
        const chatContent = document.getElementById('chat-content');
        
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatContent.appendChild(messageElement);

        chatContent.scrollTop = chatContent.scrollHeight;
        input.value = '';
    }
}
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        user.logs.push(`Влязъл в системата: ${new Date().toLocaleString()}`);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'home.html'; // Пренасочване след логин
    } else {
        alert("Грешно потребителско име или парола.");
    }
}
