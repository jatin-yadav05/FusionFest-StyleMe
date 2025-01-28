let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let mongoose = require("mongoose");
require("dotenv").config();
let port = process.env.PORT;

const razorpay = require("razorpay");
let user = require("./models/UserSchema");
const userRoutes = require("./routes/userRoutes")
const imageRoutes = require('./routes/imageRoutes');
const cors = require("cors");

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}));

// Increase payload limit if needed
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use("/api/auth", userRoutes);
app.use('/api/images', imageRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: false,
        msg: 'Something broke!',
        error: err.message
    });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database is connected successfully");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((e) => {
        console.error('Database connection error:', e);
    });
