import faunadb from 'faunadb';

const FAUNA_SECRET = process.env.FAUNA_SECRET_KEY;

if (!FAUNA_SECRET) {
    console.error("Erro: Variável de ambiente FAUNA_SECRET_KEY não configurada!");
    process.exit(1);
}

const client = new faunadb.Client({
    secret: FAUNA_SECRET,
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
});

const q = faunadb.query;

export class Database {

    async select(table, search) {
        try {
            const dbs = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(table))),
                    q.Lambda(x => q.Get(x))
                )
            );
            return dbs.data.map(doc => ({ id: doc.ref.id, ...doc.data }));
        } catch (error) {
            console.error("Erro ao selecionar dados do FaunaDB:", error);
            return []; 
        }
    }

    async insert(table, data) {
        try {
            const result = await client.query(
                q.Create(q.Collection(table), { data })
            );
            return { id: result.ref.id, ...result.data };
        } catch (error) {
            console.error("Erro ao inserir dados no FaunaDB:", error);
            return null; 
        }
    }

    async update(table, id, data) {
        try {
            await client.query(
                q.Update(q.Ref(q.Collection(table), id), { data })
            );
            return true;
        } catch (error) {
            console.error("Erro ao atualizar dados no FaunaDB:", error);
            return false;
        }
    }

    async delete(table, id) {
        try {
            await client.query(
                q.Delete(q.Ref(q.Collection(table), id))
            );
            return true;
        } catch (error) {
            console.error("Erro ao excluir dados do FaunaDB:", error);
            return false; 
        }
    }

    async findUserByEmail(table, email) {
        try {
            const dbs = await client.query(
                q.Map(
                    q.Paginate(q.Match(q.Index(`${table}_by_email`), email)),
                    q.Lambda(x => q.Get(x))
                )
            );
            if (dbs.data.length > 0) {
                const doc = dbs.data[0];
                return { id: doc.ref.id, ...doc.data };
            } else {
                return null; 
            }
        } catch (error) {
            console.error("Erro ao buscar usuário por email no FaunaDB:", error);
            return null;
        }
    }
}