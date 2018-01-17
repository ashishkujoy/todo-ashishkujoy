const renderServerResponse = function(){
  let todo = JSON.parse(this.responseText);
  let todoPlaceHolder = document.getElementById('todo');
  todoPlaceHolder.innerHTML = [
    todo.title,
    todo.description,
    todo.items,
    todo.button
  ].join('<br>')
}

const getTodoDetail = function(){
  let titleId = event.target.parentElement.id;
  let req =  new XMLHttpRequest();
  req.onload = renderServerResponse;
  req.open('GET',`/todo/${titleId}`);
  req.send();
}

const sendXmlRequest = function(method,path,callBack,data){
  let req = new XMLHttpRequest();
  req.onload=callBack;
  req.open(method,path);
  req.send(data);
}

const showResponse = function(){
  let newItem = this.responseText;
  let todoDiv = document.getElementById('todo');
  let newItemTextBox = document.getElementById('itemName');
  let saveButton = document.getElementById('saveButton');
  todoDiv.removeChild(newItemTextBox);
  todoDiv.removeChild(saveButton);
  todoDiv.innerHTML+=newItem;
}

const sendSaveItemReq = function(){
  let itemName = document.getElementById('itemName').value;
  let titleId = event.target.parentElement.children[0].id
  let requestUrl = `/todo/${titleId}/addNewItem`;
  let reqBody = `itemName=${itemName}`;
  return sendXmlRequest('POST',requestUrl,showResponse,reqBody);
}

const createCheckBox = function(type,id){
  let checkBox = document.createElement('input');
  checkBox.type = type;
  checkBox.id = id;
  return checkBox;
}

const createButton = function(innerHTML,onclick,id){
  let button = document.createElement('button');
  button.innerHTML = innerHTML;
  button.onclick = sendSaveItemReq;
  if(id) button.id = id;
  return button;
}

const addNewTodo = function(){
  let todoDiv = document.getElementById('todo');
  let checkBox = createCheckBox('text','itemName');
  let saveButton = createButton('save',sendSaveItemReq,'saveButton');
  todoDiv.appendChild(checkBox);
  todoDiv.appendChild(saveButton);
}
