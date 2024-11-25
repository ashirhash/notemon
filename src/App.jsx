import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      await fetch("http://localhost:3001/api/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input }),
      });
      await getTodos();
      setInput("");
    }
  };
  const handleEdit = async (id, newName) => {
    await fetch("http://localhost:3001/api/todos/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name: newName }),
    });
    await getTodos();
  };
  const handleDelete = async (id) => {
    await fetch("http://localhost:3001/api/todos/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await getTodos();
  };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/todos");
      const data = await response.json();
      const updatedData = data.map((item) => ({
        ...item,
        isEditable: false,
        name: item.name || "",
      }));
      setTodos(updatedData);
    } catch (error) {
      console.error("Error fetching todos. Error: ", error);
    }
  };

  const toggleEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isEditable: !todo.isEditable } : todo
      )
    );
  };

  const handleEditChange = (id, value) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, name: value || "" } : todo
      )
    );
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="text-3xl p-5 text-yellow-100">Mongo Memberlist</div>
      <div className="p-5">
        <form onSubmit={handleSubmit} className="flex gap-5 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent p-1 text-lg border"
            type="text"
          />
          <button type="submit" className="border px-5">
            Save
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => {
            return (
              <div key={todo._id} className="flex gap-5 py-2">
                {todo.isEditable ? (
                  <>
                    <input
                      value={todo.name || ""}
                      onChange={(e) =>
                        handleEditChange(todo._id, e.target.value)
                      }
                      className="bg-transparent p-1 text-lg border"
                      type="text"
                    />
                    <button
                      onClick={() => toggleEdit(todo._id)}
                      className="border rounded-full bg-red-50 text-black text-sm px-5"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEdit(todo._id, todo.name)}
                      className="border rounded-full bg-red-50 text-black text-sm px-5"
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <li key={index} className="p-1">
                      {todo.name}
                    </li>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="border rounded-full bg-red-50 text-black text-sm px-5"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleEdit(todo._id)}
                      className="border rounded-full bg-red-50 text-black text-sm px-5"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
