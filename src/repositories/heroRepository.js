  
const { readFile, writeFile } = require('fs/promises')
class HeroRepository {
    constructor({ file }) {
        this.database = file
    }

    async _currentFileContent() {
        return JSON.parse((await readFile(this.database)))
    }
    
    async find(itemId) {
        const all = await this._currentFileContent()
        if (!itemId) return all

        return all.find(( {id} ) => itemId === id)
        //all.find is not a function
    }

    async create(data) {
        const currentFile = await this._currentFileContent()
        currentFile.push(data)

        await writeFile(this.database, JSON.stringify(currentFile))
        return data.id
    }
}

module.exports = HeroRepository;

heroRepository = new HeroRepository({ file: './../../database/data.json'})

heroRepository.find(1).then(console.log);