const labelService = require('../service/label.service')

class LabelController {
    async createLabel(ctx, next) {
        const { name } = ctx.request.body
        const result = await labelService.create(name) 
        ctx.body = result
    }

    async labelList(ctx, next) {
        const { limit, offset } = ctx.query
        const result = await labelService.getLabelList(limit, offset)
        ctx.body = result 
    }
}

module.exports = new LabelController()