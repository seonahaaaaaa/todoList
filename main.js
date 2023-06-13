// input 
let taskInput = document.getElementById("task-input");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let filterList = [];    // mode에 따라 변화 될 taskList를 담을 array
let mode ="all";

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)}); 

}

function filter(event){
    mode = event.target.id;
    filterList = [];

    document.getElementById("under-line").style.width = event.target.offsetWidth + "px"; // 가로 길이를 event.target 에 맞게
    document.getElementById("under-line").style.top = event.target.offsetTop + event.target.offsetHeight +"px"; // 높이 길이를 event.target 에 맞게
    document.getElementById("under-line").style.left = event.target.offsetLeft + "px";   
        if(mode == "all"){
            render();
        } else if(mode == "done"){
            for(let i=0; i < taskList.length; i++){
                if(taskList[i].isComplete == false){
                    filterList.push(taskList[i]);
                }
            }
            render();
        } else if(mode == "notDone"){
            for(let i=0; i < taskList.length; i++){
                if(taskList[i].isComplete == true){
                    filterList.push(taskList[i]);
                }
            }
            render();
        }
}
    

// +버튼
let addBtn = document.getElementById("add-button");
addBtn.onclick = function(){
    addTask();
};

function addTask(){
    let taskContent = taskInput.value;
    let task = {
        taskContent : taskInput.value,
        isComplete : false,
        id : randomIdGenerate()
    }
    taskList.push(task);
    console.log(taskList);
    render();
}   // end of addTask

function render(){
    let list = [];
    
    let resultHTML = "";
    console.log(mode);
    if(mode == "all"){
        list = taskList;
    }else if(mode == "done" || mode == "notDone"){
        list = filterList;
    }

    for(let i=0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
        <div class="task-done">` + list[i].taskContent + `</div>
        <div>
            <button onclick="complete('${list[i].id}')">Check</button>
            <button onclick="delTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>` + list[i].taskContent + `</div>
            <div>
                <button onclick="complete('${list[i].id}')">Check</button>
                <button onclick="delTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-dashboard").innerHTML = resultHTML;
}   // end of render

function complete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            // 현재 false 값이면 부정(반대)의 값인 true 부여
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    render();
}   // end of complete

function delTask(delId){
    console.log(delId)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == delId){
            console.log(taskList);
            taskList.splice(i,1);
            break;
        }
    }
    render();
}   // end of delTask


// task에 부여할 random id 생성
function randomIdGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}   // end of randomIdGenerate


