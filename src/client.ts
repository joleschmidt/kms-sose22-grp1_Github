
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
            //renderTodos(response.todoList);
        },
        error: (jqXHRresponse) => {
            console.log(jqXHRresponse.responseJSON.message);
        },
    }).then(() => {
    });
}


function renderTodos() {
    console.log(todoList);

    const todoBody: JQuery = $('#todo-body');
    todoBody.empty();

    for(const aufgabe of todoList) {
        const tableEntry: JQuery = $(`
        <div class="card m-3 mt-3" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title aufgaben_name">${aufgabe.name}</h5>
            <h6 class="aufgaben_id">ID: ${aufgabe.id}</h6>
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

