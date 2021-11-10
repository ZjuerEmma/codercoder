const Router = require('koa-router')
const { 
    verifyAuth,
    verifyPermission,
    verifyLogin
 } = require('../middleware/auth.middleware')
const { 
    createComment,
    reply,
    update,
    remove,
    commentList    
} = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/',verifyAuth, createComment)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
commentRouter.get('/', commentList)

module.exports = commentRouter