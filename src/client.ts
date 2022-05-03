
let todoList: any [] = [];


function getTodos() {

    $.ajax({
        url: '/aufgaben',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            //renderTodos(response.todoList);
        },
        error: (jqXHRresponse) => {
            console.log(jqXHRresponse.responseJSON.message);
        },
    }).then(() => {
    });
}


function renderTodos() {
    //console.log(todoList);
    let todoList: any [] = [
        {
            id: 1,
            title: 'Todo 1',
            date: '2020-01-01',
            completed: false
        },
        {
            id: 2,
            title: 'Todo 2',
            date: '2020-01-01',
            completed: false
        },
        {
            id: 3,
            title: 'Todo 3',
            date: '2020-01-01',
            completed: false
        }
    ];
    console.log(todoList);
    const todoBody: JQuery = $('#todo-body');
    todoBody.empty();
    for(const aufgabe of todoList) {
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

//Main Callback
$(() => {
    getTodos();
    renderTodos()
});

