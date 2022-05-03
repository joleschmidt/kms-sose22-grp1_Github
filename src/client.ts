
let todoList: any [] = [
    {
        id: 1,
        name: 'Todo 1',
        time: '2020-01-01',
        priority: 'low',
        completed: false
    },
    {
        id: 2,
        name: 'Todo 2',
        time: '2020-01-01',
        priority: 'high',
        completed: false
    },
    {
        id: 3,
        name: 'Todo 3',
        time: '2020-01-01',
        priority: 'medium',
        completed: false
    }
];

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


function renderTodos(aufgaben: any[]) {
    console.log(aufgaben);

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
            <a class="btn btn-secondary mr-2 aufgabeBearbeiten">Edit</a>
            <a class="btn btn-danger">Delete</a>
            </div>
            </div>
        `);
        todoBody.append(tableEntry);
    }
}
function renderModal(event: Event){
    const aufgaben_id: number = Number($(event.currentTarget as HTMLElement).parent().children(".aufgaben_id").val());
    $.ajax("/aufgabe_id/:"+ aufgaben_id, {
        method: "GET",
        contentType: "json"
    }).then((data) =>{
        $("#bearbeitenAufgabe").val(data.aufgabe);
        $("#bearbeitenPrio").val(data.priority);
        $("#aufgabe-id-hidden").val(data.id);
        $("#edit-modal").show();
    }).catch((jqXHR: JQueryXHR) => {
        console.log(jqXHR);
    })
}

function updateToDos(event: Event){
    const aufgaben_id: number = Number($("#aufgabe-id-hidden").val());
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

function createTask(inputAufgabe): void {
    const aufgabe: string = inputAufgabe.val().toString();
    console.log(aufgabe)

    $.ajax("/aufgabe", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            aufgabe: aufgabe
        })
    }).then((data) => {
        alert(data);
    }).catch((jqXHR: JQueryXHR) => {
        alert(jqXHR.responseText);
    });
}

//Main Callback
$(() => {
    $("#edit-modal").hide();
    $(".aufgabeBearbeiten").on("click", function (){
        renderModal(event);
    });
    $(".save").on("click", function (){
        $("#edit-modal").hide();
        updateToDos(event);
    });

    getTodos();
});

//Callback for Post

$(() => {
    let inputAufgabe: JQuery = $("#inputAufgabe");
    let formInput: JQuery = $("#formInput");
    formInput.on("submit",() => {createTask(inputAufgabe)});
});