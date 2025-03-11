import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { routes } from './routes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

routes.forEach(route => {
    app[route.method.toLowerCase()](route.path, route.handler);
});

export const handler = async (event, context) => {
    const server = express();
    server.use(bodyParser.json());
    server.use(cors());

    routes.forEach(route => {
        server[route.method.toLowerCase()](route.path, route.handler);
    });

    const req = {
        method: event.httpMethod,
        url: event.path,
        headers: event.headers,
        body: event.body ? JSON.parse(event.body) : null,
        params: event.queryStringParameters,
    };

    const res = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: null,
        writeHead: function(statusCode, headers) {
            this.statusCode = statusCode;
            this.headers = {...this.headers, ...headers};
        },
        end: function(data) {
            this.body = data;
            return Promise.resolve();
        }
    };

    try {
        const route = routes.find(route => {
            return route.method === req.method && route.path.test(req.url);
        });

        if (route) {
            await route.handler(req, res);
            return {
                statusCode: res.statusCode,
                headers: res.headers,
                body: res.body ? JSON.stringify(res.body) : null,
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Rota não encontrada.' }),
            };
        }

    } catch (error) {
        console.error('Erro na Netlify Function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro interno do servidor.' }),
        };
    }
};