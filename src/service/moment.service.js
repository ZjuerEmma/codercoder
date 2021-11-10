const connection = require('../app/database')

const sqlFragments = `SELECT m.id id, m.content content, m.createdAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name) author FROM moment m LEFT JOIN user u on m.user_id = u.id  `

class MomentService {
    async createMoment(userId, content) {
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
        const result = await connection.execute(statement, [userId, content])
        return result[0]
    } 

    async getMomentById(momentId) {
        const statement = `
        SELECT 
	m.id id, m.content content, m.createdAt createTime, m.updateAt updateTime,
	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
	IF(COUNT(l.id),JSON_ARRAYAGG(
		JSON_OBJECT('id', l.id, 'name', l.name)
	),NULL) labels,
	(SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
		JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
								'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
	),NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
	(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:7979/moment/images/', file.filename)) 
	FROM file WHERE m.id = file.moment_id) images
FROM moment m
LEFT JOIN user u ON m.user_id = u.id
LEFT JOIN moment_label ml ON m.id = ml.moment_id
LEFT JOIN label l ON ml.label_id = l.id
WHERE m.id = ?
GROUP BY m.id;
`
        
        // 获取一条moment下方的所有评论信息；
        // const statement = `SELECT m.id id, m.content momentContent, m.createdAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name) author,
        // JSON_ARRAYAGG(
        // JSON_OBJECT('id', c.id, 'commentContent', c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 'user', JSON_OBJECT('id',cu.id,'name',cu.name))
        // ) comments
        // FROM moment m 
        // LEFT JOIN user u on m.user_id = u.id
        // LEFT JOIN comment c ON  c.moment_id = m.id
        // LEFT JOIN user cu ON c.user_id = cu.id
        // WHERE m.id = ?
        // GROUP BY m.id;`

        

        // const statement = `
        // SELECT m.id id, m.content content, m.createdAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name) author FROM moment m 
        // LEFT JOIN user u on m.user_id = u.id 
        // WHERE m.id = ?;
        // `
        // const statement = `${sqlFragments}WHERE m.id = ?;`

        try {
        const [result] = await connection.execute(statement, [momentId])
        return result[0]
        } catch (error) {
            console.log(error)
        }
        console.log(result)
        
    }

    async getMomentList(offset, size) {
        const statement = `
        SELECT 
	m.id id, m.content content, m.createdAt createTime, m.updateAt updateTime,
	JSON_OBJECT('id', u.id, 'name', u.name) user,
	(SELECT COUNT(*) FROM moment_label WHERE moment_label.moment_id = m.id) labelCount,
	(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:7979/moment/images/', file.filename)) 
	FROM file WHERE m.id = file.moment_id) images
FROM moment m
LEFT JOIN user u ON m.user_id = u.id
GROUP BY m.id
LIMIT ? OFFSET ?;
        `  
        // const statement = `${sqlFragments}LIMIT ? OFFSET ?;`
        const [result] = await connection.execute(statement, [size, offset])

        
    
        return result
    }

    async update(content, momentId) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`
        const [result] = await connection.execute(statement, [content, momentId])
        
        return result
    }
    
    async remove(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?;`
        const [result] = await connection.execute(statement, [momentId])
        return result
    }

    async addLabels(momentId, labels) {
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?);`
        const result = await connection.execute(statement, [momentId, labels])
        return result[0]
    }

    async hasLabel(momentId, labelId) {
        
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
        
        const [result] = await connection.execute(statement, [momentId, labelId] )
        return result[0] ? true : false
    }

}

module.exports = new MomentService() 