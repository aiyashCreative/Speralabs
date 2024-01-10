const { Sequelize } = require("sequelize")
const { relationSetup } = require("./relation-setup")

const DB_Host = process.env.DB_HOST
const DB_username = process.env.DB_USERNAME
const DB_Password = process.env.DB_PASSWORD
const DB_Name = process.env.DB_NAME
const DB_Port = process.env.DB_PORT


const sequelize = new Sequelize(
  DB_Name,
  DB_username,
  DB_Password,
  {
    host: DB_Host,
    port: DB_Port,
    dialect: 'mysql',
    operatorsAliases: 0,
    timezone: '+05:30'
  }
)

const modelDefiners = [
  require('./models/userModel'),
  require('./models/cryptoCurrencyModel'),
  require('./models/cryptoCurrencyUsersTable'),
]

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

relationSetup(sequelize)

module.exports = sequelize;
global.sequelize = sequelize;