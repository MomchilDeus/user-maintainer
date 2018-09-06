const Router = require('koa-router')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const router = new Router()
const api = new Router()

// @route   GET api/
// @desc    GET all users
// @access  Public
router.get(
    '/',
    (ctx, next) => {
        return User.findAll().then(users => {
            ctx.body = users
        })
    },
)

// @route   PUT api/
// @desc    Create new user
// @access  Public
router.put(
    '/',
    (ctx, next) => {
        User.findOne({
            where: {
                email: ctx.request.body.email
            }
        })
        .then(user => {
            if (user !== null) console.log('user already exists')
            else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(ctx.request.body.password, salt)
                User.create({
                    email: ctx.request.body.email,
                    password: hash
                })
            }
        })
        .catch(err => ctx.body = 'error during findOne')
    }
)

// @route   POST api/:id
// @desc    Update (EDIT) user
// @access  Public
router.post(
    '/1',
    (ctx, next) => {
        console.log('POST')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(ctx.request.body.password, salt)
        User.update({
            email: ctx.request.body.email,
            password: hash
        }, {
            where: {
                id: 1
            }
        })
        .then(user => console.log('updated'))
        .catch(user => console.log('error updating'))
    }
)

// @route   DELETE api/:id
// @desc    DELETE user
// @access  Public
router.delete(
    '/3',
    (ctx, next) => {
        User.findOne({
            where: {
                id: 3
            }
        })
        .then(user => {
            if (user !== null) user.destroy()
            else console.log('no such user found')
        })
        .catch(err => ctx.body = 'error during findOne')
    }
)

api.use('/api', router.routes(), router.allowedMethods())

module.exports = api