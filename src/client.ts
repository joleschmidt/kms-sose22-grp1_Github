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
        <h5 class="card-title">${aufgabe.name}</h5>
            <p class="card-text">${aufgabe.time}</p>
            <a class="btn btn-secondary mr-2">Edit</a>
            <a class="btn btn-danger">Delete</a>
            </div>
            </div>
        `);
        todoBody.append(tableEntry);
    }
}

//Main Callback
$(() => {
    getTodos();
});

