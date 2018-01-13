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

const getTodoTitle = function(event){
  let id = event.target.id;
  return document.getElementById(id).innerHTML;
}

const showTodoDetail = function(){
  alert('get todo details');
}

const requestTodoDetails = function(){
  let todoTitle = getTodoTitle(event);
  let req = new XMLHttpRequest();
  req.onload = showTodoDetail;
  req.open('GET','/todoDetail');
  req.send(todoTitle);
}


const startPage = function(){
  requestUserDetails();
  let table = document.getElementById('todo_list');
  table.onclick=requestTodoDetails;
}

window.onload = startPage;
