const sql = require('mssql/msnodesqlv8')
const sqlConfig = {
    server: 'localhost',
    user: 'sa',
    password: '123',
    database: 'CHUNGKHOAN',
    driver:'msnodesqlv8',
}

const sqlConnect=sql.connect(sqlConfig)

module.exports={sqlConnect,sql};