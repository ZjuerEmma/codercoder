const path = require('path')

const Multer = require('koa-multer')
const Jimp = require('jimp')


const { AVATAR_PATH, PICTURE_PATH } = require('../constants/flie-path')



const avatarUpload = Multer({
    dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
    dest: PICTURE_PATH
})

//一个动态最多上传9张图片；
const pictureHandler = pictureUpload.array('picture', 9)

//不同状态下的图片大小配置。 可以用sharp.resize(这个库很大)，jimp小一些
const pictureResize = async (ctx, next) => {
    const files = ctx.req.files
    
    for (const file of files) {
        const destPath = path.join(file.destination, file.filename)
        //read方法返回promise
        
        Jimp.read(file.path).then(image => {
            image.resize(1200, Jimp.AUTO).write(`${destPath}-large`)
            image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
            image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
        })
    }
    await next()
}

module.exports = { 
    avatarHandler, 
    pictureHandler,
    pictureResize
}