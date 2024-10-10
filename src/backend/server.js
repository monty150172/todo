/*global process*/
/*eslint no-undef: "error"*/

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables");
    process.exit(1);
}

app.use(cors());
app.use(express.json());

// MongoDB Verbindung
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Todo Model
const TodoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// API Endpunkte
app.get("/api/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/api/todos", async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: false,
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put("/api/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});

app.delete("/api/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
