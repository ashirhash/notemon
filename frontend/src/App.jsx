import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "noUrlSet"

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      await fetch(`${backendUrl}/api/todos/create`, {
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
    await fetch(`${backendUrl}/api/todos/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name: newName }),
    });
    await getTodos();
  };
  const handleDelete = async (id) => {
    await fetch(`${backendUrl}/api/todos/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await getTodos();
  };
  const handleDeleteAll = async (todos) => {
    const selectedItems = todos.filter((item) => item.isChecked);
    const selectedIds = selectedItems.map((item) => item._id);
    await fetch(`${backendUrl}/api/todos/deleteall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selectedIds }),
    });
    await getTodos();
  };
  const getTodos = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/todos`);
      const data = await response.json();
      const updatedData = data.map((item) => ({
        ...item,
        isEditable: false,
        isChecked: false,
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
  const toggleCheckboxes = (id) => {
    if (!id) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => ({ ...todo, isChecked: false }))
      );
    }
    else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, isChecked: !todo.isChecked } : todo
        )
      );
    }
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
      <div className="flex  flex-col justify-center items-center  w-full ">

        <div className="text-6xl uppercase  font-bold p-32 max-sm:h-64 max-md:h-96 max-sm:text-4xl max-sm:p-20 max-lg:text-5xl max-lg:p-28 text-center bg-[url(bg1.jpg)] bg-cover bg-center h-60 w-full  text-white">Capture Your Thoughts and Never Miss a Detail</div>
        <div className="p-5 bg-green-800 m-7 rounded-lg h-full ">
          <form onSubmit={handleSubmit} className="flex gap-5 ">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" p-1 w-full  border-2 text-black  rounded-md"
              type="text"
              placeholder="Type Here Messege"
            />
            {todos.some((item) => item.isChecked) ? (
              <>
                <button
                  type="button"
                  onClick={() => handleDeleteAll(todos)}
                  className="border px-5"
                >
                  Delete Selected
                </button>
                <button
                  type="button"
                  onClick={() => toggleCheckboxes()}
                  className="border px-5"
                >
                  Unselect All
                </button>
              </>
            ) : (
              <button type="submit" className="border px-5">
                Save
              </button>
            )}
          </form>
          <ul>
            {todos.map((todo, index) => {
              return (
                <div key={todo._id} className="flex gap-5 py-2 items-start max-sm:flex-col justify-start">
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
                          className="border rounded-lg bg-red-50 text-black text-sm px-5"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEdit(todo._id, todo.name)}
                          className="border rounded-lg bg-red-50 text-black text-sm px-5"
                        >
                          Update
                        </button>


                    </>
                  ) : (
                    <>
                      <label className="todo-label" htmlFor={todo._id}>
                        <input
                          type="checkbox"
                          onChange={() => toggleCheckboxes(todo._id)}
                          checked={todo.isChecked}
                          id={todo._id}
                        />
                        <span className="checkmark"></span>
                        {todo.name}
                      </label>
                      <div className=" w-full flex gap-4 ">

                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="border rounded-sm bg-red-50 text-black text-sm px-5"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleEdit(todo._id)}
                        className="border rounded-sm bg-red-50 text-black text-sm px-5"
                      >
                        Edit
                      </button>
                      </div>

                    </>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </div>

    </>
  );
}

export default App;
