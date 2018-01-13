const displayUserName = function(name) {
  let nameHolder = document.getElementById('name_holder');
  nameHolder.innerHTML = name;
}

const displayTodoTitles = function(todoTitles) {
  let todoList = document.getElementById('todo_list');
  for(let index=0;index<todoTitles.length;index++){
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = todoTitles[index];
    td.id = index;
    tr.appendChild(td);
    todoList.appendChild(tr);
  }
}

const renderUserDetails = function(){
  let userDetails = JSON.parse(this.responseText);
  console.log(userDetails);
  displayUserName(userDetails.username);
  displayTodoTitles(userDetails.todos);
}

const requestUserDetails = function(){
  let req = new XMLHttpRequest();
  req.open('GET','/userDetails');
  req.onload=renderUserDetails;
  req.send();
}

const alertId = function(){
  console.log(event.target.id)
}

const startPage = function(){
  requestUserDetails();
  let table = document.getElementById('todo_list');
  table.onclick=alertId;
}

window.onload = startPage;
