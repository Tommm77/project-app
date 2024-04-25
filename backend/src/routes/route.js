module.exports = (app) => {
    require('./auth/authRoute')(app)
    require('./user/userRoute')(app)
}