import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    async #persist() { // Função #persist continua async e com await (boa prática)
        await fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
    }

    select(table, search) {
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        return data
    }

    async insert(table, data) { // Função insert continua async
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        await this.#persist() // await para esperar a persistência

        return data
    }

    async update(table, id, data) { // Função update continua async
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data }
            await this.#persist() // await para esperar a persistência
        }
    }

    async delete(table, id) { // Função delete continua async
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            await this.#persist() // await para esperar a persistência
        }
    }

    findUserByEmail(table, email) { // Função findUserByEmail volta a ser síncrona (sem bcrypt)
        const data = this.#database[table] ?? [];
        return data.find(user => user.email === email); // Retorna o usuário encontrado (ou undefined)
    }
}