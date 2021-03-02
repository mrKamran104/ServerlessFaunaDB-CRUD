import React, { useEffect, useState } from "react";
import "./AppTodos.css";
import api from "../../utils/api";
import Swal from "sweetalert2";

const AppTodos = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<any[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api.getAllTodos();
      //   console.log(data)
      setTodoList(data);
      setLoading(false);
    })();
  }, []);

  const addTodofunc = async (e: any) => {
    e.preventDefault();
    if (task === "") return Swal.fire("Error","Please write some words","error")
    const todo = { title: e.target.title.value };
    // setTodoList([...todoList, { data: todo }]);
    const res = await api.addTodo(todo);
    setTask("")
    setTodoList([...todoList, { data: todo }]);
    const data = await api.getAllTodos();
    setTodoList(data);
  };

  const deleteTodo = async (id: string) => {
    const res = await api.deleteTodo({ id: id });
    const data = await api.getAllTodos();
    setTodoList(data);
  };

  const updateTodo = async (todo: {
    data: { title: string };
    ref: { [x: string]: { id: string } };
  }) => {
    const result: { value: string } = await Swal.mixin({
      input: "text",
      confirmButtonText: "Update",
      showCancelButton: true,
    }).queue([
      {
        titleText: "Enter Task",
        input: "text",
        inputValue: todo.data.title,
      },
    ]);
    if (result.value) {
      const res = await api.updateTodo({
        title: result.value,
        id: todo.ref["@ref"].id,
      });
      const data = await api.getAllTodos();
      setTodoList(data);
    }
  };

  return (
    <div>
      <h2>Todo App</h2>
      <div>
        <form className="inputBtn" onSubmit={addTodofunc}>
          <input
            name="title"
            value={task}
            placeholder="Enter task . . ."
            onChange={(e) => setTask(e.target.value)}
          />
          <button>ADD</button>
        </form>
      </div>
      <div style={{ marginTop: "25px" }}>
        {!loading ? (
          todoList?.map((todo: any, i: number) => {
            return (
              <div className="card" key={i}>
                <div style={{ textAlign: "left" }}>{todo.data.title}</div>
                <div>
                  <button onClick={() => updateTodo(todo)}>Update</button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteTodo(todo.ref["@ref"].id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default AppTodos;
