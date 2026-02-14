// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config()
// import path from 'path';
// import { fileURLToPath } from 'url';
// import questionRoutes from './routes/questionRoutes.js';
// import learnRoutes from './routes/learnRoute.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT;

// // Middlewares
// app.use(cors());
// app.use(express.json()); // Parses incoming JSON requests

// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// // Routes
// app.use('/api/questions', questionRoutes);
// app.use('/api/learn', learnRoutes);

// // MongoDB Connection
// const MONGO_URI = process.env.MONGODB_URI;

// // mongoose.connect(MONGO_URI)
// //     .then(() => {
// //         console.log("Connected to MongoDB");
// //         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// //     }
// //     )
// //     .catch(err => console.log("DB Connection Error: ", err)
// //     );

// // Connect once at startup
// const connectDB = async () => {
//     try {
//         if (mongoose.connection.readyState === 1) {
//             console.log("Already connected to MongoDB");
//             return;
//         }
//         await mongoose.connect(MONGO_URI, {
//             maxPoolSize: 10,
//             serverSelectionTimeoutMS: 5000,
//         });
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Database connection error:", error);
//         process.exit(1);
//     }
// };

// // Call once before listening
// connectDB();

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // app.use(async (req, res, next) => {
// //     if (mongoose.connection.readyState === 1) {
// //         return next();
// //     }
// //     await connectDB();
// //     next();
// // });

// if (process.env.NODE_ENV !== 'production') {
//     const PORT = process.env.PORT || 5000;
//     connectDB().then(() => {
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     });
// }

// export default app;

// app.get("/", (req, res) => {
//     res.send("Welcome to aptitude platform");
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
import path from 'path';
import { fileURLToPath } from 'url';
import questionRoutes from './routes/questionRoutes.js';
import learnRoutes from './routes/learnRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/learn', learnRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            return;
        }
        await mongoose.connect(MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

// Connect on startup
connectDB().catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});

app.get("/", (req, res) => {
    res.send("Welcome to aptitude platform");
});

// Only listen in local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
