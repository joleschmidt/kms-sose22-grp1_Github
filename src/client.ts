
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
    console.log("Ziyad ist cool");

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
    event.preventDefault();
    const aufgaben_id: number = Number($(event.currentTarget as HTMLElement).parent().children(".aufgaben_id").val());
    $.ajax("/aufgabe/:"+ aufgaben_id, {
        method: "GET",
        contentType: "json"
    }).then((data) =>{
        $("#bearbeitenAufgabe").val(data.name);
        $("#bearbeitenPrio").val(data.prioritaet);
        $("#aufgabe-id-hidden").val(data.id);
    }).catch((jqXHR: JQueryXHR) => {
        console.log(jqXHR);
    })
}

function updateToDos(event: Event){
    event.preventDefault();
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
        alert(data + "erfolgreich hinzugefügt!");
    }).catch((jqXHR: JQueryXHR) => {
        alert(jqXHR.responseText);
    });
}

//Main Callback
$(() => {
    $("#edit-modal").hide();
    $("#todo-body").on("click", '.aufgabeBearbeiten', function () {
        $("#edit-modal").show();
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
