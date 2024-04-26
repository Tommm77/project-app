const express = require("express"),
    cors = require("cors"),
    path = require("path"),
    mongoose = require("mongoose"),
    passport = require('passport'),
    passportConfig = require('./src/config/passport')
const {Server} = require("socket.io");
const {verify} = require("jsonwebtoken");
    socketIo = require('socket.io');
    http = require('http');
dotenv = require("dotenv");
dotenv.config({path: path.resolve(__dirname, '.env')});

const app = express()
const server = http.createServer(app); // Créez un serveur HTTP avec Express
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Spécifiez l'origine exacte de votre client
        methods: ["GET", "POST"],
        credentials: true // important si vous utilisez des sessions ou des cookies
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    console.log("Token received:", token); // Vérifiez si le token est correctement reçu
    if (token) {
        verify(token, process.env.SECRET_PASS, (err, decoded) => {
            if (err) {
                console.log("JWT verification error:", err.message);
                return next(new Error('Authentication error'));
            }
            socket.decoded = decoded;
            console.log("JWT decoded:", decoded);
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
});



global.io = io;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => console.log('MongoDB connected successfully.'))
        .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
    origin: '*',
    method: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}))

app.use(express.urlencoded({extended: true}))

app.use(express.json())

require('./src/routes/route')(app)

passport.use(passportConfig.localStrategy);
passport.use(passportConfig.jwtStrategy);

app.get('/', (req, res) => {
    return res.status(200).send('HELLO WORLD')
})
app.use((req, res) => {
    return res.status(404).send('404 NOT FOUND')
})

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});

app.listen(3001, async (err) => {
    if (err){
        console.log('Error in server setup')
    } else {
        console.log(`Server running on at http:${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    }
})