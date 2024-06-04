import express from "express";
import config from "config";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import cluster from 'cluster';
import os from 'os';

import userRouter from "./controllers/user/index.js";
import notesRouter from "./controllers/notes/index.js";
import database from "./utils/dbConnect.js";

// Determine __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = config.get("PORT");
const SESSION = config.get("SESSION");
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // This event is fired when a worker dies
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork(); // Fork a new worker when one dies
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.use(express.json());
    app.use(cors({
        origin: 'https://notes.suhail.app', // your frontend domain
        credentials: true,
    }));
    app.use(express.static(path.join(__dirname, "build")));
    app.use((req, res, next) => {
        const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`User IP: ${userIP}`);
        next();
    });

    // Connect to the database
    database();

    // Session management
    const hours = 1; // Set the number of hours you want
    const maxAge = hours * 60 * 60 * 1000; // Convert hours to milliseconds

    app.use(session({
        secret: SESSION,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge, httpOnly: true, secure: true }, // Set secure to true
        store: MongoStore.create({
            mongoUrl: config.get("DB_URL"),
            collectionName: 'sessions'
        })
    }));



    // Routes
    app.use("/api/user", userRouter);
    app.use("/api/notes", notesRouter);




    // Catch-all route to serve React app
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    });

    // 404 handler
    app.use((req, res, next) => {
        res.status(404).send("404 - Not Found");
    });

    // General error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("500 - Internal Server Error");
    });

    // Start the server
    app.listen(PORT, () => {

        const interfaces = os.networkInterfaces();
        let serverIP;

        for (let devName in interfaces) {
            let iface = interfaces[devName];
            iface.forEach(alias => {
                if (alias.family === 'IPv4' && !alias.internal) {
                    serverIP = alias.address;
                }
            });
        }

        console.log(`Worker ${process.pid} started and running at http://${serverIP}:${PORT} 🚀`);
    });
}
