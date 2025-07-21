import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Application, Chat, Freelancer, Project, User } from './Schema.js';
import { Server } from 'socket.io';
import http from 'http';
import SocketHandler from './SocketHandler.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug: Check Mongo URI during development
if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in your .env file.");
    process.exit(1);
}

console.log("✅ Using Mongo URI:", process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: "Server is running ✅" });
});

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);
    SocketHandler(socket);
});

// Use PORT from env
const PORT = process.env.PORT || 6001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    // ------------------ AUTH ROUTES -------------------
    app.post('/register', async (req, res) => {
        try {
            const { username, email, password, usertype } = req.body;
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: passwordHash,
                usertype
            });

            const user = await newUser.save();

            if (usertype === 'freelancer') {
                const newFreelancer = new Freelancer({
                    userId: user._id
                });
                await newFreelancer.save();
            }

            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) return res.status(400).json({ msg: "User does not exist" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // ------------------ FETCH PROJECTS ROUTE -------------------
    app.get('/fetch-projects', async (req, res) => {
        try {
            const projects = await Project.find();
            res.status(200).json(projects);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

    // ------------------ ADDITIONAL ROUTES -------------------
    // Place your bids, applications, submissions, chats, etc., routes here as needed.

    // ------------------ START SERVER -------------------
    server.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("❌ Error in DB connection:", err);
    process.exit(1);
});
