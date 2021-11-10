const fs = require('fs')

const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/flie-path')

class MomentController {
    async create(ctx, next) {
        const userId = ctx.user.id
        const content = ctx.request.body.content
        const result = await momentService.createMoment(userId, content)
        ctx.body = result
    }

    async momentDetail(ctx, next) {
        const momentId = ctx.params.momentId
        const result = await momentService.getMomentById(momentId)
        ctx.body = result
    }

    async momentList(ctx, next) {
        const { offset, size } = ctx.query
        const result = await momentService.getMomentList(offset, size)
         
        ctx.body = result

    }

    async momentUpdate(ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        
        const result = await momentService.update(content, momentId)
        ctx.body = result
    }

    async momentDelete(ctx, next) {
        const { momentId } = ctx.params  
        
        const result = await momentService.remove(momentId)
        ctx.body = result
    }

    async momentAddLabels(ctx, next) {
        const { momentId } = ctx.params
        
        for (const label of ctx.labels) {
           
            const isExist = await momentService.hasLabel(momentId, label.id)
            console.log(isExist, 'isExist')
            if (!isExist) {
                await momentService.addLabels(momentId, label.id)
            }
        }

        ctx.body = `添加标签成功`
    }
    
    async momentAddFile(ctx, next) {
        let { filename } = ctx.params
        const fileInfo = await fileService.getFileByFilename(filename)
        const { type } = ctx.query
        const types = ['small', 'middle', 'large']

        if(types.some(item => item === type)) {
            filename = filename + '-' + type
        }

        ctx.response.set('content-type', fileInfo.mimetype)
        
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }

}

module.exports = new MomentController()