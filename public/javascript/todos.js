const createInputTextField = function(name,value){
  let input = document.createElement('input');
  input.type = 'text';
  input.name = name;
  input.value = value;
  input.disabled =true;
  return input;
}

const createForm = function(method,action){
  let form = document.createElement('form');
  form.action = action;
  form.method = method;
  return form;
}

const createNewButton = function(type,value,onsubmit){
  let button = document.createElement('button');
  button.type = type;
  button.innerText = value;
  console.log(onsubmit);
  button.onclick=onsubmit;
  console.log(button.onclick);
  return button;
}

const removeDisable = function (event) {
  console.log(event.target.parentNode.children);
  debugger;
  event.target.parentNode.children[0].disabled=false;

}

const displayTodoTitles = function(titles){
  let titleDiv = document.getElementById('todo_titles');
  for(let count=0;count<titles.length;count++){
    let title = titles[count];
    let form = createForm('post','/todoDetail');
    form.appendChild(createInputTextField('todoTitle',title));
    form.appendChild(createNewButton('submit','view',removeDisable));
    titleDiv.appendChild(form);
  }
}

const renderUserDetails = function(){
  let todoTitles = document.getElementById('todo_titles')
  todoTitles.innerHTML = this.responseText;
}

const requestUserDetails = function(){
  let req = new XMLHttpRequest();
  req.open('GET','/todos');
  req.onload=renderUserDetails;
  req.send();
}

const startWindow = function(){
  //requestUserDetails();
}

window.onload = startWindow;
