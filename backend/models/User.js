const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

// User.sync({force: true}).then(() => {
//     return User.create({
//         email: 'john.doe@gmail.com',
//         password: 'johndoe123'
//     })
// })

module.exports = User