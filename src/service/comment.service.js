const connection = require('../app/database')

class CommentService {
    async create(content, momentId, id) {
       
        const statement = `
        INSERT INTO comment (content, moment_id,user_id) VALUES (?,?,?);`
        const result = connection.execute(statement, [content, momentId, id])
        
        return result
    }

    async commentReply(content, momentId, commentId, id) {
        const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?,?,?,?);`
        
        const result = await connection.execute(statement, [content, momentId, commentId, id])
        
        return result 
    }

    async commentUpdate(content, commentId) {
        const statement = `UPDATE comment SET content = ? WHERE comment_id = ?;`
        
        const result = await connection.execute(statement, [content, commentId])

        return result
    }

    async commentRemove(commentId) {
        const statement = `
        DELETE FROM comment WHERE id = ?;
        `
        const result = await connection.execute(statement, [commentId])

        return result
    }

    async getCommentList(momentId) {
        // const statement = `SELECT * FROM comment WHERE moment_id = ?`
        const statement = `SELECT c.id, c.content, c.comment_id, c.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
        FROM comment c
        LEFT JOIN user u ON u.id = c.user_id
        WHERE c.moment_id = ?;`
        const [result] = await connection.execute(statement, [momentId])

        return result
    }
}

module.exports = new CommentService()