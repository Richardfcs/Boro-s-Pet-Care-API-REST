import express from 'express';
import serverless from "serverless-http";
import { routes } from './utils/routes.js'; // Verifique o path

const app = express();

// app.use(bodyParser.json()); // COMENTADO
// app.use(cors()); // COMENTADO

console.log("Rotas antes do forEach:", routes);

routes.forEach(route => {
    console.log("----- INÍCIO DO REGISTRO DA ROTA -----");
    console.log("Método:", route.method);
    console.log("Path:", route.path);
    console.log("Handler:", route.handler);

    // Log ANTES de registrar a rota
    console.log("app.routes ANTES do registro:", app.routes);

    app[route.method.toLowerCase()](route.path, route.handler);

    // Log DEPOIS de registrar a rota
    console.log("app.routes DEPOIS do registro:", app.routes);
    console.log("----- FIM DO REGISTRO DA ROTA -----");
});

console.log("Rotas após forEach:", app.routes); // Mantenha este log

export const handler = serverless(app);