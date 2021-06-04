const todoForm = document.getElementById("todo-form");
const toDoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "toDos";
let toDos = [];

 // 로컬 저장소 이용해서 데이터를 저장하는 함수 ( 새로 고침 해도 저장 )
function saveToDos(){ 
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

// 삭제 버튼을 눌렀을 때 일어나는 이벤트 리스너
function deleteToDo(event){
    const li = event.target.parentElement; // 삭제 버튼을 누른 장소의 li를 선택
    li.remove(); // 삭제
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // 해당 id 해당하는 아이템 삭제
    saveToDos(toDos);
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text; // input에 들어온 데이터를 li>span 에 대입

    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li); // 리스트에 추가
}

function handleToDoSubmit(event){
    event.preventDefault(); // 새로고침 방지
    const newTodo = toDoInput.value;
    toDoInput.value = ""; // 입력값 초기화
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj); // 로컬 저장소에 저장
    paintToDo(newTodoObj);
    saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit);


// 로컬저장소에 저장된 아이템을 가져옴
const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos){ // 로컬 저장소에 저장된 데이터가 있는 경우
    // 로컬저장소에서 가져온 아이템을 JSON 배열 형태로 가져옴
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach((item) => paintToDo(item)); // 가져온 데이터를 차례대로 전달
}