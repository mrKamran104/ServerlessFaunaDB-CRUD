/* Api methods to call /functions */

const addTodo = (data: { title: string }) => {
  return fetch("/.netlify/functions/addTodo", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const getAllTodos = () => {
  return fetch("/.netlify/functions/getAllTodos/").then((response) => {
    return response.json();
  });
};

const updateTodo = (data: { id: string; title: string }) => {
  return fetch(`/.netlify/functions/updateTodo`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};

const deleteTodo = async (todoId: { id: string }) => {
  const response = await fetch(`/.netlify/functions/deleteTodo`, {
    body: JSON.stringify(todoId),
    method: "POST",
  });
  return await response.json();
};

export default {
  addTodo: addTodo,
  getAllTodos: getAllTodos,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
