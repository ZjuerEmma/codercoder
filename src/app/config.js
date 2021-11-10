const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs. readFileSync(path.resolve(__dirname, './keys/public.key'))

// const PRIVATE_KEY = fs.readFileSync('src/app/keys/private.key')
// const PUBLIC_KYE = fs. readFileSync('src/app/keys/public.key')

// console.log(process.env.APP_PORT)
//const { APP_PORT } = process.env
//从process env中取值，并且复制给APP_PORT，然后导出。
module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY