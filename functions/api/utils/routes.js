import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/', // Path Express padrão - raiz da API
        handler: (req, res) => {
            const { search } = req.query // Express req.query para query parameters
            const users = database.select('api', search ? {
                name: search,
                email: search,
                senha: search,
                qtdpet: search
            } : null)

            return res.json(users) // res.json() para retornar JSON
        }
    },
    {
        method: 'POST',
        path: '/', // Path Express padrão - raiz da API
        handler: (req, res) => {
            const { name, email, senha, qtdpet } = req.body // Express req.body para corpo da requisição
            const user = {
                id: randomUUID(),
                name,
                email,
                senha,
                qtdpet,
            }
            database.insert('api', user)

            return res.status(201).send() // res.status(201).send() para status 201 (Created) e resposta vazia
        }
    },
    {
        method: 'PUT',
        path: '/perfil/:id', // Path Express padrão com parâmetro :id para atualizar perfil por ID
        handler: (req, res) => {
            const { id } = req.params // Express req.params para parâmetros de rota
            const { name, email, senha, qtdpet } = req.body // Express req.body para corpo da requisição

            database.update('api', id, {
                name,
                email,
                senha,
                qtdpet,
            })

            return res.status(204).send() // res.status(204).send() para status 204 (No Content) e resposta vazia
        }
    },
    {
        method: 'DELETE',
        path: '/api/:id', // Path Express padrão com parâmetro :id para deletar usuário por ID (endpoint /api/ para DELETE)
        handler: (req, res) => {
            const { id } = req.params // Express req.params para parâmetros de rota

            database.delete('api', id)

            return res.status(204).send() // res.status(204).send() para status 204 (No Content) e resposta vazia
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: async (req, res) => { // Handler agora é async
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
        path: '/perfil', // Path Express padrão para rota de perfil GET
        handler: async (req, res) => {
            return res.status(200).json({ message: 'Rota de perfil (sem proteção real no backend - Opção 1). Autenticação simulada no frontend.' }); // res.status(200).json() para status 200 (OK) e resposta JSON
        }
    },
    {
        method: 'PUT',
        path: '/perfil/:id', // Path Express padrão com parâmetro :id para rota de perfil PUT (mesmo path que o PUT anterior, mas handlers diferentes)
        handler: async (req, res) => {
            const { id } = req.params; // Express req.params para parâmetros de rota
            const { name, qtdpet, senha, email } = req.body; // Express req.body para corpo da requisição

            if (!id) {
                return res.status(400).json({ message: 'ID do usuário não fornecido.' }); // res.status(400).json() para status 400 (Bad Request) e resposta JSON
            }
            if (!name && !qtdpet && !senha && !email) {
                return res.status(400).json({ message: 'Nenhum dado para atualizar fornecido.' }); // res.status(400).json() para status 400 (Bad Request) e resposta JSON
            }

            const dadosParaAtualizar = {
                name: name,
                email: email,
                senha: senha,
                qtdpet: qtdpet,
            };

            try {
                database.update('api', id, dadosParaAtualizar);
                return res.status(204).send(); // res.status(204).send() para status 204 (No Content) e resposta vazia
            } catch (error) {
                console.error('Erro ao atualizar perfil:', error);
                return res.status(500).json({ message: 'Erro interno ao atualizar perfil.' }); // res.status(500).json() para status 500 (Internal Server Error) e resposta JSON
            }
        }
    },
];