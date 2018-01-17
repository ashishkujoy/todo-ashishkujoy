const renderServerResponse = function(){
  let todo = JSON.parse(this.responseText);
  let todoPlaceHolder = document.getElementById('todo');
  todoPlaceHolder.innerHTML = todo.title;
}

const getTodoDetail = function(){
  let titleId = event.target.parentElement.id;
  let req =  new XMLRequest();
  req.onload = renderServerResponse;
  req.open('GET',`/todo/${titleId}`);
  req.send();
}
