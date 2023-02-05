const imgs = ["1.jpg","2.png","3.jpg","4.jpg"];
const myClock = document.querySelector("#myClock");
const greeting = document.querySelector("#greeting");
const myForm = document.querySelector("#myForm");
const todoForm = document.querySelector("#todoForm");
const todoBody = document.querySelector("#todoBody");

const HIDDEN = "hidden";
const USER_NAME = "userName";
const TODO_LIST ="todoList";

function handleSubmit(event) {
    event.preventDefault();
    const userName= event.target.userName.value;
    if(userName === "") {
        alert("please type your name ! ");
        event.target.userName.focus();
    }
    localStorage.setItem(USER_NAME, userName);
    showGreeting();
}

function showDateAndTime(){
    const myDate = new Date();
    myClock.innerText = `${myDate.getMonth() +1}월 ${myDate.getDate()}일 ${myDate.getHours()}시 ${myDate.getMinutes()}분 ${myDate.getSeconds()}초`;
}

function showGreeting() {
    userName = localStorage.getItem(USER_NAME);
    if(userName) {
        myForm.classList.add(HIDDEN);
        greeting.classList.remove(HIDDEN);
        greeting.innerText = `Hello ~ ${userName}!`
    } else {
        myForm.classList.remove(HIDDEN);
        greeting.classList.add(HIDDEN);       
    }
}

function addTodoList(event) {
    event.preventDefault();
    const itemValue = event.target.todoItem.value;
    event.target.todoItem.value = "";
    saveTodoListToStorige(itemValue);
}

function saveTodoListToStorige(itemValue) {
    if(itemValue === "") return false;

    const todoList = getSavedTodoList();
    const timeStamp = Date.now();
    todoList.push({  "id" : timeStamp , "item" : itemValue });
    saveTodoAndRefresh(todoList);
}

function saveTodoAndRefresh(todoList) {
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
    reloadTodoList();
}

function getSavedTodoList() {
    const savedValue = localStorage.getItem(TODO_LIST);
    if(!savedValue) return [];

    return JSON.parse(savedValue);
}

function reloadTodoList() {
    const todoList = getSavedTodoList();

    while(todoBody.rows.length > 0) {
        todoBody.deleteRow(todoBody.rows.length -1);    
    }

    if(todoList.length == 0) return false;


    for(let i=0;i<todoList.length; i++) {
        let row = todoBody.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        const button = document.createElement("button");
        button.innerText = "❌";
        button.addEventListener("click", deleteTodo);

        cell1.innerHTML = todoList[i].item;
        cell2.appendChild(button);
        cell2.id = todoList[i].id;
    }
}

function deleteTodo(event) {
    const targetId = event.target.parentElement.id;
    let todoList = getSavedTodoList();
    todoList = todoList.filter((todo) => todo.id !== parseInt(targetId));
    saveTodoAndRefresh(todoList);
}

function changeBackground() {
    const targetId = Math.floor(Math.random() * imgs.length);
    document.body.style.backgroundImage = `url(img/${imgs[targetId]})`; 
}

myForm.addEventListener("submit", handleSubmit);
todoForm.addEventListener("submit", addTodoList);

showGreeting();
showDateAndTime();
setInterval(showDateAndTime, 1000);
reloadTodoList();
changeBackground();