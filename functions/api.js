import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import serverless from "serverless-http"; // Certifique-se de que esta importação está presente!

import { routes } from './utils/routes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

routes.forEach(route => {
    app[route.method.toLowerCase()](route.path, route.handler);
});

export const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return res.status(200).json({ message: "API Boro's Pet Care funcionando! Use os endpoints corretos (POST / para cadastro, etc.)." });
        }
    },
    // ... (suas outras rotas POST, PUT, DELETE) ...
];

export const handler = serverless(app);
// Certifique-se de que esta linha de exportação está EXATAMENTE como mostrado!