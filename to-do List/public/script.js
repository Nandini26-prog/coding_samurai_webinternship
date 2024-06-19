const addTaskBtn = document.getElementById('add-TaskBtn');
const taskListUl = document.getElementById('task-list-ul');
const filterStatus = document.getElementById('status-select');
const sortByDate = document.getElementById('sort-by-date');
//const taskDueDate = document.getElementById('task-date').value;


let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function addTask(task) {
  const dueDate = document.getElementById('task-date').value;
  todoList.push(task);
  updateLocalStorage();
}

function updateTask(id, updatedTask) {
  const index = todoList.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todoList[index] = updatedTask;
    updateLocalStorage();
  }
}

function deleteTask(id) {
  const index = todoList.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todoList.splice(index, 1);
    updateLocalStorage();
  }
}


function renderFilteredTasks(filteredTasks) {
  taskListUl.innerHTML = '';
  filteredTasks.forEach((task) => {
    const taskLi = createTaskElement(task);
    taskListUl.appendChild(taskLi);
  });
}

filterStatus.addEventListener('change', filterAndSort);
sortByDate.addEventListener('change', filterAndSort);

function filterAndSort() {
  const selectedStatus = filterStatus.value;
  const selectedSort = sortByDate.value;
  
  let filteredTasks = [...todoList];

  if (selectedStatus === 'complete' || selectedStatus === 'incomplete') {
    filteredTasks = todoList.filter(task => task.status === selectedStatus);
}

  if (selectedSort === 'asc') {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    // console.log(a.dueDate);
    // console.log(b.dueDate);
  } else if (selectedSort === 'desc') {
    filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }

  renderFilteredTasks(filteredTasks);
  
  const completeTasks = document.querySelectorAll('.complete');
  completeTasks.forEach(task => {
    task.style.textDecoration = 'line-through';
    // Add any other styles as needed
  });
}


function createTaskElement(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  const taskName = document.createElement('span');
  taskName.textContent = task.name;
  taskName.classList.add('task-name');
  li.appendChild(taskName);

  const taskDescription = document.createElement('span');
  taskDescription.textContent = task.description;
  taskDescription.classList.add('task-description');
  li.appendChild(taskDescription);

  const taskdate = document.createElement('span');
  taskdate.textContent = formatDate(task.dueDate);
  taskdate.classList.add('task-date');
  li.appendChild(taskdate);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust this to format the date string as desired
  }

  const taskPriority = document.createElement('span');
  taskPriority.textContent = task.priority;
  taskPriority.classList.add('task-priority');
  li.appendChild(taskPriority);

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const completeBtn = document.createElement('button');
  const completeImg = document.createElement('img');
  completeImg.src = 'check_box.png'; // Specify the path to your image
  completeImg.alt = 'done'; // Provide an alt attribute for accessibility
  
  // Append the image to the button
  completeBtn.appendChild(completeImg);
  completeBtn.addEventListener('click', () => {
    const updatedTask = { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' };
    updateTask(task.id, updatedTask);
    li.classList.toggle('complete');
    // taskName.classList.add('complete');

    taskName.classList.toggle('complete');

  });
  taskActions.appendChild(completeBtn);

  const editBtn = document.createElement('button');
  // editBtn.textContent = 'Edit';
  const editImg = document.createElement('img');
editImg.src = 'edit.png'; // Specify the path to your image
editImg.alt = 'Edit'; // Provide an alt attribute for accessibility

// Append the image to the button
editBtn.appendChild(editImg);

  taskActions.appendChild(editBtn);
    // Edit task logic


    const editform= document.createElement('form');
    editform.classList.add('hidden');  //hidden is a class defined in css to hide the form
    editform.id='edit-form';

    const nameEdit=document.createElement('input');
    nameEdit.type='text';
    nameEdit.name='name';
    nameEdit.value = task.name;
    nameEdit.placeholder='Enter the task name';

    const descedit=document.createElement('input');
    descedit.type='text';
    descedit.name='Description';
    descedit.value = task.description;
    descedit.placeholder='Enter the description';

    const submiteditbtn=document.createElement('button');
    submiteditbtn.textContent='Save';
    submiteditbtn.style.color ='#17A2B8';
    submiteditbtn.type='submit';

    editform.appendChild(nameEdit);
    editform.appendChild(descedit);
    //editform.appendChild(dateedit);
    editform.appendChild(submiteditbtn);

   li.appendChild(editform);

     const taskList = document.getElementById('task-list');
     taskList.appendChild(li);

    editBtn.addEventListener('click', () => {
      editform.classList.remove('hidden'); // Show the form
      editBtn.style.display = 'none';
  });

  editform.addEventListener('submit',function(event){
    event.preventDefault();
    taskName.textContent=nameEdit.value;
    taskDescription.textContent=descedit.value;
   // taskdate.textContent=dateedit.value;
    editform.classList.add('hidden');
    editBtn.style.display='inline-block'
  });
  

  const deleteBtn = document.createElement('button');
  const deletetImg = document.createElement('img');
  deletetImg.src = 'delete.png'; // Specify the path to your image
  deletetImg.alt = 'Delete'; // Provide an alt attribute for accessibility

// Append the image to the button
deleteBtn.appendChild(deletetImg);
  deleteBtn.addEventListener('click', () => {
    deleteTask(task.id);
    li.remove();
  });
  taskActions.appendChild(deleteBtn);

  li.appendChild(taskActions);

  return li;
}

function renderTaskList() {
  taskListUl.innerHTML = '';
  todoList.forEach((task) => {
    const taskLi = createTaskElement(task);
    taskListUl.appendChild(taskLi);
  });
}
document.addEventListener('DOMContentLoaded', function() {
  const addTaskBtn = document.getElementById('add-TaskBtn');
  if (addTaskBtn) {

addTaskBtn.addEventListener('click', () => {
  const taskName = document.getElementById('task-name');
  const taskDescription = document.getElementById('task-description');
  const taskPriority = document.getElementById('task-priority');

 const newTask = {
    id: Date.now().toString(),
    name: taskName.value,
    description: taskDescription.value,
    priority: taskPriority.value,
    dueDate: document.getElementById('task-date').value,
    status: 'incomplete' ,
  };

  addTask(newTask);
  taskName.value = '';
  taskDescription.value = '';
  taskPriority.value = 'low';
  renderTaskList();
});
   
}
});

renderTaskList();



// API calls
fetch('/api/todos', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
.then(data => {
  todoList = data;
  updateLocalStorage();
  renderTaskList();
})
.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
});


  

  const updatedTodo = {
    id: "ID_of_todo_item_to_update",
    name: "updated-name",
    description: "updated-description"
  };
  
  fetch('/api/todos', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    updateTask(updatedTodo.id, updatedTodo);
    renderTaskList();
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
  


fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New Task', description: 'New Task Description', priority: 'medium' }),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
 .then((data) => {
    addTask(data);
    renderTaskList();
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  
  const todoIdToDelete = 'ID_of_todo_item_to_delete';
fetch(`/api/todos/${todoIdToDelete}`, {
  method: 'DELETE',
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
.then(data => {
  deleteTask(todoIdToDelete);
})
.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
});
