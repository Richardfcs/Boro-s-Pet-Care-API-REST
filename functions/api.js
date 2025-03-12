import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import serverless from "serverless-http";

import { routes } from './utils/routes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

routes.forEach(route => {
    app[route.method.toLowerCase()](route.path, route.handler);
});

export const handler = serverless(app);
