module.exports = (app) => {
    require('./auth/authRoute')(app)
    require('./user/userRoute')(app)
    require('./conv/convRoute')(app)
}