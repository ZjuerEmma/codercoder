const Router = require('koa-router')

const { verifyAuth,
        verifyPermission
} = require('../middleware/auth.middleware')

const { 
    create, 
    momentDetail, 
    momentList,
    momentUpdate,
    momentDelete,
    momentAddLabels,
    momentAddFile
    
} = require('../controller/moment.controller.js')

const { verifyLabelExists } = require('../middleware/label.middleware.js')

const momentRouter = new Router({ prefix: '/moment' })


momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', momentList)
momentRouter.get('/:momentId', momentDetail)
momentRouter.patch('/:momentId',verifyAuth, verifyPermission, momentUpdate)
momentRouter.delete('/:momentId',verifyAuth, verifyPermission, momentDelete)

//给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth, verifyPermission, verifyLabelExists, momentAddLabels)

//给动态添加配图（或者其他服务）；
momentRouter.get('/images/:filename', momentAddFile)
module.exports = momentRouter