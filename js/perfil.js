document.addEventListener('DOMContentLoaded', () => {

    const botaoDeletarConta = document.getElementById('botao-deletar-conta');
    const mensagemErroPerfil = document.getElementById('mensagem-erro-perfil');
    const botaoSairConta = document.getElementById('botao-sair-conta');
    const nomePerfilSpan = document.getElementById('nome-perfil');
    const emailPerfilSpan = document.getElementById('email-perfil');
    const petsPerfilSpan = document.getElementById('pets-perfil');


    let usuarioAtual = null; 

    function verificarLogin() {
        const username = localStorage.getItem('username');
        const userEmail = localStorage.getItem('userEmail');

        if (!username || !userEmail) {
            console.log('Usuário não logado.');
            window.parent.location.href = '../entrar.html';
            return false;
        }
        console.log(`Usuário logado: ${username} (${userEmail})`);
        return true;
    }

    async function carregarDadosPerfil() {
        if (verificarLogin()) {
            const userEmail = localStorage.getItem('userEmail');

            try {
                const response = await fetch('/.netlify/functions/api');
                if (!response.ok) {
                    mensagemErroPerfil.textContent = 'Erro ao carregar dados do perfil.';
                    return;
                }
                const users = await response.json();
                const currentUser = users.find(user => user.email === userEmail);

                if (currentUser) {
                    usuarioAtual = currentUser;
                    nomePerfilSpan.textContent = currentUser.name || 'Não informado';
                    emailPerfilSpan.textContent = currentUser.email || 'Não informado';
                    petsPerfilSpan.textContent = currentUser.qtdpet || '0';
                } else {
                    mensagemErroPerfil.textContent = 'Usuário não encontrado no perfil.';
                    localStorage.removeItem('username');
                    localStorage.removeItem('userEmail');
                    window.parent.location.href = '../entrar.html';
                }


            } catch (error) {
                mensagemErroPerfil.textContent = 'Erro ao carregar dados do perfil (rede).';
                console.error('Erro ao carregar perfil:', error);
            }
        }
    }

    carregarDadosPerfil();

    botaoDeletarConta.addEventListener('click', async () => {
        if (confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível.')) {
            const userEmailToDelete = localStorage.getItem('userEmail');

            if (!userEmailToDelete) {
                mensagemErroPerfil.textContent = 'Erro ao deletar conta: Email do usuário não encontrado.';
                return;
            }

            try {
                const usersResponse = await fetch('/.netlify/functions/api');
                if (!usersResponse.ok) {
                    mensagemErroPerfil.textContent = 'Erro ao buscar lista de usuários para deletar conta.';
                    return;
                }
                const allUsers = await usersResponse.json();
                const userToDelete = allUsers.find(user => user.email === userEmailToDelete);

                if (!userToDelete || !userToDelete.id) {
                    mensagemErroPerfil.textContent = 'Usuário não encontrado para deletar.';
                    return;
                }

                const response = await fetch(`/.netlify/functions/api/${userToDelete.id}`,
                    { method: 'DELETE' });

                if (response.ok) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('userEmail');
                    window.parent.location.href = '../entrar.html';
                } else {
                    mensagemErroPerfil.textContent = 'Erro ao deletar conta no servidor.';
                }
            } catch (error) {
                mensagemErroPerfil.textContent = 'Erro de rede ao tentar deletar conta.';
                console.error('Erro ao deletar conta:', error);
            }
        }
    });

    botaoSairConta.addEventListener('click', () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userEmail');
        window.parent.location.href = '../entrar.html';
    });

});