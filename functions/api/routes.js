import { randomUUID } from 'node:crypto'
import { Database } from './database.js' // Importe o Database
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/api'),
        handler: (req, res) => {
            const { search } = req.query
            const users = database.select('api', search ? {
                name: search,
                email: search,
                senha: search,
                qtdpet: search
            } : null)

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/api'),
        handler: (req, res) => {
            const { name, email, senha, qtdpet } = req.body
            const user = {
                id: randomUUID(),
                name,
                email,
                senha,
                qtdpet,
            }
            database.insert('api', user)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/api/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email, senha, qtdpet } = req.body

            database.update('api', id, {
                name,
                email,
                senha,
                qtdpet,
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/api/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('api', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/api/login'),
        handler: async (req, res) => {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ message: 'Email e senha são obrigatórios.' }));
            }

            const users = database.select('api', { email });
            const user = users[0];

            if (!user) {
                return res.writeHead(404, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ message: 'Usuário não encontrado.' }));
            }
            if (user.senha !== senha) {
                return res.writeHead(401, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ message: 'Credenciais inválidas.' }));
            }
            return res.writeHead(200, { 'Content-Type': 'application/json' })
                .end(JSON.stringify({ message: 'Login bem-sucedido!', username: user.name, email: user.email }));
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/api/perfil'),
        handler: async (req, res) => {
            return res.writeHead(200, { 'Content-Type': 'application/json' })
                .end(JSON.stringify({ message: 'Rota de perfil (sem proteção real no backend - Opção 1). Autenticação simulada no frontend.' }));
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/api/perfil/:id'),
        handler: async (req, res) => {
            const { id } = req.params;
            const { name, qtdpet, senha, email } = req.body;
    
            if (!id) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ message: 'ID do usuário não fornecido.' }));
            }
            if (!name && !qtdpet && !senha && !email) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ message: 'Nenhum dado para atualizar fornecido.' }));
            }
    
            const dadosParaAtualizar = {
                name: name,
                email: email,
                senha: senha,
                qtdpet: qtdpet,
            };
    
            try {
                database.update('api', id, dadosParaAtualizar);
                return res.writeHead(204).end();
            } catch (error) {
                console.error('Erro ao atualizar perfil:', error);
                return res.writeHead(500, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ message: 'Erro interno ao atualizar perfil.' }));
            }
        }
    },
]