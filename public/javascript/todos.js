const getTodoDetail = function(){
  let titleId = event.target.parentElement.id;
  let req =  new XMLRequest();
  req.onload = renderServerResponse;
  req.open('GET',`/todo/${titleId}`);
  req.send();
}
