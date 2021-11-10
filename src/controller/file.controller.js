const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/flie-path')
const { APP_HOST, APP_PORT} = require('../app/config')

class FileController {
    async saveAvatarInfo(ctx, next) {
        const { id } = ctx.user
        const { mimetype, filename, size } = ctx.req.file
        const result = await fileService.saveAvatar(mimetype, filename, size, id)

        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await userService.updateAvatarUrlById(id, avatarUrl)

        ctx.body = '上传头像成功'
    }

    async savePictureInfo(ctx, next) {
        const { id } = ctx.user
        console.log(id)
        const files = ctx.req.files
        const { momentId } = ctx.query
        console.log(id, momentId)
        for (const file of files) {
            const { mimetype, filename, size } = file
            console.log(id, momentId, filename, mimetype, size)
            const result = fileService.createPicture(id, momentId, filename, mimetype, size)
            ctx.body = '上传moment图片成功'
        }
    }
}

module.exports = new FileController()