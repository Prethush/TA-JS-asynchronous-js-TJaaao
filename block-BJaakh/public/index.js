const rootElm = document.querySelector(".todo-container");
const input = document.querySelector("input");
const url = `https://sleepy-falls-37563.herokuapp.com/api/todo`;

let data = {"todo": {}};
let isTrue = false;

function displayUI(datas) {
    console.log("GGG");
        rootElm.innerHTML = "";
        datas.forEach((todo) => {
            let li = document.createElement("li");
            li.classList.add("flex", "flex-row", "items-center")
            let input = document.createElement("input");
            input.type = "checkbox";
            input.checked = todo.isCompleted;
            input.addEventListener("click", () => {
                data.todo.isCompleted = !todo.isCompleted;
                console.log(data, todo._id);
                updateTodo(data, todo._id);
            })
            let title = document.createElement("h3");
            title.classList.add("ml-6")
            title.innerText = todo.title;
            title.addEventListener("dblclick", (event) => {
                console.log("hai");
                let input = document.createElement("input");
                let el = event.target;
                input.value = el.innerText;
                input.type = "text";
                let parent = el.parentElement;
                input.addEventListener("keydown", (e) => {
                    if(e.keyCode === 13) {
                        let updated = e.target.value;
                        console.log(data);
                        data["todo"].title = updated;
                        console.log(data, todo._id);
                        updateTodo(data, todo._id);
                    }
                })
                 input.addEventListener("blur", (e) => {
                    let updated = e.target.value;
                    console.log(data);
                    data["todo"].title = updated;
                    console.log(data, todo._id);
                    updateTodo(data, todo._id);
                 })   

                
                parent.replaceChild(input, el);
                
            });
            let span = document.createElement("span");
            span.innerText = "❌";
            span.classList.add("ml-4", "block", "cursor-pointer");
            span.addEventListener("click", (e) => {
                deleteTodo(todo._id);
            })
            li.append(input, title, span);
            rootElm.append(li);
            
        })
        
    
}

function addTodo(event) {
    
     console.log(event.keyCode)
    if(event.keyCode === 13) {
        rootElm.innerHTML = "";
        
        data.todo.title = event.target.value;
        data.todo.isCompleted = isTrue;
        console.log(data);
        event.target.value = "";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        
        main();
        
    } 
    
}

function updateTodo(obj, id) {

    fetch(url + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
    });

    main();

}

function deleteTodo(id) {
    fetch(url + `/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
       
    });

    main();
}


function main() {
    console.log("Hai");
    fetch(url).then((res) => res.json())
    .then((data) => displayUI(data.todos));
    

}

input.addEventListener("keyup", addTodo)



main();