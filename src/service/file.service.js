const connection = require('../app/database')

class FileService {
    async saveAvatar(mimetype, filename, size, userId) {
        const statement = `
        INSERT INTO avatar (mimetype, filename, size, user_id)
        VALUES (?,?,?,?)`
        const result = await connection.execute(statement, [mimetype, filename, size, userId])
        return result
    }

    async getAvatarByUserId(userId) {
    
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        try {
            const result = await connection.execute(statement, [userId])
            
            return result
        } catch (error) {
            console.log(error, 'error')
        }
        
    }

    async createPicture(userId, momentId, filename, mimetype, size) {
    const statement = `INSERT INTO file (user_id, moment_id, filename, mimetype, size) VALUES (?, ?, ?, ?, ?);`
    const result = await connection.execute(statement, [userId, momentId, filename, mimetype, size])
    }

    async getFileByFilename(filename) {
        const statement = `SELECT * FROM file WHERE filename = ?;`
        
        try {
            const result = await connection.execute(statement, [filename])
            
            return result
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

module.exports = new FileService()