const commentService = require('../service/comment.service')

class CommentController {
    async createComment(ctx, next) {
        const { content, momentId } = ctx.request.body
        const { id } = ctx.user
        
        const result = await commentService.create(content, momentId, id)
        
        ctx.body = result
    }

    async reply(ctx, next) {
        const { commentId } = ctx.params
        
        const { content, momentId } = ctx.request.body
        const { id } = ctx.user
        
        const result = await commentService.commentReply(content, momentId, commentId, id)
        
        ctx.body = result
    }

    async update(ctx, next) {
        const { commentId } = ctx.params
        const { content } = ctx.request.body
        
        const result = await commentService.commentUpdate(content, commentId)
        
        ctx.body = result
        
    }

    async remove(ctx, next) {
        const { commentId } = ctx.params
        const result = await commentService.commentRemove(commentId)

        ctx.body = result
    }

    async commentList(ctx, next) {
        const { momentId } = ctx.query
        const result = await commentService.getCommentList(momentId)

        ctx.body = result
    }
}

module.exports = new CommentController()