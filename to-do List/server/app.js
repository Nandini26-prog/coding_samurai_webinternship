const express = require('express');
const app = express();

app.use(express.json());
 
const cors =require("cors");

app.use(cors());
const todoList = [];

app.get('/api/todos', (req, res) => {
  console.log(" recieved get request");
  res.json(todoList);
});

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  todoList.push(newTodo);
  res.json(todoList);
});

app.put('/api/todos/:id', (req, res) => {
  const id = req.params;
  const updatedTodo = req.body;
  const index = todoList.findIndex((todo) => todo.id === parseInt(id));
  if (index !== -1) {
    // Merge updated task information with the existing task object
    todoList[index] = { ...todoList[index], ...updatedTodo };
    res.json(todoList[index]); // Send back the updated task
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});


app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todoList.findIndex((todo) => todo.id === id);
  if (index!== -1) {
    todoList.splice(index, 1);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});