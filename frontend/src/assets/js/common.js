// URL base da sua API (assegure-se que está correta)
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Função para salvar o token JWT e a role do usuário no localStorage
function saveAuthData(token, role) {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('user_role', role);
    console.log('Dados de autenticação salvos:', { token, role });
}

// Função para obter o token JWT do localStorage
function getAuthToken() {
    return localStorage.getItem('jwt_token');
}

// Função para obter a role do usuário do localStorage
function getUserRole() {
    return localStorage.getItem('user_role');
}

// Função para remover o token e a role (logout)
function clearAuthData() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    console.log('Dados de autenticação removidos.');
}

// Função para redirecionar o usuário com base na role
function redirectToDashboard(role) {
    let redirectUrl = '/frontend/src/pages/auth/login.html';

    switch (role) {
        case 'admin':
            redirectUrl = '/frontend/src/pages/admin/index.html';
            break;
        case 'motorista':
            redirectUrl = '/frontend/src/pages/motorista/index.html';
            break;
        case 'passageiro':
            redirectUrl = '/frontend/src/pages/passageiro/index.html';
            break;
        case 'centralControle':
            redirectUrl = '/frontend/src/pages/central-controle/index.html';
            break;
        default:
            console.warn('Role desconhecida ou não especificada, redirecionando para a página inicial de login.');
            break;
    }
    window.location.href = redirectUrl;
}

// Exporta as funções para que possam ser usadas em outros scripts
// Nota: Em um projeto real com módulos JS, você usaria 'export'.
// Como estamos usando scripts simples em HTML, vamos anexá-las ao 'window'
// ou garantir que o script seja carregado antes de ser usado.
window.magebus = {
    API_BASE_URL,
    saveAuthData,
    getAuthToken,
    getUserRole,
    clearAuthData,
    redirectToDashboard
};