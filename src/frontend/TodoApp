import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos`);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim() !== "") {
            try {
                const response = await fetch(`${API_BASE_URL}/todos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: newTodo }),
                });
                if (!response.ok)
                    throw new Error("Network response was not ok");
                const data = await response.json();
                setTodos([...todos, data]);
                setNewTodo("");
            } catch (error) {
                console.error("Error adding todo:", error);
            }
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: "PUT",
            });
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Network response was not ok");
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Todo-App</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="flex-grow p-2 border rounded-l-lg"
                    placeholder="Neue Aufgabe hinzufügen"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white p-2 rounded-r-lg"
                >
                    Hinzufügen
                </button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo._id}
                        className="flex items-center justify-between p-2 border-b"
                    >
                        <span
                            className={`flex-grow ${
                                todo.completed
                                    ? "line-through text-gray-500"
                                    : ""
                            }`}
                        >
                            {todo.text}
                        </span>
                        <div>
                            <button
                                onClick={() => toggleTodo(todo._id)}
                                className="mr-2 text-green-500"
                            >
                                {todo.completed ? "Rückgängig" : "Erledigt"}
                            </button>
                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className="text-red-500"
                            >
                                Löschen
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
