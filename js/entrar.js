document.addEventListener('DOMContentLoaded', () =>{

    const formLogin = document.getElementById('form-login');
    const mensagemErroLogin = document.getElementById('mensagem-erro-login');

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('validationTooltipUsername').value;
        const senha = document.getElementById('validationTooltip02').value;

        try {
            const response = await fetch('/.netlify/functions/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha})
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('username', data.username);
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userSenha', data.senha);
                window.location.href = 'home.html';
            } else if (response.status === 401) {
                mensagemErroLogin.textContent = 'Email ou senha incorretos.';
            } else {
                mensagemErroLogin.textContent = 'Erro ao tentar fazer login. Tente novamente mais tarde.';
                console.error('Erro no login:', response.status,response.statusText);
            }
        } catch (erro) {
            mensagemErroLogin.textContent = 'Errp de rede ao tentar fazer login. Verifique sua conexão.';
            console.error('Erro de rede no login:', error);
        }
    })

});