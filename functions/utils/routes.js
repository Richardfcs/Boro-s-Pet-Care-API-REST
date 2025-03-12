import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/api',
        handler: (req, res) => {
            const { search } = req.query
            const users = database.select('api', search ? {
                name: search,
                email: search,
                senha: search,
                qtdpet: search
            } : null)

            return res.json(users)
        }
    },
    {
        method: 'POST',
        path: '/api',
        handler: (req, res) => {
            console.log("----- INÍCIO DO HANDLER POST ----- /api");
            console.log("req (completo):", req); 
            
            const { name, email, senha, qtdpet } = req.body
            const user = {
                id: randomUUID(),
                name,
                email,
                senha,
                qtdpet,
            }
            database.insert('api', user)
            return res.status(200).send("CHEGOU AO HANDLER POST!");
            // return res.status(201).send()
        }
    },
    {
        method: 'PUT',
        path: '/api/perfil/:id',
        handler: (req, res) => {
            const { id } = req.params
            const { name, email, senha, qtdpet } = req.body

            database.update('api', id, {
                name,
                email,
                senha,
                qtdpet,
            })

            return res.status(204).send()
        }
    },
    {
        method: 'DELETE',
        path: '/api/api/:id', // <<< ATENÇÃO AQUI!
        handler: (req, res) => {
            const { id } = req.params

            database.delete('api', id)

            return res.status(204).send()
        }
    },
    {
        method: 'POST',
        path: '/api/login',
        handler: async (req, res) => {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
            }

            const user = await database.findUserByEmail('api', email); // Chamar findUserByEmail (agora async) com await

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            if (user.senha !== senha) { // Comparação de senhas em texto plano (para este exemplo simplificado)
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }
            return res.status(200).json({ message: 'Login bem-sucedido!', username: user.name, email: user.email, id: user.id }); // Incluir id do usuário no retorno
        }
    },
    {
        method: 'GET',
        path: '/api/perfil',
        handler: async (req, res) => {
            return res.status(200).json({ message: 'Rota de perfil (sem proteção real no backend - Opção 1). Autenticação simulada no frontend.' });
        }
    },
    {
        method: 'PUT',
        path: '/api/perfil/:id',
        handler: async (req, res) => {
            const { id } = req.params;
            const { name, qtdpet, senha, email } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'ID do usuário não fornecido.' });
            }
            if (!name && !qtdpet && !senha && !email) {
                return res.status(400).json({ message: 'Nenhum dado para atualizar fornecido.' });
            }

            const dadosParaAtualizar = {
                name: name,
                email: email,
                senha: senha,
                qtdpet: qtdpet,
            };

            try {
                database.update('api', id, dadosParaAtualizar);
                return res.status(204).send();
            } catch (error) {
                console.error('Erro ao atualizar perfil:', error);
                return res.status(500).json({ message: 'Erro interno ao atualizar perfil.' });
            }
        }
    },
];