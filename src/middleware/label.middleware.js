const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
    const { labels } = ctx.request.body

    const newLabels = []
    for (const name of labels) {
       
        const labelResult = await labelService.getLabelByName(name)
        
        if (!labelResult) {
            const result = await labelService.create(name)
            const label = { id: result.insertId, name }
            newLabels.push(label)
        } else {
            const oldlabels = { id: labelResult.id, name}
            newLabels.push(oldlabels)
        }
        
        
    
    }
    
    ctx.labels = newLabels
    console.log(ctx.labels, '================')
    await next()
}


module.exports = { verifyLabelExists }