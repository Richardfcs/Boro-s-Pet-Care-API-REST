// functions/api/teste.js
export const handler = async (event, context) => {
    return {
        statusCode: 200,
        body: "Olá do Netlify Functions! - Teste Simples"
    };
};
