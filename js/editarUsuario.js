document.addEventListener('DOMContentLoaded', () => {
    const formEditarUsuario = document.getElementById('form-editar-usuario');
    const mensagemErroEditar = document.getElementById('mensagem-erro-editar');
    const mensagemSucessoEditar = document.getElementById('mensagem-sucesso-editar');
    const editNomeInput = document.getElementById('edit-nome');
    const editEmailInput = document.getElementById('edit-email');
    const editSenhaInput = document.getElementById('edit-senha');
    const editPetsSelect = document.getElementById('edit-pets');

    let usuarioAtual = null;


    function verificarLogin() {
        const username = localStorage.getItem('username');
        const userEmail = localStorage.getItem('userEmail');
    
        if (!username || !userEmail) {
            console.log('Usuário não logado.');
            window.location.href = '../entrar.html';
            return false;
        }
        console.log(`Usuário logado: ${username} (${userEmail})`);
        return true;
    }

    async function carregarDadosPerfilParaEdicao() {
        if (verificarLogin()) {
            const userEmail = localStorage.getItem('userEmail');

            try {
                const response = await fetch('/.netlify/functions/api');
                if (!response.ok) {
                    mensagemErroEditar.textContent = 'Erro ao carregar dados para edição.';
                    return;
                }
                const users = await response.json();
                const currentUser = users.find(user => user.email === userEmail);

                if (currentUser) {
                    usuarioAtual = currentUser;
                    editNomeInput.value = currentUser.name || '';
                    editEmailInput.value = currentUser.email || '';
                    editSenhaInput.value = currentUser.senha || '';
                    editPetsSelect.value = currentUser.qtdpet || '0';

                } else {
                    mensagemErroEditar.textContent = 'Usuário não encontrado para edição.';
                    localStorage.removeItem('username');
                    localStorage.removeItem('userEmail');
                    window.location.href = '../entrar.html';
                }

            } catch (error) {
                mensagemErroEditar.textContent = 'Erro ao carregar dados para edição (rede).';
                console.error('Erro ao carregar dados para edição:', error);
            }
        }
    }

    carregarDadosPerfilParaEdicao();


    formEditarUsuario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nomeAtualizado = editNomeInput.value;
        const emailAtualizado = editEmailInput.value;
        const senhaAtualizada = editSenhaInput.value;
        const petsAtualizado = editPetsSelect.value;

        if (!usuarioAtual) {
            mensagemErroEditar.textContent = 'Erro ao salvar alterações: dados do usuário não carregados.';
            return;
        }

        const dadosAtualizados = {
            name: nomeAtualizado,
            email: emailAtualizado,
            senha: senhaAtualizada,
            qtdpet: petsAtualizado,
        };


        try {
            const response = await fetch(`/.netlify/functions/api/perfil/${usuarioAtual.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            });

            if (response.ok) {
                mensagemSucessoEditar.textContent = 'Perfil atualizado com sucesso!';
                mensagemErroEditar.textContent = '';
                setTimeout(() => {
                    window.location.href = 'perfil.html';
                });
    
            } else {
                mensagemErroEditar.textContent = 'Erro ao salvar alterações no servidor.';
                mensagemSucessoEditar.textContent = '';
                console.error('Erro ao salvar perfil:', response.status, response.statusText);
            }

        } catch (error) {
            mensagemErroEditar.textContent = 'Erro de rede ao tentar salvar alterações.';
            mensagemSucessoEditar.textContent = '';
            console.error('Erro ao salvar perfil (rede):', error);
        }
        console.log("Dados Atualizados Enviados para o Backend:", dadosAtualizados); 
    });

});