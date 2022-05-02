let todoList: any[] = [];


function getTodos() {

    $.ajax({
        url: '/aufgaben',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            renderTodos(response.aufgaben);
        },
        error: (jqXHRresponse) => {
            console.log(jqXHRresponse.responseJSON.message);
        },
    }).then(() => {
    });
}


function renderTodos (aufgaben: any[]) {
    console.log(aufgaben);
    const todoBody: JQuery = $('#todo-body');
    todoBody.empty();
    for(const aufgabe of aufgaben) {
        const tableEntry: JQuery = $(`
        <div class="card m-3 mt-3" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title aufgaben_name">${aufgabe.name}</h5>
            <h6 class="aufgaben_id">Aufgabe ${aufgabe.id}</h6>
            <p class="card-text priority">Priorität ${aufgabe.priority}</p>
            <p class="card-text">${aufgabe.time}</p>
            <a class="btn btn-secondary mr-2 aufgabeBearbeiten">Edit</a>
            <a class="btn btn-danger">Delete</a>
            </div>
            </div>
        `);
        todoBody.append(tableEntry);
    }
}

function updateToDos(event: Event){
    const aufgaben_id: number = Number($(event.currentTarget as HTMLElement).parent().children(".aufgaben_id").val());
    const name: string = String($(".bearbeitenInput").val());
    const priority: number = Number($(".bearbeitenPrio").val());
    $.ajax("/aufgabe/:" + aufgaben_id, {
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            name: name,
            priority: priority
        })
    }).then((data) =>{
        alert(data)
    }).catch((jqXHR: JQueryXHR) =>{
        console.log(jqXHR.responseText);
    })
}

//Main Callback
$(() => {
    let updateButton: JQuery = $(".aufgabeBearbeiten");
    let saveChanges: JQuery = $("#saveChanges");
    updateButton.on("click", function (){
        //showUpdate(event);
    });
    saveChanges.on("click", function (){
        updateToDos(event);
    });
    getTodos();
});

