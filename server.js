const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = 5151;

// Connect to the database
connectDB();
// Ask the server to accept JSON objects in the body of the POST/GET requests
app.use(express.json({ extended: false }));

// Make a request to "http://localhost:5050" to see if it's running
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/auth", require("./routes/api/auth"));
// Relevant routes for users that are maes
app.use("/api/maes", require("./routes/api/maes"));
// Relevant routes for all users (students and maes)
app.use("/api/users", require("./routes/api/users"));
app.use("/api/tutoring", require("./routes/api/tutoring"));
//app.use("/api/students", require("./routes/api/students"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
