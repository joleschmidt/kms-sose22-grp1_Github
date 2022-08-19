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
    })
}


function renderTodos(aufgaben: any[]) {

    const todoBody: JQuery = $('#todo-body');
    todoBody.empty();

    for(const aufgabe of aufgaben) {
        const tableEntry: JQuery = $(`
        <div class="card m-3 mt-3" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title aufgaben_name">${aufgabe.name}</h5>
            <h6 class="aufgaben_id">ID: ${aufgabe.aufgaben_id}</h6>
            <p class="card-text priority">Priorität ${aufgabe.prioritaet}</p>
            <p class="card-text">${aufgabe.time}</p>
            <a class="btn btn-secondary mr-2" onclick="renderModal(${aufgabe.aufgaben_id})">Edit</a>
            <a class="btn btn-danger">Delete</a>
            </div>
            </div>
        `);
        todoBody.append(tableEntry);
    }
}

function renderModal(aufgaben_id: number){
    const a_id = Number(aufgaben_id);
    console.log(a_id);
    $.ajax("/aufgabe/"+ a_id, {
        method: "GET",
        contentType: "json"
    }).then((data) =>{
        console.log(data);
        const updateTodoName: JQuery = $("#bearbeitenAufgabe");
        const updateTodoPrio: JQuery = $("#bearbeitenPrio");
        const updateTodoId: JQuery = $("#aufgabe-id-hidden");
        updateTodoName.val(data.aufgabe.name);
        updateTodoPrio.val(data.aufgabe.prioritaet);
        updateTodoId.val(a_id);
        $("#edit-modal").show();
    }).catch((jqXHR: JQueryXHR) => {
        console.log(jqXHR);
    })
}

function updateToDos(){
    const aufgaben_id = Number($("#aufgabe-id-hidden").val());
    const name = String($("#bearbeitenAufgabe").val());
    const priority = Number($("#bearbeitenPrio").val());
    console.log(priority, name);
    $.ajax("/aufgabe/" + aufgaben_id, {
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            name: name,
            priority: priority
        })
    }).then(() =>{
        getTodos();
    }).catch((jqXHR: JQueryXHR) =>{
        console.log(jqXHR.responseText);
    })
}

function createTask(inputAufgabe): void {
    const aufgabe: string = inputAufgabe.val().toString();

    $.ajax("/aufgabe", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            aufgabe: aufgabe
        })
    }).then((data) => {
        alert(data + "erfolgreich hinzugefügt!");
    }).catch((jqXHR: JQueryXHR) => {
        alert(jqXHR.responseText);
    });
}

//Main Callback
$(() => {
    $("#edit-modal").hide();
    $(".save").on("click", function (){
        $("#edit-modal").hide();
        updateToDos();
    });
    getTodos();
});

//Callback for Post

$(() => {
    const inputAufgabe: JQuery = $("#inputAufgabe");
    const formInput: JQuery = $("#formInput");
    formInput.on("submit",() => {createTask(inputAufgabe)});
});
